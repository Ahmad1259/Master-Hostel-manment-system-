"use client";

import React, { useState } from "react";
import { useApp } from "../../lib/store";
import { Shield, Lock, Check, X } from "lucide-react";

export function TierBadge() {
  const { saasTier, setSaasTier } = useApp();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const tierLabels = {
    BASIC: "Basic plan",
    STANDARD: "Standard plan",
    PREMIUM: "Premium plan",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowUpgradeModal(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors cursor-pointer"
        title="View subscription plan"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
        <span>{tierLabels[saasTier]}</span>
      </button>

      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-gray-500">
                  Plan management
                </span>
                <h3 className="text-lg font-medium text-gray-900 mt-0.5">
                  Subscription plan
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select an operational tier for this branch
                </p>
              </div>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Basic Tier */}
              <div
                className={`border rounded-lg p-4 flex flex-col justify-between ${
                  saasTier === "BASIC"
                    ? "border-emerald-700 bg-emerald-50/20"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      Starter
                    </span>
                    {saasTier === "BASIC" && (
                      <span className="text-[11px] text-emerald-800 font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">Basic</h4>
                    <p className="text-xl font-medium text-gray-900 mt-1 tabular-nums">
                      Rs 4,500 <span className="text-xs font-normal text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gray-500" />
                      <span>Up to 30 beds</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gray-500" />
                      <span>Room &amp; bed allocations</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-400">
                      <Lock className="w-3.5 h-3.5 text-gray-300" />
                      <span>No WhatsApp challans</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-400">
                      <Lock className="w-3.5 h-3.5 text-gray-300" />
                      <span>No mess ledger</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSaasTier("BASIC");
                    setShowUpgradeModal(false);
                  }}
                  className={`mt-4 w-full py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    saasTier === "BASIC"
                      ? "bg-gray-100 text-gray-700 cursor-default"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {saasTier === "BASIC" ? "Current plan" : "Switch to Basic"}
                </button>
              </div>

              {/* Standard Tier */}
              <div
                className={`border rounded-lg p-4 flex flex-col justify-between ${
                  saasTier === "STANDARD"
                    ? "border-emerald-700 bg-emerald-50/20"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-800 font-medium">
                      Standard
                    </span>
                    {saasTier === "STANDARD" && (
                      <span className="text-[11px] text-emerald-800 font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">Standard</h4>
                    <p className="text-xl font-medium text-gray-900 mt-1 tabular-nums">
                      Rs 9,500 <span className="text-xs font-normal text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Up to 150 beds</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Mess &amp; dining ledger</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Complaints tracking</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>SMS &amp; challan dispatch</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSaasTier("STANDARD");
                    setShowUpgradeModal(false);
                  }}
                  className={`mt-4 w-full py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    saasTier === "STANDARD"
                      ? "bg-gray-100 text-gray-700 cursor-default"
                      : "bg-emerald-700 hover:bg-emerald-800 text-white"
                  }`}
                >
                  {saasTier === "STANDARD" ? "Current plan" : "Switch to Standard"}
                </button>
              </div>

              {/* Premium Tier */}
              <div
                className={`border rounded-lg p-4 flex flex-col justify-between ${
                  saasTier === "PREMIUM"
                    ? "border-emerald-700 bg-emerald-50/20"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      Multi-branch
                    </span>
                    {saasTier === "PREMIUM" && (
                      <span className="text-[11px] text-emerald-800 font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">Premium</h4>
                    <p className="text-xl font-medium text-gray-900 mt-1 tabular-nums">
                      Rs 18,000 <span className="text-xs font-normal text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gray-500" />
                      <span>Unlimited beds &amp; branches</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gray-500" />
                      <span>P&amp;L financial ledger</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gray-500" />
                      <span>Staff biometric records</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gray-500" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSaasTier("PREMIUM");
                    setShowUpgradeModal(false);
                  }}
                  className={`mt-4 w-full py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    saasTier === "PREMIUM"
                      ? "bg-gray-100 text-gray-700 cursor-default"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {saasTier === "PREMIUM" ? "Current plan" : "Switch to Premium"}
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
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
      <Lock className="w-3 h-3 text-gray-400" />
      <span>{featureName} (Standard plan)</span>
    </span>
  );
}
