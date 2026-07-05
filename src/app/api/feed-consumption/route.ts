import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { logAuditEvent } from "@/lib/auditLogger";
import { checkFinancialLock } from "@/lib/financialLock";
import { isManager } from "@/lib/rbac";
import { z } from "zod";

const createFeedConsumptionSchema = z.object({
  batch_id: z.string().min(1, "Batch is required"),
  feed_type_id: z.string().min(1, "Feed type is required"),
  date: z.string().min(1, "Date is required"),
  quantity_kg: z.coerce.number().min(0, "Quantity must be >= 0").optional().default(0),
  cost: z.coerce.number().min(0, "Cost must be >= 0").optional().default(0),
  notes: z.string().optional(),
  client_request_id: z.string().uuid().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  const farmId = session?.user?.farm_id;
  if (!session?.user?.id || !farmId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const consumptions = await db.feedConsumption.findMany({
      where: { farm_id: farmId, deleted_at: null },
      include: { 
        batch: true,
        feed_type: true
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ data: consumptions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feed consumptions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const farmId = session?.user?.farm_id;
  if (!session?.user?.id || !farmId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isManager(session)) return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });

  try {
    const body = await req.json();
    const parsedData = createFeedConsumptionSchema.parse(body);

    if (parsedData.client_request_id) {
      const existing = await db.feedConsumption.findFirst({
        where: { client_request_id: parsedData.client_request_id }
      });
      if (existing) {
        return NextResponse.json(existing, { status: 200 });
      }
    }

    await checkFinancialLock(farmId, new Date(parsedData.date));

    // Verify batch belongs to farm
    const batch = await db.animalBatch.findFirst({
      where: { id: parsedData.batch_id, farm_id: farmId, deleted_at: null },
      include: { current_stage: true }
    });
    if (!batch) return NextResponse.json({ error: "Batch not found or unauthorized" }, { status: 400 });

    // Transaction to create consumption and reduce stock
    const result = await db.$transaction(async (tx) => {
      const feedType = await tx.feedType.findFirst({
        where: { id: parsedData.feed_type_id, farm_id: farmId, deleted_at: null }
      });
      if (!feedType) throw new Error("Feed type not found");

      let quantityToDeduct = parsedData.quantity_kg;
      let calculatedCost = parsedData.cost;

      // AUTOMATION RULE: Server-side calculation if values are omitted
      if (!quantityToDeduct || quantityToDeduct === 0) {
        if (!batch.current_stage || batch.current_stage.feed_requirement == null || batch.current_stage.feed_requirement <= 0) {
          throw new Error(`Stage '${batch.current_stage?.stage_name || 'Unknown'}' has no valid feed requirement defined (must be > 0). Please enter quantity manually or update the stage definition.`);
        }
        // Required Feed = Animal Count × StageDefinition.feed_requirement
        quantityToDeduct = batch.quantity * batch.current_stage.feed_requirement;
      }

      if (feedType.stock_quantity < quantityToDeduct) {
        throw new Error(`Insufficient stock. Current stock: ${feedType.stock_quantity} kg, Required: ${quantityToDeduct} kg`);
      }

      if (!calculatedCost || calculatedCost === 0) {
        // Total Cost = Feed Required × FeedType.cost_per_kg
        calculatedCost = quantityToDeduct * feedType.cost_per_kg;
      }

      // Create consumption
      const consumption = await tx.feedConsumption.create({
        data: {
          farm_id: farmId,
          batch_id: parsedData.batch_id,
          feed_type_id: parsedData.feed_type_id,
          date: new Date(parsedData.date),
          quantity_kg: quantityToDeduct,
          cost: calculatedCost,
          notes: parsedData.notes,
          client_request_id: parsedData.client_request_id,
          sync_status: 'SYNCED',
        }
      });

      // Update stock
      await tx.feedType.update({
        where: { id: feedType.id },
        data: { stock_quantity: feedType.stock_quantity - quantityToDeduct }
      });

      return consumption;
    });

    await logAuditEvent({
      userId: session.user.id,
      farmId,
      module: "FEED",
      action: "CREATE_FEED_CONSUMPTION",
      entityType: "FeedConsumption",
      entityId: result.id,
      severity: "INFO",
      afterSnapshot: result,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes("LOCKED")) {
      return NextResponse.json(JSON.parse(error.message), { status: 423 });
    }
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    return NextResponse.json({ error: error.message || "Failed to record consumption" }, { status: 500 });
  }
}
