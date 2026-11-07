import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, LayoutDashboard, Search, Home } from "lucide-react";
import hostelConfig from "../../hostel.config";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6 antialiased">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-sm">
        {/* Brand Icon */}
        <div className="w-14 h-14 mx-auto bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600">
          <Compass className="w-7 h-7 stroke-[1.5]" />
        </div>

        {/* Headline & Details */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            Error 404 • Resource Not Found
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Page or Chamber Unmapped
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            The requested module, student record, or hostel page is not available or has been moved to another corridor.
          </p>
        </div>

        {/* Quick Navigation CTAs */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>ERP Dashboard</span>
          </Link>

          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Public Website</span>
          </Link>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 font-mono">
          {hostelConfig.identity.name} • System Core v2.0
        </div>
      </div>
    </main>
  );
}
