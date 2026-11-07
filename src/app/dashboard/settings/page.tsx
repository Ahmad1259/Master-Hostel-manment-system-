"use client";

import React from "react";
import hostelConfig from "../../../../hostel.config";
import { useApp } from "../../../lib/store";
import {
  Settings,
  Building2,
  MapPin,
  CreditCard,
  Calendar,
  BarChart,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Palette,
  Phone,
  Mail,
  Zap,
} from "lucide-react";

export default function SettingsPage() {
  const { currentBranch } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            White-Label System Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Hostel Brand &amp; Operational Engine Settings
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Root configuration parameters synced directly from <code className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold">hostel.config.ts</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-700 shadow-xs">
          <FileCode className="w-3.5 h-3.5 text-blue-600" />
          <span>hostel.config.ts Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Brand & Identity */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              1. Brand &amp; Commercial Identity
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Hostel Name:</span>
              <span className="font-bold text-slate-900">{hostelConfig.identity.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Brand Monogram:</span>
              <span className="font-mono font-bold text-slate-900">{hostelConfig.identity.monogram}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Official Contact:</span>
              <span className="font-mono text-slate-900">{hostelConfig.identity.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Dispatch Email:</span>
              <span className="font-mono text-slate-900">{hostelConfig.identity.email}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Geo & Campus */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              2. Geographic Campus Coordinates
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Hostel City:</span>
              <span className="font-bold text-slate-900">{hostelConfig.geo.city}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Commercial Sector:</span>
              <span className="font-bold text-slate-900">{hostelConfig.geo.neighborhood}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Street Address:</span>
              <span className="text-slate-900 text-right">{hostelConfig.geo.address}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Google Map Link:</span>
              <a
                href={`https://www.google.com/maps?q=${hostelConfig.geo.geoCoordinates.latitude},${hostelConfig.geo.geoCoordinates.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Coordinates ↗
              </a>
            </div>
          </div>
        </div>

        {/* Card 3: Banking & Invoicing */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              3. Banking &amp; Challan Collection
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Bank Partner:</span>
              <span className="font-bold text-slate-900">{hostelConfig.banking.bankName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Account Title:</span>
              <span className="font-bold text-slate-900">{hostelConfig.banking.accountTitle}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Official IBAN:</span>
              <span className="font-mono text-slate-900 font-semibold">{hostelConfig.banking.iban}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Default Currency:</span>
              <span className="font-mono font-bold text-slate-900">{currentBranch.currency || "PKR"}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Facilities Infrastructure */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Zap className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              4. Power &amp; Commercial Utilities
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Monthly Due Day:</span>
              <span className="font-bold text-slate-900">{hostelConfig.billing.monthlyDueDay}th of every month</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Late Surcharge:</span>
              <span className="font-bold text-slate-900">{hostelConfig.billing.lateSurchargePercent}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Standard Security Deposit:</span>
              <span className="font-mono font-bold text-slate-900">PKR {hostelConfig.billing.standardSecurityDeposit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Laundry Quota:</span>
              <span className="font-bold text-slate-900">{hostelConfig.billing.defaultLaundryAllowancePieces} Pieces / Month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
