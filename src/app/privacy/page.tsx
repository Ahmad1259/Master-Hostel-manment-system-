import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, Lock } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export const metadata = {
  title: `Privacy & Data Protection Policy | ${hostelConfig.identity.name}`,
  description: `Official statutory data protection and resident confidentiality policy of ${hostelConfig.identity.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-caption text-ink-muted hover:text-brass transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Architectural Showcase</span>
        </Link>

        <header className="border-b border-border pb-6 mb-8">
          <div className="flex items-center gap-2 text-caption text-brass uppercase tracking-widest font-mono mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Compliance Document</span>
          </div>
          <h1 className="font-serif text-title tracking-tight text-ink">
            Resident Privacy &amp; Data Protection Charter
          </h1>
          <p className="text-caption text-ink-muted mt-2">
            Effective Date: Academic Cycle 2026–2027 | Document Reference: GP-SEC-POL-04
          </p>
        </header>

        <div className="space-y-8 text-body text-ink leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-subhead tracking-tight text-ink flex items-center gap-2">
              <FileText className="w-4 h-4 text-brass" />
              1. Scope &amp; National Identity Collection
            </h2>
            <p>
              In strict accordance with local law enforcement regulations and hostel registration bylaws in Punjab, Pakistan, {hostelConfig.identity.name} collects verified National Identity Card (CNIC / B-Form) records, biometric ingress timestamps, emergency next-of-kin contacts, and institutional affiliations solely for resident security, police verification forms, and administrative accounting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-subhead tracking-tight text-ink flex items-center gap-2">
              <Lock className="w-4 h-4 text-brass" />
              2. Zero-Exposure Banking &amp; Financial Ledgers
            </h2>
            <p>
              Fee transactions conducted via {hostelConfig.banking.bankName} deposit challans or direct Inter-Bank Fund Transfers (IBFT) are reconciled against encrypted vouchers. Financial logs are retained for statutory tax audits by the Federal Board of Revenue (FBR) and are never disclosed, rented, or monetized to any third-party marketing entities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-subhead tracking-tight text-ink">
              3. Surveillance &amp; Perimeter Monitoring
            </h2>
            <p>
              Optical closed-circuit surveillance (CCTV) is maintained exclusively in shared public zones (main entrance, corridors, dining pavilion, and exterior perimeters) for resident safety. Surveillance feeds are strictly restricted to the Chief Warden and designated statutory security officials. Private chambers and bathroom suites are strictly exempt from recording.
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-6">
            <h2 className="font-serif text-subhead tracking-tight text-ink">
              4. Contact the Data Protection Officer
            </h2>
            <p className="text-caption text-ink-muted">
              For verification record amendments or inquiries regarding data archival, contact:
              <br />
              <strong className="text-ink">{hostelConfig.identity.name} Legal Directorate</strong>
              <br />
              {hostelConfig.geo.address}, {hostelConfig.geo.city}
              <br />
              Direct Inquiries: {hostelConfig.identity.email} | Official Warden Desk: {hostelConfig.identity.phone}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
