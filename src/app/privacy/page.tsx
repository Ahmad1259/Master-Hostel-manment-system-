import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, FileText, UserCheck, AlertTriangle } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export const metadata = {
  title: `Privacy & Data Protection Policy | ${hostelConfig.identity.name}`,
  description: `Official statutory data protection and resident confidentiality policy of ${hostelConfig.identity.name} under Pakistan laws.`,
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory Compliance Charter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Resident Privacy &amp; Data Protection Policy
          </h1>
          <p className="text-xs text-gray-500">
            Effective: Academic Year 2026–2027 • Legal Reference: GP-PRIV-2026 • Governed under Pakistan Law
          </p>
        </header>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              1. What Data We Collect &amp; Why
            </h2>
            <p>
              In accordance with provincial laws in Punjab, Pakistan, {hostelConfig.identity.name} collects and processes only the information strictly necessary for legal residency and premises safety:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs">
              <li>
                <strong className="text-gray-900">Resident Full Legal Name &amp; CNIC Number:</strong> Required by the Punjab Information of Temporary Residents Act 2015 for mandatory tenant verification (Police Form 15).
              </li>
              <li>
                <strong className="text-gray-900">Contact Information:</strong> Resident mobile number and primary guardian/emergency contact number for critical communication and security alerts.
              </li>
              <li>
                <strong className="text-gray-900">Chamber Allotment &amp; Financial History:</strong> Room/bed numbers, admission dates, security deposit receipts, and monthly fee transaction logs for accounting and billing dispute resolution.
              </li>
              <li>
                <strong className="text-gray-900">Perimeter Ingress/Egress Timestamps:</strong> Gate turnstile logs and visitor registrations to maintain resident physical security.
              </li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              2. Data Protection &amp; Electronic Security (PECA 2016)
            </h2>
            <p>
              Under the Prevention of Electronic Crimes Act (PECA 2016), we implement role-based access controls. Only the Chief Warden and authorized hostel accountants have access to resident identity files. Data is stored in encrypted digital databases and is never sold, leased, or shared with third-party advertising companies or marketing aggregators.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              3. Right to Erasure (&quot;Delete My Data&quot;)
            </h2>
            <p>
              Residents who have completed their tenancy and cleared all financial dues have the right to request permanent deletion or anonymization of their contact details and biometric records from active systems, subject only to mandatory legal retention periods required by tax and law enforcement authorities.
            </p>
            <p className="text-xs text-gray-500">
              To request record erasure, submit an inquiry through the ERP portal or email our compliance desk at{" "}
              <a href="mailto:privacy@grandpavilion.pk" className="text-emerald-700 underline font-semibold">
                privacy@grandpavilion.pk
              </a>.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-emerald-600" />
              4. Law Enforcement Disclosures
            </h2>
            <p>
              Information will only be shared with verified public authorities (Punjab Police, Counter Terrorism Department, or relevant magistrates) upon presentation of formal statutory directives or judicial warrants as mandated under the Code of Criminal Procedure (CrPC).
            </p>
          </section>
        </div>

        {/* Legal Disclaimer Footer */}
        <footer className="pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-2">
          <p>
            <strong>Operating Entity:</strong> The Grand Pavilion Residency • Plot 42-B, Sector C, Commercial Enclave, Gulberg III, Lahore, Pakistan.
          </p>
          <p>
            Contact: +92 42 3578 9201 • Email: compliance@grandpavilion.pk
          </p>
        </footer>
      </div>
    </main>
  );
}
