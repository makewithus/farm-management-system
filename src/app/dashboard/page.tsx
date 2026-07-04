import { OverviewAnalytics } from "@/features/dashboard/components/OverviewAnalytics";
import { ArrowUpRight, ArrowDownRight, Droplets, Zap, Activity, Users, FileText, IndianRupee, Layers, ShieldPlus, Cloud, Sun, Leaf, TrendingUp, Package } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  const farmId = session?.user?.farm_id;
  
  if (!farmId) {
    return <div className="p-6">Error: User is not assigned to a farm.</div>;
  }

  // Fetch Real Phase 1 Data
  let totalBatches = 0;
  let animalSum: { _sum: { quantity: number | null } } = { _sum: { quantity: 0 } };
  let mortalities: { _sum: { quantity: number | null } } = { _sum: { quantity: 0 } };
  let pendingVaccinations: any[] = [];
  let allVaccinations: any[] = [];
  let allMortalities: any[] = [];
  let categories: any[] = [];
  let auditLogs: any[] = [];
  let feedTypes: any[] = [];
  let todayFeedConsumption = 0;
  let todayRevenue = 0;
  let monthlyRevenue = 0;
  let pendingPayments = 0;
  let paidInvoicesCount = 0;
  let todayWaterUsage = 0;
  let todayElectricityUsage = 0;
  let totalInventoryCount = 0;
  let totalInventoryQty = 0;
  let slaughteredToday = 0;
  let avgYield = 0;
  let batchesReadyForSale = 0;
  let batchesReadyForSlaughter = 0;
  
  let allTimeRevenue = 0;
  let totalExpenses = 0;
  let netProfit = 0;
  let totalReceivables = 0;
  
  let isOffline = false;
  let nextSaleSub = "Due within 14 days";
  let nextSlaughterSub = "Slaughter-ready batches";

  try {
    const [
      tb, as, m, pv, av, am, c, logs, fTypes, fConsum,
      salesList,
      waterUsageResult,
      elecUsageResult,
      invCountResult,
      invQtyResult,
      slaughterTotalResult,
      slaughterYieldResult,
      expenseAggResult,
      feedAggResult,
      waterAggResult,
      elecAggResult,
      paymentAggResult,
      readyForSaleResult,
      readyForSlaughterResult,
    ] = await Promise.all([
      db.animalBatch.count({ where: { farm_id: farmId, deleted_at: null, status: "ACTIVE" } }),
      db.animalBatch.aggregate({ _sum: { quantity: true }, where: { farm_id: farmId, deleted_at: null, status: "ACTIVE" } }),
      db.mortality.aggregate({ _sum: { quantity: true }, where: { batch: { farm_id: farmId }, deleted_at: null } }),
      db.vaccination.findMany({ where: { batch: { farm_id: farmId }, status: "PENDING", deleted_at: null } }),
      db.vaccination.findMany({ where: { batch: { farm_id: farmId }, deleted_at: null }, orderBy: { due_date: "asc" } }),
      db.mortality.findMany({ where: { batch: { farm_id: farmId }, deleted_at: null }, orderBy: { date: "asc" } }),
      db.animalCategory.findMany({ 
        where: { farm_id: farmId, deleted_at: null },
        include: { animal_batches: { where: { deleted_at: null, status: "ACTIVE" } } }
      }),
      db.auditLog.findMany({
        where: { farm_id: farmId },
        orderBy: { timestamp: "desc" },
        take: 5,
        include: { user: { select: { name: true } } }
      }),
      db.feedType.findMany({
        where: { farm_id: farmId, deleted_at: null }
      }),
      db.feedConsumption.aggregate({
        _sum: { quantity_kg: true },
        where: { 
          farm_id: farmId, 
          deleted_at: null, 
          date: { gte: new Date(new Date().setHours(0,0,0,0)) } 
        }
      }),
      db.salesInvoice.findMany({
        where: { farm_id: farmId, deleted_at: null }
      }),
      db.waterUsage.aggregate({
        _sum: { actual_consumption_liters: true },
        where: { farm_id: farmId, deleted_at: null, date: { gte: new Date(new Date().setHours(0,0,0,0)) } }
      }),
      db.electricityUsage.aggregate({
        _sum: { units_consumed: true },
        where: { farm_id: farmId, deleted_at: null, date: { gte: new Date(new Date().setHours(0,0,0,0)) } }
      }),
      db.inventoryItem.count({ where: { farm_id: farmId, deleted_at: null } }),
      db.inventoryItem.aggregate({ _sum: { quantity: true }, where: { farm_id: farmId, deleted_at: null } }),
      db.slaughterRecord.aggregate({ _sum: { quantity_slaughtered: true }, where: { farm_id: farmId, deleted_at: null, slaughter_date: { gte: new Date(new Date().setHours(0,0,0,0)) } } }),
      db.slaughterYield.aggregate({ _avg: { yield_percentage: true }, where: { slaughter_record: { farm_id: farmId, deleted_at: null } } }),
      
      // Phase 5: Accounting Engine
      db.expense.aggregate({ _sum: { amount: true }, where: { farm_id: farmId, deleted_at: null } }),
      db.feedConsumption.aggregate({ _sum: { cost: true }, where: { farm_id: farmId, deleted_at: null } }),
      db.waterUsage.aggregate({ _sum: { total_cost: true }, where: { farm_id: farmId, deleted_at: null } }),
      db.electricityUsage.aggregate({ _sum: { total_cost: true }, where: { farm_id: farmId, deleted_at: null } }),
      db.customerPayment.aggregate({ _sum: { amount: true }, where: { farm_id: farmId, deleted_at: null } }),
      // Ready for Sale: ACTIVE batches with expected_sale_date within next 14 days
      db.animalBatch.findMany({
        where: {
          farm_id: farmId, deleted_at: null, status: "ACTIVE",
          expected_sale_date: { lte: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
        },
        select: { expected_sale_date: true },
        orderBy: { expected_sale_date: 'asc' }
      }),
      // Ready for Slaughter: batches with status SLAUGHTER_READY
      db.animalBatch.findMany({
        where: { farm_id: farmId, deleted_at: null, status: "SLAUGHTER_READY" },
        select: { updated_at: true },
        orderBy: { updated_at: 'asc' }
      }),
    ]);
    totalBatches = tb;
    animalSum = as as any;
    mortalities = m as any;
    pendingVaccinations = pv;
    allVaccinations = av;
    allMortalities = am;
    categories = c;
    auditLogs = logs;
    feedTypes = fTypes as any;
    todayFeedConsumption = (fConsum as any)?._sum?.quantity_kg || 0;
    
    todayWaterUsage = waterUsageResult?._sum?.actual_consumption_liters || 0;
    todayElectricityUsage = elecUsageResult?._sum?.units_consumed || 0;
    
    totalInventoryCount = invCountResult || 0;
    totalInventoryQty = invQtyResult?._sum?.quantity || 0;
    slaughteredToday = slaughterTotalResult?._sum?.quantity_slaughtered || 0;
    avgYield = slaughterYieldResult?._avg?.yield_percentage || 0;
    batchesReadyForSale = readyForSaleResult?.length || 0;
    batchesReadyForSlaughter = readyForSlaughterResult?.length || 0;
    
    if (readyForSaleResult && readyForSaleResult.length > 0 && readyForSaleResult[0].expected_sale_date) {
      const diffDays = Math.ceil((new Date(readyForSaleResult[0].expected_sale_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) nextSaleSub = "Overdue";
      else if (diffDays === 0) nextSaleSub = "Due: Today";
      else nextSaleSub = `Next Due: In ${diffDays} days`;
    }

    if (readyForSlaughterResult && readyForSlaughterResult.length > 0 && readyForSlaughterResult[0].updated_at) {
      const diffDays = Math.floor((new Date().getTime() - new Date(readyForSlaughterResult[0].updated_at).getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) nextSlaughterSub = "Ready since: Today";
      else nextSlaughterSub = `Ready since: ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
    }

    const sales = salesList as any[];
    const startOfToday = new Date(); startOfToday.setHours(0,0,0,0);
    const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);
    
    sales.forEach(inv => {
      allTimeRevenue += inv.total;
      if (new Date(inv.invoice_date) >= startOfToday) todayRevenue += inv.total;
      if (new Date(inv.invoice_date) >= startOfMonth) monthlyRevenue += inv.total;
      if (inv.payment_status === "PENDING" || inv.payment_status === "PARTIAL") pendingPayments += inv.total;
      if (inv.payment_status === "PAID") paidInvoicesCount++;
    });

    const manualExp = expenseAggResult?._sum?.amount || 0;
    const feedExp = feedAggResult?._sum?.cost || 0;
    const waterExp = waterAggResult?._sum?.total_cost || 0;
    const elecExp = elecAggResult?._sum?.total_cost || 0;
    const totalPayments = paymentAggResult?._sum?.amount || 0;

    totalExpenses = manualExp + feedExp + waterExp + elecExp;
    netProfit = allTimeRevenue - totalExpenses;
    totalReceivables = allTimeRevenue - totalPayments;

  } catch (err) {
    console.error("Database connection error (Offline Mode):", err);
    isOffline = true;
  }

  const totalAnimals = animalSum._sum.quantity || 0;
  const totalMortality = mortalities._sum.quantity || 0;
  
  const now = new Date();
  const overdueVaccinationsCount = pendingVaccinations.filter(v => new Date(v.due_date) < now).length;
  const upcomingVaccinationsCount = pendingVaccinations.length - overdueVaccinationsCount;

  let currentFeedStock = 0;
  let lowStockCount = 0;
  feedTypes.forEach(f => {
    currentFeedStock += f.stock_quantity;
    if (f.stock_quantity <= f.reorder_level) lowStockCount++;
  });

  const startOfTodayForMortality = new Date(); 
  startOfTodayForMortality.setHours(0,0,0,0);
  const todayMortality = allMortalities.reduce((sum, m) => {
    return new Date(m.date) >= startOfTodayForMortality ? sum + m.quantity : sum;
  }, 0);
  const todayMortalityRate = totalAnimals > 0 ? ((todayMortality / totalAnimals) * 100).toFixed(1) : "0.0";

  let weatherTemp = 27;
  try {
    const weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true", { next: { revalidate: 3600 } });
    if (weatherRes.ok) {
      const weatherData = await weatherRes.json();
      if (weatherData?.current_weather) {
        weatherTemp = Math.round(weatherData.current_weather.temperature);
      }
    }
  } catch (e) {
    // Silently fallback if offline
  }

  const currentDateStr = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  const weatherMetric = { label: "Weather", value: `${weatherTemp}°C`, sub: currentDateStr, icon: Sun, color: "text-amber-500", bg: "bg-amber-50" };

  const financialMetrics = [
    { label: "Total Revenue", value: `₹${allTimeRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`, sub: `Today: ₹${todayRevenue.toLocaleString()}`, icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Expenses", value: `₹${totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2})}`, sub: "All time", icon: TrendingUp, color: "text-status-danger", bg: "bg-status-danger/10" },
    { label: "Net Profit", value: `₹${netProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}`, sub: "Overall", icon: Activity, color: netProfit >= 0 ? "text-emerald-500" : "text-status-danger", bg: netProfit >= 0 ? "bg-emerald-50" : "bg-status-danger/10" },
    { label: "Receivables", value: `₹${totalReceivables.toLocaleString(undefined, {minimumFractionDigits: 2})}`, sub: "Outstanding", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const operationalMetrics = [
    { label: "Total Animals", value: totalAnimals.toLocaleString(), sub: "Across all categories", icon: Users, color: "text-brand-primary", bg: "bg-brand-primary/10" },
    { label: "Active Batches", value: totalBatches.toString(), sub: "Currently housed", icon: Layers, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Mortality Today", value: todayMortality.toString(), sub: `${todayMortalityRate}%`, icon: Activity, color: todayMortality > 0 ? "text-status-danger" : "text-emerald-500", bg: todayMortality > 0 ? "bg-status-danger/10" : "bg-emerald-50", trend: `${todayMortalityRate}%` },
    { label: "Overdue Vax", value: overdueVaccinationsCount.toString(), sub: "Action Required", icon: ShieldPlus, color: "text-status-danger", bg: "bg-status-danger/10" },
    { label: "Ready for Sale", value: batchesReadyForSale.toString(), sub: nextSaleSub, icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Ready for Slaughter", value: batchesReadyForSlaughter.toString(), sub: nextSlaughterSub, icon: ArrowDownRight, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const resourceMetrics = [
    { label: "Today's Feed", value: `${todayFeedConsumption.toLocaleString()} kg`, sub: "Consumption", icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-50", trend: currentFeedStock > 0 ? "Stock OK" : "" },
    { label: "Feed Stock", value: `${currentFeedStock.toLocaleString()} kg`, sub: `${lowStockCount} items low`, icon: Package, color: lowStockCount > 0 ? "text-amber-500" : "text-emerald-500", bg: lowStockCount > 0 ? "bg-amber-50" : "bg-emerald-50" },
    { label: "Today's Water", value: `${todayWaterUsage.toLocaleString()} L`, sub: "Consumption", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Today's Power", value: `${todayElectricityUsage.toLocaleString()} kWh`, sub: "Electricity", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const processingMetrics = [
    { label: "Inventory Quantity", value: `${totalInventoryQty.toLocaleString()} kg`, sub: "Total meat stock", icon: Package, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Inventory Items", value: totalInventoryCount.toString(), sub: "Unique products", icon: Layers, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Processed Today", value: slaughteredToday.toLocaleString(), sub: "Animals slaughtered", icon: Activity, color: "text-status-danger", bg: "bg-status-danger/10" },
    { label: "Average Yield", value: `${avgYield.toFixed(1)}%`, sub: "Usable meat %", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {isOffline && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 flex items-center gap-3 shadow-sm">
          <Cloud className="w-6 h-6 text-amber-500" />
          <div>
            <p className="font-bold text-sm">Offline Mode Active</p>
            <p className="text-xs mt-0.5">We couldn't connect to the live database (Neon DB is sleeping or network is disconnected). Displaying default layout.</p>
          </div>
        </div>
      )}

      {/* Dashboard Top Header (Weather) */}
      <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Farm Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Live metrics and operational data</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 py-2.5 px-5 rounded-lg border border-gray-200">
          <weatherMetric.icon className={`w-5 h-5 ${weatherMetric.color}`} />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">{weatherMetric.value}</p>
            <p className="text-xs text-gray-500">{weatherMetric.sub}</p>
          </div>
        </div>
      </div>

      {/* Financials */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Financial Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {financialMetrics.map((kpi, idx) => (
            <div key={`fin-${idx}`} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${kpi.bg} group-hover:scale-110 transition-transform`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</p>
                  <p className="text-xl font-bold text-gray-900 leading-none">{kpi.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operations */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Operations & Livestock</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {operationalMetrics.map((kpi, idx) => (
            <div key={`ops-${idx}`} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${kpi.bg} group-hover:scale-110 transition-transform`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-gray-900 leading-none">{kpi.value}</p>
                    {kpi.trend && <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-600' : kpi.trend.startsWith('-') ? 'text-red-600' : 'text-gray-400'}`}>{kpi.trend}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Resources & Consumption</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resourceMetrics.map((kpi, idx) => (
            <div key={`res-${idx}`} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${kpi.bg} group-hover:scale-110 transition-transform`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-gray-900 leading-none">{kpi.value}</p>
                    {kpi.trend && <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-600' : kpi.trend.startsWith('-') ? 'text-red-600' : 'text-gray-400'}`}>{kpi.trend}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing & Inventory */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Processing & Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {processingMetrics.map((kpi, idx) => (
            <div key={`proc-${idx}`} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${kpi.bg} group-hover:scale-110 transition-transform`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-gray-900 leading-none">{kpi.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Animals */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-primary" /> Animals Inventory
              </h2>
              <div className="flex items-center gap-2">
                <button className="text-xs font-medium text-gray-600 hover:text-brand-primary bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                  Filter
                </button>
              </div>
            </div>
            
            {categories.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No categories created yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const total = cat.animal_batches.reduce((sum: number, b: any) => sum + b.quantity, 0);
                  const avgWeight = cat.animal_batches.length > 0
                    ? (cat.animal_batches.reduce((s: number, b: any) => s + (b.average_weight || 0), 0) / cat.animal_batches.length).toFixed(1)
                    : "—";
                  const rooms = [...new Set(cat.animal_batches.map((b: any) => b.room?.name).filter(Boolean))];
                  return (
                    <div key={cat.id} className="relative group border border-gray-200 rounded-xl p-5 hover:border-brand-primary/30 transition-colors bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-lg">
                            🐾
                          </div>
                          <span className="font-semibold text-gray-900">{cat.name}</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">{total.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-brand-primary"></div> {cat.animal_batches.length} Batches
                        </span>
                        <span className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div> {cat.mortality_percentage}% Max Mort.
                        </span>
                      </div>
                      {/* Hover popup — only data already in scope */}
                      <div className="absolute bottom-full left-0 mb-2 z-20 w-52 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none">
                        <p className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-2">Batch Summary</p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between"><span className="text-gray-400">Type</span><span className="font-medium">{cat.name}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400">Active Batches</span><span className="font-medium">{cat.animal_batches.length}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400">Total Animals</span><span className="font-medium">{total.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400">Avg Weight</span><span className="font-medium">{avgWeight} kg</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Rooms</span><span className="font-medium text-right truncate">{rooms.length > 0 ? rooms.join(", ") : "—"}</span></div>
                        </div>
                        <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Analytics Widgets */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Overview Analytics</h2>
              <button className="text-xs font-medium text-gray-600 hover:text-brand-primary bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                Show More
              </button>
            </div>
            <OverviewAnalytics 
              categories={categories}
              mortalities={allMortalities}
              vaccinations={allVaccinations}
            />
          </div>
        </div>

        {/* Right Column: Live Report & Activity Feed */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 h-full">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-primary" /> Live Report
              </h2>
            </div>
            
            <div className="bg-brand-primary rounded-xl p-6 text-white mb-6 shadow-sm">
              <p className="text-white/90 text-sm font-medium mb-2">Total System Capacity</p>
              <div className="flex items-end gap-3 mb-5">
                <h3 className="text-4xl font-bold tracking-tight">{totalAnimals.toLocaleString()}</h3>
                <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full mb-1">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-white/20 pt-4 font-medium">
                <span>Mortality Rate</span>
                <span>{totalAnimals > 0 ? ((totalMortality / totalAnimals) * 100).toFixed(1) : '0.0'}%</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Upcoming Tasks</h4>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600">
                    <ShieldPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Overdue Vaccinations</p>
                    <p className="text-xs text-gray-500 mt-0.5">Requires immediate action</p>
                  </div>
                </div>
                <span className="font-bold text-red-600">{overdueVaccinationsCount}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <ShieldPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Pending Vaccinations</p>
                    <p className="text-xs text-gray-500 mt-0.5">Upcoming schedule</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">{upcomingVaccinationsCount}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Recent Activity</h4>
              
              <div className="space-y-3">
                {auditLogs.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-6">No recent activity</div>
                ) : (
                  auditLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-600' :
                        log.action === 'UPDATE' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          {log.user?.name || "User"} {log.action.toLowerCase()}d {log.entity}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 font-medium">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
