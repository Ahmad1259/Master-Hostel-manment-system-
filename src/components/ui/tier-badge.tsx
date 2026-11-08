"use client";

import React, { useState } from "react";
import { useApp } from "../../lib/store";
import { Sparkles, Shield, Lock, Check, X } from "lucide-react";

export function TierBadge() {
  const { saasTier, setSaasTier } = useApp();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const tierStyles = {
    BASIC: "bg-slate-100 text-slate-700 border-slate-300",
    STANDARD: "bg-emerald-50 text-emerald-800 border-emerald-200",
    PREMIUM: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowUpgradeModal(true)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-xs ${tierStyles[saasTier]}`}
        title="Click to view or switch SaaS subscription tier"
      >
        <Sparkles className="w-3 h-3 text-current" />
        <span>{saasTier} Plan</span>
      </button>

      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  SaaS Tier Management
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Choose Your Hostel Enterprise Plan
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Seamlessly scale from single residential buildings to multi-campus properties.
                </p>
              </div>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Basic Tier */}
              <div
                className={`border rounded-xl p-4 flex flex-col justify-between ${
                  saasTier === "BASIC"
                    ? "border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Starter
                    </span>
                    {saasTier === "BASIC" && (
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Basic</h4>
                    <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                      Rs 4,500 <span className="text-xs font-normal text-slate-500">/mo</span>
                    </p>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Up to 30 Beds</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Room &amp; Bed Allocations</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-slate-300" />
                      <span>No WhatsApp Challans</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-slate-300" />
                      <span>No Mess Ledger</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSaasTier("BASIC");
                    setShowUpgradeModal(false);
                  }}
                  className={`mt-4 w-full py-2 text-xs font-semibold rounded-lg transition-colors ${
                    saasTier === "BASIC"
                      ? "bg-slate-200 text-slate-800"
                      : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {saasTier === "BASIC" ? "Current Plan" : "Switch to Basic"}
                </button>
              </div>

              {/* Standard Tier */}
              <div
                className={`border rounded-xl p-4 flex flex-col justify-between ${
                  saasTier === "STANDARD"
                    ? "border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Popular
                    </span>
                    {saasTier === "STANDARD" && (
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Standard</h4>
                    <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                      Rs 9,500 <span className="text-xs font-normal text-slate-500">/mo</span>
                    </p>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Up to 150 Beds</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Mess &amp; Dining Ledger</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Complaints Tracking</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>SMS &amp; Challan Slip Dispatch</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSaasTier("STANDARD");
                    setShowUpgradeModal(false);
                  }}
                  className={`mt-4 w-full py-2 text-xs font-semibold rounded-lg transition-colors ${
                    saasTier === "STANDARD"
                      ? "bg-slate-200 text-slate-800"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {saasTier === "STANDARD" ? "Current Plan" : "Upgrade to Standard"}
                </button>
              </div>

              {/* Premium Tier */}
              <div
                className={`border rounded-xl p-4 flex flex-col justify-between ${
                  saasTier === "PREMIUM"
                    ? "border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                      Enterprise
                    </span>
                    {saasTier === "PREMIUM" && (
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Premium</h4>
                    <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                      Rs 18,000 <span className="text-xs font-normal text-slate-500">/mo</span>
                    </p>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Unlimited Beds &amp; Campuses</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>P&amp;L Financial Tax Audit</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Staff Biometrics Integration</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>24/7 Dedicated Account Rep</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSaasTier("PREMIUM");
                    setShowUpgradeModal(false);
                  }}
                  className={`mt-4 w-full py-2 text-xs font-semibold rounded-lg transition-colors ${
                    saasTier === "PREMIUM"
                      ? "bg-slate-200 text-slate-800"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {saasTier === "PREMIUM" ? "Current Plan" : "Upgrade to Premium"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function LockedFeatureBadge({ featureName }: { featureName: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
      <Lock className="w-3 h-3 text-amber-600" />
      <span>{featureName} (Standard+ Plan)</span>
    </span>
  );
}
