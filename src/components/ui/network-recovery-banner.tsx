"use client";

import React from "react";
import { useApp } from "../../lib/store";
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from "lucide-react";

export function NetworkRecoveryBanner() {
  const { isOffline, setIsOffline, showToast } = useApp();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-600 text-white px-4 py-2.5 text-xs flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 animate-pulse shrink-0" />
        <span className="font-semibold">
          Network Disconnected • Operating in Offline Cache Mode.
        </span>
        <span className="hidden sm:inline text-amber-100">
          All resident allocations and ledger entries are safely preserved in local memory.
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => {
            setIsOffline(false);
            showToast("Back online. Nothing was lost.", "success");
          }}
          className="inline-flex items-center gap-1.5 bg-white text-amber-900 font-bold px-3 py-1 rounded text-xs hover:bg-amber-50 transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Sync</span>
        </button>
      </div>
    </div>
  );
}
