"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import { FeeInvoiceItem } from "../../../lib/mock-data";
import { formatCurrency, formatDate } from "../../../lib/utils";
import { BankChallanModal } from "../../../components/bank-challan-modal";
import { WhatsAppSlipModal } from "../../../components/whatsapp-slip-modal";
import {
  Receipt,
  Search,
  Filter,
  Printer,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  X,
  CreditCard,
  Download,
} from "lucide-react";

export default function FeesPage() {
  const {
    feeInvoices,
    recordFeePayment,
    generateMonthlyInvoices,
    students,
    t,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedInvoiceForChallan, setSelectedInvoiceForChallan] = useState<FeeInvoiceItem | null>(null);
  const [selectedInvoiceForWhatsApp, setSelectedInvoiceForWhatsApp] = useState<FeeInvoiceItem | null>(null);

  // Record Payment Modal State
  const [paymentTargetInvoice, setPaymentTargetInvoice] = useState<FeeInvoiceItem | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [bankReceiptRef, setBankReceiptRef] = useState<string>("");

  // Month Generation state
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genMonth, setGenMonth] = useState("December");
  const [genYear, setGenYear] = useState(2026);

  const handleOpenPayment = (inv: FeeInvoiceItem) => {
    setPaymentTargetInvoice(inv);
    setPaymentAmount(inv.balanceDues > 0 ? inv.balanceDues : inv.totalDue);
    setBankReceiptRef(`MEZN-${Math.floor(1000000 + Math.random() * 9000000)}`);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentTargetInvoice || paymentAmount <= 0) return;
    recordFeePayment(paymentTargetInvoice.id, paymentAmount, bankReceiptRef);
    setPaymentTargetInvoice(null);
  };

  const handleGenerateInvoices = (e: React.FormEvent) => {
    e.preventDefault();
    generateMonthlyInvoices(genMonth, genYear);
    setShowGenerateModal(false);
  };

  const filteredInvoices = feeInvoices.filter((inv) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      inv.studentName.toLowerCase().includes(q) ||
      inv.roomNumber.toLowerCase().includes(q) ||
      inv.id.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "ALL" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBilled = filteredInvoices.reduce((acc, inv) => acc + inv.totalDue, 0);
  const totalPaid = filteredInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalArrears = filteredInvoices.reduce((acc, inv) => acc + inv.balanceDues, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Module 03 • Fiscal Directorate
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.feesTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.feesSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Generate Monthly Billing Cycle</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-border bg-canvas-surface p-4 space-y-1">
          <span className="text-caption text-ink-muted">Gross Receivables:</span>
          <p className="text-2xl font-serif text-ink tracking-tight font-medium font-tabular">
            {formatCurrency(totalBilled)}
          </p>
          <p className="text-micro font-mono text-ink-muted">
            {filteredInvoices.length} Registered Challans
          </p>
        </div>

        <div className="border border-border bg-canvas-surface p-4 space-y-1">
          <span className="text-caption text-ink-muted">Realized Collections:</span>
          <p className="text-2xl font-serif text-status-occupied tracking-tight font-medium font-tabular">
            {formatCurrency(totalPaid)}
          </p>
          <p className="text-micro font-mono text-status-occupied">
            Settled via Meezan Bank IBFT / Cash
          </p>
        </div>

        <div className="border border-border bg-canvas-surface p-4 space-y-1">
          <span className="text-caption text-ink-muted">Cumulative Arrears:</span>
          <p className="text-2xl font-serif text-status-unpaid tracking-tight font-medium font-tabular">
            {formatCurrency(totalArrears)}
          </p>
          <p className="text-micro font-mono text-status-unpaid">
            Rolled Over Unpaid Balances
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-canvas-surface p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 stroke-[1.25]" />
          <input
            type="text"
            placeholder="Search by invoice reference, resident name, or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-border pl-9 pr-3 py-1.5 text-body bg-canvas focus:outline-hidden focus:border-brass text-ink"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-caption text-ink-muted">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-border bg-canvas px-3 py-1.5 text-caption text-ink"
          >
            <option value="ALL">All Settlement Statuses</option>
            <option value="PAID">Cleared / Settled</option>
            <option value="PARTIAL">Partial Remittance</option>
            <option value="UNPAID">Arrears Outstanding</option>
          </select>
        </div>
      </div>

      {/* Fees Invoices Table */}
      <div className="border border-border bg-canvas-surface overflow-x-auto">
        <table className="w-full text-left text-body border-collapse">
          <thead>
            <tr className="border-b border-border bg-canvas-subtle text-micro font-mono text-ink-muted uppercase">
              <th className="p-3 font-semibold">Challan Ref &amp; Cycle</th>
              <th className="p-3 font-semibold">Resident Particulars</th>
              <th className="p-3 font-semibold">Tariff Breakdown</th>
              <th className="p-3 font-semibold">Net Payable</th>
              <th className="p-3 font-semibold">Realized</th>
              <th className="p-3 font-semibold">Status &amp; Dues</th>
              <th className="p-3 font-semibold text-right">Dispatch &amp; Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-caption text-ink-muted">
                  No invoices found matching current criteria.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-canvas-subtle/50 transition-colors">
                  <td className="p-3 font-mono">
                    <span className="text-caption font-bold text-ink block">
                      {inv.id}
                    </span>
                    <span className="text-micro text-ink-muted">
                      {inv.month} {inv.year}
                    </span>
                    <span className="text-micro text-zinc-400 block mt-0.5">
                      Due: {formatDate(inv.dueDate)}
                    </span>
                  </td>

                  <td className="p-3">
                    <p className="font-serif text-subhead font-medium text-ink leading-tight">
                      {inv.studentName}
                    </p>
                    <p className="text-micro text-ink-muted font-mono">
                      Chamber: Suite #{inv.roomNumber}
                    </p>
                    {inv.bankReceiptRef && (
                      <span className="text-micro font-mono text-brass mt-0.5 block truncate max-w-36">
                        Ref: {inv.bankReceiptRef}
                      </span>
                    )}
                  </td>

                  <td className="p-3 font-mono text-micro space-y-0.5">
                    <div className="text-zinc-600">Base: {formatCurrency(inv.amount)}</div>
                    {inv.arrears > 0 && (
                      <div className="text-red-700">Arrears B/F: +{formatCurrency(inv.arrears)}</div>
                    )}
                    {inv.discount > 0 && (
                      <div className="text-emerald-700">
                        Waiver: -{formatCurrency(inv.discount)}
                        {inv.discountReason && (
                          <span className="block text-micro text-zinc-400 font-sans italic">
                            ({inv.discountReason})
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-mono font-medium text-caption text-ink">
                    {formatCurrency(inv.totalDue)}
                  </td>

                  <td className="p-3 font-mono text-caption text-status-occupied font-medium">
                    {formatCurrency(inv.paidAmount)}
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-block text-micro font-mono uppercase px-2 py-0.5 border ${
                        inv.status === "PAID"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : inv.status === "PARTIAL"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-red-50 text-red-800 border-red-300"
                      }`}
                    >
                      {inv.status === "PAID"
                        ? "Cleared"
                        : inv.status === "PARTIAL"
                        ? "Partial"
                        : "Arrears Due"}
                    </span>
                    {inv.balanceDues > 0 && (
                      <p className="text-micro font-mono text-status-unpaid font-medium mt-1">
                        Dues: {formatCurrency(inv.balanceDues)}
                      </p>
                    )}
                  </td>

                  <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                    {/* Record Payment */}
                    {inv.status !== "PAID" && (
                      <button
                        onClick={() => handleOpenPayment(inv)}
                        className="inline-flex items-center gap-1 text-micro font-mono border border-border bg-ink text-canvas hover:bg-brass px-2 py-1 transition-colors"
                        title="Record Remittance"
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>Pay</span>
                      </button>
                    )}

                    {/* View/Print Bank Challan */}
                    <button
                      onClick={() => setSelectedInvoiceForChallan(inv)}
                      className="inline-flex items-center gap-1 text-micro font-mono border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-2 py-1 transition-colors"
                      title="View Official 3-Part Bank Challan"
                    >
                      <Printer className="w-3 h-3 text-brass" />
                      <span>Challan</span>
                    </button>

                    {/* WhatsApp Slip */}
                    <button
                      onClick={() => {
                        const std = students.find((s) => s.id === inv.studentId);
                        setSelectedInvoiceForWhatsApp(inv);
                      }}
                      className="inline-flex items-center gap-1 text-micro font-mono border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2 py-1 transition-colors"
                      title="Dispatch WhatsApp Slip"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-700" />
                      <span>WhatsApp</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Record Payment Modal */}
      {paymentTargetInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Record Fee Remittance
              </h3>
              <button
                onClick={() => setPaymentTargetInvoice(null)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4">
              <div className="p-3 bg-canvas-subtle border border-border text-caption space-y-1">
                <p className="font-medium text-ink">
                  Resident: {paymentTargetInvoice.studentName} (Suite #{paymentTargetInvoice.roomNumber})
                </p>
                <p className="text-ink-muted">
                  Invoice Ref: {paymentTargetInvoice.id} | Balance Due: {formatCurrency(paymentTargetInvoice.balanceDues > 0 ? paymentTargetInvoice.balanceDues : paymentTargetInvoice.totalDue)}
                </p>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Amount Realized (Rs.) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={paymentTargetInvoice.totalDue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                />
                <span className="text-micro text-ink-muted font-mono mt-0.5 block">
                  Partial payments will leave remaining balance as rolling arrears.
                </span>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Bank Transaction Ref / Deposit Slip Voucher
                </label>
                <input
                  type="text"
                  required
                  value={bankReceiptRef}
                  onChange={(e) => setBankReceiptRef(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setPaymentTargetInvoice(null)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Commit Payment Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Monthly Invoices Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Initiate Monthly Billing Cycle
              </h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateInvoices} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Billing Month *
                  </label>
                  <select
                    value={genMonth}
                    onChange={(e) => setGenMonth(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  >
                    <option value="December">December</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Accounting Year *
                  </label>
                  <input
                    type="number"
                    value={genYear}
                    onChange={(e) => setGenYear(Number(e.target.value))}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-canvas-subtle border border-border text-caption text-ink-muted space-y-1">
                <p className="font-medium text-ink">Statutory Rollover Rules:</p>
                <ul className="list-disc list-inside space-y-0.5 text-micro">
                  <li>All active residents receive an automated invoice.</li>
                  <li>Previous unpaid dues automatically carry forward as arrears.</li>
                  <li>Challans are generated with Meezan Bank IBAN metadata.</li>
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Generate Cycle Challans
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bank Challan 3-Part Modal */}
      <BankChallanModal
        invoice={selectedInvoiceForChallan}
        onClose={() => setSelectedInvoiceForChallan(null)}
      />

      {/* WhatsApp Dispatch Modal */}
      <WhatsAppSlipModal
        invoice={selectedInvoiceForWhatsApp}
        student={students.find((s) => s.id === selectedInvoiceForWhatsApp?.studentId)}
        onClose={() => setSelectedInvoiceForWhatsApp(null)}
      />
    </div>
  );
}
