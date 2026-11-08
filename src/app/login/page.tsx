"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, User, Lock, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";
import hostelConfig from "../../../hostel.config";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"warden" | "student">("warden");
  const [identifier, setIdentifier] = useState("warden@grandpavilion.pk");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate authenticating and redirecting
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 700);
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
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-[#0C0C0C]/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5D6C7B] hover:text-[#0C0C0C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Site</span>
        </Link>

        {/* Monogram Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-[#0C0C0C] flex items-center justify-center font-serif text-sm font-semibold tracking-wider group-hover:bg-[#0C0C0C] group-hover:text-[#FBF8F1] transition-all duration-300">
            GP
          </div>
          <span className="font-serif tracking-[0.2em] text-sm uppercase hidden sm:inline">
            The Grand Pavilion
          </span>
        </Link>

        <div className="text-xs uppercase tracking-widest text-[#5D6C7B]">
          ERP Console v2.0
        </div>
      </header>

      {/* Main Container: Split-screen Luxury Editorial */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0 space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5D6C7B]">
              Secure Access Portal
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-[#0C0C0C]">
              WELCOME BACK
            </h1>
            <p className="text-sm text-[#5D6C7B] leading-relaxed">
              Enter your verified credentials to access real-time occupancy, automated dues ledgers, and resident privileges.
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="bg-[#F4EFEA] p-1 rounded-none border border-[#0C0C0C]/10 grid grid-cols-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo("warden")}
              className={`py-3 px-4 font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                role === "warden"
                  ? "bg-[#0C0C0C] text-[#FBF8F1] shadow-xs"
                  : "text-[#5D6C7B] hover:text-[#0C0C0C]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Hostel Warden</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("student")}
              className={`py-3 px-4 font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                role === "student"
                  ? "bg-[#0C0C0C] text-[#FBF8F1] shadow-xs"
                  : "text-[#5D6C7B] hover:text-[#0C0C0C]"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Resident</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-widest text-[#0C0C0C] font-semibold">
                {role === "warden" ? "Official Email / Administrator ID" : "Resident CNIC / Mobile Number"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === "warden" ? "warden@grandpavilion.pk" : "35202-7194820-5"}
                  className="w-full bg-[#FFFFFF] border border-[#0C0C0C]/15 px-4 py-3 text-sm text-[#0C0C0C] placeholder:text-[#5D6C7B]/60 focus:outline-hidden focus:border-[#0C0C0C] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs uppercase tracking-widest text-[#0C0C0C] font-semibold">
                  Access Passcode / Secret Key
                </label>
                <button
                  type="button"
                  onClick={() => alert("Please contact Chief Warden Major (R) Tariq Mehmood at 0300-8472911 to reset your security PIN.")}
                  className="text-xs text-[#5D6C7B] hover:text-[#0C0C0C] underline"
                >
                  Forgot PIN?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FFFFFF] border border-[#0C0C0C]/15 px-4 py-3 text-sm text-[#0C0C0C] placeholder:text-[#5D6C7B]/60 focus:outline-hidden focus:border-[#0C0C0C] transition-colors font-mono"
                />
              </div>
            </div>

            {/* Quick Demo Pre-filled notification */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Pre-configured for 1-click instant login testing
              </span>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="font-bold underline uppercase tracking-wider text-[11px] text-emerald-800 hover:text-emerald-950"
              >
                Skip to Dashboard →
              </button>
            </div>

            {/* Lyndor Rolling Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="lyndor-roll-btn w-full bg-[#0C0C0C] text-[#FBF8F1] py-4 text-xs font-semibold uppercase tracking-[0.2em] border border-[#0C0C0C] hover:bg-[#1A1A1A] transition-colors disabled:opacity-50"
            >
              <span className="lyndor-roll-text">
                {isLoading ? "Authenticating Session..." : "Enter Management Console"}
              </span>
              <span className="lyndor-roll-clone">
                {isLoading ? "Please Wait..." : "Enter Management Console →"}
              </span>
            </button>
          </form>

          {/* Statutory Security Seal */}
          <div className="pt-4 border-t border-[#0C0C0C]/10 flex items-center justify-between text-[11px] text-[#5D6C7B]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              PECA 2016 Compliant Secure Session
            </span>
            <span>FBR NTN: 8291044-7</span>
          </div>
        </div>

        {/* Right Column: Architectural Atmosphere Showcase */}
        <div className="lg:col-span-6 hidden lg:block">
          <div className="relative border border-[#0C0C0C]/10 bg-[#0C0C0C] text-[#FBF8F1] p-10 lg:p-12 space-y-8 overflow-hidden shadow-2xl">
            {/* Ambient Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FBF8F1_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#FBF8F1]/20 text-[11px] uppercase tracking-[0.2em] text-[#FBF8F1]/80">
                Gulberg III • Lahore Campus
              </div>

              <blockquote className="font-serif text-3xl xl:text-4xl font-light leading-snug tracking-wide text-[#FBF8F1]">
                &ldquo;A quiet sanctuary engineered for academic distinction, backed by uninterrupted solar power and dignified service.&rdquo;
              </blockquote>

              <div className="pt-6 border-t border-[#FBF8F1]/15 space-y-1">
                <div className="font-serif text-lg text-[#FBF8F1]">
                  Major (R) Tariq Mehmood
                </div>
                <div className="text-xs text-[#FBF8F1]/60 tracking-wider uppercase">
                  Chief Warden &amp; Managing Director
                </div>
              </div>
            </div>

            {/* Facility Accreditations */}
            <div className="relative grid grid-cols-3 gap-4 pt-4 border-t border-[#FBF8F1]/10 text-center">
              <div>
                <div className="font-serif text-2xl text-[#FBF8F1]">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-[#FBF8F1]/60">Solar Power</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#FBF8F1]">PFA</div>
                <div className="text-[10px] uppercase tracking-wider text-[#FBF8F1]/60">Food Safety</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#FBF8F1]">Form 15</div>
                <div className="text-[10px] uppercase tracking-wider text-[#FBF8F1]/60">Police Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-[#0C0C0C]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5D6C7B] gap-4">
        <div>
          &copy; {new Date().getFullYear()} {hostelConfig.identity.name}. All statutory rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-[#0C0C0C] underline">Privacy Charter</Link>
          <Link href="/terms" className="hover:text-[#0C0C0C] underline">Residency Bylaws</Link>
          <Link href="/refund" className="hover:text-[#0C0C0C] underline">Refund Policy</Link>
        </div>
      </footer>
    </main>
  );
}
