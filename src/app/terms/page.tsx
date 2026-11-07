import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, ShieldAlert, Award } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export const metadata = {
  title: `Statutory Terms of Residency | ${hostelConfig.identity.name}`,
  description: `Official residence charter, fee settlement bylaws, and code of conduct for ${hostelConfig.identity.name}.`,
};

export default function TermsPage() {
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
            <BookOpen className="w-4 h-4" />
            <span>Operational Residency Charter</span>
          </div>
          <h1 className="font-serif text-title tracking-tight text-ink">
            Terms of Academic &amp; Commercial Residency
          </h1>
          <p className="text-caption text-ink-muted mt-2">
            Official Residence Bylaws | Enforced by the Board of Wardens &amp; Trustees
          </p>
        </header>

        <div className="space-y-8 text-body text-ink leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-subhead tracking-tight text-ink flex items-center gap-2">
              <Clock className="w-4 h-4 text-brass" />
              1. Monthly Fee Settlement &amp; Statutory Arrears
            </h2>
            <p>
              In accordance with {hostelConfig.identity.name} fiscal policies, monthly accommodation charges become due on the {hostelConfig.billing.monthlyDueDay}th calendar day of each cycle. Payments unsettled after this deadline will incur a statutory late surcharge of {hostelConfig.billing.lateSurchargePercent}% which rolls over automatically as cumulative arrears.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-subhead tracking-tight text-ink flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-brass" />
              2. Curfew Hours &amp; Gate Pass Requirements
            </h2>
            <p>
              For the collective welfare and physical security of all scholars, main perimeter gates are secured at 22:30 hours. Late entries require verified prior written permission from the Chief Warden and counter-affirmation from the student&apos;s registered guardian. Unauthorized overnight absences will trigger immediate notification to the registered next-of-kin emergency line.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-subhead tracking-tight text-ink flex items-center gap-2">
              <Award className="w-4 h-4 text-brass" />
              3. Architectural Quietude &amp; Code of Fellowship
            </h2>
            <p>
              Chambers are strictly designated as silent study environments between 21:00 and 07:00 daily. Audio devices must operate with headphones. Guests and day visitors must clear check-out protocols at the front guard station before 20:00 hours. Subletting assigned bed slots or altering architectural fixtures without engineering clearance is grounds for immediate contract revocation.
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-6 text-caption text-ink-muted">
            <p>
              By remitting the admission security deposit of Rs. {hostelConfig.billing.standardSecurityDeposit.toLocaleString()}, the resident and their legal guardian solemnly agree to comply with this institutional charter in its entirety.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
