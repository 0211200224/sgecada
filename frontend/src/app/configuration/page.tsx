"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Settings, 
  GraduationCap, 
  DollarSign, 
  Palette, 
  Save,
  CheckCircle2,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ConfigurationPage() {
  const [activeSubTab, setActiveSubTab] = useState("academic");
  const queryClient = useQueryClient();

  // Fetch Config
  const { data: config, isLoading } = useQuery({
    queryKey: ["school-config"],
    queryFn: async () => {
      const res = await api.get("/configuration");
      return res.data;
    },
  });

  // Update Config
  const updateConfig = useMutation({
    mutationFn: async (newData: any) => {
      const res = await api.patch("/configuration", newData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-config"] });
    }
  });

  const subTabs = [
    { id: "academic", label: "Académico", icon: GraduationCap },
    { id: "financial", label: "Financeiro", icon: DollarSign },
    { id: "branding", label: "Identidade", icon: Palette },
  ];

  if (isLoading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Configurações da Escola</h1>
            <p className="text-white/40">Defina as regras de negócio, escalas de avaliação e identidade visual.</p>
          </div>
          
          <button 
            onClick={() => updateConfig.mutate(config)}
            disabled={updateConfig.isPending}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {updateConfig.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Salvar Alterações
          </button>
        </header>

        {updateConfig.isSuccess && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Configurações atualizadas com sucesso!
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sub Tabs Sidebar */}
          <div className="lg:w-64 space-y-2">
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-medium text-sm",
                  activeSubTab === tab.id 
                    ? "bg-emerald-500 text-white shadow-[0_10px_15px_rgba(16,185,129,0.2)]" 
                    : "text-white/40 hover:bg-white/5"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Config Form Content */}
          <div className="flex-1 glass-card p-10 rounded-[3rem]">
            <AnimatePresence mode="wait">
              {activeSubTab === "academic" && (
                <motion.div key="academic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-white/50 ml-1">Sistema de Avaliação</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none"
                        value={config.grading_system}
                        onChange={(e) => queryClient.setQueryData(["school-config"], { ...config, grading_system: e.target.value })}
                      >
                        <option value="0-20">Numérico (0 a 20)</option>
                        <option value="A-F">Qualitativo (A a F)</option>
                        <option value="0-100">Percentual (0 a 100%)</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-white/50 ml-1">Período Académico</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none"
                        value={config.academic_period}
                        onChange={(e) => queryClient.setQueryData(["school-config"], { ...config, academic_period: e.target.value })}
                      >
                        <option value="trimestral">Trimestral (3 períodos)</option>
                        <option value="semestral">Semestral (2 períodos)</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-white/50 ml-1">Média de Passagem</label>
                      <input 
                        type="number"
                        step="0.1"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        value={config.passing_grade}
                        onChange={(e) => queryClient.setQueryData(["school-config"], { ...config, passing_grade: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === "financial" && (
                <motion.div key="financial" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-white/50 ml-1">Multa por Atraso (%)</label>
                      <input 
                        type="number"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        value={config.late_fee_percentage}
                        onChange={(e) => queryClient.setQueryData(["school-config"], { ...config, late_fee_percentage: e.target.value })}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-white/50 ml-1">Moeda Padrão</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none"
                        value={config.currency}
                        onChange={(e) => queryClient.setQueryData(["school-config"], { ...config, currency: e.target.value })}
                      >
                        <option value="MT">Metical (MT)</option>
                        <option value="USD">Dólar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === "branding" && (
                <motion.div key="branding" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center">
                      <Palette className="w-10 h-10 text-white/20" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Personalização Visual</h4>
                      <p className="text-xs text-white/30 max-w-[250px]">Configure as cores e logo que aparecerão nos relatórios PDF oficiais.</p>
                    </div>
                    <button className="px-6 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">Upload Logo</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
