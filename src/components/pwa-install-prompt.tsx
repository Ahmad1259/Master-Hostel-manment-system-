"use client";

import React, { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // graceful ignore if unsupported in current context
      });
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm bg-canvas-surface border border-brass p-4 shadow-xl text-ink">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Smartphone className="w-5 h-5 text-brass mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-caption font-serif font-medium text-ink">
              Install Grand Pavilion ERP App
            </p>
            <p className="text-[11px] text-ink-muted leading-tight">
              Access the offline bed register and biometric logs directly from your device home screen.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-ink-muted hover:text-ink p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-ink text-canvas py-1.5 px-3 text-[11px] font-medium uppercase tracking-wider hover:bg-brass transition-colors"
        >
          <Download className="w-3 h-3" />
          <span>Install PWA</span>
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="border border-border py-1.5 px-3 text-[11px] text-ink-muted hover:text-ink"
        >
          Later
        </button>
      </div>
    </div>
  );
}
