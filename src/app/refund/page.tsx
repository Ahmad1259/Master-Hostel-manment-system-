import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, FileText, Clock } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export const metadata = {
  title: `Refund & Security Deposit Policy | ${hostelConfig.identity.name}`,
  description: `Official policy on advance security deposit refunds, rent settlements, and deduction criteria at ${hostelConfig.identity.name}.`,
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#111827] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <header className="border-b border-gray-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Fiscal Settlement Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Security Deposit &amp; Refund Policy
          </h1>
          <p className="text-xs text-gray-500">
            Transparent rules for advance security deposits, vacating settlements, and refund timelines.
          </p>
        </header>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Advance Security Deposit Refund Process
            </h2>
            <p>
              The refundable security deposit collected at the time of admission is fully refundable upon checkout, subject to the following statutory criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs">
              <li>
                <strong className="text-gray-900">30-Day Prior Written Notice:</strong> The resident must serve notice via the ERP dashboard or to the Warden at least 30 calendar days before vacating.
              </li>
              <li>
                <strong className="text-gray-900">Room Clearance &amp; Key Handover:</strong> The room, furniture, keys, and electrical fixtures must be inspected and cleared of any physical damage.
              </li>
              <li>
                <strong className="text-gray-900">Zero Outstanding Dues:</strong> All monthly rent, mess bills, and laundry charges must be settled in full.
              </li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              2. Refund Timeline &amp; Disbursement Mode
            </h2>
            <p>
              Once clearance is signed off by the Warden, the net refundable amount is credited directly to the resident&apos;s or designated guardian&apos;s verified bank account via Inter-Bank Fund Transfer (IBFT) within <strong>15 banking days</strong>. Cash refunds are not disbursed for audit and taxation compliance.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              3. Non-Refundable Items &amp; Deductions
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs">
              <li>
                <strong className="text-gray-900">Ongoing Month Rent:</strong> Monthly rent once paid for an ongoing billing cycle is strictly non-refundable.
              </li>
              <li>
                <strong className="text-gray-900">Admission / Registration Fee:</strong> The one-time nominal processing fee is non-refundable.
              </li>
              <li>
                <strong className="text-gray-900">Property Damages:</strong> Any structural or inventory damage exceeding normal wear and tear will be deducted at verified repair cost.
              </li>
            </ul>
          </section>
        </div>

        <footer className="pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-2">
          <p>
            <strong>Accounts &amp; Settlement Office:</strong> The Grand Pavilion Residency • Plot 42-B, Sector C, Commercial Enclave, Gulberg III, Lahore.
          </p>
          <p>
            Settlement Helpline: +92 42 3578 9201 • Email: billing@grandpavilion.pk
          </p>
        </footer>
      </div>
    </main>
  );
}
