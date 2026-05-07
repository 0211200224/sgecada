"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Users, 
  BookOpen, 
  ChevronRight, 
  Layers,
  BarChart3,
  PlusCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function PedagogicalPage() {
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await api.get("/pedagogical/classes");
      return res.data;
    },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Gestão Pedagógica</h1>
            <p className="text-white/40">Controle de turmas, disciplinas e desempenho académico.</p>
          </div>
          
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-500" />
            Nova Turma
          </button>
        </header>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 glass-card rounded-[2.5rem] animate-pulse" />
            ))
          ) : classes?.length > 0 ? (
            classes.map((cls: any) => (
              <motion.div 
                key={cls.id}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
                    <Layers className="text-emerald-500 group-hover:text-white w-7 h-7 transition-colors" />
                  </div>
                  <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-white/30 uppercase tracking-widest">
                    {cls.year}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-1">{cls.name}</h3>
                <p className="text-white/40 text-sm mb-6">{cls.description || "Nenhuma descrição fornecida."}</p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Users className="w-4 h-4" />
                    <span>{cls.students_count || 0} Alunos</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-semibold text-sm">
                    Ver Detalhes
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 glass-card rounded-[3rem] flex flex-col items-center justify-center text-white/20 gap-4">
              <BookOpen className="w-12 h-12" />
              <p>Ainda não existem turmas registadas nesta escola.</p>
            </div>
          )}
        </div>

        {/* Quick Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div className="glass-card p-10 rounded-[3rem] bg-gradient-to-br from-emerald-500/5 to-transparent">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-emerald-500" />
              Desempenho por Nível
            </h3>
            <div className="h-48 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-white/20 italic">
              Gráfico de distribuição de notas em breve
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-emerald-500" />
              Professores Alocados
            </h3>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                    <span className="text-sm font-medium">Professor {i + 1}</span>
                  </div>
                  <span className="text-xs text-white/30">4 Turmas</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
