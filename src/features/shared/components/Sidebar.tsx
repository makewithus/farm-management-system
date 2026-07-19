"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Grid, Settings, LineChart, FileText, ShoppingCart, Activity, Zap, Droplets, BookOpen, Sprout, Layers, Plus, UserCog, Package, TrendingUp, ShieldCheck } from 'lucide-react';

export function Sidebar({ isCollapsed = false, userRole = "Worker" }: { isCollapsed?: boolean; userRole?: string }) {
  const pathname = usePathname();

  const isOwner = userRole === "Owner";
  const isManager = userRole === "Manager" || isOwner;
  const isAccountant = userRole === "Accountant" || isOwner;

  const menuGroups = [
    {
      title: "Overview",
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', show: true },
      ]
    },
    {
      title: "Operations",
      items: [
        { name: 'Animals', icon: Users, href: '/dashboard/animal-categories', show: true },
        { name: 'Stages', icon: Activity, href: '/dashboard/stages', show: true },
        { name: 'Rooms & Structure', icon: Grid, href: '/dashboard/rooms', show: true },
        { name: 'Batches', icon: Layers, href: '/dashboard/animal-batches', show: true },
      ]
    },
    {
      title: "Processing",
      items: [
        { name: 'Slaughter', icon: Activity, href: '/dashboard/slaughter', show: true },
        { name: 'Meat Inventory', icon: Package, href: '/dashboard/inventory', show: true },
      ]
    },
    {
      title: "Feed & Utilities",
      items: [
        { name: 'Feed Types', icon: FileText, href: '/dashboard/feed-types', show: true },
        { name: 'Feed Consumption', icon: Activity, href: '/dashboard/feed-consumption', show: true },
        { name: 'Water Usage', icon: Droplets, href: '/dashboard/water-usage', show: true },
        { name: 'Utility Meters', icon: Zap, href: '/dashboard/utility-meters', show: true },
        { name: 'Electricity Usage', icon: Activity, href: '/dashboard/electricity-usage', show: true },
      ]
    },
    {
      title: "Sales & Finance",
      items: [
        { name: 'Sales', icon: ShoppingCart, href: '/dashboard/sales', show: isManager || isAccountant },
        { name: 'Accounts', icon: BookOpen, href: '/dashboard/accounts', show: isOwner || isAccountant },
        { name: 'Expenses', icon: FileText, href: '/dashboard/expenses', show: true },
      ]
    },
    {
      title: "Analytics & Reports",
      items: [
        { name: 'Analytics', icon: LineChart, href: '/dashboard/analytics', show: true },
        { name: 'Reports', icon: FileText, href: '/dashboard/reports', show: isManager || isAccountant },
        { name: 'Profit & Loss', icon: TrendingUp, href: '/dashboard/reports/pl', show: isManager || isAccountant },
        { name: 'Cost Analytics', icon: LineChart, href: '/dashboard/reports/analytics', show: isManager || isAccountant },
        { name: 'Cash Flow', icon: FileText, href: '/dashboard/reports/cash-flow', show: isManager || isAccountant },
        { name: 'Balance Sheet', icon: FileText, href: '/dashboard/reports/balance-sheet', show: isManager || isAccountant },
        { name: 'Room Efficiency', icon: Activity, href: '/dashboard/reports/room-efficiency', show: isManager || isAccountant },
        { name: 'Stage Performance', icon: Activity, href: '/dashboard/reports/stage-performance', show: isManager || isAccountant },
      ]
    },
    {
      title: "CRM",
      items: [
        { name: 'CRM (Suppliers)', icon: Users, href: '/dashboard/suppliers', show: isManager || isAccountant },
        { name: 'CRM (Customers)', icon: Users, href: '/dashboard/customers', show: isManager || isAccountant },
        { name: 'CRM Ratings', icon: Activity, href: '/dashboard/crm/ratings', show: isManager || isAccountant },
        { name: 'Payment Terms', icon: Settings, href: '/dashboard/crm/payment-terms', show: isManager || isAccountant },
        { name: 'Client Ranking', icon: TrendingUp, href: '/dashboard/crm/client-ranking', show: isManager || isAccountant },
        { name: 'Supplier Compare', icon: Users, href: '/dashboard/crm/supplier-comparison', show: isManager || isAccountant },
      ]
    },
    {
      title: "Administration",
      items: [
        { name: 'User Management', icon: UserCog, href: '/dashboard/users', show: isOwner },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings', show: true },
        { name: 'Security', icon: ShieldCheck, href: '/dashboard/settings/security', show: isOwner || isManager || isAccountant },
      ]
    }
  ];

  return (
    <aside className={`bg-[#F9FAF6] border-r border-[#E3E4D6] text-[#2E3A1C] flex flex-col h-full transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[260px] hidden md:flex'}`}>
      <div className={`h-[75px] shrink-0 px-6 flex items-center border-b border-[#E3E4D6] ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}>
        <div className="bg-[#2E3A1C] rounded-full w-10 h-10 flex items-center justify-center shrink-0 shadow-sm">
          <Sprout className="text-[#D7F200] w-[21px] h-[21px]" />
        </div>
        {!isCollapsed && (
          <span className="text-[#2E3A1C] text-xl font-black tracking-tight whitespace-nowrap">
            Harvesta
          </span>
        )}
      </div>
      
      <nav className="flex-1 px-3 py-3 space-y-3 overflow-x-hidden overflow-y-auto custom-scrollbar">
        {menuGroups.map((group, idx) => {
          const visibleItems = group.items.filter(i => i.show);
          if (visibleItems.length === 0) return null;
          
          return (
            <div key={idx} className="space-y-0.5">
              {!isCollapsed && (
                <div className="px-2.5 mb-1 mt-1.5 text-[9px] font-black text-[#2E3A1C]/40 uppercase tracking-widest">
                  {group.title}
                </div>
              )}
              {isCollapsed && idx !== 0 && <div className="w-8 h-px bg-[#E3E4D6] mx-auto my-2" />}
              
              {visibleItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-150 group text-xs font-bold ${
                      isActive 
                        ? 'bg-[#2E3A1C] text-white shadow-sm shadow-[#2E3A1C]/15' 
                        : 'hover:bg-[#2E3A1C]/5 text-[#2E3A1C]/75 hover:text-[#2E3A1C]'
                    } ${isCollapsed ? 'justify-center py-1.5' : ''}`}
                  >
                    <div className={`p-1 rounded-md flex items-center justify-center ${isActive ? 'bg-[#D7F200]/25 text-[#D7F200]' : 'text-[#2E3A1C]/60 group-hover:text-[#2E3A1C]'}`}>
                      <item.icon className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    {!isCollapsed && (
                      <>
                        <span className="whitespace-nowrap truncate">{item.name}</span>
                        {isActive && (
                          <span className="ml-auto text-[8px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-[#D7F200]/20 text-[#D7F200]">
                            Live
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
      
      {/* Premium user avatar at the bottom */}
      {!isCollapsed && (
        <div className="p-3 border-t border-[#E3E4D6] flex items-center gap-3 bg-[#2E3A1C]/5 hover:bg-[#2E3A1C]/10 transition-colors">
          <div className="w-8 h-8 rounded-full bg-cover bg-center border border-[#E3E4D6] shadow-sm shrink-0" style={{ backgroundImage: "url('/farmer-avatar.png')" }} />
          <div className="overflow-hidden">
            <p className="text-xs font-black text-[#2E3A1C] truncate">Jackson Webb</p>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider truncate">{userRole}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
