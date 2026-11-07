"use client";

import React from "react";
import hostelConfig from "../../../../hostel.config";
import { useApp } from "../../../lib/store";
import {
  Settings,
  Building,
  MapPin,
  CreditCard,
  Calendar,
  BarChart,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Palette,
} from "lucide-react";

export default function SettingsPage() {
  const { currentBranch, language } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            White-Label Core Configuration
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            Institutional Brand &amp; Operational Engine Settings
          </h1>
          <p className="text-body text-ink-muted">
            Inspect root configuration parameters driven directly by <code className="text-caption font-mono bg-canvas-subtle px-1.5 py-0.5 border border-border">hostel.config.ts</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 border border-border bg-canvas-surface px-3 py-1.5 text-caption font-mono">
          <FileCode className="w-3.5 h-3.5 text-brass" />
          <span>hostel.config.ts Synced</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Brand & Identity */}
        <div className="border border-border bg-canvas-surface p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Building className="w-4 h-4 text-brass" />
            <h3 className="font-serif text-subhead tracking-tight text-ink font-medium">
              1. Brand &amp; Commercial Identity
            </h3>
          </div>

          <div className="space-y-3 text-caption font-mono">
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Hostel Brand Name:</span>
              <span className="font-sans font-bold text-ink">{hostelConfig.identity.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Corporate Entity:</span>
              <span className="text-ink">{hostelConfig.identity.legalEntity}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Architectural Monogram:</span>
              <span className="font-bold text-brass">{hostelConfig.identity.monogram}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Official Phone:</span>
              <span className="text-ink">{hostelConfig.identity.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Warden Emergency Hotline:</span>
              <span className="text-ink">{hostelConfig.identity.emergencyPhone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Official Admissions Email:</span>
              <span className="text-ink">{hostelConfig.identity.email}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Cadastral Geographic Configuration */}
        <div className="border border-border bg-canvas-surface p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <MapPin className="w-4 h-4 text-brass" />
            <h3 className="font-serif text-subhead tracking-tight text-ink font-medium">
              2. Local Cadastre &amp; Geo-Coordinates
            </h3>
          </div>

          <div className="space-y-3 text-caption font-mono">
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Physical Street Address:</span>
              <span className="text-ink text-right max-w-xs">{hostelConfig.geo.address}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Neighborhood &amp; City:</span>
              <span className="text-ink">{hostelConfig.geo.neighborhood}, {hostelConfig.geo.city}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Postal Code:</span>
              <span className="text-ink">{hostelConfig.geo.postalCode}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">GPS Coordinates:</span>
              <span className="text-brass">
                {hostelConfig.geo.geoCoordinates.latitude}° N, {hostelConfig.geo.geoCoordinates.longitude}° E
              </span>
            </div>
            <div className="pt-1">
              <span className="text-ink-muted block mb-1">Nearby Educational Campuses:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-ink">
                {hostelConfig.geo.nearbyInstitutions.slice(0, 3).map((inst, i) => (
                  <li key={i}>{inst.name} ({inst.distanceKm} km, {inst.transitTimeMinutes} min)</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Banking & Settlement Credentials */}
        <div className="border border-border bg-canvas-surface p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <CreditCard className="w-4 h-4 text-brass" />
            <h3 className="font-serif text-subhead tracking-tight text-ink font-medium">
              3. Banking Partner &amp; Deposit Challan Setup
            </h3>
          </div>

          <div className="space-y-3 text-caption font-mono">
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Designated Bank:</span>
              <span className="font-bold text-ink">{hostelConfig.banking.bankName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Branch Code:</span>
              <span className="text-ink">{hostelConfig.banking.branchCode}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Account Title:</span>
              <span className="text-ink uppercase">{hostelConfig.banking.accountTitle}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Commercial Account No:</span>
              <span className="text-ink font-bold">{hostelConfig.banking.accountNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Official IBAN:</span>
              <span className="text-brass font-bold">{hostelConfig.banking.iban}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">SWIFT / BIC Code:</span>
              <span className="text-ink">{hostelConfig.banking.swiftCode}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Billing Rules & Analytics */}
        <div className="border border-border bg-canvas-surface p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Calendar className="w-4 h-4 text-brass" />
            <h3 className="font-serif text-subhead tracking-tight text-ink font-medium">
              4. Billing Bylaws &amp; Search Engine Suite
            </h3>
          </div>

          <div className="space-y-3 text-caption font-mono">
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Monthly Statutory Due Date:</span>
              <span className="font-bold text-ink">The {hostelConfig.billing.monthlyDueDay}th of each month</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Late Settlement Surcharge:</span>
              <span className="text-status-unpaid font-bold">{hostelConfig.billing.lateSurchargePercent}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Admission Security Deposit:</span>
              <span className="text-ink">Rs. {hostelConfig.billing.standardSecurityDeposit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Monthly Laundry Quota:</span>
              <span className="text-ink">{hostelConfig.billing.defaultLaundryAllowancePieces} Pieces / Resident</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Google Analytics 4 (GA4):</span>
              <span className="text-brass font-bold">{hostelConfig.analytics.ga4MeasurementId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-ink-muted">Search Console Token:</span>
              <span className="text-ink text-[11px] truncate max-w-[180px]">
                {hostelConfig.analytics.googleSearchConsoleVerification}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
