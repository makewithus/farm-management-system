"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { usePathname } from 'next/navigation';
import { processSyncQueue, recoverFailedSyncTasks } from "@/lib/offline/sync";

export function DashboardShell({ children, userRole }: { children: React.ReactNode; userRole?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';
  
  useEffect(() => {
    const handleOnline = () => {
      console.log("Network restored. Processing sync queue globally...");
      processSyncQueue();
    };
    
    window.addEventListener("online", handleOnline);
    if (navigator.onLine) {
      recoverFailedSyncTasks().then(() => {
        processSyncQueue();
      });
    }
    
    return () => window.removeEventListener("online", handleOnline);
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F6F0] font-sans">
      <Sidebar isCollapsed={isCollapsed} userRole={userRole} />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <Navbar toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F5F6F0]">
          <div className="relative space-y-6 z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
