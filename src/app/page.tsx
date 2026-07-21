"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Sun,
  AlertCircle,
  TrendingUp,
  ChevronDown,
  X,
  RefreshCw,
  Globe,
  DollarSign,
  FileText,
  Layers,
  MapPin,
  Wifi,
  WifiOff,
  ShieldCheck,
  Egg,
  Warehouse,
  Package
} from "lucide-react";

export default function LandingPage() {
  const [activeMockupTab, setActiveMockupTab] = useState<"Dashboard" | "Animals" | "Feed" | "Sales" | "CRM" | "Reports">("Dashboard");
  const [activeField, setActiveField] = useState("Field 01 - East Pasture");
  const [isFieldDropdownOpen, setIsFieldDropdownOpen] = useState(false);
  const [isWeatherDismissed, setIsWeatherDismissed] = useState(false);
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);
  const [isSatMapOpen, setIsSatMapOpen] = useState(false);
  const [isSensorsCalibrating, setIsSensorsCalibrating] = useState(false);

  const fields = [
    "Field 01 - East Pasture",
    "Field 02 - North Barn",
    "Field 03 - Greenhouse A",
    "Field 04 - Feed Storage Silos"
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRotateNow = () => {
    // Rotation action state updated silently
  };

  const handleRecalibrate = () => {
    setIsSensorsCalibrating(true);
    setTimeout(() => {
      setIsSensorsCalibrating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F3] text-[#2E3A1C] font-sans antialiased selection:bg-[#D7F200] selection:text-[#2E3A1C]">
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
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, "features")}
              className="hover:text-[#2E3A1C] transition-colors relative py-2"
            >
              Features
            </a>
            <a 
              href="#solutions" 
              onClick={(e) => scrollToSection(e, "solutions")}
              className="hover:text-[#2E3A1C] transition-colors relative py-2"
            >
              Solutions
            </a>
            <a 
              href="#why-harvesta" 
              onClick={(e) => scrollToSection(e, "why-harvesta")}
              className="hover:text-[#2E3A1C] transition-colors relative py-2"
            >
              Why Harvesta
            </a>
            <a 
              href="#pwa" 
              onClick={(e) => scrollToSection(e, "pwa")}
              className="hover:text-[#2E3A1C] transition-colors relative py-2"
            >
              App
            </a>
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, "features")}
              className="hover:text-[#2E3A1C] transition-colors relative py-2"
            >
              Resources
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-[#2E3A1C]/80 hover:text-[#2E3A1C] text-xs font-bold transition-colors">
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Premium Agriculture Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-[#F7F8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-[#EDF0C2] border border-[#E3E4D6] text-[#2E3A1C] font-bold text-xs mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#FFB955]"></span>
            Discover the new standard in farm management <ChevronRight className="w-3.5 h-3.5 text-[#2E3A1C]/60" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight text-[#2E3A1C] leading-[1.05] max-w-4xl mx-auto font-sans">
            The operating system <br />
            for modern agriculture
          </h1>
          
          <p className="mt-8 max-w-3xl text-base sm:text-lg md:text-xl text-[#2E3A1C]/75 mx-auto mb-12 leading-relaxed font-semibold">
            Harvesta unifies livestock management, feed consumption, and real-time financial tracking in a single, offline-first platform designed for commercial scale operations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-8 py-3.5 rounded-xl text-sm font-extrabold transition-all shadow-sm"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, "features")}
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#FFFFFC] hover:bg-[#F7F8F3] text-[#2E3A1C] border border-[#E3E4D6] px-8 py-3.5 rounded-xl text-sm font-bold transition-all"
            >
              Explore Features
            </a>
          </div>

          {/* Interactive HTML/CSS Dashboard Showcase */}
          <div className="relative max-w-6xl mx-auto mt-20 px-2 md:px-0">
            
            {/* Overlapping Floating Card 1: Alert Card (Bottom Left - Properly Placed & Spaced) */}
            {!isAlertDismissed && (
              <div className="absolute -left-4 xl:-left-12 bottom-6 z-30 bg-[#FFFFFC] border border-[#E3E4D6] p-4 rounded-xl shadow-lg max-w-[250px] text-left hidden xl:block transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB955]/15 flex items-center justify-center text-[#FFB955] shrink-0">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#2E3A1C]/50 font-bold uppercase tracking-wider">Feed Alert</p>
                      <h4 className="text-xs font-bold text-[#2E3A1C] mt-0.5">Silo B Inventory Low</h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAlertDismissed(true);
                    }}
                    className="text-[#2E3A1C]/40 hover:text-[#2E3A1C] p-1 rounded transition-colors"
                    title="Dismiss alert"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#2E3A1C]/70 mt-2 leading-relaxed">Remaining: 1.2 Tons (12%). Automated supplier reorder dispatched.</p>
              </div>
            )}

            {/* Overlapping Floating Card 2: Weather Insights (Right Side - Properly Placed & Spaced with Dismiss Button) */}
            {!isWeatherDismissed && (
              <div className="absolute -right-4 xl:-right-10 top-6 z-30 bg-[#FFFFFC] border border-[#E3E4D6] p-4 rounded-xl shadow-lg max-w-[270px] text-left hidden xl:block transition-all duration-300 hover:scale-[1.02]">
                <div className="relative rounded-lg overflow-hidden aspect-[16/9] mb-3 bg-[#EDF0C2]/30">
                  <Image 
                    src="/farm-aerial.png" 
                    alt="Farm aerial analysis"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#EDF0C2] text-[#2E3A1C] text-[9px] font-bold px-2 py-0.5 rounded">
                    Optimal Area
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EDF0C2] flex items-center justify-center text-[#2E3A1C] shrink-0 mt-0.5">
                    <Sun className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2E3A1C]">Weather Insight</h4>
                    <p className="text-[11px] text-[#2E3A1C]/80 mt-1 leading-snug">
                      "Ideal conditions for grazing rotation in Room 04 today."
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button 
                        onClick={handleRotateNow}
                        className="bg-[#2E3A1C] hover:bg-[#3f4f26] text-[#FFFFFC] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Rotate Now
                      </button>
                      <button 
                        onClick={() => {
                          setIsWeatherDismissed(true);
                        }}
                        className="text-[10px] text-[#2E3A1C]/60 hover:text-[#2E3A1C] font-bold px-2 py-1"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Restore Card Controls if Dismissed */}
            {(isWeatherDismissed || isAlertDismissed) && (
              <div className="absolute top-2 right-2 z-30 hidden xl:flex gap-2">
                {isWeatherDismissed && (
                  <button 
                    onClick={() => setIsWeatherDismissed(false)}
                    className="bg-[#FFFFFC] border border-[#E3E4D6] text-[#2E3A1C] px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm hover:bg-[#EDF0C2]/40 transition-all flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Restore Weather
                  </button>
                )}
                {isAlertDismissed && (
                  <button 
                    onClick={() => setIsAlertDismissed(false)}
                    className="bg-[#FFFFFC] border border-[#E3E4D6] text-[#2E3A1C] px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm hover:bg-[#EDF0C2]/40 transition-all flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Restore Alert
                  </button>
                )}
              </div>
            )}

            {/* Main Interactive Mockup Dashboard Panel */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row h-[560px] relative z-10 w-full">
              
              {/* Mockup Left Sidebar - Fully Clickable Nav Items */}
              <div className="w-56 bg-[#F7F8F3] border-r border-[#E3E4D6] p-5 hidden md:flex flex-col justify-between shrink-0 text-left">
                <div className="space-y-6">
                  {/* Brand */}
                  <div className="flex items-center gap-2 px-2">
                    <Sprout className="w-5 h-5 text-[#2E3A1C]" />
                    <span className="font-bold text-sm tracking-tight text-[#2E3A1C]">Harvesta</span>
                  </div>
                  
                  {/* Nav Links - Interactive State */}
                  <div className="space-y-1">
                    {[
                      { label: "Dashboard" as const, icon: LayoutDashboard },
                      { label: "Animals" as const, icon: Activity },
                      { label: "Feed" as const, icon: Leaf },
                      { label: "Sales" as const, icon: ShoppingCart },
                      { label: "CRM" as const, icon: Users },
                      { label: "Reports" as const, icon: Shield },
                    ].map((item) => {
                      const isActive = activeMockupTab === item.label;
                      return (
                        <button
                          key={item.label}
                          onClick={() => setActiveMockupTab(item.label)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-left ${
                            isActive 
                              ? "bg-[#2E3A1C] text-[#FFFFFC] shadow-sm" 
                              : "text-[#2E3A1C]/70 hover:bg-[#EDF0C2]/60 hover:text-[#2E3A1C]"
                          }`}
                        >
                          <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#D7F200]" : ""}`} />
                          {item.label}
                        </button>
                      );
                    })}
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

              {/* Mockup Main Content Panel - NO SCROLLBAR */}
              <div 
                className="flex-1 bg-[#FFFFFC] p-6 sm:p-8 overflow-y-auto flex flex-col gap-6 text-left"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Panel Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E3E4D6]/50 pb-5">
                  <div className="relative">
                    <span className="text-[11px] font-bold text-[#2E3A1C]/50 uppercase tracking-widest">Active Area</span>
                    <button 
                      onClick={() => setIsFieldDropdownOpen(!isFieldDropdownOpen)}
                      className="text-xl sm:text-2xl font-bold text-[#2E3A1C] flex items-center gap-2 mt-0.5 hover:opacity-80 transition-opacity"
                    >
                      {activeField}
                      <ChevronDown className={`w-4 h-4 text-[#2E3A1C]/60 transition-transform ${isFieldDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Interactive Dropdown Menu */}
                    {isFieldDropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl shadow-lg z-40 py-2">
                        {fields.map((f) => (
                          <button
                            key={f}
                            onClick={() => {
                              setActiveField(f);
                              setIsFieldDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between hover:bg-[#F7F8F3] ${
                              activeField === f ? "text-[#2E3A1C] bg-[#EDF0C2]/40" : "text-[#2E3A1C]/70"
                            }`}
                          >
                            <span>{f}</span>
                            {activeField === f && <CheckCircle2 className="w-3.5 h-3.5 text-[#2E3A1C]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 text-xs font-bold">
                    <span className="bg-[#EDF0C2] text-[#2E3A1C] px-3.5 py-1.5 rounded-lg border border-[#E3E4D6]/50 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#2E3A1C] animate-pulse"></span>
                      Sensors Active (9)
                    </span>
                    <span className="bg-[#2E3A1C] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#D7F200]" /> 24°C Sunny
                    </span>
                  </div>
                </div>

                {/* DYNAMIC CONTENT SWITCHER ACCORDING TO SELECTED TAB */}

                {/* 1. DASHBOARD TAB */}
                {activeMockupTab === "Dashboard" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { label: "NPK Ratio (Soil)", val: "0.62 / 1.0", detail: "N: 64% | P: 18% | K: 18%", icon: Leaf, bg: "bg-[#EDF0C2]/40" },
                        { label: "Sowing Coverage", val: "125ha / 150ha", detail: "83.3% Sown", icon: Sprout, bg: "bg-[#FFFFFC] border border-[#E3E4D6]" },
                        { label: "Estimated Yield", val: "24,150 Tons", detail: "+18% vs last cycle", icon: TrendingUp, bg: "bg-[#D7F200]/10 border border-[#D7F200]/30" }
                      ].map((kpi, idx) => (
                        <div key={idx} className={`p-4 sm:p-5 rounded-lg ${kpi.bg}`}>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">{kpi.label}</span>
                            <kpi.icon className="w-4 h-4 text-[#2E3A1C]/70" />
                          </div>
                          <h3 className="text-lg font-extrabold text-[#2E3A1C]">{kpi.val}</h3>
                          <p className="text-[11px] text-[#2E3A1C]/70 mt-1">{kpi.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-1">
                      <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-lg flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#2E3A1C] mb-4">NPK Nutrient Status</h4>
                          <div className="space-y-3.5">
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
                          <button 
                            onClick={handleRecalibrate}
                            disabled={isSensorsCalibrating}
                            className="text-[#2E3A1C] hover:underline flex items-center gap-1 font-bold disabled:opacity-50"
                          >
                            <RefreshCw className={`w-3 h-3 ${isSensorsCalibrating ? "animate-spin" : ""}`} />
                            {isSensorsCalibrating ? "Calibrating..." : "Recalibrate sensors"}
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-lg flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#2E3A1C] mb-4">Crop Vegetation Index (NDVI)</h4>
                          <div className="flex items-center gap-6">
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
                                <span className="w-2.5 h-2.5 rounded bg-[#2E3A1C]"></span>
                                <span>Good Veg (64%)</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-[#2E3A1C]">
                                <span className="w-2.5 h-2.5 rounded bg-[#FFB955]"></span>
                                <span>Stress (22%)</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-[#2E3A1C]">
                                <span className="w-2.5 h-2.5 rounded bg-[#D7F200] border border-[#2E3A1C]/20"></span>
                                <span>Soil (14%)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#E3E4D6]/50 flex justify-between items-center text-xs font-bold text-[#2E3A1C]/60">
                          <span>Scan Area: 125 Hectares</span>
                          <button 
                            onClick={() => setIsSatMapOpen(true)}
                            className="text-[#2E3A1C] hover:underline font-bold flex items-center gap-1"
                          >
                            <Globe className="w-3 h-3" /> View Sat Map
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 2. ANIMALS TAB */}
                {activeMockupTab === "Animals" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#EDF0C2]/40">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Total Livestock</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">14,250 Birds</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">across 4 active rooms</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#FFFFFC] border border-[#E3E4D6]">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Mortality Rate</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">0.38%</h3>
                        <p className="text-[11px] text-green-700 font-bold mt-1">Optimal health index</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#D7F200]/10 border border-[#D7F200]/30">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Vaccination Status</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">100% Up to Date</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">Next due: Day 28 Booster</p>
                      </div>
                    </div>

                    <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-lg">
                      <h4 className="text-sm font-bold text-[#2E3A1C] mb-3">Active Batches Overview</h4>
                      <div className="divide-y divide-[#E3E4D6]/50">
                        {[
                          { name: "Broiler Batch #04", stage: "Growth Stage (Day 22)", count: "4,500 Birds", status: "Healthy", color: "bg-emerald-100 text-emerald-800" },
                          { name: "Layer Flock B", stage: "Production Stage (Wk 14)", count: "6,200 Birds", status: "High Yield", color: "bg-blue-100 text-blue-800" },
                          { name: "Starter Chicks A", stage: "Brooding Stage (Day 06)", count: "3,550 Birds", status: "Monitored", color: "bg-amber-100 text-amber-800" }
                        ].map((b, i) => (
                          <div key={i} className="py-3 flex justify-between items-center text-xs font-bold">
                            <div>
                              <p className="text-[#2E3A1C] font-extrabold">{b.name}</p>
                              <p className="text-[11px] text-[#2E3A1C]/60 font-medium">{b.stage}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[#2E3A1C] font-extrabold">{b.count}</span>
                              <span className={`block text-[9px] px-2 py-0.5 rounded font-extrabold mt-0.5 ${b.color}`}>{b.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. FEED TAB */}
                {activeMockupTab === "Feed" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#EDF0C2]/40">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Total Feed Stock</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">42.5 Tons</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">Estimated: 11 days remaining</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#FFFFFC] border border-[#E3E4D6]">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Daily Consumption</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">3.8 Tons / day</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">FCR Ratio: 1.52</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#FFB955]/15 border border-[#FFB955]/30">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Reorder Status</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">Silo B Triggered</h3>
                        <p className="text-[11px] text-[#2E3A1C]/80 mt-1">5.0 Tons arriving tomorrow</p>
                      </div>
                    </div>

                    <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-lg">
                      <h4 className="text-sm font-bold text-[#2E3A1C] mb-3">Silo Inventory Breakdown</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-[#2E3A1C] mb-1">
                            <span>Silo A - Broiler Starter Mash</span>
                            <span>28.5 / 30 Tons (95%)</span>
                          </div>
                          <div className="h-2 bg-[#F7F8F3] rounded border border-[#E3E4D6]">
                            <div className="h-full bg-[#2E3A1C] rounded w-[95%]"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-[#2E3A1C] mb-1">
                            <span>Silo B - Layer Concentrate</span>
                            <span className="text-amber-700">1.2 / 10 Tons (12% - LOW)</span>
                          </div>
                          <div className="h-2 bg-[#F7F8F3] rounded border border-[#E3E4D6]">
                            <div className="h-full bg-[#FFB955] rounded w-[12%]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SALES TAB */}
                {activeMockupTab === "Sales" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#D7F200]/15 border border-[#D7F200]/30">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Today's Revenue</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">₹1,85,400</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">14 Dispatches completed</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#FFFFFC] border border-[#E3E4D6]">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Pending Receivables</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">₹42,000</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">2 Customer accounts</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#EDF0C2]/40">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Avg Order Value</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">₹13,240</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">+8% MoM growth</p>
                      </div>
                    </div>

                    <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-lg">
                      <h4 className="text-sm font-bold text-[#2E3A1C] mb-3">Recent Invoices</h4>
                      <div className="divide-y divide-[#E3E4D6]/50">
                        {[
                          { inv: "INV-2026-089", client: "GreenValley Organics", amount: "₹84,000", status: "PAID", color: "bg-emerald-100 text-emerald-800" },
                          { inv: "INV-2026-088", client: "AgriMart Retailers", amount: "₹45,000", status: "PENDING", color: "bg-amber-100 text-amber-800" },
                          { inv: "INV-2026-087", client: "FreshPoultry Hub", amount: "₹56,400", status: "PAID", color: "bg-emerald-100 text-emerald-800" }
                        ].map((s, i) => (
                          <div key={i} className="py-2.5 flex justify-between items-center text-xs font-bold">
                            <div>
                              <p className="text-[#2E3A1C] font-extrabold">{s.client}</p>
                              <p className="text-[10px] text-[#2E3A1C]/50 font-medium">{s.inv}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[#2E3A1C] font-extrabold">{s.amount}</span>
                              <span className={`block text-[9px] px-2 py-0.5 rounded font-extrabold mt-0.5 ${s.color}`}>{s.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. CRM TAB */}
                {activeMockupTab === "CRM" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#EDF0C2]/40">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Active Customers</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">38 Accounts</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">100% verified ledger</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#FFFFFC] border border-[#E3E4D6]">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Key Suppliers</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">6 Partners</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">Apex Feeds, FarmVet</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#D7F200]/10 border border-[#D7F200]/30">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Ledger Health</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">100% Synced</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">Offline & Online synchronized</p>
                      </div>
                    </div>

                    <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-lg">
                      <h4 className="text-sm font-bold text-[#2E3A1C] mb-3">Top Customer Accounts</h4>
                      <div className="space-y-2.5 text-xs font-bold">
                        {[
                          { name: "GreenValley Organics", totalPurchases: "₹8,45,000", balance: "₹0.00 (Cleared)" },
                          { name: "AgriMart Retailers", totalPurchases: "₹5,20,000", balance: "₹45,000 (Due 3 days)" },
                          { name: "FreshPoultry Hub", totalPurchases: "₹4,10,000", balance: "₹0.00 (Cleared)" }
                        ].map((c, i) => (
                          <div key={i} className="p-3 bg-[#F7F8F3] rounded-lg flex justify-between items-center border border-[#E3E4D6]/50">
                            <div>
                              <p className="text-[#2E3A1C] font-extrabold">{c.name}</p>
                              <p className="text-[10px] text-[#2E3A1C]/60 font-medium">Lifetime: {c.totalPurchases}</p>
                            </div>
                            <span className="text-xs text-[#2E3A1C] font-extrabold">{c.balance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. REPORTS TAB */}
                {activeMockupTab === "Reports" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#EDF0C2]/40">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Net Monthly Profit</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">₹6,42,000</h3>
                        <p className="text-[11px] text-green-700 font-bold mt-1">+14% vs target</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#FFFFFC] border border-[#E3E4D6]">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Operating Expenses</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">₹3,18,000</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">Feed 68%, Power 18%</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#D7F200]/10 border border-[#D7F200]/30">
                        <span className="text-[10px] font-bold text-[#2E3A1C]/50 uppercase tracking-wider">Audit Security</span>
                        <h3 className="text-xl font-extrabold text-[#2E3A1C] mt-1">Verified</h3>
                        <p className="text-[11px] text-[#2E3A1C]/70 mt-1">18 immutable log records</p>
                      </div>
                    </div>

                    <div className="bg-[#FFFFFC] border border-[#E3E4D6] p-5 rounded-lg">
                      <h4 className="text-sm font-bold text-[#2E3A1C] mb-3">Available Intelligence Reports</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { title: "Profit & Loss Statement", desc: "Detailed breakdown of revenue vs expenses" },
                          { title: "Cost & Yield Analytics", desc: "Feed Conversion Ratio and cost per kg" },
                          { title: "Water & Power Efficiency", desc: "Daily utility meter logs across rooms" },
                          { title: "Slaughter Batch Yield", desc: "Carcass weight and meat inventory" }
                        ].map((r, i) => (
                          <div key={i} className="p-3 bg-[#F7F8F3] rounded-lg border border-[#E3E4D6]/50">
                            <h5 className="text-xs font-bold text-[#2E3A1C]">{r.title}</h5>
                            <p className="text-[10px] text-[#2E3A1C]/60 mt-0.5">{r.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Satellite Map Modal Preview */}
      {isSatMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#E3E4D6] pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#2E3A1C]" />
                <h3 className="text-lg font-extrabold text-[#2E3A1C]">Satellite Vegetation Index Map</h3>
              </div>
              <button 
                onClick={() => setIsSatMapOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-[#E3E4D6]">
              <Image 
                src="/farm-aerial.png" 
                alt="Satellite drone view"
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-xs font-bold text-[#D7F200]">Field 01 - East Pasture Scan (125 Hectares)</span>
                <p className="text-[11px] text-gray-300">NDVI Status: 64% Optimal • Crop Health Index: Excellent</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setIsSatMapOpen(false)}
                className="bg-[#2E3A1C] text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Close Map Preview
              </button>
            </div>
          </div>
        </div>
      )}

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
      <section id="features" className="py-28 bg-[#F7F8F3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#EDF0C2] text-[#2E3A1C] font-bold text-xs uppercase tracking-wider mb-4">
              Complete Ecosystem
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#2E3A1C] mb-4 tracking-tight leading-tight">Everything you need to run your farm</h2>
            <p className="text-[#2E3A1C]/75 text-base sm:text-lg font-semibold">Harvesta unifies your livestock, inventory, and financials into a single source of truth, eliminating spreadsheets.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "Animal Operations", desc: "Track batches, mortality, vaccinations, and movement across stages and rooms with precision.", color: "bg-[#EDF0C2]" },
              { icon: Leaf, title: "Feed Management", desc: "Manage feed inventory, supplier deliveries, and daily batch consumption with strict stock enforcement.", color: "bg-[#D7F200]/20" },
              { icon: ShoppingCart, title: "Sales & Invoicing", desc: "Generate professional POS invoices, track batch deductions, and monitor accounts receivable automatically.", color: "bg-[#FFB955]/10" },
              { icon: Users, title: "Supplier & CRM", desc: "Maintain a complete, searchable database of your suppliers and customers with full historical reporting.", color: "bg-[#E3E4D6]" },
              { icon: LayoutDashboard, title: "Real-time Analytics", desc: "Monitor daily revenue, feed stock levels, mortality rates, and overdue tasks at a single glance.", color: "bg-[#EDF0C2]" },
              { icon: Shield, title: "Enterprise Security", desc: "Role-based access control (Owner, Manager, Accountant) backed by immutable audit logs for every action.", color: "bg-[#D7F200]/20" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#FFFFFC] rounded-xl p-7 border border-[#E3E4D6] shadow-sm hover:border-[#2E3A1C]/40 transition-all duration-200 text-left">
                <div className={`w-11 h-11 ${feature.color} rounded-lg flex items-center justify-center mb-5`}>
                  <feature.icon className="w-5 h-5 text-[#2E3A1C] stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-[#2E3A1C] mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-[#FFFFFC] border-t border-[#E3E4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#D7F200]/20 text-[#2E3A1C] font-bold text-xs uppercase tracking-wider mb-4">
              Tailored Solutions
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#2E3A1C] mb-4 tracking-tight">Built for your specific farm model</h2>
            <p className="text-[#2E3A1C]/75 text-base sm:text-lg font-semibold">Whether you run poultry, cattle, or crop operations, Harvesta adapts seamlessly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Animal Batches */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-2xl p-8 text-left flex flex-col justify-between hover:border-[#2E3A1C]/40 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2E3A1C] text-[#D7F200] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#EDF0C2] text-[#2E3A1C] px-3 py-1 rounded-full uppercase tracking-wider">
                    Live Batches
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2E3A1C]">Livestock & Animal Batches</h3>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold mt-2">
                    Track poultry flocks and livestock batches, placement dates, daily mortality logging, species categories, and growth curves.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Mortality Logs</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Batch Placement</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Growth Stages</span>
                </div>
              </div>
              <Link href="/dashboard/animal-batches" className="pt-6 border-t border-[#E3E4D6]/60 mt-6 flex items-center justify-between text-xs font-black text-[#2E3A1C] group-hover:translate-x-1 transition-transform">
                <span>Explore Batches Module</span>
                <ChevronRight className="w-4 h-4 text-[#2E3A1C]" />
              </Link>
            </div>

            {/* Card 2: Rooms & Shed Capacity */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-2xl p-8 text-left flex flex-col justify-between hover:border-[#2E3A1C]/40 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2E3A1C] text-[#D7F200] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#EDF0C2] text-[#2E3A1C] px-3 py-1 rounded-full uppercase tracking-wider">
                    Room Capacity
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2E3A1C]">Room & Shed Management</h3>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold mt-2">
                    Monitor room housing capacity, climate parameters, brooding-to-production stage transitions, and environmental logs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Room Occupancy</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Stage Transitions</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Brooding Logs</span>
                </div>
              </div>
              <Link href="/dashboard/rooms" className="pt-6 border-t border-[#E3E4D6]/60 mt-6 flex items-center justify-between text-xs font-black text-[#2E3A1C] group-hover:translate-x-1 transition-transform">
                <span>Explore Rooms Module</span>
                <ChevronRight className="w-4 h-4 text-[#2E3A1C]" />
              </Link>
            </div>

            {/* Card 3: Feed Inventory */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-2xl p-8 text-left flex flex-col justify-between hover:border-[#2E3A1C]/40 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2E3A1C] text-[#D7F200] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                    <Warehouse className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#EDF0C2] text-[#2E3A1C] px-3 py-1 rounded-full uppercase tracking-wider">
                    Silo Stocks
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2E3A1C]">Feed Inventory & Rations</h3>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold mt-2">
                    Manage feed silo inventory levels, daily room consumption rations, feed type catalog, FCR tracking, and supplier reorders.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Silo Levels</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Ration Logs</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">FCR Tracking</span>
                </div>
              </div>
              <Link href="/dashboard/feed" className="pt-6 border-t border-[#E3E4D6]/60 mt-6 flex items-center justify-between text-xs font-black text-[#2E3A1C] group-hover:translate-x-1 transition-transform">
                <span>Explore Feed Module</span>
                <ChevronRight className="w-4 h-4 text-[#2E3A1C]" />
              </Link>
            </div>

            {/* Card 4: Slaughter & Processing */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-2xl p-8 text-left flex flex-col justify-between hover:border-[#2E3A1C]/40 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2E3A1C] text-[#D7F200] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                    <Package className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#EDF0C2] text-[#2E3A1C] px-3 py-1 rounded-full uppercase tracking-wider">
                    Carcass Yield
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2E3A1C]">Slaughter & Carcass Yield</h3>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold mt-2">
                    Record slaughter processing batches, live weight vs dressed carcass weight, processing efficiency, and yield percentages.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Processing Batches</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Dressed Weight</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Yield Percent</span>
                </div>
              </div>
              <Link href="/dashboard/slaughter" className="pt-6 border-t border-[#E3E4D6]/60 mt-6 flex items-center justify-between text-xs font-black text-[#2E3A1C] group-hover:translate-x-1 transition-transform">
                <span>Explore Slaughter Module</span>
                <ChevronRight className="w-4 h-4 text-[#2E3A1C]" />
              </Link>
            </div>

            {/* Card 5: Sales & CRM */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-2xl p-8 text-left flex flex-col justify-between hover:border-[#2E3A1C]/40 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2E3A1C] text-[#D7F200] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#EDF0C2] text-[#2E3A1C] px-3 py-1 rounded-full uppercase tracking-wider">
                    POS Invoicing
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2E3A1C]">Sales, CRM & Supplier Orders</h3>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold mt-2">
                    Manage customer sales orders, POS invoicing, accounts receivable ledgers, and supplier purchasing orders.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">POS Invoicing</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Customer CRM</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Supplier Orders</span>
                </div>
              </div>
              <Link href="/dashboard/sales" className="pt-6 border-t border-[#E3E4D6]/60 mt-6 flex items-center justify-between text-xs font-black text-[#2E3A1C] group-hover:translate-x-1 transition-transform">
                <span>Explore Sales & CRM</span>
                <ChevronRight className="w-4 h-4 text-[#2E3A1C]" />
              </Link>
            </div>

            {/* Card 6: Reports & Utilities */}
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-2xl p-8 text-left flex flex-col justify-between hover:border-[#2E3A1C]/40 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2E3A1C] text-[#D7F200] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#EDF0C2] text-[#2E3A1C] px-3 py-1 rounded-full uppercase tracking-wider">
                    P&L & Utilities
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2E3A1C]">Financial Reports & Utilities</h3>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold mt-2">
                    Generate profit & loss balance sheets, batch cost profitability, electricity meter logs, and water consumption analytics.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">P&L Reports</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Electricity Meters</span>
                  <span className="text-[10px] font-extrabold bg-[#F7F8F3] border border-[#E3E4D6] text-[#2E3A1C]/80 px-2.5 py-1 rounded-md">Water Logs</span>
                </div>
              </div>
              <Link href="/dashboard/reports" className="pt-6 border-t border-[#E3E4D6]/60 mt-6 flex items-center justify-between text-xs font-black text-[#2E3A1C] group-hover:translate-x-1 transition-transform">
                <span>Explore Reports Module</span>
                <ChevronRight className="w-4 h-4 text-[#2E3A1C]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Harvesta Section */}
      <section id="why-harvesta" className="py-28 bg-[#F7F8F3] border-t border-[#E3E4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#EDF0C2] text-[#2E3A1C] font-bold text-xs uppercase tracking-wider mb-4">
              Why Choose Harvesta
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#2E3A1C] mb-4 tracking-tight leading-tight">
              Built for real farm conditions, not desktop spreadsheets
            </h2>
            <p className="text-[#2E3A1C]/75 text-base sm:text-lg font-semibold">
              Traditional software breaks down in the field. Harvesta is engineered from the ground up for commercial livestock and agricultural operations.
            </p>
          </div>

          {/* 4 Differentiator Cards */}
          <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl p-8 space-y-4 hover:border-[#2E3A1C]/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#D7F200]/30 text-[#2E3A1C] flex items-center justify-center font-bold">
                <Wifi className="w-6 h-6 text-[#2E3A1C]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#2E3A1C]">Offline-First Local Storage</h3>
              <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">
                Record feed deliveries, mortality logs, and sales out in pastures with zero cellular signal. Everything stays cached locally via Dexie DB and syncs automatically when internet returns.
              </p>
            </div>

            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl p-8 space-y-4 hover:border-[#2E3A1C]/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#D7F200]/30 text-[#2E3A1C] flex items-center justify-center font-bold">
                <Leaf className="w-6 h-6 text-[#2E3A1C]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#2E3A1C]">Automated Stock & Feed Deductions</h3>
              <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">
                Eliminate manual paper logs and spreadsheet errors. Batch feeding records automatically deduct silo inventory levels and dispatch supplier reorder alerts before stock runs out.
              </p>
            </div>

            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl p-8 space-y-4 hover:border-[#2E3A1C]/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FFB955]/20 text-[#2E3A1C] flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6 text-[#2E3A1C]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#2E3A1C]">Real-time FCR & Margin Analytics</h3>
              <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">
                Gain instant visibility into your Feed Conversion Ratio (FCR), mortality impact, and live batch profitability. Know your exact cost per kilogram before batch harvest.
              </p>
            </div>

            <div className="bg-[#FFFFFC] border border-[#E3E4D6] rounded-xl p-8 space-y-4 hover:border-[#2E3A1C]/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#EDF0C2] text-[#2E3A1C] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-[#2E3A1C]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#2E3A1C]">Enterprise Security & Audit Trail</h3>
              <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">
                Safeguard financial ledgers with role-based access for Owners, Managers, and Accountants. Immutable audit trails log every transaction, delivery, and system change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PWA App Section */}
      <section id="pwa" className="py-28 bg-[#FFFFFC] border-t border-[#E3E4D6] relative overflow-hidden">
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
                Harvesta is built as a Progressive Web App (PWA). Install it directly from your browser to your phone, tablet, or desktop with zero app store delays.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-[#F7F8F3] p-6 rounded-xl border border-[#E3E4D6]">
                  <Zap className="w-7 h-7 text-[#FFB955] mb-3" />
                  <h4 className="font-extrabold text-[#2E3A1C] mb-1.5 text-base">Lightning Fast</h4>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">Loads instantly from home screen with offline local cache.</p>
                </div>
                <div className="bg-[#F7F8F3] p-6 rounded-xl border border-[#E3E4D6]">
                  <CheckCircle2 className="w-7 h-7 text-[#2E3A1C] mb-3" />
                  <h4 className="font-extrabold text-[#2E3A1C] mb-1.5 text-base">Offline Ready</h4>
                  <p className="text-xs sm:text-sm text-[#2E3A1C]/75 leading-relaxed font-semibold">Built to handle remote farm locations with spotty internet connections.</p>
                </div>
              </div>
            </div>

            {/* PWA Promo Card */}
            <div className="lg:col-span-5 bg-[#2E3A1C] rounded-xl p-10 text-white border border-[#2E3A1C]/20 relative overflow-hidden group text-left">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-lg bg-[#D7F200]/10 border border-[#D7F200]/20 flex items-center justify-center mb-8 text-[#D7F200]">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black mb-4 !text-[#FFFFFC]">Get the App</h3>
                <p className="text-sm text-[#EDF0C2]/80 mb-8 max-w-sm leading-relaxed font-semibold">
                  Look for the install icon in your browser's address bar or click below to add Harvesta directly to your home screen.
                </p>
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] font-extrabold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
                >
                  Launch App
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-[#2E3A1C] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black !text-[#FFFFFC] mb-6 leading-tight">Ready to modernize your operations?</h2>
          <p className="text-base sm:text-lg text-[#EDF0C2]/85 mb-10 max-w-xl mx-auto leading-relaxed font-semibold">Join the next generation of agricultural operators today.</p>
          <Link 
            href="/signup" 
            className="inline-flex justify-center items-center gap-2 bg-[#D7F200] hover:bg-[#c6df00] text-[#2E3A1C] border border-[#2E3A1C]/10 px-8 py-3.5 rounded-xl text-sm font-extrabold transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer - Properly Routed */}
      <footer className="bg-[#FFFFFC] pt-20 pb-12 border-t border-[#E3E4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2 space-y-5 text-left">
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
              <ul className="space-y-3 text-[#2E3A1C]/75 text-sm font-bold">
                <li><a href="#features" onClick={(e) => scrollToSection(e, "features")} className="hover:text-[#2E3A1C] transition-colors">Features</a></li>
                <li><a href="#solutions" onClick={(e) => scrollToSection(e, "solutions")} className="hover:text-[#2E3A1C] transition-colors">Solutions</a></li>
                <li><a href="#why-harvesta" onClick={(e) => scrollToSection(e, "why-harvesta")} className="hover:text-[#2E3A1C] transition-colors">Why Harvesta</a></li>
                <li><a href="#pwa" onClick={(e) => scrollToSection(e, "pwa")} className="hover:text-[#2E3A1C] transition-colors">Mobile App</a></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h4 className="font-black text-[#2E3A1C] text-xs mb-5 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3 text-[#2E3A1C]/75 text-sm font-bold">
                <li><a href="#features" onClick={(e) => scrollToSection(e, "features")} className="hover:text-[#2E3A1C] transition-colors">Documentation</a></li>
                <li><a href="#features" onClick={(e) => scrollToSection(e, "features")} className="hover:text-[#2E3A1C] transition-colors">Help Center</a></li>
                <li><a href="#pwa" onClick={(e) => scrollToSection(e, "pwa")} className="hover:text-[#2E3A1C] transition-colors">PWA Guide</a></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h4 className="font-black text-[#2E3A1C] text-xs mb-5 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-[#2E3A1C]/75 text-sm font-bold">
                <li><Link href="/login" className="hover:text-[#2E3A1C] transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-[#2E3A1C] transition-colors">Get Started</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#2E3A1C] transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#E3E4D6] flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#2E3A1C]/60 font-bold">
            <p>&copy; {new Date().getFullYear()} Harvesta Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#2E3A1C] transition-colors">Twitter</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#2E3A1C] transition-colors">LinkedIn</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#2E3A1C] transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
