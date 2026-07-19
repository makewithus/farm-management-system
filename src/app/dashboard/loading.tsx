export default function DashboardLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
      {/* Header Banner Skeleton */}
      <div className="bg-white border border-[#E3E4D6] rounded-xl p-6 flex flex-col justify-between h-28">
        <div className="h-3 bg-[#2E3A1C]/10 rounded w-28"></div>
        <div className="h-6 bg-[#2E3A1C]/15 rounded w-64"></div>
      </div>

      {/* Financial Metrics Row Skeleton */}
      <div className="space-y-3">
        <div className="h-3 bg-[#2E3A1C]/15 rounded w-32"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-[#E3E4D6] rounded-xl p-5 h-28 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="h-3 bg-[#2E3A1C]/10 rounded w-24"></div>
                <div className="w-7 h-7 bg-[#2E3A1C]/5 rounded-lg"></div>
              </div>
              <div className="h-7 bg-[#2E3A1C]/15 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Metrics Row Skeleton */}
      <div className="space-y-3 pt-2">
        <div className="h-3 bg-[#2E3A1C]/15 rounded w-40"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-[#E3E4D6] rounded-xl p-5 h-28 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="h-3 bg-[#2E3A1C]/10 rounded w-24"></div>
                <div className="w-7 h-7 bg-[#2E3A1C]/5 rounded-lg"></div>
              </div>
              <div className="h-7 bg-[#2E3A1C]/15 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
