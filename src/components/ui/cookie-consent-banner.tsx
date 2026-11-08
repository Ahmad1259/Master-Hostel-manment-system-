"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("hostel_cookie_consent");
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // Local storage disabled or error
    }
  }, []);

  const handleConsent = (type: "essential" | "all") => {
    try {
      localStorage.setItem("hostel_cookie_consent", type);
    } catch {
      // Silent catch
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-white/98 backdrop-blur-md border-t border-gray-200 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-semibold text-gray-900">
              Data Privacy &amp; Statutory Cookie Consent
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              We collect verified resident data (CNIC, phone, room allocations) strictly for hostel administration,
              safety records, and Punjab police tenant verification under the Temporary Residents Act 2015. We use
              essential cookies only and never run third-party marketing trackers. Learn more in our{" "}
              <Link href="/privacy" className="text-emerald-700 underline font-medium hover:text-emerald-800">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/cookies" className="text-emerald-700 underline font-medium hover:text-emerald-800">
                Cookie Policy
              </Link>
              , and{" "}
              <Link href="/refund" className="text-emerald-700 underline font-medium hover:text-emerald-800">
                Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            className="flex-1 md:flex-initial px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => handleConsent("all")}
            className="flex-1 md:flex-initial px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            Accept &amp; Continue
          </button>
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            aria-label="Dismiss cookie notice"
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
