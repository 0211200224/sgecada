"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Link2, 
  User, 
  BookOpen, 
  DoorOpen, 
  Plus, 
  ChevronRight, 
  Loader2,
  Trash2,
  CheckCircle2,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AssociationsPage() {
  const [activeTab, setActiveTab] = useState("teachers");
  const queryClient = useQueryClient();

  // Fetch Data
  const { data: teachers } = useQuery({ queryKey: ["employees"], queryFn: () => api.get("/hr/employees").then(res => res.data) });
  const { data: classes } = useQuery({ queryKey: ["classes"], queryFn: () => api.get("/pedagogical/classes").then(res => res.data) });
  const { data: subjects } = useQuery({ queryKey: ["subjects"], queryFn: () => api.get("/pedagogical/subjects").then(res => res.data) });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 italic">Matriz de <span className="text-emerald-500">Alocação</span></h1>
            <p className="text-white/40">Relacione professores, turmas, disciplinas e salas de aula.</p>
          </div>
          
          <div className="flex gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2 active:scale-95">
              <Plus className="w-5 h-5" />
              Nova Associação
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/5">
          {[
            { id: "teachers", label: "Professores ↔ Disciplinas", icon: User },
            { id: "rooms", label: "Turmas ↔ Salas", icon: DoorOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-4 flex items-center gap-2 text-sm font-bold transition-all relative",
                activeTab === tab.id ? "text-emerald-500" : "text-white/30 hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === "teachers" ? (
                <motion.div key="teachers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  {classes?.map((cls: any) => (
                    <div key={cls.id} className="glass-card rounded-[2.5rem] overflow-hidden">
                      <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Users className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div>
                            <h3 className="font-bold">{cls.name}</h3>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest">{cls.grade_level}º Ano • {cls.period}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-white/20 hover:text-emerald-500">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-6 space-y-3">
                        {/* Placeholder for real associations */}
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                          <div className="flex items-center gap-10">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-white/30 uppercase font-bold mb-1">Disciplina</span>
                              <span className="text-sm font-semibold">Matemática</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link2 className="w-4 h-4 text-emerald-500/50" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-white/30 uppercase font-bold mb-1">Professor</span>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px]">A</div>
                                <span className="text-sm">Alberto Manuel</span>
                              </div>
                            </div>
                          </div>
                          <button className="p-2 text-white/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="rooms" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((room) => (
                    <div key={room} className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-emerald-500/30 transition-all group">
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-500/10 transition-colors">
                          <DoorOpen className="w-6 h-6 text-white/20 group-hover:text-emerald-500" />
                        </div>
                        <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-white/30">CAPACIDADE: 40</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Sala 0{room}</h3>
                      <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold bg-emerald-500/10 w-fit px-3 py-1 rounded-lg">
                        <CheckCircle2 className="w-3 h-3" />
                        OCUPADA: 10ª A
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3 italic">
              Legenda <span className="text-emerald-500">Rápida</span>
            </h2>
            <div className="glass-card p-8 rounded-[3rem] space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  <span className="text-xs text-white/50">Professor alocado com sucesso</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
                  <span className="text-xs text-white/50">Disciplina sem professor atribuído</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                  <span className="text-xs text-white/50">Conflito de horário detetado</span>
                </div>
              </div>
              <hr className="border-white/5" />
              <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <p className="text-[10px] leading-relaxed text-emerald-500/60 font-medium italic">
                  "Dica: Utilize a Matriz de Alocação para garantir que nenhum professor tem cargas horárias sobrepostas."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
