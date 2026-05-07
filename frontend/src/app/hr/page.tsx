"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Users, 
  Wallet, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Loader2,
  ChevronRight,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HRPage() {
  const [activeSubTab, setActiveSubTab] = useState("employees");
  const queryClient = useQueryClient();

  // Fetch Employees
  const { data: employees, isLoading: isEmpLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/hr/employees");
      return res.data;
    },
  });

  // Fetch Payroll
  const { data: payrolls, isLoading: isPayrollLoading } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      const res = await api.get("/hr/payroll");
      return res.data;
    },
  });

  // Generate Payroll Mutation
  const generatePayroll = useMutation({
    mutationFn: async () => {
      const now = new Date();
      return api.post("/hr/payroll/generate", { 
        month: now.getMonth() + 1, 
        year: now.getFullYear() 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payrolls"] });
    }
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Recursos Humanos</h1>
            <p className="text-white/40">Gira a sua equipa docente e administrativa e processe salários.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => generatePayroll.mutate()}
              disabled={generatePayroll.isPending}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              {generatePayroll.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wallet className="w-5 h-5 text-emerald-500" />}
              Processar Salários
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Novo Contrato
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/5 to-transparent">
            <div className="flex items-center gap-3 text-white/30 mb-4 text-xs font-bold uppercase tracking-widest">
              <Users className="w-4 h-4 text-emerald-500" />
              Total Colaboradores
            </div>
            <div className="text-4xl font-bold">{employees?.length || 0}</div>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-3 text-white/30 mb-4 text-xs font-bold uppercase tracking-widest">
              <Briefcase className="w-4 h-4 text-blue-500" />
              Cargos Ativos
            </div>
            <div className="text-4xl font-bold">12</div>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-3 text-white/30 mb-4 text-xs font-bold uppercase tracking-widest">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Massa Salarial
            </div>
            <div className="text-3xl font-bold">345.000 <span className="text-sm font-normal opacity-30">MT</span></div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 p-1.5 bg-white/5 w-fit rounded-2xl border border-white/5">
            <button 
              onClick={() => setActiveSubTab("employees")}
              className={cn("px-6 py-2 rounded-xl text-sm font-bold transition-all", activeSubTab === "employees" ? "bg-emerald-500 text-white" : "text-white/40 hover:text-white")}
            >
              Equipa
            </button>
            <button 
              onClick={() => setActiveSubTab("payroll")}
              className={cn("px-6 py-2 rounded-xl text-sm font-bold transition-all", activeSubTab === "payroll" ? "bg-emerald-500 text-white" : "text-white/40 hover:text-white")}
            >
              Histórico Salarial
            </button>
          </div>

          <div className="glass-card rounded-[2.5rem] overflow-hidden">
            <AnimatePresence mode="wait">
              {activeSubTab === "employees" ? (
                <motion.div key="employees" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/[0.01] border-b border-white/5">
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Colaborador</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Cargo</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Salário Base</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {isEmpLoading ? (
                        [...Array(3)].map((_, i) => <tr key={i} className="h-20 animate-pulse bg-white/[0.01]" />)
                      ) : employees?.map((emp: any) => (
                        <tr key={emp.id} className="hover:bg-white/[0.01] transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 font-bold">
                                {emp.full_name[0]}
                              </div>
                              <span className="font-semibold">{emp.full_name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-sm text-white/60 capitalize">{emp.position}</td>
                          <td className="px-8 py-5 font-mono text-sm">{Number(emp.base_salary).toLocaleString()} MT</td>
                          <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-500 uppercase">Ativo</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              ) : (
                <motion.div key="payroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/[0.01] border-b border-white/5">
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Mês / Ano</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Colaborador</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Líquido</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {isPayrollLoading ? (
                        [...Array(3)].map((_, i) => <tr key={i} className="h-20 animate-pulse bg-white/[0.01]" />)
                      ) : payrolls?.length > 0 ? (
                        payrolls.map((pay: any) => (
                          <tr key={pay.id} className="hover:bg-white/[0.01] transition-colors">
                            <td className="px-8 py-5 font-medium">{pay.month}/{pay.year}</td>
                            <td className="px-8 py-5 text-sm">{pay.employee?.full_name}</td>
                            <td className="px-8 py-5 font-mono font-bold text-emerald-500">{Number(pay.net_salary).toLocaleString()} MT</td>
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-2 text-white/30 text-xs">
                                <Clock className="w-3 h-3" />
                                <span>Pendente</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center text-white/20 italic">Nenhuma folha de pagamento gerada.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
