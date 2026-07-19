import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { 
  Sprout, 
  ArrowRight, 
  CheckCircle2, 
  LayoutDashboard, 
  Shield, 
  Smartphone, 
  Zap, 
  Activity, 
  Users, 
  ShoppingCart, 
  Leaf, 
  ChevronRight,
  CloudSun,
  Droplets,
  AlertCircle,
  TrendingUp,
  ChevronDown
} from "lucide-react";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F7F8F3] text-[#2E3A1C] font-sans antialiased">
      {/* Floating Capsule Navigation Bar */}
      <nav className="fixed top-5 inset-x-0 z-50 max-w-7xl mx-auto w-[92%] bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl shadow-sm">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#2E3A1C] flex items-center justify-center w-9 h-9 rounded-lg">
              <Sprout className="w-5 h-5 text-[#D7F200]" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#2E3A1C]">Harvesta</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-sm text-[#2E3A1C]/80">
            <a href="#features" className="hover:text-[#2E3A1C] transition-colors relative py-2">
              Features
            </a>
            <a href="#solutions" className="hover:text-[#2E3A1C] transition-colors relative py-2">
              Solutions
            </a>
            <a href="#pricing" className="hover:text-[#2E3A1C] transition-colors relative py-2">
              Pricing
            </a>
            <a href="#pwa" className="hover:text-[#2E3A1C] transition-colors relative py-2">
              App
            </a>
            <a href="#resources" className="hover:text-[#2E3A1C] transition-colors relative py-2">
              Resources
            </a>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 bg-[#2E3A1C] hover:bg-[#3f4f26] text-[#FFFFFC] px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Dashboard <ArrowRight className="w-3.5 h-3.5 text-[#D7F200]" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block text-[#2E3A1C]/80 hover:text-[#2E3A1C] text-xs font-bold transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Premium Agriculture Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-36 overflow-hidden bg-[#F7F8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-[#EDF0C2] border border-[#E3E4D6] text-[#2E3A1C] font-bold text-xs mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#FFB955]"></span>
            Discover the new standard in farm management <ChevronRight className="w-3.5 h-3.5 text-[#2E3A1C]/60" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight text-[#2E3A1C] leading-[1.05] max-w-4xl mx-auto font-sans">
            The operating system <br />
            for modern agriculture
          </h1>
          
          <p className="mt-8 max-w-3xl text-base sm:text-lg md:text-xl text-[#2E3A1C]/75 mx-auto mb-14 leading-relaxed font-semibold">
            Harvesta unifies livestock management, feed consumption, and real-time financial tracking in a single, offline-first platform designed for commercial scale operations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!session ? (
              <Link 
                href="/signup" 
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-8 py-3.5 rounded-xl text-sm font-extrabold transition-all"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-8 py-3.5 rounded-xl text-sm font-extrabold transition-all"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <a 
              href="#features" 
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#FFFFFC] hover:bg-[#F7F8F3] text-[#2E3A1C] border border-[#E3E4D6] px-8 py-3.5 rounded-xl text-sm font-bold transition-all"
            >
              Explore Features
            </a>
          </div>

          {/* Interactive HTML/CSS Dashboard Showcase mimicking Harvesta design */}
          <div className="relative max-w-6xl mx-auto mt-24 px-2 md:px-0">
            
            {/* Overlapping Floating Card 1: Alert Card (Bottom Left) */}
            <div className="absolute -left-10 bottom-12 z-20 bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-xl shadow-sm max-w-[260px] text-left hidden xl:block">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FFB955]/10 flex items-center justify-center text-[#2E3A1C] shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#FFB955]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#2E3A1C]/50 font-bold uppercase tracking-wider">Feed Alert</p>
                  <h4 className="text-sm font-bold text-[#2E3A1C] mt-0.5">Silo B Inventory Low</h4>
                  <p className="text-xs text-[#2E3A1C]/70 mt-1 leading-normal">Remaining: 1.2 Tons (12%). Automated supplier reorder dispatched.</p>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Card 2: Farmer Insights (Right Side) */}
            <div className="absolute -right-8 top-[12%] z-20 bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-xl shadow-sm max-w-[280px] text-left hidden xl:block">
              <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-4 bg-[#EDF0C2]/30">
                <Image 
                  src="/farm-aerial.png" 
                  alt="Farm aerial analysis"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#EDF0C2] text-[#2E3A1C] text-[9px] font-bold px-2 py-0.5 rounded">
                  Optimal Area
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EDF0C2] flex items-center justify-center text-[#2E3A1C] shrink-0">
                  <CloudSun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2E3A1C]">Weather Insight</h4>
                  <p className="text-xs text-[#2E3A1C]/80 mt-1 leading-relaxed">
                    "The conditions are ideal for starting grazing rotation in Room 04 today."
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Link href="/dashboard" className="bg-[#2E3A1C] hover:bg-[#3f4f26] text-[#FFFFFC] text-[10px] font-bold px-3.5 py-1.5 rounded-lg transition-colors">
                      Rotate Now
                    </Link>
                    <button className="text-[10px] text-[#2E3A1C]/60 hover:text-[#2E3A1C] font-bold px-2">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Interactive Mockup Dashboard Panel */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[550px] relative z-10 w-full">
              
              {/* Mockup Left Sidebar */}
              <div className="w-56 bg-[#F7F8F3] border-r border-[#E3E4D6] p-6 hidden md:flex flex-col justify-between shrink-0 text-left">
                <div className="space-y-8">
                  {/* Brand */}
                  <div className="flex items-center gap-2 px-2">
                    <Sprout className="w-5 h-5 text-[#2E3A1C]" />
                    <span className="font-bold text-sm tracking-tight text-[#2E3A1C]">Harvesta</span>
                  </div>
                  
                  {/* Nav Links */}
                  <div className="space-y-1">
                    {[
                      { label: "Dashboard", active: true, icon: LayoutDashboard },
                      { label: "Animals", active: false, icon: Activity },
                      { label: "Feed", active: false, icon: Leaf },
                      { label: "Sales", active: false, icon: ShoppingCart },
                      { label: "CRM", active: false, icon: Users },
                      { label: "Reports", active: false, icon: Shield },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                          item.active 
                            ? "bg-[#2E3A1C] text-[#FFFFFC]" 
                            : "text-[#2E3A1C]/70 hover:bg-[#EDF0C2]/50 hover:text-[#2E3A1C]"
                        }`}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* User profile at bottom */}
                <div className="border-t border-[#E3E4D6] pt-4 flex items-center gap-3 px-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EDF0C2] overflow-hidden relative shrink-0">
                    <Image src="/farm-aerial.png" alt="User Profile Avatar" fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#2E3A1C]">Raman Singh</h5>
                    <p className="text-[10px] text-[#2E3A1C]/50 font-semibold">Farm Manager</p>
                  </div>
                </div>
              </div>

              {/* Mockup Main Panel */}
              <div className="flex-1 bg-[#FFFFFC] p-8 overflow-y-auto flex flex-col gap-6 text-left">
                {/* Panel Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E3E4D6]/50 pb-5">
                  <div>
                    <span className="text-[11px] font-bold text-[#2E3A1C]/50 uppercase tracking-widest">Active Area</span>
                    <h2 className="text-2xl font-bold text-[#2E3A1C] flex items-center gap-2 mt-0.5">
                      Field 01 - East Pasture
                      <ChevronDown className="w-4 h-4 text-[#2E3A1C]/60" />
                    </h2>
                  </div>
                  <div className="flex gap-2 text-xs font-bold">
                    <span className="bg-[#EDF0C2] text-[#2E3A1C] px-3.5 py-1.5 rounded-lg border border-[#E3E4D6]/50">
                      Sensor Active (9)
                    </span>
                    <span className="bg-[#2E3A1C] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                      <CloudSun className="w-3.5 h-3.5 text-[#D7F200]" /> 24°C Sunny
                    </span>
                  </div>
                </div>

                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "NPK Ratio (Soil)", val: "0.62 / 1.0", detail: "N: 64% | P: 18% | K: 18%", icon: Leaf, bg: "bg-[#EDF0C2]/40" },
                    { label: "Sowing Coverage", val: "125ha / 150ha", detail: "83.3% Sown", icon: Sprout, bg: "bg-[#FFFFFC] border border-[#E3E4D6]" },
                    { label: "Estimated Yield", val: "24,150 Tons", detail: "+18% vs last cycle", icon: TrendingUp, bg: "bg-[#D7F200]/10 border border-[#D7F200]/30" }
                  ].map((kpi, idx) => (
                    <div key={idx} className={`p-5 rounded-lg ${kpi.bg}`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">{kpi.label}</span>
                        <kpi.icon className="w-4 h-4 text-[#2E3A1C]/70" />
                      </div>
                      <h3 className="text-lg font-extrabold text-[#2E3A1C]">{kpi.val}</h3>
                      <p className="text-[11px] text-[#2E3A1C]/70 mt-1">{kpi.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Detailed Analysis Section (Charts / Lists mockups) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                  {/* NPK Progress Bar Card */}
                  <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-6 rounded-lg flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#2E3A1C] mb-4">NPK Nutrient Status</h4>
                      <div className="space-y-4">
                        {[
                          { name: "Nitrogen (N)", current: 75, target: "80%", color: "bg-[#2E3A1C]" },
                          { name: "Phosphorus (P)", current: 48, target: "50%", color: "bg-[#FFB955]" },
                          { name: "Potassium (K)", current: 62, target: "60%", color: "bg-[#D7F200] border border-[#2E3A1C]/10" }
                        ].map((nut, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-[#2E3A1C]">
                              <span>{nut.name}</span>
                              <span>{nut.current}% <span className="text-[#2E3A1C]/50 font-normal">({nut.target} Target)</span></span>
                            </div>
                            <div className="h-2 bg-[#F7F8F3] rounded-md overflow-hidden border border-[#E3E4D6]/50">
                              <div className={`h-full ${nut.color} rounded-md`} style={{ width: `${nut.current}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E3E4D6]/50 flex justify-between items-center text-xs font-bold text-[#2E3A1C]/60">
                      <span>Last reading: 10 mins ago</span>
                      <button className="text-[#2E3A1C] hover:underline">Recalibrate sensors</button>
                    </div>
                  </div>

                  {/* Veg Index Progress Ring & Details */}
                  <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-6 rounded-lg flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#2E3A1C] mb-4">Crop Vegetation Index (NDVI)</h4>
                      <div className="flex items-center gap-6">
                        {/* SVG Circle chart */}
                        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-[#F7F8F3]" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-[#2E3A1C]" strokeDasharray="64, 100" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-lg font-black text-[#2E3A1C]">64%</span>
                            <span className="block text-[8px] text-[#2E3A1C]/50 font-bold uppercase">Optimal</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#2E3A1C]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2E3A1C]"></span>
                            <span>Good Veg (64%)</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-[#2E3A1C]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB955]"></span>
                            <span>Stress (22%)</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-[#2E3A1C]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#D7F200] border border-[#2E3A1C]/20"></span>
                            <span>Soil (14%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E3E4D6]/50 flex justify-between items-center text-xs font-bold text-[#2E3A1C]/60">
                      <span>Scan Area: 125 Hectares</span>
                      <button className="text-[#2E3A1C] hover:underline">View Sat Map</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-14 border-y border-[#E3E4D6] bg-[#FFFFFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-[#2E3A1C]/60 uppercase tracking-widest mb-8">Trusted by innovative agricultural operators</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
            <div className="text-xl font-bold flex items-center gap-2.5 text-[#2E3A1C]/75 hover:text-[#2E3A1C] transition-colors cursor-default">
              <Leaf className="w-5 h-5 text-[#D7F200] fill-[#D7F200] stroke-[#2E3A1C] stroke-2" /> AgriCorp
            </div>
            <div className="text-xl font-bold flex items-center gap-2.5 text-[#2E3A1C]/75 hover:text-[#2E3A1C] transition-colors cursor-default">
              <Zap className="w-5 h-5 text-[#FFB955] fill-[#FFB955] stroke-[#2E3A1C] stroke-2" /> FutureFarm
            </div>
            <div className="text-xl font-bold flex items-center gap-2.5 text-[#2E3A1C]/75 hover:text-[#2E3A1C] transition-colors cursor-default">
              <Shield className="w-5 h-5 text-[#2E3A1C] fill-[#EDF0C2] stroke-[#2E3A1C] stroke-2" /> SafeHarvest
            </div>
            <div className="text-xl font-bold flex items-center gap-2.5 text-[#2E3A1C]/75 hover:text-[#2E3A1C] transition-colors cursor-default">
              <Activity className="w-5 h-5 text-[#2E3A1C] stroke-2" /> LiveStock Pro
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Highlight */}
      <section id="features" className="py-32 bg-[#F7F8F3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#EDF0C2] text-[#2E3A1C] font-bold text-xs uppercase tracking-wider mb-5">
              Complete Ecosystem
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2E3A1C] mb-5 tracking-tight leading-tight">Everything you need to run your farm</h2>
            <p className="text-[#2E3A1C]/75 text-base sm:text-lg font-semibold">Harvesta unifies your livestock, inventory, and financials into a single source of truth, eliminating the need for spreadsheets.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: "Animal Operations", desc: "Track batches, mortality, vaccinations, and movement across stages and rooms with precision.", color: "bg-[#EDF0C2]" },
              { icon: Leaf, title: "Feed Management", desc: "Manage feed inventory, supplier deliveries, and daily batch consumption with strict stock enforcement.", color: "bg-[#D7F200]/20" },
              { icon: ShoppingCart, title: "Sales & Invoicing", desc: "Generate professional POS invoices, track batch deductions, and monitor accounts receivable automatically.", color: "bg-[#FFB955]/10" },
              { icon: Users, title: "Supplier & CRM", desc: "Maintain a complete, searchable database of your suppliers and customers with full historical reporting.", color: "bg-[#E3E4D6]" },
              { icon: LayoutDashboard, title: "Real-time Analytics", desc: "Monitor daily revenue, feed stock levels, mortality rates, and overdue tasks at a single glance.", color: "bg-[#EDF0C2]" },
              { icon: Shield, title: "Enterprise Security", desc: "Role-based access control (Owner, Manager, Accountant) backed by immutable audit logs for every action.", color: "bg-[#D7F200]/20" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#FFFFFC] rounded-xl p-8.5 border border-[#E3E4D6] shadow-[0_2px_12px_rgba(86,100,55,0.01)] hover:border-[#2E3A1C]/35 transition-all duration-200 group text-left">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="w-5 h-5 text-[#2E3A1C] stroke-[2]" />
                </div>
                <h3 className="text-xl font-bold text-[#2E3A1C] mb-3">{feature.title}</h3>
                <p className="text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PWA App Section */}
      <section id="pwa" className="py-32 bg-[#FFFFFC] border-y border-[#E3E4D6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Content Side */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#EDF0C2] text-[#2E3A1C] font-bold text-xs uppercase tracking-wider">
                <Smartphone className="w-4 h-4" /> Installable Web App
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#2E3A1C] tracking-tight leading-tight">
                Works offline. <br />Installs instantly.
              </h2>
              <p className="text-base sm:text-lg text-[#2E3A1C]/75 leading-relaxed font-semibold">
                Harvesta is built as a Progressive Web App (PWA). Install it directly from your browser to your phone, tablet, or desktop. No app store required.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-[#F7F8F3] p-7 rounded-xl border border-[#E3E4D6] transition-all hover:bg-[#EDF0C2]/20">
                  <Zap className="w-8 h-8 text-[#FFB955] fill-[#FFB955]/10 stroke-[#2E3A1C] stroke-[1.5] mb-4" />
                  <h4 className="font-extrabold text-[#2E3A1C] mb-2 text-base">Lightning Fast</h4>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">Loads instantly from your home screen with zero downloading delays.</p>
                </div>
                <div className="bg-[#F7F8F3] p-7 rounded-xl border border-[#E3E4D6] transition-all hover:bg-[#EDF0C2]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#2E3A1C] fill-[#D7F200] stroke-[#2E3A1C] stroke-[1.5] mb-4" />
                  <h4 className="font-extrabold text-[#2E3A1C] mb-2 text-base">Offline Ready</h4>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">Built to handle remote farm locations with spotty internet connections.</p>
                </div>
              </div>
            </div>

            {/* PWA Promo Card - Re-designed to Deep Olive theme */}
            <div className="lg:col-span-5 bg-[#2E3A1C] rounded-xl p-10 text-white border border-[#2E3A1C]/20 relative overflow-hidden group text-left">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-lg bg-[#D7F200]/10 border border-[#D7F200]/20 flex items-center justify-center mb-8 text-[#D7F200]">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black mb-4 !text-[#FFFFFC]">Get the App</h3>
                <p className="text-sm text-[#EDF0C2]/80 mb-8 max-w-sm leading-relaxed font-semibold">
                  Look for the install icon in your browser's address bar or use the install button inside the dashboard to add Harvesta to your device.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] font-extrabold rounded-xl text-xs transition-all cursor-pointer">
                  Install App
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#2E3A1C] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black !text-[#FFFFFC] mb-6 leading-tight">Ready to modernize your operations?</h2>
          <p className="text-base sm:text-lg text-[#EDF0C2]/85 mb-10 max-w-xl mx-auto leading-relaxed font-semibold">Join the next generation of farm management today.</p>
          {!session ? (
            <Link 
              href="/signup" 
              className="inline-flex justify-center items-center gap-2 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-8 py-3.5 rounded-xl text-sm font-extrabold transition-all"
            >
              Start Your Free Trial
            </Link>
          ) : (
            <Link 
              href="/dashboard" 
              className="inline-flex justify-center items-center gap-2 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-8 py-3.5 rounded-xl text-sm font-extrabold transition-all"
            >
              Enter Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFFFFC] pt-24 pb-12 border-t border-[#E3E4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="bg-[#2E3A1C] p-2 rounded-lg">
                  <Sprout className="w-5 h-5 text-[#D7F200] stroke-[1.5]" />
                </div>
                <span className="text-xl font-black tracking-tight text-[#2E3A1C]">Harvesta</span>
              </div>
              <p className="text-[#2E3A1C]/75 text-sm mb-6 max-w-xs leading-relaxed font-semibold">
                The intelligent operating system for modern livestock, poultry, and agricultural management.
              </p>
            </div>
            
            <div className="text-left">
              <h4 className="font-black text-[#2E3A1C] text-xs mb-5 uppercase tracking-wider">Product</h4>
              <ul className="space-y-3.5 text-[#2E3A1C]/70 text-sm font-bold">
                <li><a href="#features" className="hover:text-[#2E3A1C] transition-colors">Features</a></li>
                <li><a href="#pwa" className="hover:text-[#2E3A1C] transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h4 className="font-black text-[#2E3A1C] text-xs mb-5 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3.5 text-[#2E3A1C]/70 text-sm font-bold">
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h4 className="font-black text-[#2E3A1C] text-xs mb-5 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3.5 text-[#2E3A1C]/70 text-sm font-bold">
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#2E3A1C] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-[#E3E4D6] flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#2E3A1C]/60 font-bold">
            <p>&copy; {new Date().getFullYear()} Harvesta Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#2E3A1C] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#2E3A1C] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#2E3A1C] transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
