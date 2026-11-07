"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import hostelConfig from "../../../hostel.config";
import { useApp } from "../../lib/store";
import { BranchSwitcher } from "../../components/branch-switcher";
import { LanguageSwitcher } from "../../components/language-switcher";
import {
  LayoutDashboard,
  Layers,
  Users,
  Receipt,
  UserCheck,
  TrendingDown,
  PieChart,
  Shirt,
  ShieldAlert,
  Settings,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Room Inventory", href: "/dashboard/inventory", icon: Layers },
    { name: "Resident Registry", href: "/dashboard/students", icon: Users },
    { name: "Fee Invoices & Challans", href: "/dashboard/fees", icon: Receipt },
    { name: "Staff & Payroll", href: "/dashboard/staff", icon: UserCheck },
    { name: "Expenses & Ancillary", href: "/dashboard/expenses", icon: TrendingDown },
    { name: "Financial P&L Reports", href: "/dashboard/reports", icon: PieChart },
    { name: "Visitors & Laundry", href: "/dashboard/visitors-laundry", icon: Shirt },
    { name: "Staff Permissions", href: "/dashboard/permissions", icon: ShieldAlert },
    { name: "Hostel Configuration", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 h-16 flex items-center px-4 sm:px-6 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {hostelConfig.identity.monogram}
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm text-slate-900 block leading-tight">
                {hostelConfig.identity.name}
              </span>
              <span className="text-xs text-slate-500">
                ERP Management Console
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Multi-Property Branch Switcher */}
          <BranchSwitcher />

          {/* Bilingual Switcher */}
          <LanguageSwitcher />

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span>Live Showcase</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-xs font-bold">
              WT
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold text-slate-900 block leading-none">
                Maj. (R) Tariq
              </span>
              <span className="text-[11px] text-slate-500 block">
                Chief Warden
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white p-4 space-y-1 shrink-0 overflow-y-auto">
          <span className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Navigation
          </span>

          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const IconComp = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <IconComp
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-blue-600" : "text-slate-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      {hostelConfig.identity.monogram}
                    </div>
                    <span className="font-bold text-sm text-slate-900">
                      ERP Modules
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const IconComp = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-bold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
                >
                  Return to Live Showcase
                </Link>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
