"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "../../../lib/store";
import { FeeInvoiceItem } from "../../../lib/mock-data";
import { formatCurrency, formatDate } from "../../../lib/utils";
import { DataTable, Column } from "../../../components/ui/data-table";
import { DestructiveConfirmModal } from "../../../components/ui/destructive-modal";
import {
  Receipt,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  X,
  CreditCard,
  Printer,
  Trash2,
  Check,
  DollarSign,
  FileCheck,
} from "lucide-react";

export default function FeesPage() {
  const {
    feeInvoices,
    recordFeePayment,
    deletePayment,
    generateMonthlyInvoices,
    students,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [monthFilter, setMonthFilter] = useState<string>("ALL");

  // Record Payment Modal State
  const [paymentTargetInvoice, setPaymentTargetInvoice] = useState<FeeInvoiceItem | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [bankReceiptRef, setBankReceiptRef] = useState<string>("");

  // Printable Receipt View Modal
  const [receiptTarget, setReceiptTarget] = useState<FeeInvoiceItem | null>(null);

  // Destructive Delete Modal
  const [invoiceToDelete, setInvoiceToDelete] = useState<FeeInvoiceItem | null>(null);

  // Generate Invoices Modal
  const [showGenModal, setShowGenModal] = useState(false);
  const [genMonth, setGenMonth] = useState("December");
  const [genYear, setGenYear] = useState(2026);

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return feeInvoices.filter((inv) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          inv.studentName.toLowerCase().includes(q) ||
          inv.roomNumber.toLowerCase().includes(q) ||
          (inv.bankReceiptRef && inv.bankReceiptRef.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (statusFilter !== "ALL" && inv.status !== statusFilter) {
        return false;
      }

      if (monthFilter !== "ALL" && inv.month !== monthFilter) {
        return false;
      }

      return true;
    });
  }, [feeInvoices, searchQuery, statusFilter, monthFilter]);

  // Overall totals
  const totalBilled = feeInvoices.reduce((acc, i) => acc + i.totalDue, 0);
  const totalCollected = feeInvoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOutstanding = feeInvoices.reduce((acc, i) => acc + i.balanceDues, 0);

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
    showToast(`Payment of Rs ${paymentAmount.toLocaleString()} recorded.`, "success");
  };

  // Reusable Table Columns (UX Pattern #11)
  const columns: Column<FeeInvoiceItem>[] = [
    {
      key: "studentName",
      header: "Resident & Room",
      sortable: true,
      render: (inv) => (
        <div>
          <span className="font-bold text-slate-900 block">{inv.studentName}</span>
          <span className="text-[11px] text-slate-500 font-mono block">Room {inv.roomNumber}</span>
        </div>
      ),
    },
    {
      key: "month",
      header: "Billing Period",
      sortable: true,
      render: (inv) => (
        <span className="font-semibold text-slate-700">
          {inv.month} {inv.year}
        </span>
      ),
    },
    {
      key: "totalDue",
      header: "Monthly Rent + Dues",
      sortable: true,
      render: (inv) => (
        <span className="font-mono font-bold text-slate-900 tabular-nums">
          {formatCurrency(inv.totalDue)}
        </span>
      ),
    },
    {
      key: "paidAmount",
      header: "Paid Amount",
      sortable: true,
      render: (inv) => (
        <span className="font-mono font-bold text-emerald-700 tabular-nums">
          {formatCurrency(inv.paidAmount)}
        </span>
      ),
    },
    {
      key: "balanceDues",
      header: "Pending Arrears",
      sortable: true,
      render: (inv) => (
        <span
          className={`font-mono font-bold tabular-nums ${
            inv.balanceDues > 0 ? "text-amber-600" : "text-slate-400"
          }`}
        >
          {formatCurrency(inv.balanceDues)}
        </span>
      ),
    },
    {
      key: "bankReceiptRef",
      header: "Receipt / Bank Ref",
      render: (inv) => (
        <span className="font-mono text-[11px] text-slate-600 tabular-nums">
          {inv.bankReceiptRef || "Pending"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (inv) => (
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
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (inv) => (
        <div className="flex items-center justify-end gap-1.5">
          {inv.status !== "PAID" && (
            <button
              type="button"
              onClick={() => handleOpenPayment(inv)}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold transition-colors shadow-2xs"
            >
              Pay
            </button>
          )}

          <button
            type="button"
            onClick={() => setReceiptTarget(inv)}
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Print Official Challan Receipt"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setInvoiceToDelete(inv)}
            className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete Invoice"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Financial Ledger &amp; Billing
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Rent Invoices &amp; Payment History
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Automated monthly fee generation, bank reconciliation, and arrears tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowGenModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Receipt className="w-4 h-4" />
          <span>Generate Monthly Invoices</span>
        </button>
      </div>

      {/* 3 Top Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Total Invoiced
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">
            {formatCurrency(totalBilled)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Cumulative student rent charges</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Collected In Bank / Cash
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
            {formatCurrency(totalCollected)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Reconciled payments</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Pending Dues
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 tabular-nums">
            {formatCurrency(totalOutstanding)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {feeInvoices.filter((i) => i.balanceDues > 0).length} overdue invoices
          </p>
        </div>
      </div>

      {/* Filter and Search Bar (UX Pattern #12) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, room, receipt ref..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="PAID">Paid in Full</option>
            <option value="PARTIAL">Partially Paid</option>
            <option value="UNPAID">Unpaid Dues</option>
          </select>

          {/* Month filter */}
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Billing Months</option>
            <option value="November">November 2026</option>
            <option value="October">October 2026</option>
            <option value="December">December 2026</option>
          </select>
        </div>
      </div>

      {/* Reusable Data Table with EMPTY STATE: "No dues pending" (UX Pattern #5 & #11) */}
      <DataTable
        data={filteredInvoices}
        columns={columns}
        keyExtractor={(i) => i.id}
        emptyTitle={
          statusFilter === "UNPAID" ? "No dues pending" : "No invoices found"
        }
        emptySubtitle={
          statusFilter === "UNPAID"
            ? "All residents have cleared their invoices for this period."
            : "No records matching your search or filters."
        }
        defaultPageSize={10}
      />

      {/* Record Fee Payment Modal */}
      {paymentTargetInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Record Payment for {paymentTargetInvoice.studentName}
              </h3>
              <button
                onClick={() => setPaymentTargetInvoice(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg space-y-1.5 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">Room:</span>
                  <span className="font-bold text-slate-900">Room {paymentTargetInvoice.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Period:</span>
                  <span className="font-bold text-slate-900">
                    {paymentTargetInvoice.month} {paymentTargetInvoice.year}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Billed:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(paymentTargetInvoice.totalDue)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="text-slate-600">Remaining Balance:</span>
                  <span className="font-mono font-bold text-amber-600 tabular-nums">
                    {formatCurrency(paymentTargetInvoice.balanceDues)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Payment Amount Received (PKR) *
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full font-mono text-sm px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Bank Transaction Ref / Cash Voucher # *
                </label>
                <input
                  type="text"
                  required
                  value={bankReceiptRef}
                  onChange={(e) => setBankReceiptRef(e.target.value)}
                  placeholder="e.g. MEZN-7281920 or CASH-001"
                  className="w-full font-mono text-xs px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPaymentTargetInvoice(null)}
                  className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Record Payment &amp; Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Preview Modal */}
      {receiptTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    GP
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Official Fee Challan Receipt
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  The Grand Pavilion &amp; Scholars Residency, Lahore
                </p>
              </div>
              <button
                onClick={() => setReceiptTarget(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Body */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Resident Name
                  </span>
                  <span className="font-bold text-slate-900 text-sm block">
                    {receiptTarget.studentName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Assigned Chamber
                  </span>
                  <span className="font-bold text-slate-900 text-sm block">
                    Room {receiptTarget.roomNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Billing Period
                  </span>
                  <span className="font-bold text-slate-900 block">
                    {receiptTarget.month} {receiptTarget.year}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Receipt Reference
                  </span>
                  <span className="font-mono font-bold text-slate-900 block">
                    {receiptTarget.bankReceiptRef || "CASH-PAID"}
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                <div className="p-3 flex justify-between">
                  <span className="text-slate-600">Monthly Room Rent:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(receiptTarget.amount)}
                  </span>
                </div>
                {receiptTarget.arrears > 0 && (
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-600">Previous Arrears:</span>
                    <span className="font-mono font-bold text-amber-600 tabular-nums">
                      {formatCurrency(receiptTarget.arrears)}
                    </span>
                  </div>
                )}
                <div className="p-3 flex justify-between bg-slate-50/50">
                  <span className="font-bold text-slate-900">Total Invoiced:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(receiptTarget.totalDue)}
                  </span>
                </div>
                <div className="p-3 flex justify-between bg-emerald-50/30">
                  <span className="font-bold text-emerald-800">Amount Received:</span>
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">
                    {formatCurrency(receiptTarget.paidAmount)}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-slate-600">Outstanding Balance:</span>
                  <span className="font-mono font-bold text-slate-800 tabular-nums">
                    {formatCurrency(receiptTarget.balanceDues)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Issued by Warden Office • Lahore
              </span>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Monthly Invoices Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Batch Generate Invoices
              </h3>
              <button
                onClick={() => setShowGenModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Billing Month</label>
                <select
                  value={genMonth}
                  onChange={(e) => setGenMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Billing Year</label>
                <input
                  type="number"
                  value={genYear}
                  onChange={(e) => setGenYear(Number(e.target.value))}
                  className="w-full font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums"
                />
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-[11px] text-blue-900 leading-normal">
                Generates invoices for all <strong>{students.filter((s) => s.status === "ACTIVE").length} active residents</strong> with their assigned monthly rent plus any carried arrears.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowGenModal(false)}
                className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  generateMonthlyInvoices(genMonth, genYear);
                  setShowGenModal(false);
                  showToast(`Invoices generated for ${genMonth} ${genYear}.`, "success");
                }}
                className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
              >
                Generate Invoices
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Destructive Delete Payment Modal (UX Pattern #19) */}
      <DestructiveConfirmModal
        isOpen={!!invoiceToDelete}
        onClose={() => setInvoiceToDelete(null)}
        onConfirm={() => {
          if (invoiceToDelete) {
            deletePayment(invoiceToDelete.id);
            setInvoiceToDelete(null);
          }
        }}
        title="Delete Invoice from Ledger"
        description="Are you sure you want to permanently delete this billing invoice? This will remove the transaction record from financial reports."
        itemName={invoiceToDelete ? `Invoice for ${invoiceToDelete.studentName} (${invoiceToDelete.month} ${invoiceToDelete.year} - Rs ${invoiceToDelete.totalDue})` : undefined}
        confirmButtonText="Delete Invoice"
      />
    </div>
  );
}
