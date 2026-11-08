"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import hostelConfig from "../../../hostel.config";
import { useApp } from "../../lib/store";
import { BranchSwitcher } from "../../components/branch-switcher";
import { LanguageSwitcher } from "../../components/language-switcher";
import { CommandPalette } from "../../components/ui/command-palette";
import { KeyboardShortcutsModal } from "../../components/ui/keyboard-shortcuts-modal";
import { OnboardingWizard } from "../../components/ui/onboarding-wizard";
import { TierBadge } from "../../components/ui/tier-badge";
import { ToastNotification } from "../../components/ui/toast-notification";
import { NetworkRecoveryBanner } from "../../components/ui/network-recovery-banner";
import {
  LayoutDashboard,
  Layers,
  Users,
  Receipt,
  Utensils,
  AlertCircle,
  FileText,
  UserCheck,
  TrendingDown,
  PieChart,
  Share2,
  Settings,
  Menu,
  X,
  ExternalLink,
  Search,
  Sparkles,
  Wifi,
  WifiOff,
  Keyboard,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t, isOffline, setIsOffline, setIsOnboardingOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Rooms & Beds", href: "/dashboard/inventory", icon: Layers },
    { name: "Students", href: "/dashboard/students", icon: Users },
    { name: "Payments / Rent", href: "/dashboard/fees", icon: Receipt },
    { name: "Mess Management", href: "/dashboard/mess", icon: Utensils },
    { name: "Complaints", href: "/dashboard/complaints", icon: AlertCircle },
    { name: "Visitors Log", href: "/dashboard/visitors", icon: FileText },
    { name: "Staff & Payroll", href: "/dashboard/staff", icon: UserCheck },
    { name: "Financial Reports", href: "/dashboard/reports", icon: PieChart },
    { name: "Referrals & Affiliate", href: "/dashboard/referrals", icon: Share2 },
    { name: "Hostel Configuration", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Global Offline Error Recovery Banner */}
      <NetworkRecoveryBanner />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette />

      {/* Global Keyboard Shortcuts Modal (?) */}
      <KeyboardShortcutsModal />

      {/* 3-Step Onboarding Data Capture Wizard */}
      <OnboardingWizard />

      {/* Global Toast Feedback */}
      <ToastNotification />

      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 h-16 flex items-center px-4 sm:px-6 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {hostelConfig.identity.monogram}
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-gray-900 block leading-tight">
                {hostelConfig.identity.name}
              </span>
              <span className="text-[10px] text-gray-500 font-mono block">
                SaaS ERP Core v2.0 • Punjab Police Form 15 Verified
              </span>
            </div>
          </Link>

          <div className="hidden md:block h-5 w-px bg-slate-200 mx-1" />

          {/* Quick Command Palette Search Button */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
              );
            }}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search resident, room, invoice...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white border border-slate-200 rounded text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5">
          <BranchSwitcher />

          <TierBadge />

          {/* Offline simulator toggle button */}
          <button
            type="button"
            onClick={() => setIsOffline(!isOffline)}
            className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              isOffline
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
            title={isOffline ? "Currently Offline (Click to go Online)" : "Simulate Offline Mode"}
          >
            {isOffline ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
          </button>

          <LanguageSwitcher />

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-700 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </Link>
        </div>
      </header>

      {/* Main Persistent Layout Body */}
      <div className="flex flex-1">
        {/* Persistent Desktop Sidebar Navigation (UX Pattern #4) */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 bg-white p-4 justify-between shrink-0 min-h-[calc(100vh-4rem)]">
          <div className="space-y-6">
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Operational Modules
              </p>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-emerald-700" : "text-gray-400"
                        }`}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Wizard Launcher Card */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-900">
                  Hostel Onboarding
                </span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                Quick 3-step setup for new hostel properties &amp; student batches.
              </p>
              <button
                type="button"
                onClick={() => setIsOnboardingOpen(true)}
                className="w-full mt-1 text-center py-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-semibold rounded-lg transition-colors shadow-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                Launch 3-Step Wizard
              </button>
            </div>

            {/* Statutory Compliance Links */}
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1.5 text-[11px]">
              <span className="font-bold text-emerald-900 block">Pakistan Legal Compliance</span>
              <div className="flex flex-col gap-1 text-gray-600">
                <Link href="/privacy" className="hover:text-emerald-800 underline">Privacy &amp; CNIC Protection</Link>
                <Link href="/terms" className="hover:text-emerald-800 underline">Residency Bylaws</Link>
                <Link href="/refund" className="hover:text-emerald-800 underline">Security Deposit Policy</Link>
                <Link href="/cookies" className="hover:text-emerald-800 underline">Cookie Disclosures</Link>
              </div>
            </div>
          </div>

          {/* Sidebar Footer info */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>Press <kbd className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-600">?</kbd> for help</span>
            <span className="font-mono">v2.1.0 (PK)</span>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-white border-r border-slate-200 p-4 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">
                    Hostel SaaS Modules
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-bold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-blue-600" : "text-slate-400"
                          }`}
                        />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsOnboardingOpen(true);
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Launch Setup Wizard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
