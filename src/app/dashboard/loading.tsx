import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#FFFFFC] border border-[#E3E4D6] flex items-center justify-center shadow-sm">
        <Loader2 className="w-6 h-6 text-[#2E3A1C] animate-spin" />
      </div>
      <p className="text-xs font-bold text-[#2E3A1C]/70 tracking-tight">Loading operational data...</p>
    </div>
  );
}
