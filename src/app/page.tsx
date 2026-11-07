"use client";

import React, { useState } from "react";
import Link from "next/link";
import hostelConfig from "../../hostel.config";
import { useApp } from "../lib/store";
import { DoorTransition } from "../components/door-transition";
import { FloorPlanPreview } from "../components/floor-plan-preview";
import { PanoramaViewer } from "../components/panorama-viewer";
import { LanguageSwitcher } from "../components/language-switcher";
import { TurnstileWidget } from "../components/turnstile-widget";
import {
  Compass,
  Building,
  Shield,
  Zap,
  Utensils,
  Wind,
  Wifi,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  LayoutDashboard,
  Calendar,
  Layers,
} from "lucide-react";

export default function ShowcasePage() {
  const { language, t } = useApp();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredRoom: "Double",
    institution: "",
    plannedDate: "",
    message: "",
    honeypotField: "", // Bot trap
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot check: If bot filled hidden honeypot, reject silently
    if (formData.honeypotField) {
      return;
    }
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* Top Architectural Banner & Navigation */}
      <header className="border-b border-border bg-canvas-surface/90 backdrop-blur-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-brass flex items-center justify-center font-serif font-bold text-brass text-caption">
              {hostelConfig.identity.monogram}
            </div>
            <div>
              <span className="font-serif text-subhead tracking-tight font-medium text-ink block leading-tight">
                {hostelConfig.identity.name}
              </span>
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider block">
                {language === "ur" ? hostelConfig.identity.taglineUrdu : hostelConfig.identity.tagline}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-caption text-ink-muted">
            <a href="#amenities" className="hover:text-brass transition-colors">
              Amenities
            </a>
            <a href="#floor-plan" className="hover:text-brass transition-colors">
              Chambers &amp; Beds
            </a>
            <a href="#virtual-tour" className="hover:text-brass transition-colors">
              360° Viewing
            </a>
            <a href="#inquire" className="hover:text-brass transition-colors">
              Reservations
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ink text-canvas text-caption font-medium uppercase tracking-wider hover:bg-brass transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 stroke-[1.25]" />
              <span className="hidden sm:inline">ERP Console</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Architectural Header */}
      <section className="relative py-16 sm:py-24 border-b border-border overflow-hidden">
        {/* Architectural backdrop line work */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#18181B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 border border-border bg-canvas-surface px-3 py-1 text-caption font-mono uppercase tracking-widest text-brass">
            <Compass className="w-3.5 h-3.5" />
            <span>Commercial Living &amp; Academic Distinction</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink max-w-4xl mx-auto leading-[1.15]">
            {language === "ur" ? t.showcaseHeroTitle : "An Architectural Sanctuary for Scholars & Professionals"}
          </h1>

          <p className="text-body text-ink-muted max-w-2xl mx-auto leading-relaxed">
            {language === "ur" ? t.showcaseHeroSubtitle : hostelConfig.identity.tagline} Located at {hostelConfig.geo.address}, {hostelConfig.geo.city}.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#floor-plan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brass hover:bg-brass-hover text-white px-6 py-3 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>{t.showcaseExploreRooms}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-6 py-3 text-caption font-medium uppercase tracking-wider transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t.showcaseEnterButton}</span>
            </Link>
          </div>

          {/* Institutional Transit Benchmarks */}
          <div className="pt-8 border-t border-border/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            {hostelConfig.geo.nearbyInstitutions.slice(0, 4).map((inst, idx) => (
              <div key={idx} className="border border-border p-3 bg-canvas-surface">
                <p className="text-[10px] font-mono text-brass uppercase">
                  {inst.transitTimeMinutes} Min Transit
                </p>
                <p className="text-caption font-medium text-ink truncate mt-0.5" title={inst.name}>
                  {inst.name.split(" (")[0]}
                </p>
                <p className="text-[11px] text-ink-muted font-mono">{inst.distanceKm} km</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: 3D Door Entrance Transition */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <DoorTransition />
      </section>

      {/* Section 2: Architectural Amenities */}
      <section id="amenities" className="py-16 border-t border-b border-border bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-caption font-mono uppercase tracking-widest text-brass">
              Structural &amp; Operational Standards
            </span>
            <h2 className="font-serif text-title tracking-tight text-ink mt-1">
              {t.showcaseAmenitiesHeading}
            </h2>
            <p className="text-body text-ink-muted mt-2">
              Every facility specification is backed by commercial equipment, institutional oversight, and synchronous energy resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelConfig.amenities.map((amenity, idx) => {
              const icons = [Zap, Utensils, Wind, Shield, Sparkles, Wifi];
              const IconComp = icons[idx % icons.length];

              return (
                <div
                  key={amenity.id}
                  className="border border-border bg-canvas-surface p-6 space-y-3 hover:border-brass transition-all duration-300"
                >
                  <div className="w-9 h-9 border border-border flex items-center justify-center text-brass">
                    <IconComp className="w-4 h-4 stroke-[1.25]" />
                  </div>
                  <h3 className="font-serif text-subhead tracking-tight text-ink">
                    {language === "ur" ? amenity.titleUrdu : amenity.title}
                  </h3>
                  <p className="text-body text-ink-muted leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive 2D Floor Plan Explorer */}
      <section id="floor-plan" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <FloorPlanPreview />
      </section>

      {/* Section 4: 360° Architectural Walkthrough */}
      <section id="virtual-tour" className="py-16 border-t border-b border-border bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PanoramaViewer />
        </div>
      </section>

      {/* Section 5: Online Booking Inquiry & Admissions Dossier */}
      <section id="inquire" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="border border-border bg-canvas-surface p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-caption font-mono uppercase tracking-widest text-brass">
              Formal Admissions Registry
            </span>
            <h2 className="font-serif text-title tracking-tight text-ink">
              {t.showcaseInquiryHeading}
            </h2>
            <p className="text-body text-ink-muted">
              {t.showcaseInquirySubheading}
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="border border-emerald-600/60 bg-emerald-50/20 p-8 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto stroke-[1.25]" />
              <h3 className="font-serif text-subhead text-ink font-medium">
                Reservation Request Recorded
              </h3>
              <p className="text-body text-ink-muted max-w-md mx-auto">
                Your dossier has been transmitted directly to the Chief Warden desk at {hostelConfig.identity.name}. You will receive official verification on {formData.phone} within 4 business hours.
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="mt-4 px-4 py-2 border border-border text-caption hover:bg-canvas-subtle"
              >
                Submit Supplemental Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              {/* Invisible Honeypot field for bot trapping (Point #20) */}
              <input
                type="text"
                name="company_title_trap"
                value={formData.honeypotField}
                onChange={(e) =>
                  setFormData({ ...formData, honeypotField: e.target.value })
                }
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1.5">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daniyal Farooq"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full border border-border px-3.5 py-2.5 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1.5">
                    Primary Cellular Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-border px-3.5 py-2.5 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1.5">
                    Email Dispatch
                  </label>
                  <input
                    type="email"
                    placeholder="daniyal@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-border px-3.5 py-2.5 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1.5">
                    Preferred Chamber Layout
                  </label>
                  <select
                    value={formData.preferredRoom}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredRoom: e.target.value })
                    }
                    className="w-full border border-border px-3.5 py-2.5 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  >
                    <option value="Single">Single Executive Suite (Rs. 45,000)</option>
                    <option value="Double">Double Scholars Room (Rs. 32,000)</option>
                    <option value="Triple">Triple Residency Suite (Rs. 26,000)</option>
                    <option value="Dormitory">Fellowship Dormitory (Rs. 22,000)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1.5">
                    Anticipated Move-In Date
                  </label>
                  <input
                    type="date"
                    value={formData.plannedDate}
                    onChange={(e) =>
                      setFormData({ ...formData, plannedDate: e.target.value })
                    }
                    className="w-full border border-border px-3.5 py-2.5 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1.5">
                  Academic Institution / Professional Affiliation
                </label>
                <input
                  type="text"
                  placeholder="e.g. LUMS MBA, FC College, or KPMG Trainee"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  className="w-full border border-border px-3.5 py-2.5 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1.5">
                  Specific Accommodation Requirements or Dietary Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention medical dietary needs, quiet floor preference, or vehicle parking requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border border-border px-3.5 py-2.5 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              {/* Turnstile Bot Defense Widget */}
              <TurnstileWidget
                isVerified={isTurnstileVerified}
                onVerify={() => setIsTurnstileVerified(true)}
              />

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink text-canvas py-3.5 px-6 text-caption uppercase tracking-wider font-medium hover:bg-brass transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5 stroke-[1.25]" />
                <span>{t.btnSubmitInquiry}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Architectural Institutional Footer */}
      <footer className="mt-auto border-t border-border bg-canvas-subtle py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 border border-brass flex items-center justify-center font-serif font-bold text-brass text-caption">
                {hostelConfig.identity.monogram}
              </div>
              <span className="font-serif text-subhead font-medium text-ink">
                {hostelConfig.identity.name}
              </span>
            </div>
            <p className="text-[11px] text-ink-muted leading-relaxed">
              {hostelConfig.identity.legalEntity}. Purpose-built white-label commercial hostel architecture.
            </p>
          </div>

          <div>
            <h4 className="text-caption font-mono uppercase text-ink font-semibold tracking-wider mb-3">
              Geographic Cadastre
            </h4>
            <p className="text-[11px] text-ink-muted leading-relaxed">
              {hostelConfig.geo.address}
              <br />
              {hostelConfig.geo.neighborhood}, {hostelConfig.geo.city} ({hostelConfig.geo.postalCode})
              <br />
              Coordinates: {hostelConfig.geo.geoCoordinates.latitude}° N, {hostelConfig.geo.geoCoordinates.longitude}° E
            </p>
          </div>

          <div>
            <h4 className="text-caption font-mono uppercase text-ink font-semibold tracking-wider mb-3">
              Official Desks
            </h4>
            <div className="space-y-1.5 text-[11px] text-ink-muted">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-brass" />
                <span>Warden: {hostelConfig.identity.phone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-brass" />
                <span>Gate Hours: 06:00 – 22:30 Daily</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-brass" />
                <span>{hostelConfig.identity.email}</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-caption font-mono uppercase text-ink font-semibold tracking-wider mb-3">
              Statutory Governance
            </h4>
            <div className="space-y-1.5 text-[11px] text-ink-muted">
              <p>
                <Link href="/privacy" className="hover:text-brass transition-colors underline">
                  Resident Privacy Policy
                </Link>
              </p>
              <p>
                <Link href="/terms" className="hover:text-brass transition-colors underline">
                  Terms of Academic Residency
                </Link>
              </p>
              <p>
                <Link href="/dashboard" className="hover:text-brass transition-colors underline font-medium text-ink">
                  Staff ERP Authentication
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-muted font-mono">
          <p>© {new Date().getFullYear()} {hostelConfig.identity.legalEntity}. All architectural rights reserved.</p>
          <p>Meezan Bank Verified Billing Partner • Punjab Food Authority Certified Mess</p>
        </div>
      </footer>
    </div>
  );
}
