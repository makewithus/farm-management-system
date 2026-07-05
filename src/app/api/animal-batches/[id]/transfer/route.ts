import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { logAuditEvent } from "@/lib/auditLogger";
import { isManager } from "@/lib/rbac";
import { z } from "zod";

const transferSchema = z.object({
  quantity_to_move: z.number().int().min(1),
  destination_room_id: z.string().uuid(),
});

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await auth();
  const farmId = session?.user?.farm_id;
  if (!session?.user?.id || !farmId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isManager(session))
    return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });

  try {
    const body = await req.json();
    const { quantity_to_move, destination_room_id } = transferSchema.parse(body);

    // --- Fetch source batch ---
    const sourceBatch = await db.animalBatch.findUnique({ where: { id } });
    if (!sourceBatch || sourceBatch.deleted_at || sourceBatch.farm_id !== farmId)
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });

    if (sourceBatch.status !== "ACTIVE")
      return NextResponse.json(
        { error: "Only ACTIVE batches can have animals transferred" },
        { status: 400 }
      );

    if (quantity_to_move > sourceBatch.quantity)
      return NextResponse.json(
        { error: `Cannot move ${quantity_to_move} animals. Batch only has ${sourceBatch.quantity}.` },
        { status: 400 }
      );

    // --- Fetch destination room ---
    const destRoom = await db.room.findUnique({
      where: { id: destination_room_id },
      include: { animal_batches: { where: { deleted_at: null, status: "ACTIVE" } } },
    });
    if (!destRoom || destRoom.farm_id !== farmId)
      return NextResponse.json({ error: "Destination room not found" }, { status: 404 });

    if (destination_room_id === sourceBatch.room_id)
      return NextResponse.json(
        { error: "Source and destination room cannot be the same" },
        { status: 400 }
      );

    // --- Stage compatibility check ---
    const allowedStages = destRoom.allowed_stages.split(",").map((s) => s.trim());
    if (!allowedStages.includes(sourceBatch.current_stage_id) && destRoom.allowed_stages !== "*") {
      return NextResponse.json(
        { error: "Current batch stage is not allowed in the destination room" },
        { status: 400 }
      );
    }

    // --- Capacity check ---
    const destOccupancy = destRoom.animal_batches.reduce((sum, b) => sum + b.quantity, 0);
    if (destOccupancy + quantity_to_move > destRoom.capacity) {
      return NextResponse.json(
        {
          error: `Destination room capacity exceeded. Available: ${destRoom.capacity - destOccupancy}, Requested: ${quantity_to_move}`,
        },
        { status: 400 }
      );
    }

    const isFullTransfer = quantity_to_move === sourceBatch.quantity;

    // =========================================================
    // FULL TRANSFER — just update room, no split
    // =========================================================
    if (isFullTransfer) {
      const updated = await db.animalBatch.update({
        where: { id },
        data: { room_id: destination_room_id },
      });

      await logAuditEvent({
        userId: session.user.id,
        farmId,
        module: "BATCHES",
        action: "TRANSFER_FULL",
        entityType: "AnimalBatch",
        entityId: id,
        beforeSnapshot: sourceBatch,
        afterSnapshot: updated,
      });

      return NextResponse.json({
        success: true,
        type: "FULL_TRANSFER",
        batch: updated,
      });
    }

    // =========================================================
    // PARTIAL TRANSFER — split batch atomically
    // =========================================================
    const { v4: uuidv4 } = await import("uuid");
    const childId = uuidv4();
    const childBatchNumber = `${sourceBatch.batch_number}-split-${Date.now().toString().slice(-4)}`;

    const [updatedSource, childBatch] = await db.$transaction([
      // Reduce source batch quantity
      db.animalBatch.update({
        where: { id },
        data: { quantity: sourceBatch.quantity - quantity_to_move },
      }),
      // Create child batch — inherits all identifiers and cost basis
      db.animalBatch.create({
        data: {
          id: childId,
          farm_id: farmId,
          batch_number: childBatchNumber,
          animal_category_id: sourceBatch.animal_category_id,
          room_id: destination_room_id,
          current_stage_id: sourceBatch.current_stage_id,
          arrival_date: sourceBatch.arrival_date,
          quantity: quantity_to_move,
          // initial_quantity reflects animals transferred into this child batch
          initial_quantity: quantity_to_move,
          initial_weight: sourceBatch.initial_weight,
          average_weight: sourceBatch.average_weight,
          // cost_per_animal is IDENTICAL to the parent — no valuation change
          cost_per_animal: sourceBatch.cost_per_animal,
          expected_sale_date: sourceBatch.expected_sale_date,
          status: "ACTIVE",
          sync_status: "SYNCED",
          // MVP accounting flag — single source of truth via batchUtils.isSplitChildBatch()
          notes: `SPLIT_FROM:${id}`,
        },
      }),
    ]);

    // Log audit for both operations
    await logAuditEvent({
      userId: session.user.id,
      farmId,
      module: "BATCHES",
      action: "TRANSFER_PARTIAL",
      entityType: "AnimalBatch",
      entityId: id,
      beforeSnapshot: sourceBatch,
      afterSnapshot: updatedSource,
    });
    await logAuditEvent({
      userId: session.user.id,
      farmId,
      module: "BATCHES",
      action: "CREATE",
      entityType: "AnimalBatch",
      entityId: childId,
      beforeSnapshot: null,
      afterSnapshot: childBatch,
    });

    return NextResponse.json({
      success: true,
      type: "PARTIAL_TRANSFER",
      sourceBatch: updatedSource,
      childBatch,
    });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    console.error("Transfer error:", error);
    return NextResponse.json({ error: "Failed to transfer animals" }, { status: 500 });
  }
}
