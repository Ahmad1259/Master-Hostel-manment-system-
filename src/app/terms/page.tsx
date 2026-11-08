import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, ShieldAlert, Award, FileCheck } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export const metadata = {
  title: `Terms & Conditions of Residency | ${hostelConfig.identity.name}`,
  description: `Official residency rules, rent settlement guidelines, curfew bylaws, and code of conduct for ${hostelConfig.identity.name}.`,
};

export default function TermsPage() {
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Operational Residency Charter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Terms of Academic &amp; Student Residency
          </h1>
          <p className="text-xs text-gray-500">
            Enforced by the Board of Wardens &amp; Trustees • Lahore, Pakistan
          </p>
        </header>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              1. Monthly Rent &amp; Billing Schedule
            </h2>
            <p>
              Monthly accommodation rent is payable in advance by the <strong>5th calendar day</strong> of each month. A late payment surcharge of 5% applies after the 10th of the month. Payment receipts are automatically issued through the SaaS ERP portal upon verified bank deposit or online transfer.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              2. Curfew, Security &amp; Gate Protocols
            </h2>
            <p>
              For resident welfare and campus security, perimeter gates close at <strong>22:30 (10:30 PM)</strong>. Late entry requires prior digital gate-pass approval from the Warden and guardian acknowledgment. Non-registered visitors are only permitted in the ground-floor reception area during visiting hours (10:00 AM – 08:00 PM).
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              3. Vacating &amp; 30-Day Notice Policy
            </h2>
            <p>
              Residents intending to vacate their chamber must submit a minimum of <strong>30 calendar days advance written notice</strong> through the hostel dashboard. Failure to provide 30 days notice will result in the forfeiture of one month&apos;s rent from the security deposit.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              4. Mess &amp; Dining Hall Regulations
            </h2>
            <p>
              Residents enrolled in the mess service can toggle their dining status (Mess On / Mess Off) with a minimum of <strong>24 hours prior notice</strong> to the kitchen warden. Meal charges are adjusted in the subsequent month&apos;s invoice.
            </p>
          </section>
        </div>

        <footer className="pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-2">
          <p>
            <strong>The Grand Pavilion Residency</strong> • Plot 42-B, Sector C, Commercial Enclave, Gulberg III, Lahore.
          </p>
          <p>
            Contact Warden Office: +92 300 8472911 • Official Website: grandpavilion.pk
          </p>
        </footer>
      </div>
    </main>
  );
}
