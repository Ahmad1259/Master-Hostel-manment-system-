"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, User, Lock, CheckCircle2 } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"warden" | "student">("warden");
  const [identifier, setIdentifier] = useState("warden@grandpavilion.pk");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  const handleQuickDemo = (targetRole: "warden" | "student") => {
    setRole(targetRole);
    if (targetRole === "warden") {
      setIdentifier("warden@grandpavilion.pk");
      setPassword("master-key-2026");
    } else {
      setIdentifier("35202-7194820-5 (Ali Raza)");
      setPassword("bed-2-204");
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF8F1] text-[#0C0C0C] flex flex-col justify-between font-sans selection:bg-[#0C0C0C] selection:text-[#FBF8F1]">
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#0C0C0C]/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#5D6C7B] hover:text-[#0C0C0C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to public site</span>
        </Link>

        {/* Monogram Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 border border-[#0C0C0C] flex items-center justify-center font-serif text-xs font-semibold">
            GP
          </div>
          <span className="font-serif text-sm tracking-wide text-[#0C0C0C]">
            The Grand Pavilion
          </span>
        </Link>

        <div className="text-xs text-[#5D6C7B]">
          ERP Console v2.0
        </div>
      </header>

      {/* Main Container: Split-screen Residential Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0 space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-[#5D6C7B]">
              Residency portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#0C0C0C]">
              Welcome back
            </h1>
            <p className="text-xs text-[#5D6C7B] leading-relaxed">
              Sign in to manage room allocations, rent invoices, and resident records.
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="bg-[#F4EFEA] p-1 border border-[#0C0C0C]/10 rounded-md grid grid-cols-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo("warden")}
              className={`py-2 px-3 font-medium transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer ${
                role === "warden"
                  ? "bg-[#0C0C0C] text-[#FBF8F1]"
                  : "text-[#5D6C7B] hover:text-[#0C0C0C]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Hostel warden</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("student")}
              className={`py-2 px-3 font-medium transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer ${
                role === "student"
                  ? "bg-[#0C0C0C] text-[#FBF8F1]"
                  : "text-[#5D6C7B] hover:text-[#0C0C0C]"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student resident</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs text-gray-700 font-medium">
                {role === "warden" ? "Official email" : "Resident CNIC / mobile"}
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={role === "warden" ? "warden@grandpavilion.pk" : "35202-7194820-5"}
                className="w-full bg-white border border-[#0C0C0C]/15 px-3 py-2 text-xs text-[#0C0C0C] placeholder:text-[#5D6C7B]/60 rounded-md focus:outline-hidden focus:border-[#0C0C0C] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs text-gray-700 font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Please contact Chief Warden Major (R) Tariq Mehmood at 0300-8472911 to reset your security PIN.")}
                  className="text-xs text-[#5D6C7B] hover:text-[#0C0C0C] underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-[#0C0C0C]/15 px-3 py-2 text-xs text-[#0C0C0C] placeholder:text-[#5D6C7B]/60 rounded-md focus:outline-hidden focus:border-[#0C0C0C] transition-colors font-mono"
              />
            </div>

            {/* Quick Demo Pre-filled notice */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between rounded-md">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Pre-configured for 1-click test
              </span>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="font-medium underline text-xs text-emerald-800 hover:text-emerald-950 cursor-pointer"
              >
                Go to console →
              </button>
            </div>

            {/* Quiet Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0C0C0C] hover:bg-[#222222] text-[#FBF8F1] py-2.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Authenticating session..." : "Sign in to console"}
            </button>
          </form>

          {/* Security note */}
          <div className="pt-3 border-t border-[#0C0C0C]/10 flex items-center justify-between text-[11px] text-[#5D6C7B]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-gray-400" />
              PECA 2016 encrypted session
            </span>
            <span>NTN: 8291044-7</span>
          </div>
        </div>

        {/* Right Column: Architectural Atmosphere Showcase */}
        <div className="lg:col-span-6 hidden lg:block">
          <div className="border border-[#0C0C0C]/10 bg-[#0C0C0C] text-[#FBF8F1] p-10 space-y-8 rounded-lg">
            <div className="space-y-4">
              <span className="text-xs text-[#FBF8F1]/60">
                Gulberg III, Lahore campus
              </span>

              <blockquote className="font-serif text-2xl xl:text-3xl font-light leading-snug text-[#FBF8F1]">
                &ldquo;A quiet sanctuary engineered for academic distinction, backed by uninterrupted solar power and dignified service.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-[#FBF8F1]/15 space-y-0.5">
                <div className="font-serif text-base text-[#FBF8F1]">
                  Major (R) Tariq Mehmood
                </div>
                <div className="text-xs text-[#FBF8F1]/60">
                  Chief Warden &amp; Managing Director
                </div>
              </div>
            </div>

            {/* Facility Accreditations */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#FBF8F1]/10 text-center">
              <div>
                <div className="font-serif text-xl text-[#FBF8F1]">100%</div>
                <div className="text-[11px] text-[#FBF8F1]/60">Solar power</div>
              </div>
              <div>
                <div className="font-serif text-xl text-[#FBF8F1]">PFA-A</div>
                <div className="text-[11px] text-[#FBF8F1]/60">Food safety</div>
              </div>
              <div>
                <div className="font-serif text-xl text-[#FBF8F1]">Form 15</div>
                <div className="text-[11px] text-[#FBF8F1]/60">Police verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 border-t border-[#0C0C0C]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5D6C7B] gap-4">
        <div>
          &copy; {new Date().getFullYear()} {hostelConfig.identity.name}. All statutory rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-[#0C0C0C] underline">Privacy charter</Link>
          <Link href="/terms" className="hover:text-[#0C0C0C] underline">Residency bylaws</Link>
          <Link href="/refund" className="hover:text-[#0C0C0C] underline">Refund policy</Link>
        </div>
      </footer>
    </main>
  );
}
