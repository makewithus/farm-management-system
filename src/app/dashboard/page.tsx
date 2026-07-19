import { OverviewAnalytics } from "@/features/dashboard/components/OverviewAnalytics";
import { ArrowUpRight, ArrowDownRight, Droplets, Zap, Activity, Users, FileText, IndianRupee, Layers, ShieldPlus, Cloud, Sun, Leaf, TrendingUp, Package, Wallet, Sprout } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { GET as getAccountingDashboard } from "@/app/api/accounting/dashboard/route";
import { NextRequest } from "next/server";

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
  let animalsReadyForSale = 0;
  let animalsReadyForSlaughter = 0;
  
  let allTimeRevenue = 0;
  let totalExpenses = 0;
  let netProfit = 0;
  let totalReceivables = 0;
  let cashPosition = 0;
  
  let isOffline = false;
  let nextSaleSub = "Due within 14 days";
  let nextSlaughterSub = "Slaughter-ready batches";

  try {
    // Reuse accounting API for Cash Position
    const dummyReq = new NextRequest(new URL("http://localhost/api/accounting/dashboard"));
    const accRes = await getAccountingDashboard(dummyReq);
    if (accRes.status === 200) {
      const accJson = await accRes.json();
      cashPosition = accJson?.data?.metrics?.cashPosition || 0;
    }
  } catch (e) {
    console.error("Failed to fetch accounting API for cash position:", e);
  }

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
      db.vaccination.findMany({ where: { batch: { farm_id: farmId }, status: "PENDING", deleted_at: null }, include: { batch: { select: { animal_category_id: true } } } }),
      db.vaccination.findMany({ where: { batch: { farm_id: farmId }, deleted_at: null }, orderBy: { due_date: "asc" } }),
      db.mortality.findMany({ where: { batch: { farm_id: farmId }, deleted_at: null }, orderBy: { date: "asc" }, include: { batch: { select: { animal_category_id: true } } } }),
      db.animalCategory.findMany({ 
        where: { farm_id: farmId, deleted_at: null },
        include: { animal_batches: { where: { deleted_at: null, status: "ACTIVE" }, include: { room: true, current_stage: true, feedConsumptions: { orderBy: { date: "desc" }, take: 1, include: { feed_type: true } } } } }
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
      db.expense.aggregate({ _sum: { amount: true }, where: { farm_id: farmId, deleted_at: null, category: { not: "OPENING_BALANCE" } } }),
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
        select: { expected_sale_date: true, quantity: true },
        orderBy: { expected_sale_date: 'asc' }
      }),
      // Ready for Slaughter: batches with status SLAUGHTER_READY
      db.animalBatch.findMany({
        where: { farm_id: farmId, deleted_at: null, status: "SLAUGHTER_READY" },
        select: { updated_at: true, quantity: true },
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
    animalsReadyForSale = readyForSaleResult?.reduce((sum, b) => sum + (b.quantity || 0), 0) || 0;
    animalsReadyForSlaughter = readyForSlaughterResult?.reduce((sum, b) => sum + (b.quantity || 0), 0) || 0;
    
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
    { label: "Cash Position", value: `₹${cashPosition.toLocaleString(undefined, {minimumFractionDigits: 2})}`, sub: "Opening Cash + Cash Flow", icon: Wallet, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Receivables", value: `₹${totalReceivables.toLocaleString(undefined, {minimumFractionDigits: 2})}`, sub: "Outstanding", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const operationalMetrics = [
    { label: "Total Animals", value: totalAnimals.toLocaleString(), sub: "Across all categories", icon: Users, color: "text-brand-primary", bg: "bg-brand-primary/10" },
    { label: "Active Batches", value: totalBatches.toString(), sub: "Currently housed", icon: Layers, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Mortality Today", value: todayMortality.toString(), sub: `${todayMortalityRate}%`, icon: Activity, color: todayMortality > 0 ? "text-status-danger" : "text-emerald-500", bg: todayMortality > 0 ? "bg-status-danger/10" : "bg-emerald-50", trend: `${todayMortalityRate}%` },
    { label: "Overdue Vax", value: overdueVaccinationsCount.toString(), sub: "Action Required", icon: ShieldPlus, color: "text-status-danger", bg: "bg-status-danger/10" },
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

      {/* Dashboard Top Header (Weather & Ready Actions) */}
      <div className="relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between bg-white p-5 rounded-2xl border border-[#E3E4D6] shadow-[0_1px_3px_rgba(0,0,0,0.02)] mb-6 gap-4">
        {/* Subtle Farm UI Watermark */}
        <div className="absolute right-0 top-0 bottom-0 opacity-[0.025] pointer-events-none flex items-center justify-end pr-8 select-none">
          <Sprout className="w-40 h-40 text-[#2E3A1C]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#2E3A1C] rounded-xl p-2 flex items-center justify-center shadow-sm">
              <Sprout className="w-5 h-5 text-[#D7F200]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#2E3A1C] tracking-tight">
                Farm Overview
              </h1>
              <p className="text-xs text-gray-500 font-bold mt-0.5">Live metrics and operational data</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Ready for Sale */}
          <div className="flex items-center gap-3 bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-100 shadow-sm">
            <ArrowUpRight className="w-5 h-5 text-emerald-700 font-extrabold" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-emerald-950 leading-tight">{batchesReadyForSale} {batchesReadyForSale === 1 ? 'Batch' : 'Batches'} for Sale</p>
                {batchesReadyForSale > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>}
              </div>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">{animalsReadyForSale.toLocaleString()} Animals • {nextSaleSub}</p>
            </div>
          </div>
          {/* Ready for Slaughter */}
          <div className="flex items-center gap-3 bg-amber-50 py-2.5 px-4 rounded-xl border border-amber-100 shadow-sm">
            <ArrowDownRight className="w-5 h-5 text-amber-700 font-extrabold" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-amber-950 leading-tight">{batchesReadyForSlaughter} {batchesReadyForSlaughter === 1 ? 'Batch' : 'Batches'} for Slaughter</p>
                {batchesReadyForSlaughter > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>}
              </div>
              <p className="text-[10px] text-amber-700 font-bold mt-0.5">{animalsReadyForSlaughter.toLocaleString()} Animals • {nextSlaughterSub}</p>
            </div>
          </div>
          {/* Weather */}
          <div className="flex items-center gap-3 bg-[#FFFFFC] py-2.5 px-4 rounded-xl border border-[#E3E4D6] shadow-sm">
            <weatherMetric.icon className={`w-5 h-5 ${weatherMetric.color}`} />
            <div>
              <p className="text-xs font-black text-[#2E3A1C] leading-tight">{weatherMetric.value}</p>
              <p className="text-[10px] text-gray-500 font-bold mt-0.5">{weatherMetric.sub}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section: Clean Horizontal Grids */}
      <div className="space-y-6 mb-8">
        {/* Financials Row */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-3 bg-emerald-600 rounded-full"></div>
            <h3 className="text-[11px] font-black text-[#2E3A1C] uppercase tracking-wider">Financial Performance</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {financialMetrics.map((kpi, idx) => (
              <div key={`fin-${idx}`} className="bg-white border border-[#E3E4D6] rounded-xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#2E3A1C]/30 hover:shadow-sm transition-all duration-200 flex flex-col justify-between h-[92px] group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider truncate">{kpi.label}</span>
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:scale-105 transition-transform shrink-0">
                    <kpi.icon className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-base font-black text-[#2E3A1C] leading-none tracking-tight">{kpi.value}</p>
                  <p className="text-[9px] text-gray-400 font-bold mt-1.5 leading-none">{kpi.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operations Row */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-3 bg-[#2E3A1C] rounded-full"></div>
            <h3 className="text-[11px] font-black text-[#2E3A1C] uppercase tracking-wider">Operations & Livestock</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {operationalMetrics.map((kpi, idx) => (
              <div key={`ops-${idx}`} className="bg-white border border-[#E3E4D6] rounded-xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#2E3A1C]/30 hover:shadow-sm transition-all duration-200 flex flex-col justify-between h-[92px] group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider truncate">{kpi.label}</span>
                  <div className="p-1.5 rounded-lg bg-[#2E3A1C]/5 text-[#2E3A1C] border border-[#2E3A1C]/10 group-hover:scale-105 transition-transform shrink-0">
                    <kpi.icon className="w-3.5 h-3.5 text-[#2E3A1C]" />
                  </div>
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <div>
                    <p className="text-base font-black text-[#2E3A1C] leading-none tracking-tight">{kpi.value}</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1.5 leading-none">{kpi.sub}</p>
                  </div>
                  {kpi.trend && (
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">{kpi.trend}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Row */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-3 bg-blue-600 rounded-full"></div>
            <h3 className="text-[11px] font-black text-[#2E3A1C] uppercase tracking-wider">Resources & Consumption</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {resourceMetrics.map((kpi, idx) => (
              <div key={`res-${idx}`} className="bg-white border border-[#E3E4D6] rounded-xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#2E3A1C]/30 hover:shadow-sm transition-all duration-200 flex flex-col justify-between h-[92px] group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider truncate">{kpi.label}</span>
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-100 group-hover:scale-105 transition-transform shrink-0">
                    <kpi.icon className="w-3.5 h-3.5 text-blue-700" />
                  </div>
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <div>
                    <p className="text-base font-black text-[#2E3A1C] leading-none tracking-tight">{kpi.value}</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1.5 leading-none">{kpi.sub}</p>
                  </div>
                  {kpi.trend && (
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">{kpi.trend}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Row */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-3 bg-purple-600 rounded-full"></div>
            <h3 className="text-[11px] font-black text-[#2E3A1C] uppercase tracking-wider">Processing & Inventory</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {processingMetrics.map((kpi, idx) => (
              <div key={`proc-${idx}`} className="bg-white border border-[#E3E4D6] rounded-xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#2E3A1C]/30 hover:shadow-sm transition-all duration-200 flex flex-col justify-between h-[92px] group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider truncate">{kpi.label}</span>
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-100 group-hover:scale-105 transition-transform shrink-0">
                    <kpi.icon className="w-3.5 h-3.5 text-purple-700" />
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-base font-black text-[#2E3A1C] leading-none tracking-tight">{kpi.value}</p>
                  <p className="text-[9px] text-gray-400 font-bold mt-1.5 leading-none">{kpi.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Animals */}
        <div className="xl:col-span-2 space-y-6">
          {/* Animals Inventory */}
          <div className="bg-white rounded-2xl border border-[#DCE0CC] shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-extrabold text-[#2E3A1C] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2E3A1C]" /> Animals Inventory
              </h2>
              <div className="flex items-center gap-2">
                <button className="text-xs font-bold text-[#2E3A1C] hover:bg-[#2E3A1C]/10 bg-white border border-[#DCE0CC] px-3 py-1.5 rounded-xl transition-all cursor-pointer">
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
                  const stages = [...new Set(cat.animal_batches.map((b: any) => b.current_stage?.stage_name).filter(Boolean))];
                  const feedPlans = [...new Set(cat.animal_batches.map((b: any) => b.feedConsumptions?.[0]?.feed_type?.name).filter(Boolean))];
                  const feedPlanStatus = feedPlans.length > 0 ? feedPlans.join(", ") : "Not Available";
                  
                  const catVaccinations = pendingVaccinations.filter((v: any) => v.batch?.animal_category_id === cat.id);
                  const overdueCount = catVaccinations.filter((v: any) => new Date(v.due_date) < now).length;
                  const vaxStatus = catVaccinations.length === 0 ? "All Up to Date" : `${catVaccinations.length} Pending${overdueCount > 0 ? ` (${overdueCount} Overdue)` : ''}`;
                  
                  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  const recentMorts = allMortalities.filter((m: any) => m.batch?.animal_category_id === cat.id && new Date(m.date) >= sevenDaysAgo);
                  const healthNotes = recentMorts.length > 0 ? `${recentMorts.length} Recent Mortalities` : "No Active Alerts";
                  return (
                    <div key={cat.id} className="relative group border border-[#DCE0CC] rounded-xl p-5 hover:border-[#2E3A1C]/50 transition-all bg-[#FDFDFB] shadow-sm hover:shadow-md">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#F4F5ED] border border-[#DCE0CC] flex items-center justify-center text-lg shadow-inner">
                            🐾
                          </div>
                          <span className="font-extrabold text-[#2E3A1C]">{cat.name}</span>
                        </div>
                        <span className="text-xl font-black text-[#2E3A1C]">{total.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-500">
                        <span className="flex items-center gap-1 bg-[#2E3A1C]/5 px-2 py-0.5 rounded-md text-[#2E3A1C] text-[10px]">
                          {cat.animal_batches.length} Batches
                        </span>
                        <span className="flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-md text-red-700 text-[10px]">
                          {cat.mortality_percentage}% Max Mort.
                        </span>
                      </div>
                      {/* Hover popup — only data already in scope */}
                      <div className="absolute bottom-full left-0 mb-2 z-20 w-64 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none">
                        <p className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-2">Category Summary</p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Type</span><span className="font-medium text-right truncate">{cat.name}</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Stage</span><span className="font-medium text-right truncate">{stages.length > 0 ? stages.join(", ") : "—"}</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Avg Weight</span><span className="font-medium text-right truncate">{avgWeight} kg</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Assigned Room</span><span className="font-medium text-right truncate">{rooms.length > 0 ? rooms.join(", ") : "—"}</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Vaccinations</span><span className={`font-medium text-right truncate ${catVaccinations.length === 0 ? 'text-emerald-400' : overdueCount > 0 ? 'text-red-400' : 'text-amber-400'}`}>{vaxStatus}</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Health Notes</span><span className={`font-medium text-right truncate ${recentMorts.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{healthNotes}</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Feed Plan</span><span className={`font-medium text-right truncate ${feedPlans.length > 0 ? 'text-gray-200' : 'text-gray-500 italic'}`}>{feedPlanStatus}</span></div>
                          <div className="flex justify-between gap-2"><span className="text-gray-400 shrink-0">Risk Index</span><span className="font-medium text-right truncate">{cat.mortality_percentage}% Max Mort.</span></div>
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
          <div className="bg-white rounded-2xl border border-[#DCE0CC] shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-extrabold text-[#2E3A1C]">Overview Analytics</h2>
              <button className="text-xs font-bold text-[#2E3A1C] hover:bg-[#2E3A1C]/10 bg-white border border-[#DCE0CC] px-3 py-1.5 rounded-xl transition-all cursor-pointer">
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
          <div className="bg-white rounded-2xl border border-[#DCE0CC] shadow-sm p-5 h-full">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-extrabold text-[#2E3A1C] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#2E3A1C]" /> Live Report
              </h2>
            </div>
            
            <div className="bg-[#2E3A1C] rounded-2xl p-6 text-white mb-6 shadow-sm border border-[#2E3A1C]">
              <p className="!text-[#FFFFFC]/80 uppercase tracking-widest text-[9px] font-bold">Total System Capacity</p>
              <div className="flex items-end gap-3 mb-3">
                <h3 className="text-5xl font-black !text-[#D7F200] tracking-tight">{totalAnimals.toLocaleString()}</h3>
                <span className="text-[10px] font-bold bg-white/15 !text-[#FFFFFC] px-2.5 py-0.5 rounded-md mb-1.5 border border-white/10">Active</span>
              </div>
              <div className="w-full bg-[#FFFFFC]/10 h-1.5 rounded-full overflow-hidden mb-4 border border-[#FFFFFC]/5">
                <div className="bg-[#D7F200] h-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-[#FFFFFC]/10 pt-4 font-bold">
                <span className="!text-[#FFFFFC]/80">Mortality Rate</span>
                <span className="!text-[#D7F200]">{totalAnimals > 0 ? ((totalMortality / totalAnimals) * 100).toFixed(1) : '0.0'}%</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold !text-[#2E3A1C]/75 uppercase tracking-widest border-b border-[#E3E4D6] pb-2">Upcoming Tasks</h4>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600 shadow-inner">
                    <ShieldPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2E3A1C]">Overdue Vaccinations</p>
                    <p className="text-[10px] text-red-800/80 mt-0.5 font-semibold">Requires immediate action</p>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-red-700 bg-red-100 px-2.5 py-1 rounded-md">{overdueVaccinationsCount}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-amber-100 bg-amber-50/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shadow-inner">
                    <ShieldPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2E3A1C]">Pending Vaccinations</p>
                    <p className="text-[10px] text-amber-800/80 mt-0.5 font-semibold">Upcoming schedule</p>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-[#2E3A1C] bg-amber-100 px-2.5 py-1 rounded-md">{upcomingVaccinationsCount}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold !text-[#2E3A1C]/75 uppercase tracking-widest border-b border-[#E3E4D6] pb-2">Recent Activity</h4>
              
              <div className="relative border-l border-[#E3E4D6] ml-3.5 pl-5 space-y-5 py-2">
                {auditLogs.length === 0 ? (
                  <div className="text-sm text-gray-500 py-2 font-semibold">No recent activity</div>
                ) : (
                  auditLogs.map((log) => (
                    <div key={log.id} className="relative text-xs">
                      {/* Timeline node */}
                      <div className={`absolute -left-[25.5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        log.action === 'CREATE' ? 'bg-emerald-500' :
                        log.action === 'UPDATE' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`} />
                      <p className="font-bold text-[#2E3A1C] leading-tight">
                        {log.user?.name || "System"} <span className="text-[#2E3A1C]/60 font-semibold">{log.action.toLowerCase()}d</span> <span className="font-extrabold text-[#2E3A1C]/85">{log.entity}</span>
                      </p>
                      <p className="text-[10px] text-[#2E3A1C]/50 font-bold mt-0.5">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(log.timestamp).toLocaleDateString()}
                      </p>
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
