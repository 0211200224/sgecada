"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, School, User, Mail, Lock, Building, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

import api from "@/lib/api";
import { useAuth } from "@/context/auth-context";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    school_name: "",
    subdomain: "",
    director_name: "",
    email: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/register", formData);
      const { access_token, user } = response.data;
      login(access_token, user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao registar escola. Tente outro subdomínio.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 bg-emerald-500/10 rounded-2xl items-center justify-center border border-emerald-500/20 mb-6">
            <School className="text-emerald-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Registe a sua Escola</h1>
          <p className="text-white/40">Junte-se à nova era da gestão escolar digital</p>
        </div>

        {/* Multi-step indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                step === i ? "w-8 bg-emerald-500" : "w-2 bg-white/10"
              )} 
            />
          ))}
        </div>

        <div className="glass-card p-10 rounded-[2.5rem]">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-500" />
                Dados da Instituição
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Nome da Escola</label>
                  <input 
                    type="text" 
                    value={formData.school_name}
                    onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                    placeholder="Ex: Escola Secundária de Maputo"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Subdomínio (Exclusivo)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={formData.subdomain}
                      onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                      placeholder="maputo-edu"
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                    <span className="text-white/30 font-medium">.sgecada.edu</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={nextStep}
                disabled={!formData.school_name || !formData.subdomain}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2"
              >
                Próximo Passo
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-500" />
                Dados do Director
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Nome Completo</label>
                  <input 
                    type="text" 
                    value={formData.director_name}
                    onChange={(e) => setFormData({ ...formData, director_name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Email do Director</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="director@escola.edu"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Palavra-passe</label>
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-2xl transition-all"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleRegister}
                  className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Criar Sistema"}
                </button>
              </div>
            </motion.div>
          )}

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-white/30 text-sm">
              Já registou a sua escola? <Link href="/auth/login" className="text-emerald-500 font-semibold hover:underline">Faça Login</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Utility to merge classes (since this is a standalone file for now)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
