"use client";

import React from "react";
import { FeeInvoiceItem } from "../lib/mock-data";
import hostelConfig from "../../hostel.config";
import { formatCurrency, formatDate } from "../lib/utils";
import { Printer, X, Download, ShieldCheck, Building2 } from "lucide-react";

interface BankChallanModalProps {
  invoice: FeeInvoiceItem | null;
  onClose: () => void;
}

export function BankChallanModal({ invoice, onClose }: BankChallanModalProps) {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const vouchers = [
    { label: "1. BANK PROCESSING VOUCHER", sub: "For Bank Audit File" },
    { label: "2. HOSTEL BURSAR RECORD", sub: "Return to Warden Desk" },
    { label: "3. RESIDENT STUDENT VOUCHER", sub: "Resident Retained Copy" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-canvas-surface border border-border w-full max-w-5xl my-8 p-6 sm:p-8 shadow-2xl relative">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-border print:hidden">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brass" />
            <span className="font-serif text-subhead tracking-tight text-ink font-medium">
              Official Commercial Bank Challan Voucher (3-Voucher Format)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-caption hover:bg-canvas-subtle transition-colors"
            >
              <Printer className="w-3.5 h-3.5 stroke-[1.25]" />
              <span>Print Challan Sheets</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 border border-border text-ink-muted hover:text-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Challan Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-zinc-300 p-4 bg-white print:p-0 print:border-none">
          {vouchers.map((v, idx) => (
            <div
              key={idx}
              className={`border border-dashed border-zinc-300 p-3 flex flex-col justify-between text-micro leading-tight ${
                idx !== 2 ? "border-r-zinc-400" : ""
              }`}
            >
              {/* Bank & Hostel Header */}
              <div className="border-b border-zinc-800 pb-2 mb-2 text-center">
                <p className="font-serif font-bold text-caption tracking-tight uppercase text-zinc-900">
                  {hostelConfig.banking.bankName}
                </p>
                <p className="font-mono text-micro text-zinc-600">
                  {hostelConfig.banking.branchCode}
                </p>
                <p className="font-mono text-micro font-semibold text-zinc-800 uppercase mt-0.5">
                  IBAN: {hostelConfig.banking.iban}
                </p>
                <div className="bg-zinc-100 border border-zinc-200 py-0.5 px-2 mt-1 inline-block">
                  <span className="font-bold text-micro tracking-wider text-zinc-900">
                    {v.label}
                  </span>
                </div>
              </div>

              {/* Challan Metadata */}
              <div className="space-y-1 mb-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Challan Ref:</span>
                  <span className="font-bold text-zinc-900">{invoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cycle:</span>
                  <span className="font-semibold">{invoice.month} {invoice.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Due Date:</span>
                  <span className="font-bold text-red-700">{formatDate(invoice.dueDate)}</span>
                </div>
              </div>

              {/* Student Particulars */}
              <div className="border-t border-b border-zinc-200 py-1.5 mb-2 font-mono space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Resident:</span>
                  <span className="font-bold text-zinc-900 truncate max-w-36">
                    {invoice.studentName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Chamber:</span>
                  <span className="font-bold">Suite #{invoice.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Account:</span>
                  <span className="text-micro">{hostelConfig.banking.accountTitle}</span>
                </div>
              </div>

              {/* Particulars Ledger Table */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between py-0.5 border-b border-zinc-100 text-zinc-700">
                  <span>Standard Suite Tariff:</span>
                  <span className="font-mono">{formatCurrency(invoice.amount)}</span>
                </div>
                {invoice.arrears > 0 && (
                  <div className="flex justify-between py-0.5 border-b border-zinc-100 text-red-700">
                    <span>Arrears B/F:</span>
                    <span className="font-mono">{formatCurrency(invoice.arrears)}</span>
                  </div>
                )}
                {invoice.discount > 0 && (
                  <div className="flex justify-between py-0.5 border-b border-zinc-100 text-emerald-700">
                    <span>Waiver:</span>
                    <span className="font-mono">-{formatCurrency(invoice.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-t-2 border-zinc-900 font-bold text-[12px] text-zinc-900 mt-1">
                  <span>Net Payable:</span>
                  <span className="font-mono">{formatCurrency(invoice.totalDue)}</span>
                </div>
                <div className="flex justify-between py-0.5 text-micro text-zinc-500">
                  <span>Late Fee After Due Date (+5%):</span>
                  <span className="font-mono">
                    {formatCurrency(invoice.totalDue * 1.05)}
                  </span>
                </div>
              </div>

              {/* Verification & Signatures */}
              <div className="border-t border-zinc-200 pt-3 mt-auto space-y-6">
                <div className="flex justify-between text-micro text-zinc-400">
                  <div className="border-t border-zinc-400 pt-1 text-center w-20">
                    Resident Sig.
                  </div>
                  <div className="border-t border-zinc-400 pt-1 text-center w-24">
                    Bank Cashier Stamp
                  </div>
                </div>

                <div className="text-micro text-zinc-400 text-center font-mono leading-tight">
                  Deposit at any Meezan Bank Branch nationwide or via online IBFT.
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-caption text-ink-muted print:hidden">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brass" />
            <span>Barcoded Meezan Bank Standard Interchange Format #GP-PK-2026</span>
          </div>
          <button
            onClick={onClose}
            className="text-caption underline hover:text-ink transition-colors"
          >
            Dismiss Preview
          </button>
        </div>
      </div>
    </div>
  );
}
