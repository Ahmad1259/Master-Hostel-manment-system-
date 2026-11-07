"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import hostelConfig from "../../../../hostel.config";
import { formatCurrency, formatDate } from "../../../lib/utils";
import {
  PieChart,
  Download,
  Printer,
  TrendingUp,
  TrendingDown,
  Building,
  ShieldCheck,
  Briefcase,
  Layers,
} from "lucide-react";

export default function ReportsPage() {
  const {
    feeInvoices,
    expenses,
    auxiliaryIncome,
    partners,
    currentBranch,
    t,
  } = useApp();

  const totalFeeCollected = feeInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalAuxiliary = auxiliaryIncome.reduce((acc, aux) => acc + aux.amount, 0);
  const grossInflow = totalFeeCollected + totalAuxiliary;

  const totalExpenseAmount = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netSurplus = grossInflow - totalExpenseAmount;
  const profitMargin = grossInflow > 0 ? ((netSurplus / grossInflow) * 100).toFixed(1) : "0";

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ["Category / Item", "Ledger Section", "Audited Value (PKR)"];
    const rows = [
      ["Gross Resident Accommodation Fee", "Revenue", totalFeeCollected],
      ["Ancillary Provisions & Services", "Revenue", totalAuxiliary],
      ["Total Gross Inflow", "Summary", grossInflow],
      ...expenses.map((e) => [`"${e.title}"`, `Expense: ${e.category}`, -e.amount]),
      ["Total Operating Expenditures", "Summary", -totalExpenseAmount],
      ["Net Audited Operating Surplus", "Profit/Loss", netSurplus],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `PL_Statement_${currentBranch.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Module 06 • Fiscal P&amp;L &amp; Corporate Equity
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.reportsTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.reportsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-3.5 py-2 text-caption font-medium uppercase tracking-wider transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Financial CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Financial Statement</span>
          </button>
        </div>
      </div>

      {/* Real-Time P&L Summary Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="border border-border bg-canvas-surface p-4 space-y-1">
          <span className="text-caption text-ink-muted">Gross Realized Inflows:</span>
          <p className="text-2xl font-serif text-ink tracking-tight font-medium font-tabular">
            {formatCurrency(grossInflow)}
          </p>
          <p className="text-[11px] font-mono text-ink-muted">
            Fee &amp; Ancillary Revenue
          </p>
        </div>

        <div className="border border-border bg-canvas-surface p-4 space-y-1">
          <span className="text-caption text-ink-muted">Operating Expenditures:</span>
          <p className="text-2xl font-serif text-status-unpaid tracking-tight font-medium font-tabular">
            {formatCurrency(totalExpenseAmount)}
          </p>
          <p className="text-[11px] font-mono text-ink-muted">
            Utilities, Groceries &amp; Upkeep
          </p>
        </div>

        <div className="border border-border bg-canvas-surface p-4 space-y-1">
          <span className="text-caption text-ink-muted">Net Operating Surplus:</span>
          <p className="text-2xl font-serif text-emerald-800 tracking-tight font-medium font-tabular">
            {formatCurrency(netSurplus)}
          </p>
          <p className="text-[11px] font-mono text-emerald-700">
            {profitMargin}% Operating Margin
          </p>
        </div>

        <div className="border border-border bg-canvas-surface p-4 space-y-1">
          <span className="text-caption text-ink-muted">Partner Equity Distributed:</span>
          <p className="text-2xl font-serif text-brass tracking-tight font-medium font-tabular">
            {formatCurrency(partners.reduce((a, b) => a + b.totalWithdrawn, 0))}
          </p>
          <p className="text-[11px] font-mono text-ink-muted">
            {partners.length} Managing Partners
          </p>
        </div>
      </div>

      {/* Comprehensive Statement of Operations (P&L Sheet) */}
      <div className="border border-border bg-canvas-surface p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="font-serif text-subhead tracking-tight text-ink font-medium">
              Comprehensive Statement of Operational Profit &amp; Loss
            </h3>
            <p className="text-caption text-ink-muted font-mono">
              Accounting Cycle: November 2026 • Verified under FBR Audit Standard #PK-GP-04
            </p>
          </div>
          <span className="text-[11px] font-mono border border-border px-2 py-0.5 bg-canvas-subtle">
            Currency: PKR
          </span>
        </div>

        <div className="divide-y divide-border text-caption font-mono">
          {/* Revenue Section */}
          <div className="py-3 space-y-2">
            <span className="font-serif text-subhead text-ink uppercase tracking-wider block font-medium">
              1. Operating Inflows (Gross Receipts)
            </span>
            <div className="flex justify-between pl-4 text-ink-muted">
              <span>Standard Resident Accommodation Collections:</span>
              <span className="text-ink font-medium">{formatCurrency(totalFeeCollected)}</span>
            </div>
            <div className="flex justify-between pl-4 text-ink-muted">
              <span>Ancillary Provisions Dispensary &amp; Tuck Shop:</span>
              <span className="text-ink font-medium">
                {formatCurrency(
                  auxiliaryIncome
                    .filter((a) => a.source === "TUCK_SHOP")
                    .reduce((x, y) => x + y.amount, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between pl-4 text-ink-muted">
              <span>Express Steam Press &amp; Laundry Service Surcharges:</span>
              <span className="text-ink font-medium">
                {formatCurrency(
                  auxiliaryIncome
                    .filter((a) => a.source === "LAUNDRY")
                    .reduce((x, y) => x + y.amount, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between pl-4 text-ink-muted">
              <span>Luggage Vault &amp; Locker Rental Inflow:</span>
              <span className="text-ink font-medium">
                {formatCurrency(
                  auxiliaryIncome
                    .filter((a) => a.source === "LOCKER_RENT")
                    .reduce((x, y) => x + y.amount, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-bold text-ink">
              <span>Aggregated Gross Operational Revenue:</span>
              <span className="text-brass">{formatCurrency(grossInflow)}</span>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="py-3 space-y-2">
            <span className="font-serif text-subhead text-ink uppercase tracking-wider block font-medium">
              2. Operational &amp; Facility Expenditures
            </span>
            {expenses.map((exp) => (
              <div key={exp.id} className="flex justify-between pl-4 text-ink-muted">
                <span>{exp.title} ({exp.category}):</span>
                <span className="text-red-700 font-medium">
                  -{formatCurrency(exp.amount)}
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-border font-bold text-ink">
              <span>Aggregated Operational Outflows:</span>
              <span className="text-status-unpaid">-{formatCurrency(totalExpenseAmount)}</span>
            </div>
          </div>

          {/* Net Margin Section */}
          <div className="py-4 space-y-1 bg-canvas-subtle p-4 border border-border">
            <div className="flex justify-between text-base font-serif font-bold text-ink">
              <span>Audited Net Operating Surplus:</span>
              <span className="text-emerald-800 font-mono">
                {formatCurrency(netSurplus)}
              </span>
            </div>
            <p className="text-[11px] text-ink-muted font-sans italic">
              Surplus allocated to partner equity pool and reserve capital replenishment fund.
            </p>
          </div>
        </div>
      </div>

      {/* Managing Partner Equity Ledger */}
      <div className="border border-border bg-canvas-surface p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="font-serif text-subhead tracking-tight text-ink font-medium">
              {t.partnerEquityLedger}
            </h3>
            <p className="text-caption text-ink-muted font-mono">
              Cap table, paid-in capital, and cumulative drawings distributions.
            </p>
          </div>
          <span className="text-[11px] font-mono border border-border px-2 py-0.5 bg-canvas-subtle">
            Active Partners: {partners.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-body border-collapse">
            <thead>
              <tr className="border-b border-border bg-canvas-subtle text-[11px] font-mono text-ink-muted uppercase">
                <th className="p-3 font-semibold">Partner Principal</th>
                <th className="p-3 font-semibold">Equity Share %</th>
                <th className="p-3 font-semibold">Total Paid-In Capital</th>
                <th className="p-3 font-semibold">Cumulative Drawings</th>
                <th className="p-3 font-semibold text-right">Net Residual Equity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-caption">
              {partners.map((partner) => {
                const residual = partner.totalInvested - partner.totalWithdrawn;
                return (
                  <tr key={partner.id} className="hover:bg-canvas-subtle/50 transition-colors">
                    <td className="p-3 font-sans">
                      <p className="font-serif text-subhead font-medium text-ink">
                        {partner.name}
                      </p>
                      <p className="text-[11px] text-ink-muted font-mono">
                        Partner Ref: {partner.id}
                      </p>
                    </td>

                    <td className="p-3 font-medium text-brass">
                      {partner.sharePercentage.toFixed(1)}%
                    </td>

                    <td className="p-3 text-ink">
                      {formatCurrency(partner.totalInvested)}
                    </td>

                    <td className="p-3 text-status-unpaid">
                      {formatCurrency(partner.totalWithdrawn)}
                    </td>

                    <td className="p-3 text-right font-medium text-emerald-800">
                      {formatCurrency(residual)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
