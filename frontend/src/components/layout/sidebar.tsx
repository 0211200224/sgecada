"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  PieChart,
  Settings,
  LogOut,
  GraduationCap
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Estudantes", href: "/students" },
  { icon: BookOpen, label: "Pedagógico", href: "/pedagogical" },
  { icon: CreditCard, label: "Financeiro", href: "/financial" },
  { icon: PieChart, label: "Analytics", href: "/analytics" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 z-50 flex flex-col bg-[#09090b] border-r border-white/5">
      {/* Brand Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          SGE<span className="text-emerald-500">.ERP</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300",
                isActive
                  ? "text-white"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-colors z-10",
                isActive ? "text-emerald-500" : "group-hover:text-emerald-400"
              )} />
              <span className="font-medium z-10">{item.label}</span>

              {isActive && (
                <motion.div
                  layoutId="sidebarPill"
                  className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/5 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-white/40 hover:text-white/80 hover:bg-white/5 rounded-xl transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Definições</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
