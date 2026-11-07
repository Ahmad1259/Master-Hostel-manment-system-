import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, LayoutDashboard } from "lucide-react";
import hostelConfig from "../../hostel.config";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-canvas text-ink flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-border bg-canvas-surface p-8 text-center space-y-6 shadow-sm">
        <div className="w-12 h-12 mx-auto border border-border flex items-center justify-center text-brass">
          <Compass className="w-6 h-6 stroke-[1.25]" />
        </div>

        <div className="space-y-2">
          <p className="text-caption uppercase tracking-widest text-brass font-mono">
            Error Code: 404 | Registry Disconnect
          </p>
          <h1 className="font-serif text-title tracking-tight text-ink">
            Unmapped Architectural Sector
          </h1>
          <p className="text-body text-ink-muted leading-relaxed">
            The requested chamber, document, or system module does not correspond to an active operational corridor within {hostelConfig.identity.name}.
          </p>
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-border py-2.5 px-4 text-caption text-ink hover:bg-canvas-subtle transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Showcase</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-canvas py-2.5 px-4 text-caption hover:bg-brass transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>ERP Console</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
