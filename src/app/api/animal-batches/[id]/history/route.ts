import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const session = await auth();
  const farmId = session?.user?.farm_id;
  if (!session?.user?.id || !farmId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Fetch audit logs for this batch
    const logs = await db.auditLog.findMany({
      where: {
        farm_id: farmId,
        entity_type: "AnimalBatch",
        entity_id: id,
        action: "UPDATE",
      },
      orderBy: { timestamp: "asc" },
      include: {
        user: { select: { name: true } }
      }
    });

    // We also need all stages to map IDs to names
    const stages = await db.stageDefinition.findMany({
      where: { farm_id: farmId, deleted_at: null }
    });
    
    const stageMap = stages.reduce((acc: any, s) => {
      acc[s.id] = s.stage_name;
      return acc;
    }, {});

    const history: any[] = [];
    
    // Also inject the original creation if we want, but audit log captures updates.
    // Let's parse JSON snapshots.
    for (const log of logs) {
      if (!log.after_snapshot) continue;
      try {
        const afterObj = typeof log.after_snapshot === 'string' ? JSON.parse(log.after_snapshot) : log.after_snapshot;
        const changedFields = typeof log.changed_fields === 'string' ? JSON.parse(log.changed_fields) : log.changed_fields;
        
        // If current_stage_id changed, record the transition
        if (Array.isArray(changedFields) && changedFields.includes("current_stage_id")) {
          const newStageId = afterObj.current_stage_id;
          history.push({
            id: log.id,
            date: log.timestamp,
            user_name: log.user?.name || "System",
            stage_name: stageMap[newStageId] || "Unknown Stage",
          });
        }
      } catch(e) {
        // Skip malformed JSON
      }
    }

    return NextResponse.json({ data: history.reverse() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
