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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-colors text-left shadow-xs"
        title="Switch Hostel Branch"
      >
        <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
        <div className="hidden sm:block">
          <p className="text-[10px] font-semibold text-slate-400 uppercase leading-none">
            Campus
          </p>
          <p className="text-xs font-semibold text-slate-800 truncate max-w-36 leading-tight mt-0.5">
            {language === "ur" ? activeBranch.nameUrdu : activeBranch.name}
          </p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-1.5 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Switch Campus Property
          </div>

          {branches.map((branch) => {
            const isSelected = branch.id === currentBranchId;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => {
                  setCurrentBranchId(branch.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start justify-between ${
                  isSelected ? "bg-blue-50 text-blue-900" : "hover:bg-slate-50 text-slate-800"
                }`}
              >
                <div>
                  <p className="text-xs font-bold leading-tight">
                    {language === "ur" ? branch.nameUrdu : branch.name}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>
                      {branch.city} • {branch.totalRooms} Rooms ({branch.totalBeds} Beds)
                    </span>
                  </p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
