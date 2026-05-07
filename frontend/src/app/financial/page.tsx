"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  MoreHorizontal,
  DollarSign,
  Download,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FinancialPage() {
  // Fetch Payments
  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await api.get("/financial/payments");
      return res.data;
    },
  });

  // Fetch Summary for cards
  const { data: summary } = useQuery({
    queryKey: ["financial-summary-analytics"],
    queryFn: async () => {
      const res = await api.get("/analytics/financial-summary");
      return res.data;
    },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Financeiro</h1>
            <p className="text-white/40">Gestão de receitas, propinas e fluxo de caixa.</p>
          </div>
          
          <div className="flex gap-4">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Registrar Pagamento
            </button>
          </div>
        </header>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-transparent">
            <div className="flex items-center gap-3 text-emerald-500 mb-4">
              <ArrowUpRight className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Total Recebido</span>
            </div>
            <div className="text-4xl font-bold mb-2">
              {summary?.totalCollected?.toLocaleString() || "0"} <span className="text-xl text-white/30 font-normal">MT</span>
            </div>
            <p className="text-white/30 text-sm">Este mês: +12% vs mês anterior</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Pendente</span>
            </div>
            <div className="text-4xl font-bold mb-2">
              45.200 <span className="text-xl text-white/30 font-normal">MT</span>
            </div>
            <p className="text-white/30 text-sm">8 faturas aguardando liquidação</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-3 text-purple-400 mb-4">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Transações</span>
            </div>
            <div className="text-4xl font-bold mb-2">
              {summary?.paymentCount || "0"}
            </div>
            <p className="text-white/30 text-sm">Pagamentos processados com sucesso</p>
          </motion.div>
        </div>

        {/* Transactions Table */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Histórico de Transações</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">Tudo</button>
              <button className="px-4 py-2 text-white/40 rounded-xl text-xs font-bold hover:bg-white/5 transition-all">Recebido</button>
              <button className="px-4 py-2 text-white/40 rounded-xl text-xs font-bold hover:bg-white/5 transition-all">Pendente</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">ID / Data</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Estudante</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Valor Pago</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Status</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-8 py-6 h-16 bg-white/[0.01]" />
                    </tr>
                  ))
                ) : payments?.length > 0 ? (
                  payments.map((payment: any) => (
                    <tr key={payment.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-mono text-white/60">#{payment.id.slice(0, 8)}</span>
                          <span className="text-xs text-white/20">{new Date(payment.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs font-bold">
                            {payment.student?.first_name?.[0] || "S"}
                          </div>
                          <span className="text-sm font-medium">
                            {payment.student ? `${payment.student.first_name} ${payment.student.last_name}` : "Estudante Externo"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-bold text-white/80">{Number(payment.amount_paid).toLocaleString()} MT</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span className="text-[10px] font-bold uppercase text-emerald-500 tracking-wider">Liquidado</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-white/20 hover:text-white">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-white/20 italic">
                      Nenhuma transação registrada até o momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
