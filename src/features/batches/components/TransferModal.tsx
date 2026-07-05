"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowRightLeft, X, AlertCircle } from "lucide-react";

interface TransferModalProps {
  batch: {
    id: string;
    batch_number: string;
    quantity: number;
    room_id: string;
    current_stage_id: string;
    room?: { name: string };
  };
  onClose: () => void;
  onSuccess: () => void;
}

export function TransferModal({ batch, onClose, onSuccess }: TransferModalProps) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [destinationRoomId, setDestinationRoomId] = useState("");
  const [quantityToMove, setQuantityToMove] = useState<number | "">(1);
  const [isFullTransfer, setIsFullTransfer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync full-transfer checkbox with quantity input
  useEffect(() => {
    if (isFullTransfer) setQuantityToMove(batch.quantity);
  }, [isFullTransfer, batch.quantity]);

  useEffect(() => {
    if (quantityToMove === batch.quantity) setIsFullTransfer(true);
    else setIsFullTransfer(false);
  }, [quantityToMove, batch.quantity]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        if (res.ok) {
          const json = await res.json();
          // Filter out the current room
          const available = (json.data || json || []).filter(
            (r: any) => r.id !== batch.room_id && r.active_status !== false
          );
          setRooms(available);
        }
      } catch (e) {
        toast.error("Failed to load rooms");
      }
    };
    loadRooms();
  }, [batch.room_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!destinationRoomId) {
      setError("Please select a destination room.");
      return;
    }
    const parsedQty = typeof quantityToMove === 'number' ? quantityToMove : 0;
    if (parsedQty < 1 || parsedQty > batch.quantity) {
      setError(`Enter a number between 1 and ${batch.quantity}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const { animalBatchRepository } = await import("@/lib/offline/repositories/animalBatchRepository");
      
      const payload = {
        quantity_to_move: parsedQty,
        destination_room_id: destinationRoomId,
      };
      
      const result = await animalBatchRepository.transfer(batch.id, payload, batch);

      if (result.offline) {
        toast.success("Transfer saved offline. It will sync automatically when internet is available.");
      } else {
        if (result.type === "FULL_TRANSFER") {
          toast.success(`All ${batch.quantity} animals moved successfully.`);
        } else {
          toast.success(
            `${quantityToMove} animals transferred. Batch split into ${result.childBatch?.batch_number}.`
          );
        }
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.error || err.message || "Transfer failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const destQty = isFullTransfer ? batch.quantity : (typeof quantityToMove === 'number' ? quantityToMove : 0);
  const remainingQty = batch.quantity - destQty;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArrowRightLeft className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Transfer Animals</h2>
              <p className="text-xs text-gray-500">{batch.batch_number} · {batch.room?.name ?? "Current Room"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Destination Room */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Destination Room
            </label>
            <select
              value={destinationRoomId}
              onChange={(e) => setDestinationRoomId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Select a room…</option>
              {rooms.map((r) => {
                const current = r.current_occupancy || 0;
                const isFull = current >= r.capacity;
                return (
                  <option key={r.id} value={r.id} disabled={isFull}>
                    {r.name} · Occupied: {current} / {r.capacity} {isFull ? '(FULL)' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Animals to Transfer */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Animals to Transfer
              <span className="ml-2 text-xs font-normal text-gray-400">(max {batch.quantity})</span>
            </label>
            <input
              type="number"
              min={1}
              max={batch.quantity}
              value={quantityToMove}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  setQuantityToMove('');
                  return;
                }
                const v = parseInt(val, 10);
                if (!isNaN(v)) setQuantityToMove(Math.min(v, batch.quantity));
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isFullTransfer}
            />
          </div>

          {/* Transfer Entire Batch checkbox */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isFullTransfer}
              onChange={(e) => setIsFullTransfer(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Transfer entire batch ({batch.quantity} animals)</span>
          </label>

          {/* Preview */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Preview</p>
            {isFullTransfer ? (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium">{batch.batch_number}</span>
                <ArrowRightLeft className="w-3 h-3 text-gray-400" />
                <span className="text-blue-600 font-medium">{destinationRoomId ? rooms.find(r => r.id === destinationRoomId)?.name ?? "Room" : "Destination"}</span>
                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Full Move</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{batch.batch_number} remains</span>
                  <span className="font-semibold text-gray-900">{remainingQty} animals</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">New batch in {destinationRoomId ? rooms.find(r => r.id === destinationRoomId)?.name ?? "room" : "destination"}</span>
                  <span className="font-semibold text-blue-600">{destQty} animals</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-xs text-gray-400">
                  <span>Total</span>
                  <span>{batch.quantity} animals (unchanged)</span>
                </div>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !destinationRoomId}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowRightLeft className="w-4 h-4" />
              )}
              {isSubmitting ? "Transferring…" : "Transfer Animals"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
