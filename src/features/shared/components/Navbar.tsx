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
    <header className="h-[70px] bg-white shadow-sm flex items-center justify-between px-6 z-10 sticky top-0 shrink-0">
      <div className="flex items-center gap-6">
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-600 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-brand-primary"/>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Farm</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-gray-900">{farmName}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-5">
        <InstallPWA />


        <NotificationBell />
        
        <div className="flex items-center gap-3 pl-2 md:pl-5 md:border-l border-gray-200 ml-1">
          {/* Dynamic avatar using user's initial */}
          <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
            {userInitial}
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">{userName}</span>
            <span className="text-xs text-gray-500">{userRole}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="ml-2 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-status-danger/10 hover:text-status-danger transition-colors"
            title="Logout"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
