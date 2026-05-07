"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Search, 
  UserPlus, 
  Filter, 
  MoreVertical, 
  GraduationCap,
  Mail,
  Calendar,
  ArrowUpDown
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await api.get("/students");
      return res.data;
    },
  });

  const filteredStudents = students?.filter((s: any) => 
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.enrollment_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header Actions */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Estudantes</h1>
            <p className="text-white/40">Gerencie a base de dados de alunos da sua instituição.</p>
          </div>
          
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2 active:scale-95">
            <UserPlus className="w-5 h-5" />
            Novo Estudante
          </button>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou número de matrícula..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            Filtros Avançados
          </button>
        </div>

        {/* Students Table Card */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Estudante</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Matrícula</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Turma</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30">Data Nasc.</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-white/30 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-8 py-6 h-20 bg-white/[0.01]" />
                    </tr>
                  ))
                ) : filteredStudents?.length > 0 ? (
                  filteredStudents.map((student: any) => (
                    <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <span className="text-emerald-500 font-bold">{student.first_name[0]}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{student.first_name} {student.last_name}</p>
                            <p className="text-xs text-white/30">ID: {student.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-mono text-white/60">{student.enrollment_number}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium">
                            {student.current_class?.name || "Sem Turma"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-white/40">
                        {student.birth_date ? new Date(student.birth_date).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-white/20 hover:text-white">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-white/20">
                      Nenhum estudante encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Mock */}
          <div className="px-8 py-5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-sm text-white/30">
            <span>Mostrando {filteredStudents?.length || 0} de {students?.length || 0} estudantes</span>
            <div className="flex gap-2">
              <button disabled className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 disabled:opacity-30">Anterior</button>
              <button disabled className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 disabled:opacity-30">Próximo</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
