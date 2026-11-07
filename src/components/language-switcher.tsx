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
      onClick={handleToggle}
      className="flex items-center gap-1.5 px-3 py-1.5 border border-border bg-canvas-surface hover:bg-canvas-subtle transition-colors text-caption font-medium text-ink"
      title={language === "en" ? "Switch to Urdu (اردو)" : "Switch to English"}
    >
      <Languages className="w-3.5 h-3.5 text-brass stroke-[1.25]" />
      <span>{language === "en" ? "اردو" : "English"}</span>
    </button>
  );
}
