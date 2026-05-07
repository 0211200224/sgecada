"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface ModernTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function ModernTabs({ tabs, activeTab, onChange, className }: ModernTabsProps) {
  return (
    <div className={cn("flex space-x-1 bg-white/5 backdrop-blur-lg p-1.5 rounded-2xl border border-white/10", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl",
            activeTab === tab.id 
              ? "text-white" 
              : "text-white/60 hover:text-white/80 hover:bg-white/5"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-emerald-500 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
