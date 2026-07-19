"use client";

import { Search, Bell, LogOut, ChevronDown, MapPin, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { InstallPWA } from './InstallPWA';
import { NotificationBell } from './NotificationBell';

export function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";
  const userRole = session?.user?.role || "";
  const farmName = session?.user?.farm_name || "Main Farm";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="h-[70px] bg-[#FFFFFC] border-b border-[#E3E4D6] flex items-center justify-between px-6 z-10 sticky top-0 shrink-0">
      <div className="flex items-center gap-6">
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-[#2E3A1C] transition-colors cursor-pointer">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-3">
          <div className="w-9 h-9 bg-[#2E3A1C]/5 border border-[#E3E4D6] rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-[#2E3A1C]"/>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Farm</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#2E3A1C]">{farmName}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-5">
        <InstallPWA />

        <NotificationBell />
        
        <div className="flex items-center gap-3 pl-2 md:pl-5 md:border-l border-[#E3E4D6] ml-1">
          {/* Dynamic avatar using user's initial */}
          <div className="w-9 h-9 rounded-lg bg-[#2E3A1C] flex items-center justify-center text-[#FFFFFC] font-extrabold text-sm shrink-0">
            {userInitial}
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-sm font-bold text-[#2E3A1C] leading-tight">{userName}</span>
            <span className="text-xs text-gray-400 font-semibold">{userRole}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="ml-2 w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
