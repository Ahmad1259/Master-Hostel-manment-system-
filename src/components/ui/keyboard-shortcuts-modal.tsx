"use client";

import React, { useState, useEffect } from "react";
import { Keyboard, X } from "lucide-react";

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "?" || ((e.ctrlKey || e.metaKey) && e.key === "/")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const shortcuts = [
    { key: "Ctrl + K / Cmd + K", desc: "Open Universal Command Palette" },
    { key: "? or Ctrl + /", desc: "Toggle Keyboard Shortcuts reference" },
    { key: "Esc", desc: "Close modals, drawers and overlays" },
    { key: "Alt + S", desc: "Quick Jump to Students Registry" },
    { key: "Alt + R", desc: "Quick Jump to Rooms Inventory" },
    { key: "Alt + P", desc: "Quick Jump to Fee Challans & Payments" },
    { key: "Alt + M", desc: "Quick Jump to Mess Operations" },
    { key: "Alt + C", desc: "Quick Jump to Complaints Ledger" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-500">Power navigation for hostel wardens</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
          {shortcuts.map((sc, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-xs">
              <span className="text-slate-600">{sc.desc}</span>
              <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded font-mono font-semibold text-[11px] text-slate-800">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
