"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "../../lib/store";
import { formatCurrency, formatDate } from "../../lib/utils";
import { MotionButton } from "../../components/motion/motion-button";
import {
  pageEntranceVariants,
  staggerListVariants,
  staggerRowVariants,
  EASE_IN_OUT,
} from "../../lib/motion";
import {
  Layers,
  Users,
  Receipt,
  AlertCircle,
  Building2,
  TrendingUp,
  ArrowRight,
  Plus,
  Utensils,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Send,
  BellRing,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const {
    currentBranch,
    floors,
    students,
    feeInvoices,
    complaints,
    showToast,
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

  // Unpaid Invoices (Urgent Action List)
  const unpaidInvoices = feeInvoices.filter((inv) => inv.balanceDues > 0);

  return (
    <motion.div
      variants={pageEntranceVariants}
      initial={false}
      animate="visible"
      className="space-y-6 max-w-7xl mx-auto font-sans"
    >
      {/* Page Header (Rule 15: 24px bold heading, 14px body) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700" />
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              {currentBranch.city} • {currentBranch.name}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-1">
            Hostel Operations Console
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">
            Real-time occupancy, automated dues ledger, and facilities monitoring.
          </p>
        </div>

        {/* Action CTAs (Rule 13: Emphasize primary CTA, Rule 4: Scale 0.97 on press) */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/dashboard/students">
            <MotionButton variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              <span>Enroll Resident</span>
            </MotionButton>
          </Link>
          <Link href="/dashboard/fees">
            <MotionButton variant="outline" size="sm">
              <Receipt className="w-4 h-4 text-gray-500" />
              <span>Record Rent Payment</span>
            </MotionButton>
          </Link>
        </div>
      </div>

      {/* 5 Core Required Metrics Grid (Rule 13: Hierarchy - Pending Dues stands out prominently) */}
      <motion.div
        variants={staggerListVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {/* Metric 1: Total Rooms */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Rooms
            </span>
            <div className="w-7 h-7 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2 tabular-nums">
            {totalRooms}
          </p>
          <p className="text-xs text-gray-500 mt-1">Across {floors.length} floors</p>
        </div>

        {/* Metric 2: Occupied Beds */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Occupied Beds
            </span>
            <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2 tabular-nums">
            {occupiedBeds}
          </p>
          <p className="text-xs text-emerald-700 font-semibold mt-1">
            {occupancyRate}% occupancy rate
          </p>
        </div>

        {/* Metric 3: Vacant Beds */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Vacant Beds
            </span>
            <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-700 mt-2 tabular-nums">
            {vacantBeds}
          </p>
          <p className="text-xs text-gray-500 mt-1">Available for allotment</p>
        </div>

        {/* Metric 4: Monthly Collection */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Collection (MTD)
            </span>
            <div className="w-7 h-7 rounded-md bg-gray-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2 tabular-nums">
            {formatCurrency(monthlyCollection)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Reconciled bank &amp; cash fees</p>
        </div>

        {/* Metric 5: Pending Dues (RULE 13: Hierarchy Emphasis - Largest & Boldest) */}
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-xl p-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Pending Dues
            </span>
            <div className="w-7 h-7 rounded-md bg-amber-200/80 text-amber-900 flex items-center justify-center">
              <Receipt className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-950 mt-2 tabular-nums">
            {formatCurrency(pendingDues)}
          </p>
          <p className="text-xs text-amber-800 font-semibold mt-1">
            {unpaidInvoices.length} outstanding accounts
          </p>
        </div>
      </motion.div>

      {/* Middle Operations Section (Rule 7: 12-Column Grid Alignment) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Floor-wise Occupancy Breakdown */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium text-gray-900">
                Floor-wise Chamber Capacity &amp; Utilization
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time bed distribution across building wings.
              </p>
            </div>
            <Link
              href="/dashboard/inventory"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>Manage Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {floors.map((floor) => {
              let fCapacity = 0;
              let fOccupied = 0;
              floor.rooms.forEach((r) => {
                fCapacity += r.capacity;
                fOccupied += r.beds.filter((b) => b.status === "OCCUPIED").length;
              });
              const pct = fCapacity > 0 ? Math.round((fOccupied / fCapacity) * 100) : 0;

              return (
                <div key={floor.id} className="p-3.5 border border-gray-100 rounded-lg bg-gray-50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900">
                      {floor.name} ({floor.nameUrdu})
                    </span>
                    <span className="text-gray-600 tabular-nums">
                      <strong>{fOccupied}</strong> of {fCapacity} Beds Occupied ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-700 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Columns: Urgent Pending Dues Action List (Rule 5 & Rule 13) */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <h2 className="text-base font-medium text-gray-900">
                  Arrears Recovery Queue
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Action Required
              </span>
            </div>

            <p className="text-xs text-gray-500">
              Prioritize rent collections and dispatch official WhatsApp / SMS notices:
            </p>

            <div className="divide-y divide-gray-100 text-xs">
              {unpaidInvoices.map((inv) => (
                <div key={inv.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      {inv.studentName}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Room {inv.roomNumber} • Due: {inv.dueDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-700 tabular-nums text-xs">
                      {formatCurrency(inv.balanceDues)}
                    </span>
                    <button
                      type="button"
                      onClick={() => showToast(`SMS reminder sent to ${inv.studentName} for ${formatCurrency(inv.balanceDues)}.`, "info")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                      title="Send SMS Notice"
                    >
                      <Send className="w-3 h-3" />
                      <span>Remind</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-1">
            <div className="flex items-center justify-between text-gray-700">
              <span className="font-semibold">Police Verification (Form 15):</span>
              <span className="text-emerald-700 font-bold">100% Compliant</span>
            </div>
            <p className="text-[11px] text-gray-500">
              All resident CNICs logged under Punjab Information of Temporary Residents Act 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Invoices & Arrears Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium text-gray-900">
              Recent Fee Ledger Activity
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Latest monthly invoices and verified payment reconciliations.
            </p>
          </div>
          <Link
            href="/dashboard/fees"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>View Full Payment Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-[11px]">
                <th className="px-4 py-3">Resident</th>
                <th className="px-4 py-3">Chamber</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3 text-right">Rent Amount</th>
                <th className="px-4 py-3 text-right">Balance Due</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feeInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {inv.studentName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">Room {inv.roomNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{inv.month} {inv.year}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-gray-900 tabular-nums">
                    {formatCurrency(inv.totalDue)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold tabular-nums">
                    <span className={inv.balanceDues > 0 ? "text-amber-700" : "text-gray-400"}>
                      {formatCurrency(inv.balanceDues)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === "PAID"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : inv.status === "PARTIAL"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href="/dashboard/fees"
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      {inv.status === "PAID" ? "View Receipt" : "Collect Rent"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
