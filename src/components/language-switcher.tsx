"use client";

import React from "react";
import { useApp } from "../lib/store";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useApp();

  const handleToggle = () => {
    setLanguage(language === "en" ? "ur" : "en");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800 shadow-xs"
      title={language === "en" ? "Switch to Urdu (اردو)" : "Switch to English"}
    >
      <Languages className="w-3.5 h-3.5 text-blue-600" />
      <span>{language === "en" ? "اردو" : "English"}</span>
    </button>
  );
}
