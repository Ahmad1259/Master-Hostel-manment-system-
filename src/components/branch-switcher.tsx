"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../lib/store";
import { Building2, ChevronDown, Check, MapPin } from "lucide-react";

export function BranchSwitcher() {
  const { currentBranchId, setCurrentBranchId, branches, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeBranch = branches.find((b) => b.id === currentBranchId) || branches[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 border border-border bg-canvas-surface hover:bg-canvas-subtle transition-colors text-left"
        title="Switch Hostel Branch"
      >
        <Building2 className="w-3.5 h-3.5 text-brass stroke-[1.25]" />
        <div className="hidden sm:block">
          <p className="text-micro font-mono text-ink-muted uppercase leading-none">
            Facility Branch
          </p>
          <p className="text-caption font-medium text-ink truncate max-w-44 leading-tight">
            {language === "ur" ? activeBranch.nameUrdu : activeBranch.name}
          </p>
        </div>
        <ChevronDown className="w-3 h-3 text-ink-muted ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-72 bg-canvas-surface border border-border shadow-xl z-50 p-1 space-y-1">
          <div className="px-3 py-2 border-b border-border text-micro font-mono text-ink-muted uppercase">
            Switch Commercial Property
          </div>

          {branches.map((branch) => {
            const isSelected = branch.id === currentBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => {
                  setCurrentBranchId(branch.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2.5 transition-colors flex items-start justify-between ${
                  isSelected ? "bg-brass-light border border-brass/40" : "hover:bg-canvas-subtle"
                }`}
              >
                <div>
                  <p className="text-caption font-medium text-ink leading-tight">
                    {language === "ur" ? branch.nameUrdu : branch.name}
                  </p>
                  <p className="text-micro text-ink-muted flex items-center gap-1 mt-1 font-mono">
                    <MapPin className="w-3 h-3 text-brass" />
                    <span>
                      {branch.city} • {branch.totalRooms} Suites ({branch.totalBeds} Beds)
                    </span>
                  </p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brass stroke-[2] shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
