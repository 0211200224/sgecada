"use client";

import React from "react";
import { Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Topbar() {
  return (
    <header className="h-20 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input 
          type="text" 
          placeholder="Pesquisar estudantes, notas ou faturas..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-all text-white/50 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#09090b]" />
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Emerson Eldito</p>
            <p className="text-xs text-white/40">Director de Escola</p>
          </div>
          <button className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:border-emerald-500/50 transition-all group">
            <User className="w-5 h-5 text-white/40 group-hover:text-emerald-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
