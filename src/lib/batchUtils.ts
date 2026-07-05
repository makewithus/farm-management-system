/**
 * batchUtils.ts
 *
 * Shared utility functions for AnimalBatch business logic.
 * Centralises the "split child batch" detection so that cash-flow,
 * balance-sheet and accounting-dashboard exclusion logic lives in ONE
 * place and can later be replaced with a proper accounting-event model
 * without touching every report individually.
 */

/**
 * Returns true if this batch was created as a result of an animal transfer
 * (i.e. it is a "child" split batch and should NOT be counted as a fresh
 * cash purchase in cash-flow / balance-sheet calculations).
 *
 * Convention: the transfer endpoint stores "SPLIT_FROM:{parentId}" in the
 * batch notes field. This function is the single source of truth for that
 * check.
 */
export function isSplitChildBatch(batch: { notes?: string | null }): boolean {
  return typeof batch.notes === "string" && batch.notes.startsWith("SPLIT_FROM:");
}

/**
 * Extracts the parent batch ID from a split-child batch's notes field.
 * Returns null if the batch is not a split child.
 */
export function getParentBatchId(batch: { notes?: string | null }): string | null {
  if (!isSplitChildBatch(batch)) return null;
  return batch.notes!.replace("SPLIT_FROM:", "").trim() || null;
}
