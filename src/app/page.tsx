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
  Sparkles,
  Building2,
  BedDouble,
  ShieldCheck,
  Check,
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
    <div className="min-h-screen bg-canvas text-ink flex flex-col antialiased">
      {/* Top Architectural Navigation Bar */}
      <header className="border-b border-border bg-canvas-surface/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand & Monogram Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 border-2 border-brass bg-canvas-subtle flex items-center justify-center font-serif font-bold text-brass text-sm shadow-xs transition-transform group-hover:scale-105">
              {hostelConfig.identity.monogram}
            </div>
            <div>
              <span className="font-serif text-subhead tracking-tight font-bold text-ink block leading-none">
                {hostelConfig.identity.name}
              </span>
              <span className="text-micro font-mono text-ink-muted uppercase tracking-wider block mt-1">
                {language === "ur" ? hostelConfig.identity.taglineUrdu : hostelConfig.identity.tagline}
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-caption font-medium text-ink-muted">
            <a href="#amenities" className="hover:text-brass transition-colors">
              Structural Standards
            </a>
            <a href="#floor-plan" className="hover:text-brass transition-colors">
              Chambers &amp; Cadastre
            </a>
            <a href="#virtual-tour" className="hover:text-brass transition-colors">
              360° Walkthrough
            </a>
            <a href="#inquire" className="hover:text-brass transition-colors">
              Admissions Dossier
            </a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Campus Status Badge */}
            <div className="hidden sm:flex items-center gap-2 border border-border bg-canvas px-3 py-1.5 text-micro font-mono text-ink-muted">
              <div className="w-2 h-2 rounded-full bg-olive animate-pulse" />
              <span>{hostelConfig.geo.neighborhood} • 84.5% Density</span>
            </div>

            {/* Bilingual Switcher */}
            <LanguageSwitcher />

            {/* Direct ERP Access */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-canvas text-caption font-medium uppercase tracking-wider hover:bg-brass transition-colors shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 stroke-[1.25]" />
              <span className="hidden sm:inline">ERP Console</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Architectural Header */}
      <section className="relative py-20 sm:py-28 border-b border-border bg-canvas overflow-hidden">
        {/* Subtle architectural backdrop linework */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, #18181B 1px, transparent 1px), linear-gradient(to bottom, #18181B 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          {/* Label Pill */}
          <div className="inline-flex items-center gap-2 border border-border bg-canvas-surface px-4 py-1.5 text-caption font-mono uppercase tracking-widest text-brass shadow-xs">
            <Compass className="w-4 h-4 stroke-[1.25]" />
            <span>Commercial Living &amp; Academic Distinction</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink max-w-4xl mx-auto leading-[1.12] font-normal">
            {language === "ur" ? t.showcaseHeroTitle : "An Architectural Sanctuary for Scholars & Professionals"}
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-body text-ink-muted max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            {language === "ur"
              ? t.showcaseHeroSubtitle
              : `Curated residential chambers in ${hostelConfig.geo.neighborhood}, ${hostelConfig.geo.city}. Serviced with synchronous 65 kVA power generation, chef-curated nutrition, and whisper-quiet study suites.`}
          </p>

          {/* Dual CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#floor-plan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brass hover:bg-brass-hover text-white px-7 py-3.5 text-caption font-medium uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>{t.showcaseExploreRooms}</span>
              <ArrowRight className="w-4 h-4 stroke-[1.25]" />
            </a>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-7 py-3.5 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              <LayoutDashboard className="w-4 h-4 stroke-[1.25]" />
              <span>{t.showcaseEnterButton}</span>
            </Link>
          </div>

          {/* 4 Core Structural KPIs */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div className="border border-border bg-canvas-surface p-4 card-elevation">
              <span className="text-micro font-mono text-brass uppercase block">Accommodation</span>
              <p className="font-serif text-subhead font-bold text-ink mt-0.5">24 Fitted Suites</p>
              <p className="text-micro text-ink-muted">Single, Double &amp; Triple</p>
            </div>

            <div className="border border-border bg-canvas-surface p-4 card-elevation">
              <span className="text-micro font-mono text-brass uppercase block">Resident Capacity</span>
              <p className="font-serif text-subhead font-bold text-ink mt-0.5">58 Total Beds</p>
              <p className="text-micro text-ink-muted">84.5% Active Occupancy</p>
            </div>

            <div className="border border-border bg-canvas-surface p-4 card-elevation">
              <span className="text-micro font-mono text-brass uppercase block">Energy Redundancy</span>
              <p className="font-serif text-subhead font-bold text-ink mt-0.5">100% Synchronous</p>
              <p className="text-micro text-ink-muted">65 kVA Perkins + 20kW Solar</p>
            </div>

            <div className="border border-border bg-canvas-surface p-4 card-elevation">
              <span className="text-micro font-mono text-brass uppercase block">Daily Nutrition</span>
              <p className="font-serif text-subhead font-bold text-ink mt-0.5">3 Organic Meals</p>
              <p className="text-micro text-ink-muted">PFA Hygiene Certified</p>
            </div>
          </div>

          {/* Institutional Transit Benchmarks */}
          <div className="pt-6 border-t border-border/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            {hostelConfig.geo.nearbyInstitutions.slice(0, 4).map((inst, idx) => (
              <div key={idx} className="border border-border p-3 bg-canvas-surface shadow-xs">
                <p className="text-micro font-mono text-brass uppercase font-bold">
                  {inst.transitTimeMinutes} Min Transit
                </p>
                <p className="text-caption font-bold text-ink truncate mt-0.5" title={inst.name}>
                  {inst.name.split(" (")[0]}
                </p>
                <p className="text-micro text-ink-muted font-mono">{inst.distanceKm} km</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: 3D Perspective Door Entrance */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <DoorTransition />
      </section>

      {/* Section 2: Architectural Amenities Grid */}
      <section id="amenities" className="py-20 border-t border-b border-border bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-caption font-mono uppercase tracking-widest text-brass font-medium">
              Structural &amp; Operational Standards
            </span>
            <h2 className="font-serif text-title tracking-tight text-ink mt-1.5 text-2xl sm:text-3xl font-bold">
              {t.showcaseAmenitiesHeading}
            </h2>
            <p className="text-body text-ink-muted mt-2 text-sm sm:text-base leading-relaxed">
              Every facility specification is backed by industrial equipment, certified regulatory compliance, and redundant utility infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelConfig.amenities.map((amenity, idx) => {
              const icons = [Zap, Utensils, Wind, Shield, Compass, Wifi];
              const IconComp = icons[idx % icons.length];

              return (
                <div
                  key={amenity.id}
                  className="border border-border bg-canvas-surface p-7 space-y-3.5 hover:border-brass transition-colors duration-200 card-elevation"
                >
                  <div className="w-10 h-10 border border-border bg-canvas flex items-center justify-center text-brass shadow-xs">
                    <IconComp className="w-5 h-5 stroke-[1.25]" />
                  </div>
                  <h3 className="font-serif text-subhead tracking-tight text-ink font-bold">
                    {language === "ur" ? amenity.titleUrdu : amenity.title}
                  </h3>
                  <p className="text-body text-ink-muted leading-relaxed text-sm">
                    {amenity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive 2D Cadastre & Bed Explorer */}
      <section id="floor-plan" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <FloorPlanPreview />
      </section>

      {/* Section 4: 360° Architectural Elevation Walkthrough */}
      <section id="virtual-tour" className="py-20 border-t border-b border-border bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PanoramaViewer />
        </div>
      </section>

      {/* Section 5: Online Admissions & Inquiries Form */}
      <section id="inquire" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="border border-border bg-canvas-surface p-8 sm:p-12 card-elevation">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-caption font-mono uppercase tracking-widest text-brass font-medium">
              Formal Admissions Registry
            </span>
            <h2 className="font-serif text-title tracking-tight text-ink text-2xl sm:text-3xl font-bold">
              {t.showcaseInquiryHeading}
            </h2>
            <p className="text-body text-ink-muted text-sm sm:text-base">
              {t.showcaseInquirySubheading}
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="border border-border bg-canvas-subtle p-8 sm:p-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-olive mx-auto stroke-[1.25]" />
              <h3 className="font-serif text-subhead text-ink font-bold text-xl">
                Reservation Request Recorded
              </h3>
              <p className="text-body text-ink-muted max-w-md mx-auto text-sm leading-relaxed">
                Your dossier has been transmitted directly to the Chief Warden desk at {hostelConfig.identity.name}. You will receive official verification on {formData.phone} within 4 business hours.
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="mt-4 px-5 py-2.5 border border-border text-caption hover:bg-canvas bg-canvas-surface transition-colors shadow-xs font-medium"
              >
                Submit Additional Inquiries
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              {/* Invisible Honeypot Field */}
              <input
                type="text"
                name="website_url_honey"
                value={formData.honeypotField}
                onChange={(e) => setFormData({ ...formData, honeypotField: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-caption font-mono uppercase text-ink-muted mb-2 font-medium">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ibrahim Qureshi"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-canvas border border-border text-body focus:outline-none focus:border-brass transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-caption font-mono uppercase text-ink-muted mb-2 font-medium">
                    {t.phoneContact} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-canvas border border-border text-body focus:outline-none focus:border-brass transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-caption font-mono uppercase text-ink-muted mb-2 font-medium">
                    Official Email
                  </label>
                  <input
                    type="email"
                    placeholder="scholar@university.edu.pk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-canvas border border-border text-body focus:outline-none focus:border-brass transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-caption font-mono uppercase text-ink-muted mb-2 font-medium">
                    Institution or Corporate Entity *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LUMS / FAST-NUCES / Engro"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 bg-canvas border border-border text-body focus:outline-none focus:border-brass transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-caption font-mono uppercase text-ink-muted mb-2 font-medium">
                    Chamber Configuration *
                  </label>
                  <select
                    value={formData.preferredRoom}
                    onChange={(e) => setFormData({ ...formData, preferredRoom: e.target.value })}
                    className="w-full px-4 py-3 bg-canvas border border-border text-body focus:outline-none focus:border-brass transition-colors"
                  >
                    <option value="Single">Executive Single Suite (Private Ensuite) — Rs. 45,000/mo</option>
                    <option value="Double">Premium Double Chamber (Twin Desks) — Rs. 32,000/mo</option>
                    <option value="Triple">Standard Triple Suite — Rs. 26,000/mo</option>
                    <option value="Dormitory">4-Bed Academic Dormitory — Rs. 22,000/mo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-mono uppercase text-ink-muted mb-2 font-medium">
                    Anticipated Move-In Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.plannedDate}
                    onChange={(e) => setFormData({ ...formData, plannedDate: e.target.value })}
                    className="w-full px-4 py-3 bg-canvas border border-border text-body focus:outline-none focus:border-brass transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-caption font-mono uppercase text-ink-muted mb-2 font-medium">
                  Special Requirements or Dietary Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Inquire regarding vehicle parking, study carrel reservations, or meal scheduling..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-canvas border border-border text-body focus:outline-none focus:border-brass transition-colors"
                />
              </div>

              {/* Bot Defense Turnstile Widget */}
              <div className="pt-2">
                <TurnstileWidget onVerify={() => setIsTurnstileVerified(true)} />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-micro text-ink-muted font-mono">
                  Protected under Pakistan Data Protection Regulations &amp; Anti-Spam Gate.
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brass hover:bg-brass-hover text-white text-caption font-medium uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4 stroke-[1.25]" />
                  <span>Transmit Application Dossier</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Architectural Specifications Footer */}
      <footer className="mt-auto border-t border-border bg-canvas-surface py-14 text-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-brass flex items-center justify-center font-serif font-bold text-brass text-caption">
                {hostelConfig.identity.monogram}
              </div>
              <span className="font-serif text-subhead font-bold text-ink">
                {hostelConfig.identity.name}
              </span>
            </div>
            <p className="text-body text-ink-muted text-sm leading-relaxed">
              {language === "ur" ? hostelConfig.identity.taglineUrdu : hostelConfig.identity.tagline}
            </p>
            <p className="text-micro font-mono text-ink-muted">
              NTN: 8291044-7 • Commercial Lodging License #LHR-49102
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono text-caption uppercase text-ink font-bold tracking-wider">
              Navigation &amp; Sections
            </h4>
            <ul className="space-y-2 text-caption text-ink-muted">
              <li><a href="#amenities" className="hover:text-brass transition-colors">Structural Standards</a></li>
              <li><a href="#floor-plan" className="hover:text-brass transition-colors">2D Cadastral Floor Plan</a></li>
              <li><a href="#virtual-tour" className="hover:text-brass transition-colors">360° Chamber Inspection</a></li>
              <li><Link href="/dashboard" className="hover:text-brass transition-colors">Administrative ERP Console</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono text-caption uppercase text-ink font-bold tracking-wider">
              Chief Warden Desk
            </h4>
            <div className="space-y-2 text-caption text-ink-muted">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brass" />
                <span>{hostelConfig.geo.address}, {hostelConfig.geo.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brass" />
                <span>{hostelConfig.identity.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brass" />
                <span>{hostelConfig.identity.email}</span>
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono text-caption uppercase text-ink font-bold tracking-wider">
              Legal &amp; Accreditation
            </h4>
            <ul className="space-y-2 text-caption text-ink-muted">
              <li><Link href="/privacy" className="hover:text-brass transition-colors">Privacy &amp; Data Safeguards</Link></li>
              <li><Link href="/terms" className="hover:text-brass transition-colors">Tenancy Terms &amp; Conditions</Link></li>
              <li><span className="font-mono text-micro text-ink-faint">PWA Build v2.4 • Offline Ready</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-micro text-ink-muted font-mono">
          <p>© {new Date().getFullYear()} {hostelConfig.identity.name}. All structural &amp; software rights reserved.</p>
          <p className="mt-2 sm:mt-0">Zero-AI-Vibe Certified • Mathematical 8px Rhythm System</p>
        </div>
      </footer>
    </div>
  );
}
