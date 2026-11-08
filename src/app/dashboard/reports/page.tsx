"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../../lib/store";
import { formatCurrency } from "../../../lib/utils";
import { useThrottle } from "../../../hooks/use-throttle";
import { LockedFeatureBadge } from "../../../components/ui/tier-badge";
import { MotionButton } from "../../../components/motion/motion-button";
import { pageEntranceVariants, tabContentVariants } from "../../../lib/motion";
import hostelConfig from "../../../../hostel.config";
import {
  PieChart,
  Download,
  Printer,
  TrendingUp,
  Building2,
  Users,
  Layers,
  Receipt,
  CheckCircle2,
  Lock,
  FileSpreadsheet,
} from "lucide-react";

export default function ReportsPage() {
  const { feeInvoices, floors, students, expenses, auxiliaryIncome, currentBranch, saasTier, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<"collection" | "occupancy">("collection");

  // Collection Report Computations
  const totalBilled = feeInvoices.reduce((acc, inv) => acc + inv.totalDue, 0);
  const totalCollected = feeInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalPending = feeInvoices.reduce((acc, inv) => acc + inv.balanceDues, 0);
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

  // Occupancy Report Computations
  let totalBeds = 0;
  let occupiedBeds = 0;
  let acBedsTotal = 0;
  let acBedsOccupied = 0;

  floors.forEach((f) => {
    f.rooms.forEach((r) => {
      totalBeds += r.capacity;
      const occ = r.beds.filter((b) => b.status === "OCCUPIED").length;
      occupiedBeds += occ;
      if (r.isAc) {
        acBedsTotal += r.capacity;
        acBedsOccupied += occ;
      }
    });
  });

  const vacantBeds = Math.max(0, totalBeds - occupiedBeds);
  const overallOccupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Throttled CSV Export (UX Pattern #8)
  const handleExportCSV = useThrottle(() => {
    const rows = [
      ["Metric / Category", "Audited Figures (PKR / Count)"],
      ["Total Rent Invoiced", totalBilled],
      ["Total Rent Collected", totalCollected],
      ["Total Pending Receivables", totalPending],
      ["Collection Efficiency Rate", `${collectionRate}%`],
      ["Total Campus Capacity (Beds)", totalBeds],
      ["Total Occupied Beds", occupiedBeds],
      ["Total Vacant Beds", vacantBeds],
      ["Overall Occupancy Rate", `${overallOccupancyRate}%`],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Hostel_Operational_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Audited CSV statement downloaded.", "success");
  }, 1000);

  return (
    <motion.div
      variants={pageEntranceVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
            Executive Analytics &amp; Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Hostel Operational &amp; Financial Reports
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Real-time collection efficiency, occupancy metrics, and P&amp;L audit statements.
          </p>
        </div>

        {/* Throttled Export Buttons (UX Pattern #8) */}
        <div className="flex items-center gap-2">
          <MotionButton
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </MotionButton>
          <MotionButton
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </MotionButton>
        </div>
      </div>

      {/* Report Type Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("collection")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "collection"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          1. Rent &amp; Fee Collection Report
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("occupancy")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "occupancy"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          2. Bed Capacity &amp; Occupancy Report
        </button>
      </div>

      {/* Rule 16: Overlap old & new states when switching tabs (mode="popLayout") */}
      <AnimatePresence mode="popLayout">
        {activeTab === "collection" ? (
          <motion.div
            key="tab-collection"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Total Billed
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">
                {formatCurrency(totalBilled)}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">100% of generated invoices</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Total Collected
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
                {formatCurrency(totalCollected)}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                {collectionRate}% collection rate achieved
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Pending Arrears
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 tabular-nums">
                {formatCurrency(totalPending)}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Due for follow-up reminders</p>
            </div>
          </div>

          {/* Collection Ledger Summary Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Monthly Inflow vs Receivables Breakdown
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reconciled against commercial Meezan Bank deposits and cash vouchers.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                    <th className="px-4 py-3">Billing Cycle</th>
                    <th className="px-4 py-3 text-right">Invoices Issued</th>
                    <th className="px-4 py-3 text-right">Total Invoiced</th>
                    <th className="px-4 py-3 text-right">Collected (Cash/Bank)</th>
                    <th className="px-4 py-3 text-right">Balance Due</th>
                    <th className="px-4 py-3 text-center">Collection %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-slate-900">November 2026 (Current)</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums">{feeInvoices.length}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {formatCurrency(totalBilled)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700 tabular-nums">
                      {formatCurrency(totalCollected)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-amber-600 tabular-nums">
                      {formatCurrency(totalPending)}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 tabular-nums">
                      {collectionRate}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="tab-occupancy"
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Total Capacity
              </span>
              <p className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">
                {totalBeds} Beds
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Gulberg campus building</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Occupied
              </span>
              <p className="text-3xl font-bold text-blue-600 mt-1 tabular-nums">
                {occupiedBeds} Beds
              </p>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">
                {overallOccupancyRate}% occupancy rate
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Vacant Beds
              </span>
              <p className="text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
                {vacantBeds} Beds
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Available for new admissions</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Inverter AC Rooms
              </span>
              <p className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">
                {acBedsOccupied} / {acBedsTotal}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">AC chamber occupancy</p>
            </div>
          </div>

          {/* Floor-by-Floor Capacity Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Floor-by-Floor Capacity Matrix
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                    <th className="px-4 py-3">Floor Level</th>
                    <th className="px-4 py-3 text-right">Total Chambers</th>
                    <th className="px-4 py-3 text-right">Total Bed Capacity</th>
                    <th className="px-4 py-3 text-right">Occupied Beds</th>
                    <th className="px-4 py-3 text-right">Vacant Beds</th>
                    <th className="px-4 py-3 text-center">Occupancy %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {floors.map((floor) => {
                    let cap = 0;
                    let occ = 0;
                    floor.rooms.forEach((r) => {
                      cap += r.capacity;
                      occ += r.beds.filter((b) => b.status === "OCCUPIED").length;
                    });
                    const vac = Math.max(0, cap - occ);
                    const pct = cap > 0 ? Math.round((occ / cap) * 100) : 0;

                    return (
                      <tr key={floor.id} className="hover:bg-slate-50/60 font-medium">
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {floor.name} ({floor.nameUrdu})
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">{floor.rooms.length}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">{cap}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-blue-600 tabular-nums">{occ}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-emerald-600 tabular-nums">{vac}</td>
                        <td className="px-4 py-3 text-center font-bold text-slate-800 tabular-nums">{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Tier-Based Locked Feature Section (UX Pattern #14) */}
      <div className="bg-slate-100/60 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">
                FBR Regulatory Tax Statement &amp; Audit Schedule
              </h4>
              <LockedFeatureBadge featureName="Tax Audit" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated withholding tax deductions, P&amp;L balance sheets, and provincial revenue authority exports.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast("Upgrade to Standard or Premium to unlock official FBR tax exports.", "info")}
          className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg shadow-2xs transition-colors self-start sm:self-auto"
        >
          Unlock on Standard+
        </button>
      </div>
    </motion.div>
  );
}
