import React from "react";
import Link from "next/link";
import { ArrowLeft, Cookie, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export const metadata = {
  title: `Cookie Policy | ${hostelConfig.identity.name}`,
  description: `Detailed disclosure of essential cookies and absence of marketing tracking at ${hostelConfig.identity.name}.`,
};

export default function CookiePolicyPage() {
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
            <Cookie className="w-3.5 h-3.5" />
            <span>Digital Privacy Standard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Cookie Policy &amp; Tracking Transparency
          </h1>
          <p className="text-xs text-gray-500">
            Transparent disclosure of digital identifiers used across the hostel portal.
          </p>
        </header>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Essential Technical Cookies (Allowed by Default)
            </h2>
            <p>
              We use strictly necessary cookies and local storage tokens to make the SaaS application functional and secure. These cannot be disabled:
            </p>
            <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
                  <tr>
                    <th className="p-3">Identifier</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  <tr>
                    <td className="p-3 font-mono text-gray-900 font-semibold">hostel_session</td>
                    <td className="p-3">Maintains secure staff / student login authentication</td>
                    <td className="p-3">Session / 30 Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-gray-900 font-semibold">hostel_lang</td>
                    <td className="p-3">Remembers language preference (English / Urdu)</td>
                    <td className="p-3">1 Year</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-gray-900 font-semibold">hostel_cookie_consent</td>
                    <td className="p-3">Stores user privacy &amp; cookie consent choices</td>
                    <td className="p-3">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-emerald-600" />
              2. Non-Existent Third-Party &amp; Advertising Trackers
            </h2>
            <p>
              In strict respect of user confidentiality, our portal:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs">
              <li>Does <strong>NOT</strong> embed Meta / Facebook Pixels.</li>
              <li>Does <strong>NOT</strong> deploy Google Analytics cross-site tracking.</li>
              <li>Does <strong>NOT</strong> share resident viewing patterns with ad networks.</li>
            </ul>
          </section>
        </div>

        <footer className="pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-2">
          <p>
            <strong>The Grand Pavilion Residency</strong> • Compliance Desk: Plot 42-B, Sector C, Commercial Enclave, Gulberg III, Lahore.
          </p>
          <p>
            Inquiries: privacy@grandpavilion.pk
          </p>
        </footer>
      </div>
    </main>
  );
}
