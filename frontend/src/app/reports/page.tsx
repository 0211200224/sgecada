"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  FileText, 
  FileDown, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw,
  Printer,
  ChevronRight,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [activeJobs, setActiveJobs] = useState<string[]>([]);

  // Mutation to request a new report
  const requestReport = useMutation({
    mutationFn: async (type: string) => {
      const res = await api.post("/reports/request", { type });
      return res.data;
    },
    onSuccess: (data) => {
      setActiveJobs(prev => [...prev, data.jobId]);
    }
  });

  const reportTypes = [
    { id: "students_list", title: "Lista Geral de Alunos", description: "PDF com todos os alunos matriculados e seus dados básicos.", icon: FileText },
    { id: "financial_summary", title: "Extrato Financeiro Mensal", description: "Resumo de todas as entradas e pendências do mês corrente.", icon: Printer },
    { id: "performance_report", title: "Boletins de Desempenho", description: "Geração em massa de boletins por turma.", icon: FileDown },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Central de Relatórios</h1>
          <p className="text-white/40">Gere documentos oficiais e relatórios analíticos em segundo plano.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Reports */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileDown className="w-5 h-5 text-emerald-500" />
              Relatórios Disponíveis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => requestReport.mutate(report.id)}
                  disabled={requestReport.isPending}
                  className="glass-card p-6 rounded-[2rem] border-white/5 hover:border-emerald-500/30 transition-all text-left group active:scale-[0.98] disabled:opacity-50"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
                    <report.icon className="w-6 h-6 text-white/40 group-hover:text-emerald-500" />
                  </div>
                  <h3 className="font-bold mb-2">{report.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed mb-4">{report.description}</p>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Solicitar Agora <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Background Jobs Monitor */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" />
              Trabalhos em Fila
            </h2>
            
            <div className="glass-card p-8 rounded-[2.5rem] min-h-[400px] flex flex-col">
              {activeJobs.length > 0 ? (
                <div className="space-y-4">
                  {activeJobs.map((jobId) => (
                    <JobStatusItem key={jobId} jobId={jobId} />
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-white/20">
                  <RefreshCcw className="w-10 h-10 mb-4 animate-reverse-spin opacity-20" />
                  <p className="text-sm italic">Nenhum relatório está a ser processado neste momento.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Sub-component to monitor a specific job
function JobStatusItem({ jobId }: { jobId: string }) {
  const { data: status, refetch } = useQuery({
    queryKey: ["report-status", jobId],
    queryFn: async () => {
      const res = await api.get(`/reports/status/${jobId}`);
      return res.data;
    },
    refetchInterval: (query) => (query.state.data?.status === "completed" ? false : 3000),
  });

  const isCompleted = status?.status === "completed";
  const isFailed = status?.status === "failed";

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/30">ID: {jobId.slice(0, 10)}...</span>
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : isFailed ? (
          <AlertCircle className="w-4 h-4 text-red-500" />
        ) : (
          <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
        )}
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs font-bold capitalize">{status?.type?.replace("_", " ") || "Processando..."}</span>
        <div className="mt-2 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isCompleted ? "100%" : "45%" }}
            className={cn("h-full", isFailed ? "bg-red-500" : "bg-emerald-500")} 
          />
        </div>
      </div>

      {isCompleted && (
        <button className="mt-2 w-full py-2 bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
          Baixar Relatório
        </button>
      )}
    </div>
  );
}
