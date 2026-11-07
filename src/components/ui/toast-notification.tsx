"use client";

import React from "react";
import { useApp } from "../../lib/store";
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from "lucide-react";

export function ToastNotification() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    info: Info,
    error: AlertCircle,
  };

  const colors = {
    success: "bg-slate-900 text-white border-slate-800",
    warning: "bg-amber-800 text-white border-amber-700",
    info: "bg-blue-900 text-white border-blue-800",
    error: "bg-red-900 text-white border-red-800",
  };

  const Icon = icons[toast.type || "success"] || CheckCircle2;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-xs font-medium max-w-sm ${
          colors[toast.type || "success"]
        }`}
      >
        <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="flex-1 leading-snug">{toast.message}</span>
      </div>
    </div>
  );
}
