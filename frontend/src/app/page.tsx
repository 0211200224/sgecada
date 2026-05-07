"use client";

import { useState } from "react";
import { ModernTabs } from "@/components/ui/modern-tabs";
import { LayoutDashboard, Users, BookOpen, CreditCard, PieChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch Financial Summary
  const { data: financialData, isLoading: isFinancialLoading } = useQuery({
    queryKey: ["financial-summary"],
    queryFn: async () => {
      const res = await api.get("/analytics/financial-summary");
      return res.data;
    },
  });

  // Fetch Students at Risk
  const { data: riskData, isLoading: isRiskLoading } = useQuery({
    queryKey: ["students-at-risk"],
    queryFn: async () => {
      const res = await api.get("/analytics/risk");
      return res.data;
    },
  });

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "students", label: "Estudantes", icon: <Users className="w-4 h-4" /> },
    { id: "academic", label: "Pedagógico", icon: <BookOpen className="w-4 h-4" /> },
    { id: "financial", label: "Financeiro", icon: <CreditCard className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <PieChart className="w-4 h-4" /> },
  ];

  // Mock data for the chart if real data is empty
  const chartData = financialData?.recentPayments?.map((p: any) => ({
    name: new Date(p.created_at).toLocaleDateString(),
    amount: Number(p.amount_paid)
  })) || [];

  return (
    <DashboardLayout>
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Olá, <span className="text-gradient">Director</span>
          </h1>
          <p className="text-white/50 text-lg">
            Aqui está o resumo da sua escola hoje.
          </p>
        </div>
        
        <ModernTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Analytics Card */}
          <div className="lg:col-span-2 glass-card p-10 rounded-[3rem]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold capitalize">{activeTab} Principal</h2>
              <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-bold uppercase tracking-widest">
                Live Data
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              {isFinancialLoading ? (
                <div className="h-full w-full flex items-center justify-center text-white/20">Carregando dados...</div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} MT`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#121214", border: "1px solid #ffffff10", borderRadius: "16px" }}
                      itemStyle={{ color: "#10b981" }}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                      {chartData.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? "#10b981" : "#10b98140"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-white/20 gap-4">
                  <PieChart className="w-12 h-12" />
                  <p>Sem dados financeiros recentes para exibir.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Metrics */}
          <div className="space-y-8">
            <div className="glass-card p-10 rounded-[3rem] group hover:border-emerald-500/30 transition-all">
              <h3 className="text-white/50 font-medium mb-4 text-sm uppercase tracking-wider">Total Arrecadado</h3>
              <div className="text-5xl font-bold text-gradient">
                {financialData?.totalCollected?.toLocaleString() || "0"} <span className="text-xl">MT</span>
              </div>
              <p className="text-white/30 text-sm mt-3 font-light">Baseado em {financialData?.paymentCount || 0} pagamentos</p>
            </div>
            
            <div className={cn(
              "glass-card p-10 rounded-[3rem] border-white/5 transition-all",
              riskData?.length > 0 ? "border-red-500/20 bg-red-500/5" : "border-emerald-500/10"
            )}>
              <h3 className="text-white/50 font-medium mb-4 text-sm uppercase tracking-wider">Alerta Analytics</h3>
              {isRiskLoading ? (
                <p className="text-white/20 italic">Analisando desempenho...</p>
              ) : riskData?.length > 0 ? (
                <>
                  <p className="text-red-400 text-2xl font-semibold">{riskData.length} Alunos em Risco</p>
                  <div className="mt-4 space-y-2">
                    {riskData.slice(0, 2).map((student: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{student.name}</span>
                        <span className="text-red-400/80 font-bold">{Number(student.average).toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-emerald-400 text-xl font-semibold">Tudo em ordem!</p>
              )}
              <p className="text-white/30 text-sm mt-4 font-light">Média limiar: 10.0 valores</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
