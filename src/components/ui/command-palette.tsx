"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../lib/store";
import {
  Search,
  Command,
  Users,
  Layers,
  Receipt,
  Utensils,
  AlertCircle,
  FileText,
  UserCheck,
  Share2,
  X,
  ArrowRight,
  Plus,
} from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { students, floors, feeInvoices, complaints, setIsOnboardingOpen } = useApp();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  interface CommandItem {
    label: string;
    category: string;
    href: string;
    meta?: string;
    icon: any;
  }

  // Aggregate searchable items
  const navigationItems: CommandItem[] = [
    { label: "Dashboard Overview", category: "Navigation", href: "/dashboard", icon: Command },
    { label: "Rooms & Chambers Inventory", category: "Navigation", href: "/dashboard/inventory", icon: Layers },
    { label: "Students Registry", category: "Navigation", href: "/dashboard/students", icon: Users },
    { label: "Fee Invoices & Challans", category: "Navigation", href: "/dashboard/fees", icon: Receipt },
    { label: "Mess & Dining Operations", category: "Navigation", href: "/dashboard/mess", icon: Utensils },
    { label: "Maintenance Complaints", category: "Navigation", href: "/dashboard/complaints", icon: AlertCircle },
    { label: "Visitors & Ancillary Log", category: "Navigation", href: "/dashboard/visitors", icon: FileText },
    { label: "Staff & Payroll Roster", category: "Navigation", href: "/dashboard/staff", icon: UserCheck },
    { label: "Financial & Occupancy Reports", category: "Navigation", href: "/dashboard/reports", icon: FileText },
    { label: "Affiliate & Partner Program", category: "Navigation", href: "/dashboard/referrals", icon: Share2 },
  ];

  const studentItems: CommandItem[] = students.map((s) => ({
    label: `${s.name} (Room ${s.roomNumber} - ${s.bedLabel})`,
    category: "Residents",
    href: "/dashboard/students",
    meta: `CNIC: ${s.cnic} • Arrears: Rs ${s.pendingArrears}`,
    icon: Users,
  }));

  const roomItems: CommandItem[] = [];
  floors.forEach((f) => {
    f.rooms.forEach((r) => {
      const occupied = r.beds.filter((b) => b.status === "OCCUPIED").length;
      roomItems.push({
        label: `Room ${r.roomNumber} • ${r.type} (${f.name})`,
        category: "Chambers",
        href: "/dashboard/inventory",
        meta: `${occupied}/${r.capacity} Beds Occupied • Rs ${r.monthlyRate.toLocaleString()}/mo`,
        icon: Layers,
      });
    });
  });

  const complaintItems: CommandItem[] = complaints.map((c) => ({
    label: `[${c.category}] ${c.title} (Room ${c.roomNumber})`,
    category: "Complaints",
    href: "/dashboard/complaints",
    meta: `Status: ${c.status} • Priority: ${c.priority}`,
    icon: AlertCircle,
  }));

  const allItems: CommandItem[] = [...navigationItems, ...studentItems, ...roomItems, ...complaintItems];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item.meta && item.meta.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : navigationItems.slice(0, 6);

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    router.push(item.href);
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
            placeholder="Type a command or search student, room, complaint..."
            className="w-full text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-blue-900 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <p className="truncate">{item.label}</p>
                      {item.meta && (
                        <p className="text-[11px] text-slate-400 font-normal truncate">
                          {item.meta}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 shrink-0">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsOnboardingOpen(true);
            }}
            className="text-blue-600 hover:underline font-semibold"
          >
            Launch Onboarding Wizard
          </button>
        </div>
      </div>
    </div>
  );
}
