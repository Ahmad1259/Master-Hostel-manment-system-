"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../lib/store";
import { formatCurrency, formatDate } from "../../lib/utils";
import {
  Users,
  Layers,
  Receipt,
  TrendingDown,
  TrendingUp,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  DoorOpen,
  DollarSign,
  PlusCircle,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const {
    t,
    currentBranch,
    floors,
    students,
    feeInvoices,
    expenses,
    auxiliaryIncome,
  } = useApp();

  // Compute live real-time metrics
  let totalBeds = 0;
  let occupiedBeds = 0;
  floors.forEach((f) => {
    f.rooms.forEach((r) => {
      totalBeds += r.capacity;
      occupiedBeds += r.beds.filter((b) => b.status === "OCCUPIED").length;
    });
  });

  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const totalBilling = feeInvoices.reduce((acc, inv) => acc + inv.totalDue, 0);
  const totalCollected = feeInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const pendingArrears = feeInvoices.reduce((acc, inv) => acc + inv.balanceDues, 0);

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const totalAuxiliary = auxiliaryIncome.reduce((acc, aux) => acc + aux.amount, 0);
  const grossInflow = totalCollected + totalAuxiliary;
  const netSurplus = grossInflow - totalExpenses;

  const activeStudentsCount = students.filter((s) => s.status === "ACTIVE").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            {currentBranch.city} • {currentBranch.name}
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.overviewTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.overviewSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/fees"
            className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Generate Challans</span>
          </Link>

          <Link
            href="/dashboard/students"
            className="inline-flex items-center gap-2 border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Register Resident</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Capacity & Occupancy */}
        <div className="border border-border bg-canvas-surface p-5 space-y-3">
          <div className="flex items-center justify-between text-ink-muted text-caption">
            <span>{t.metricTotalBeds}</span>
            <Layers className="w-4 h-4 text-brass stroke-[1.25]" />
          </div>
          <div>
            <div className="text-2xl font-serif text-ink tracking-tight font-medium">
              {occupiedBeds} / {totalBeds} Beds
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-zinc-200 h-1.5 rounded-xs overflow-hidden">
                <div
                  className="bg-brass h-full transition-all duration-500"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
              <span className="text-caption font-mono text-brass font-medium">
                {occupancyRate}%
              </span>
            </div>
          </div>
          <p className="text-[11px] text-ink-muted font-mono">
            {totalBeds - occupiedBeds} Chambers Available
          </p>
        </div>

        {/* Metric 2: Gross Monthly Billing */}
        <div className="border border-border bg-canvas-surface p-5 space-y-3">
          <div className="flex items-center justify-between text-ink-muted text-caption">
            <span>{t.metricMonthlyReceivables}</span>
            <Receipt className="w-4 h-4 text-brass stroke-[1.25]" />
          </div>
          <div>
            <div className="text-2xl font-serif text-ink tracking-tight font-medium font-tabular">
              {formatCurrency(totalBilling)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-status-occupied mt-1 font-mono">
              <CheckCircle2 className="w-3 h-3" />
              <span>Realized: {formatCurrency(totalCollected)}</span>
            </div>
          </div>
          <p className="text-[11px] text-ink-muted font-mono">
            Cycle: November 2026
          </p>
        </div>

        {/* Metric 3: Arrears Outstanding */}
        <div className="border border-border bg-canvas-surface p-5 space-y-3">
          <div className="flex items-center justify-between text-ink-muted text-caption">
            <span>{t.metricPendingDues}</span>
            <Clock className="w-4 h-4 text-status-unpaid stroke-[1.25]" />
          </div>
          <div>
            <div className="text-2xl font-serif text-status-unpaid tracking-tight font-medium font-tabular">
              {formatCurrency(pendingArrears)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-status-partial mt-1 font-mono">
              <span>Carried Forward Balances</span>
            </div>
          </div>
          <p className="text-[11px] text-ink-muted font-mono">
            Late Surcharge 5.0% In Effect
          </p>
        </div>

        {/* Metric 4: Net Operating Surplus */}
        <div className="border border-border bg-canvas-surface p-5 space-y-3">
          <div className="flex items-center justify-between text-ink-muted text-caption">
            <span>{t.metricNetOperatingMargin}</span>
            <TrendingUp className="w-4 h-4 text-emerald-700 stroke-[1.25]" />
          </div>
          <div>
            <div className="text-2xl font-serif text-emerald-800 tracking-tight font-medium font-tabular">
              {formatCurrency(netSurplus)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-ink-muted mt-1 font-mono">
              <span>Expenses: {formatCurrency(totalExpenses)}</span>
            </div>
          </div>
          <p className="text-[11px] text-ink-muted font-mono">
            Audited Operating Margin
          </p>
        </div>
      </div>

      {/* Secondary Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Floor-wise Occupancy Breakdown */}
        <div className="lg:col-span-2 border border-border bg-canvas-surface p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-serif text-subhead tracking-tight text-ink">
                {t.occupancyByWing}
              </h3>
              <p className="text-caption text-ink-muted">
                Architectural tier breakdown of chamber density and bed allocations.
              </p>
            </div>
            <Link
              href="/dashboard/inventory"
              className="text-caption text-brass hover:underline inline-flex items-center gap-1"
            >
              <span>Manage Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {floors.map((floor) => {
              let fCapacity = 0;
              let fOccupied = 0;
              floor.rooms.forEach((r) => {
                fCapacity += r.capacity;
                fOccupied += r.beds.filter((b) => b.status === "OCCUPIED").length;
              });
              const pct = fCapacity > 0 ? Math.round((fOccupied / fCapacity) * 100) : 0;

              return (
                <div key={floor.id} className="border border-border p-4 bg-canvas-subtle space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-caption font-medium text-ink">
                        {floor.name}
                      </span>
                      <p className="text-[11px] text-ink-muted font-mono">
                        {floor.rooms.length} Suites ({fCapacity} Beds Total)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-caption font-mono font-medium text-ink">
                        {fOccupied} / {fCapacity} Occupied
                      </span>
                      <p className="text-[11px] font-mono text-brass">{pct}% Density</p>
                    </div>
                  </div>

                  <div className="bg-zinc-200 h-2 rounded-xs overflow-hidden">
                    <div
                      className="bg-brass h-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Quick Status & Recent Operational Journal */}
        <div className="border border-border bg-canvas-surface p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead tracking-tight text-ink">
                {t.recentActivity}
              </h3>
              <span className="text-[10px] font-mono text-status-occupied flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-occupied animate-pulse" />
                Live Log
              </span>
            </div>

            <div className="space-y-3 mt-4 text-[12px]">
              <div className="border-l-2 border-brass pl-3 py-1 space-y-0.5">
                <p className="font-medium text-ink">Remittance Realized: Rs. 43,000</p>
                <p className="text-caption text-ink-muted">Muhammad Hamza (Suite #101) via Meezan IBFT.</p>
                <p className="text-[10px] font-mono text-zinc-400">Today, 11:20 AM</p>
              </div>

              <div className="border-l-2 border-zinc-400 pl-3 py-1 space-y-0.5">
                <p className="font-medium text-ink">Visitor Check-in Recorded</p>
                <p className="text-caption text-ink-muted">Chaudhry Riaz Ahmad (Guest of Room #101).</p>
                <p className="text-[10px] font-mono text-zinc-400">Today, 09:45 AM</p>
              </div>

              <div className="border-l-2 border-emerald-600 pl-3 py-1 space-y-0.5">
                <p className="font-medium text-ink">Biometric Attendance Cleared</p>
                <p className="text-caption text-ink-muted">All 5 staff members checked in on duty.</p>
                <p className="text-[10px] font-mono text-zinc-400">Today, 08:30 AM</p>
              </div>

              <div className="border-l-2 border-amber-600 pl-3 py-1 space-y-0.5">
                <p className="font-medium text-ink">Arrears Rollover Logged</p>
                <p className="text-caption text-ink-muted">Daniyal Farooq (Suite #103) balance Rs. 44,000.</p>
                <p className="text-[10px] font-mono text-zinc-400">Yesterday, 06:00 PM</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Link
              href="/dashboard/reports"
              className="w-full inline-flex items-center justify-center gap-2 border border-border py-2 text-caption text-ink hover:bg-canvas-subtle transition-colors"
            >
              <span>View Audited Fiscal Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
