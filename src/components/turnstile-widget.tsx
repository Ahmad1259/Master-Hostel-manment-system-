"use client";

import React, { useState } from "react";
import { ShieldCheck, Check, Loader2 } from "lucide-react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  isVerified?: boolean;
}

export function TurnstileWidget({ onVerify, isVerified = false }: TurnstileWidgetProps) {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(isVerified);

  const handleSimulateVerify = () => {
    if (verified || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      onVerify("cf-turnstile-token-verified-" + Date.now());
    }, 600);
  };

  return (
    <div
      onClick={handleSimulateVerify}
      className={`border p-3 transition-all cursor-pointer flex items-center justify-between bg-canvas-surface select-none ${
        verified
          ? "border-emerald-600/60 bg-emerald-50/20"
          : "border-border hover:border-zinc-400"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-6 h-6 border flex items-center justify-center transition-colors ${
            verified
              ? "bg-emerald-700 border-emerald-700 text-white"
              : "border-zinc-400 bg-white"
          }`}
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-500" />
          ) : verified ? (
            <Check className="w-4 h-4 stroke-[2]" />
          ) : null}
        </div>

        <div>
          <span className="text-caption font-medium text-ink block">
            {verified
              ? "Human Verification Affirmative"
              : loading
              ? "Verifying telemetry..."
              : "Verify Non-Automated Operator"}
          </span>
          <span className="text-micro text-ink-muted font-mono block">
            Cloudflare Turnstile Managed Challenge
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end text-micro text-ink-faint font-mono">
        <ShieldCheck className="w-4 h-4 text-brass" />
        <span className="mt-0.5">Privacy • Terms</span>
      </div>
    </div>
  );
}
