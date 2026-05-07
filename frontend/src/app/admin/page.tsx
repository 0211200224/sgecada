"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Globe, 
  School, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  PlusCircle,
  ExternalLink,
  Activity,
  Server
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PlatformAdminPage() {
  // Global Stats
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["global-stats"],
    queryFn: async () => {
      const res = await api.get("/admin/stats");
      return res.data;
    },
  });

  // Schools List
  const { data: schools, isLoading: isSchoolsLoading } = useQuery({
    queryKey: ["all-schools"],
    queryFn: async () => {
      const res = await api.get("/admin/schools");
      return res.data;
    },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
              <ShieldCheck className="text-blue-500 w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1 italic">Platform <span className="text-blue-500">Admin</span></h1>
              <p className="text-white/40 text-sm">Controlo central do ecossistema SGE-ERP.</p>
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all flex items-center gap-2 active:scale-95">
            <PlusCircle className="w-5 h-5" />
            Nova Escola (Tenant)
          </button>
        </header>

        {/* Global Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card p-8 rounded-[2.5rem] border-blue-500/10">
            <Activity className="w-5 h-5 text-blue-500 mb-4" />
            <div className="text-3xl font-bold">{stats?.activeTenants || 0}</div>
            <p className="text-white/30 text-xs mt-1 uppercase font-bold tracking-widest">Escolas Ativas</p>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem]">
            <Users className="w-5 h-5 text-emerald-500 mb-4" />
            <div className="text-3xl font-bold">{stats?.studentsCount?.toLocaleString() || 0}</div>
            <p className="text-white/30 text-xs mt-1 uppercase font-bold tracking-widest">Alunos Globais</p>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem]">
            <BarChart3 className="w-5 h-5 text-purple-500 mb-4" />
            <div className="text-2xl font-bold">{stats?.totalRevenue?.toLocaleString() || 0} <span className="text-xs opacity-30">MT</span></div>
            <p className="text-white/30 text-xs mt-1 uppercase font-bold tracking-widest">Volume Financeiro</p>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem]">
            <Server className="w-5 h-5 text-orange-500 mb-4" />
            <div className="text-3xl font-bold text-orange-500">99.9%</div>
            <p className="text-white/30 text-xs mt-1 uppercase font-bold tracking-widest">Disponibilidade</p>
          </div>
        </div>

        {/* Schools Management Table */}
        <div className="glass-card rounded-[3rem] overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/[0.01]">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <School className="w-5 h-5 text-blue-500" />
              Gestão de Escolas
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-5 text-xs font-bold uppercase text-white/30">Instituição</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase text-white/30">Subdomínio</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase text-white/30">Data de Registro</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase text-white/30 text-right">Acções</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isSchoolsLoading ? (
                  [...Array(3)].map((_, i) => <tr key={i} className="h-20 animate-pulse bg-white/[0.01]" />)
                ) : schools?.map((school: any) => (
                  <tr key={school.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-500/50" />
                        </div>
                        <span className="font-semibold">{school.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-bold text-blue-400">
                        {school.subdomain}.sgecada.edu
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-white/30">
                      {new Date(school.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-white/20 hover:text-blue-500 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
