"use client";

import { useMemo, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function OverviewAnalytics({ categories = [], mortalities = [], vaccinations = [] }: { categories?: any[], mortalities?: any[], vaccinations?: any[] }) {
  const [offlineMortalities, setOfflineMortalities] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    import("@/lib/offline/repositories/mortalityRepository").then(mod => {
      mod.mortalityRepository.getAll().then(all => {
        setOfflineMortalities(all.filter((m: any) => m.isOffline));
      });
    });
  }, []);

  const combinedMortalities = useMemo(() => {
    return [...offlineMortalities, ...mortalities];
  }, [offlineMortalities, mortalities]);

  // 1. Animal Distribution (Pie Chart)
  const distributionData = useMemo(() => {
    return categories.map(cat => ({
      name: cat.name,
      value: cat.animal_batches?.reduce((acc: number, batch: any) => acc + (batch.quantity || 0), 0) || 0
    })).filter(cat => cat.value > 0);
  }, [categories]);

  const COLORS = ['#2E3A1C', '#D7F200', '#FFB955', '#EDF0C2', '#8b5cf6'];

  // 2. Mortality Trend (Line Chart over last 7 days)
  const mortalityData = useMemo(() => {
    const last7Days = Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const counts: Record<string, number> = {};
    last7Days.forEach(d => counts[d] = 0);

    combinedMortalities.forEach(m => {
      const dateStr = new Date(m.date).toISOString().split('T')[0];
      if (counts[dateStr] !== undefined) {
        counts[dateStr] += m.quantity;
      }
    });

    return last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      deaths: counts[date]
    }));
  }, [mortalities]);

  // 3. Vaccination Trend (Bar Chart over next 7 days)
  const vaccinationData = useMemo(() => {
    const next7Days = Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0];
    });

    const counts: Record<string, number> = {};
    next7Days.forEach(d => counts[d] = 0);

    vaccinations.forEach(v => {
      const dateStr = new Date(v.due_date).toISOString().split('T')[0];
      if (counts[dateStr] !== undefined) {
        counts[dateStr] += 1;
      }
    });

    return next7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      pending: counts[date]
    }));
  }, [vaccinations]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFC] p-6 rounded-lg border border-[#E3E4D6] h-[368px] animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
        <div className="bg-[#FFFFFC] p-6 rounded-lg border border-[#E3E4D6] h-[368px] animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
        <div className="bg-[#FFFFFC] p-6 rounded-lg border border-[#E3E4D6] h-[368px] animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="bg-[#FFFFFC] p-6 rounded-lg border border-[#E3E4D6] shadow-sm col-span-1 hover:border-[#2E3A1C]/25 transition-colors">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Animal Distribution</h3>
        <div className="h-64 flex items-center justify-center">
          {distributionData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-sm font-semibold">No animals found</div>
          )}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {distributionData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-[#2E3A1C] font-bold">{d.name}</span> ({d.value})
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FFFFFC] p-6 rounded-lg border border-[#E3E4D6] shadow-sm col-span-1 hover:border-[#2E3A1C]/25 transition-colors">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Mortality Trend (7 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mortalityData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E4D6" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'rgba(46, 58, 28, 0.5)', fontSize: 11, fontWeight: 'bold'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(46, 58, 28, 0.5)', fontSize: 11, fontWeight: 'bold'}} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="deaths" stroke="#2E3A1C" strokeWidth={2.5} dot={{ r: 3.5, strokeWidth: 1.5, fill: '#D7F200' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#FFFFFC] p-6 rounded-lg border border-[#E3E4D6] shadow-sm col-span-1 hover:border-[#2E3A1C]/25 transition-colors">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vaccinations (Next 7 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vaccinationData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E4D6" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'rgba(46, 58, 28, 0.5)', fontSize: 11, fontWeight: 'bold'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(46, 58, 28, 0.5)', fontSize: 11, fontWeight: 'bold'}} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="pending" fill="#2E3A1C" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
