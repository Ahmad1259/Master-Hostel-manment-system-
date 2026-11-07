"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import { formatCurrency } from "../../../lib/utils";
import hostelConfig from "../../../../hostel.config";
import {
  Share2,
  Copy,
  CheckCircle2,
  Gift,
  Users,
  DollarSign,
  Building,
  Check,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function ReferralsPage() {
  const { referrals, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const referralCode = "GP-LAHORE-2026";
  const referralUrl = `https://grandpavilion.pk/r/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    showToast("Referral link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const totalRewardsPaid = referrals
    .filter((r) => r.status === "PAID")
    .reduce((acc, r) => acc + r.rewardAmount, 0);

  const totalPendingRewards = referrals
    .filter((r) => r.status !== "PAID")
    .reduce((acc, r) => acc + r.rewardAmount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Hostel Growth &amp; Network Program
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Hostel Partner &amp; Affiliate Rewards
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Invite fellow commercial hostel owners to the SaaS platform and earn direct cash payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-2 shadow-xs">
            Reward Rate: <strong className="font-mono tabular-nums">Rs 10,000 / Property</strong>
          </span>
        </div>
      </div>

      {/* Shareable Link Banner Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
            <Gift className="w-3.5 h-3.5" />
            <span>Refer &amp; Earn Rs 10,000 Cash Voucher</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Share Your Unique Hostel Referral Link
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            When another hostel owner registers and activates their campus on the platform, both you and the new owner receive Rs 10,000 credited directly to your bank account.
          </p>
        </div>

        {/* Copy Box */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="w-full sm:w-auto flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 font-mono text-xs text-white truncate flex items-center justify-between">
            <span className="truncate">{referralUrl}</span>
            <span className="text-[10px] uppercase font-bold text-blue-200 shrink-0 ml-2">
              Code: {referralCode}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-blue-900 font-bold text-xs rounded-xl hover:bg-blue-50 transition-colors shadow-sm shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Properties Referred
          </span>
          <p className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">
            {referrals.length} Hostels
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Lahore, Rawalpindi &amp; Islamabad</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Rewards Disbursed
          </span>
          <p className="text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
            {formatCurrency(totalRewardsPaid)}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Paid to your verified bank IBAN</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Pending Approval
          </span>
          <p className="text-3xl font-bold text-amber-600 mt-1 tabular-nums">
            {formatCurrency(totalPendingRewards)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Pending onboarding verification</p>
        </div>
      </div>

      {/* Referred Properties Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Onboarded Partner Hostels
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live referral payout pipeline and verification audit.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="px-4 py-3">Hostel Name</th>
                <th className="px-4 py-3">Owner / Contact</th>
                <th className="px-4 py-3">City &amp; Territory</th>
                <th className="px-4 py-3">Signup Date</th>
                <th className="px-4 py-3 text-right">Commission Reward</th>
                <th className="px-4 py-3 text-center">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {referrals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center text-slate-500">
                    <Gift className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-800">No partner referrals yet</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Share your unique referral link above with fellow hostel owners to earn Rs 10,000 cash reward per onboarded property.
                    </p>
                  </td>
                </tr>
              ) : (
                referrals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {item.hostelName}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <span>{item.ownerName}</span>
                      <span className="text-[11px] text-slate-400 block font-mono">{item.contact}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.city}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 tabular-nums">
                      {item.signupDate}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {formatCurrency(item.rewardAmount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : item.status === "ACTIVE"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
