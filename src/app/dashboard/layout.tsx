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
  Compass,
  Menu,
  X,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t, language } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t.navDashboard, href: "/dashboard", icon: LayoutDashboard },
    { name: t.navInventory, href: "/dashboard/inventory", icon: Layers },
    { name: t.navStudents, href: "/dashboard/students", icon: Users },
    { name: t.navFees, href: "/dashboard/fees", icon: Receipt },
    { name: t.navStaff, href: "/dashboard/staff", icon: UserCheck },
    { name: t.navExpenses, href: "/dashboard/expenses", icon: TrendingDown },
    { name: t.navReports, href: "/dashboard/reports", icon: PieChart },
    { name: t.navVisitorsLaundry, href: "/dashboard/visitors-laundry", icon: Shirt },
    { name: t.navPermissions, href: "/dashboard/permissions", icon: ShieldAlert },
    { name: t.navSettings, href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* Top Enterprise Navigation Bar */}
      <header className="border-b border-border bg-canvas-surface sticky top-0 z-40 h-16 flex items-center px-4 sm:px-6 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border border-border text-ink-muted hover:text-ink"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-brass flex items-center justify-center font-serif font-bold text-brass text-[11px]">
              {hostelConfig.identity.monogram}
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-caption font-bold text-ink uppercase tracking-wider block leading-none">
                {hostelConfig.identity.name}
              </span>
              <span className="text-[10px] font-mono text-ink-muted">
                Commercial ERP Directorate
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Multi-Property Branch Switcher */}
          <BranchSwitcher />

          {/* Bilingual English / Urdu Toggle */}
          <LanguageSwitcher />

          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-caption hover:bg-canvas-subtle transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-brass" />
            <span>Showcase</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-border">
            <div className="w-7 h-7 rounded-full bg-brass/10 border border-brass/40 flex items-center justify-center text-brass font-mono text-[11px] font-bold">
              WA
            </div>
            <div className="text-left">
              <span className="text-[11px] font-medium text-ink block leading-none">
                Maj. (R) Tariq
              </span>
              <span className="text-[9px] font-mono text-brass block">
                Chief Warden
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border bg-canvas-surface p-4 space-y-1 shrink-0 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-mono text-ink-muted uppercase tracking-widest">
            Core ERP Modules
          </div>

          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const IconComp = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-caption transition-colors ${
                  isActive
                    ? "bg-brass-light border border-brass/40 text-ink font-medium"
                    : "text-ink-muted hover:text-ink hover:bg-canvas-subtle"
                }`}
              >
                <IconComp
                  className={`w-4 h-4 stroke-[1.25] ${
                    isActive ? "text-brass" : "text-zinc-500"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="mt-auto pt-6 border-t border-border space-y-2">
            <div className="p-3 bg-canvas-subtle border border-border text-[11px] text-ink-muted space-y-1">
              <div className="flex items-center gap-1.5 text-brass font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Exposure Protected</span>
              </div>
              <p className="leading-tight">
                Strict 256-bit session cookies with Cloudflare Turnstile bot shielding.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 flex">
            <aside className="w-72 bg-canvas-surface border-r border-border p-4 space-y-1 h-full overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-border">
                <span className="font-serif text-subhead font-medium text-ink">
                  ERP Navigation
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 border border-border text-ink-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const IconComp = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-caption transition-colors ${
                      isActive
                        ? "bg-brass-light border border-brass/40 text-ink font-medium"
                        : "text-ink-muted hover:text-ink hover:bg-canvas-subtle"
                    }`}
                  >
                    <IconComp
                      className={`w-4 h-4 stroke-[1.25] ${
                        isActive ? "text-brass" : "text-zinc-500"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </aside>
            <div
              className="flex-1"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
