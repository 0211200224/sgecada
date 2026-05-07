"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  FilePlus, 
  Upload, 
  User, 
  Camera, 
  CheckCircle2, 
  FileText,
  AlertCircle,
  Loader2,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SecretariatPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: 'photos' | 'docs') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (folder === 'photos') setPhotoUrl(res.data.url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Secretaria Académica</h1>
            <p className="text-white/40">Gestão de matrículas, documentação e dossiês estudantis.</p>
          </div>
          
          <div className="flex items-center gap-4 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Ano Letivo</span>
              <span className="text-sm font-bold">2026</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form Stepper */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-10 rounded-[3rem]">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <FilePlus className="w-6 h-6 text-emerald-500" />
                  Nova Matrícula
                </h2>
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={cn("h-1.5 rounded-full transition-all duration-500", activeStep === s ? "w-8 bg-emerald-500" : "w-2 bg-white/10")} />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500/50">
                          {photoUrl ? (
                            <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="w-10 h-10 text-white/10 group-hover:text-emerald-500 transition-colors" />
                          )}
                        </div>
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={(e) => handleFileUpload(e, 'photos')} 
                        />
                        {uploading && <div className="absolute inset-0 bg-black/60 rounded-[2.5rem] flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-emerald-500" /></div>}
                      </div>
                      <p className="text-xs text-white/30 font-medium">Foto de Perfil (Obrigatório)</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Nome Completo</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/50 outline-none" placeholder="Ex: João Alberto" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Data de Nascimento</label>
                        <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/50 outline-none" />
                      </div>
                    </div>

                    <button onClick={() => setActiveStep(2)} className="w-full bg-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all">
                      Continuar <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h3 className="text-lg font-semibold mb-4">Documentação Obrigatória</h3>
                    <div className="space-y-4">
                      {["Bilhete de Identidade", "Certificado de Habilitações", "Atestado Médico"].map((doc) => (
                        <div key={doc} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-xl"><FileText className="w-5 h-5 text-white/30" /></div>
                            <span className="font-medium text-sm">{doc}</span>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                            <Upload className="w-3 h-3" /> Upload
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setActiveStep(1)} className="flex-1 bg-white/5 py-4 rounded-2xl font-bold">Voltar</button>
                      <button onClick={() => setActiveStep(3)} className="flex-[2] bg-emerald-500 py-4 rounded-2xl font-bold">Próximo</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Dossiê Status */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <ClipboardList className="w-6 h-6 text-emerald-500" />
              Pendências
            </h2>
            <div className="glass-card p-8 rounded-[3rem] space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">João Mutola</span>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-[10px] text-red-400/60 uppercase font-bold tracking-widest">BI em falta</span>
                </div>
              ))}
              <p className="text-xs text-white/20 text-center mt-4 italic">Ver todos os dossiês incompletos</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
