"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../lib/store";
import { formatCurrency, formatDate } from "../../lib/utils";
import {
  Layers,
  Users,
  Receipt,
  AlertCircle,
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  Utensils,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const {
    currentBranch,
    floors,
    students,
    feeInvoices,
    complaints,
    saasTier,
    setIsOnboardingOpen,
  } = useApp();

  // Compute live metrics
  let totalRooms = 0;
  let totalBeds = 0;
  let occupiedBeds = 0;

  floors.forEach((f) => {
    f.rooms.forEach((r) => {
      totalRooms += 1;
      totalBeds += r.capacity;
      occupiedBeds += r.beds.filter((b) => b.status === "OCCUPIED").length;
    });
  });

  const vacantBeds = Math.max(0, totalBeds - occupiedBeds);
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const monthlyCollection = feeInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const pendingDues = feeInvoices.reduce((acc, inv) => acc + inv.balanceDues, 0);

  const activeStudents = students.filter((s) => s.status === "ACTIVE").length;
  const openComplaints = complaints.filter((c) => c.status !== "RESOLVED").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              {currentBranch.city} • {currentBranch.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Hostel Operations Console
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Real-time occupancy, automated dues ledger, and facilities monitoring.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/dashboard/students"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enroll Resident</span>
          </Link>
          <Link
            href="/dashboard/fees"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-xs transition-colors"
          >
            <Receipt className="w-3.5 h-3.5 text-slate-500" />
            <span>Record Payment</span>
          </Link>
        </div>
      </div>

      {/* 5 Core Required Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Total Rooms */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Rooms
            </span>
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {totalRooms}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Across {floors.length} floors</p>
        </div>

        {/* Metric 2: Occupied Beds */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Occupied Beds
            </span>
            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {occupiedBeds}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {occupancyRate}% occupancy rate
          </p>
        </div>

        {/* Metric 3: Vacant Beds */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Vacant Beds
            </span>
            <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2 tabular-nums">
            {vacantBeds}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Ready for immediate move-in</p>
        </div>

        {/* Metric 4: Monthly Collection */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Collection (Mtd)
            </span>
            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {formatCurrency(monthlyCollection)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Settled bank &amp; cash fees</p>
        </div>

        {/* Metric 5: Pending Dues */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Pending Dues
            </span>
            <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
              <Receipt className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2 tabular-nums">
            {formatCurrency(pendingDues)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Outstanding receivables</p>
        </div>
      </div>

      {/* Middle Operations Section: Two-Column Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Floor-wise Occupancy */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Floor-wise Chamber Capacity &amp; Utilization
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time bed distribution across building tiers.
              </p>
            </div>
            <Link
              href="/dashboard/inventory"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <span>Manage Inventory</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            {floors.map((floor) => {
              let fCapacity = 0;
              let fOccupied = 0;
              floor.rooms.forEach((r) => {
                fCapacity += r.capacity;
                fOccupied += r.beds.filter((b) => b.status === "OCCUPIED").length;
              });
              const pct = fCapacity > 0 ? Math.round((fOccupied / fCapacity) * 100) : 0;

              return (
                <div key={floor.id} className="p-3.5 border border-slate-100 rounded-lg bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      {floor.name} ({floor.nameUrdu})
                    </span>
                    <span className="text-slate-600 tabular-nums">
                      <strong>{fOccupied}</strong> of {fCapacity} Beds Occupied ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quick Status & Alerts */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Operations Health
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                All Systems Normal
              </span>
            </div>

            <div className="divide-y divide-slate-100 pt-1 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-700">Active Residents</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">{activeStudents}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-700">Mess Enrolled</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  {students.filter((s) => s.messStatus !== "OFF").length}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-700">Pending Complaints</span>
                </div>
                <span className="font-bold text-amber-600 tabular-nums">{openComplaints}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-700">Invoices Generated</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">{feeInvoices.length}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1">
            <p className="font-bold text-blue-900">Pro-Tip for Wardens:</p>
            <p className="text-blue-700 leading-relaxed text-[11px]">
              Use <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-blue-200 font-bold">Ctrl+K</kbd> to search residents, assign beds, or record payments instantly from anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Invoices & Arrears */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Fee Ledger Activity
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest invoices and outstanding balances.
            </p>
          </div>
          <Link
            href="/dashboard/fees"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            <span>View Full Payment Ledger</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="px-4 py-3">Resident</th>
                <th className="px-4 py-3">Chamber</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3 text-right">Rent Amount</th>
                <th className="px-4 py-3 text-right">Balance Due</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeInvoices.slice(0, 5).map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {inv.studentName}
                  </td>
                  <td className="px-4 py-3 text-slate-600">Room {inv.roomNumber}</td>
                  <td className="px-4 py-3 text-slate-600">{inv.month} {inv.year}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(inv.totalDue)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-amber-600 tabular-nums">
                    {formatCurrency(inv.balanceDues)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : inv.status === "PARTIAL"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
