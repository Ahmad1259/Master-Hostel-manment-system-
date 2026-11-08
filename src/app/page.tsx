"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import hostelConfig from "../../hostel.config";
import { useApp } from "../lib/store";
import { LenisProvider } from "../components/lenis-provider";
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  Zap,
  Utensils,
  Wifi,
  Lock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function LyndorShowcasePage() {
  const { floors } = useApp();
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Form State
  const [formState, setFormState] = useState({
    fullName: "",
    cnic: "",
    phone: "",
    email: "",
    university: "",
    chamberType: "DOUBLE",
    moveInDate: "",
    consent: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Dismiss preloader after 1.4s
    const timer = setTimeout(() => {
      setPreloaderComplete(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  const chambers = [
    {
      id: "horizon",
      name: "The Executive Horizon",
      type: "Single Occupancy Chamber",
      rent: "Rs. 40,000",
      period: "Month",
      description: "Private autonomous sanctuary with an attached luxury bath, executive mahogany study desk, inverter AC, and keyless biometric entry.",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      specs: ["1 Resident", "Attached En-suite", "1.5 Ton Inverter AC", "Silent Study Pod"],
      vacant: "1 Chamber Available",
    },
    {
      id: "terra",
      name: "The Scholar Terra",
      type: "Deluxe Twin Chamber",
      rent: "Rs. 30,000",
      period: "Month",
      description: "Spacious dual-desk living with dedicated personal wardrobe towers, balcony ventilation, individual LAN fiber connections, and silent ceiling fans.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      specs: ["2 Residents", "Dual Workstations", "Balcony View", "Inverter AC"],
      vacant: "2 Beds Available",
    },
    {
      id: "solara",
      name: "The Heritage Solara",
      type: "Classic Triple Chamber",
      rent: "Rs. 15,000",
      period: "Month",
      description: "Value-engineered scholarly accommodation for university peers with ergonomic partitioned bunks, private lockers, and natural light.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      specs: ["3 Residents", "Triple Lockers", "Shared En-suite", "Study Tables"],
      vacant: "Ali Raza's Wing (2 Vacant)",
    },
  ];

  const amenities = [
    {
      icon: Zap,
      title: "100% Uninterrupted Power",
      description: "Hybrid Tier-1 Solar Array backed by an automated 65 kVA Perkins generator. Zero load-shedding during university exam weeks.",
    },
    {
      icon: Utensils,
      title: "PFA-Certified Gourmet Dining",
      description: "Three wholesome home-cooked meals prepared daily in a Punjab Food Authority Grade-A inspected kitchen with seasonal fruit & fresh milk.",
    },
    {
      icon: Wifi,
      title: "Dedicated Gigabit Fiber",
      description: "Redundant dual-ISP connections (PTCL Flash Fiber + StormFiber) with 100 Mbps allocated per floor for lag-free research and coding.",
    },
    {
      icon: ShieldCheck,
      title: "Form 15 Police Compliance",
      description: "Mandatory Punjab Police Form 15 tenant background vetting, 24/7 CCTV surveillance, and biometric turnstile door access.",
    },
    {
      icon: Building,
      title: "Valet Laundry & Housekeeping",
      description: "Daily chamber cleaning, sanitized trash disposal, and twice-weekly automated laundry service managed through the digital console.",
    },
    {
      icon: Lock,
      title: "Academic Sanctuary Policy",
      description: "Strict 22:30 gate curfew, zero-tolerance soundproofing after 23:00, and biometric visitor logging for absolute security.",
    },
  ];

  const faqs = [
    {
      q: "How is the advance security deposit handled and refunded?",
      a: "The refundable security deposit is settled via direct bank transfer (IBFT) within 15 banking days upon vacating, provided a 30-day prior notice is submitted through the dashboard and chamber inventory clearance is verified.",
    },
    {
      q: "What are the gate closing and evening curfew rules?",
      a: "The main residency gate closes promptly at 22:30 PKT. Late entry requires prior digital sign-off from a registered guardian via the portal. Biometric logs ensure accountability.",
    },
    {
      q: "Is Punjab Police tenant registration (Form 15) mandatory?",
      a: "Yes. Under the Punjab Information of Temporary Residents Act 2015, all student residents must submit their CNIC and guardian details for legal station registration within 48 hours of admission.",
    },
    {
      q: "What happens to the mess bill during semester vacations?",
      a: "Residents can toggle their mess status to 'Off' through the resident mobile portal at least 48 hours in advance during semester leaves, pausing their food charges automatically.",
    },
    {
      q: "Are air conditioning electrical units billed separately?",
      a: "Standard monthly rent includes all utilities (solar power, backup generator, water, and mess). Sub-metered AC usage during peak summer months is billed transparently at government NEPRA unit rates.",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.consent) {
      alert("Please accept the Punjab Police Form 15 statutory data consent checkbox.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <LenisProvider>
      <div className="bg-[#FBF8F1] text-[#0C0C0C] font-sans antialiased selection:bg-[#0C0C0C] selection:text-[#FBF8F1] relative min-h-screen overflow-x-hidden">
        {/* ========================================================================= */}
        {/* 1. LYNDOR PRELOADER CURTAIN */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {!preloaderComplete && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
              className="fixed inset-0 z-50 bg-[#F4EFEA] flex flex-col items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-4"
              >
                <div className="w-14 h-14 border border-[#0C0C0C] mx-auto flex items-center justify-center font-serif text-2xl font-light tracking-widest text-[#0C0C0C]">
                  GP
                </div>
                <div className="space-y-1">
                  <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] uppercase text-[#0C0C0C]">
                    The Grand Pavilion
                  </h1>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#5D6C7B]">
                    Student Living, Thoughtfully Redefined.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 2. MINIMALIST STICKY NAVBAR */}
        {/* ========================================================================= */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-[#FBF8F1]/85 backdrop-blur-md border-b border-[#0C0C0C]/10 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Left: Menu Trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lyndor-roll-btn group inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#0C0C0C] py-2 px-3 hover:bg-[#0C0C0C]/5 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span className="lyndor-roll-text">Menu</span>
              <span className="lyndor-roll-clone">Menu</span>
            </button>

            {/* Center: Brand Monogram & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 border border-[#0C0C0C] flex items-center justify-center font-serif text-sm font-semibold tracking-wider group-hover:bg-[#0C0C0C] group-hover:text-[#FBF8F1] transition-all duration-300">
                GP
              </div>
              <span className="font-serif text-lg tracking-[0.2em] uppercase font-light hidden sm:inline text-[#0C0C0C]">
                Grand Pavilion
              </span>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/login"
                className="hidden md:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-medium text-[#5D6C7B] hover:text-[#0C0C0C] transition-colors"
              >
                <span>ERP Portal</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <a
                href="#book"
                className="lyndor-roll-btn bg-[#0C0C0C] text-[#FBF8F1] py-2.5 px-5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#1A1A1A] transition-colors"
              >
                <span className="lyndor-roll-text">Reserve A Bed</span>
                <span className="lyndor-roll-clone">Reserve A Bed</span>
              </a>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. FULL-SCREEN EDITORIAL MENU DRAWER */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-[#0C0C0C] text-[#FBF8F1] flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-y-auto"
            >
              {/* Drawer Top */}
              <div className="flex items-center justify-between border-b border-[#FBF8F1]/15 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#FBF8F1] flex items-center justify-center font-serif text-sm text-[#FBF8F1]">
                    GP
                  </div>
                  <span className="font-serif tracking-[0.2em] uppercase text-sm">
                    Grand Pavilion Residency
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FBF8F1]/70 hover:text-[#FBF8F1] py-2 px-3 border border-[#FBF8F1]/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="py-12 space-y-4 max-w-2xl">
                {[
                  { num: "01", label: "The Residency", href: "#about" },
                  { num: "02", label: "Chambers & Residences", href: "#residences" },
                  { num: "03", label: "Amenities & Backup", href: "#amenities" },
                  { num: "04", label: "Scholar Stories", href: "#stories" },
                  { num: "05", label: "Common Questions", href: "#faq" },
                  { num: "06", label: "Reserve A Bed", href: "#book" },
                  { num: "07", label: "Staff & Student Login", href: "/login" },
                ].map((item) => (
                  <div key={item.num} className="border-b border-[#FBF8F1]/10 pb-4">
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline justify-between"
                    >
                      <span className="font-serif text-3xl sm:text-5xl font-light text-[#FBF8F1] group-hover:text-emerald-400 transition-colors tracking-tight">
                        {item.label}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-[#FBF8F1]/40 font-mono">
                        {item.num}
                      </span>
                    </a>
                  </div>
                ))}
              </nav>

              {/* Drawer Bottom Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#FBF8F1]/15 text-xs text-[#FBF8F1]/60">
                <div>
                  <div className="font-semibold text-[#FBF8F1] uppercase tracking-wider mb-1">Campus Location</div>
                  <p>Plot 42-B, Sector C, Gulberg III, Lahore, Pakistan</p>
                </div>
                <div>
                  <div className="font-semibold text-[#FBF8F1] uppercase tracking-wider mb-1">Direct Inquiries</div>
                  <p>+92 300 8472911 • +92 42 3578 9201</p>
                  <p>admissions@grandpavilion.pk</p>
                </div>
                <div>
                  <div className="font-semibold text-[#FBF8F1] uppercase tracking-wider mb-1">Accreditations</div>
                  <p>License: #LHR-49102 • NTN: 8291044-7</p>
                  <p>Police Form 15 Compliant</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 4. HERO SECTION (`section_home_hero`) */}
        {/* ========================================================================= */}
        <section className="pt-36 sm:pt-44 pb-20 px-6 max-w-7xl mx-auto space-y-12">
          {/* Header Headlines */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 border border-[#0C0C0C]/15 text-[11px] uppercase tracking-[0.25em] text-[#5D6C7B]"
            >
              <span>Gulberg III • Lahore Campus</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-6xl sm:text-8xl lg:text-[110px] font-light tracking-[0.06em] text-[#0C0C0C] uppercase leading-none"
            >
              Grand Pavilion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-[#5D6C7B] tracking-wide max-w-2xl mx-auto font-light"
            >
              Your Stay, Thoughtfully Redefined. Private and shared student chambers designed for quiet focus, backed by 100% solar redundancy.
            </motion.p>
          </div>

          {/* Hero Architectural Visual Frame */}
          <div className="relative w-full aspect-[16/10] max-h-[640px] overflow-hidden rounded-none border border-[#0C0C0C]/10 bg-[#EAE4DC] group">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="The Grand Pavilion Serviced Student Residency Courtyard"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Subtle Gradient Veil */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0C0C0C]/60 via-transparent to-transparent" />

            {/* Floating Hero CTA Pill */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center space-y-3 w-full px-4">
              <a
                href="#residences"
                className="lyndor-roll-btn bg-[#0C0C0C] text-[#FBF8F1] py-4 px-8 text-xs font-semibold uppercase tracking-[0.25em] shadow-2xl hover:bg-[#222222] transition-colors border border-[#FBF8F1]/20"
              >
                <span className="lyndor-roll-text">Explore Chambers</span>
                <span className="lyndor-roll-clone">Explore Chambers ↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. ABOUT SECTION: "REFINED STAYS" (`section_home_about`) */}
        {/* ========================================================================= */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#0C0C0C]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5D6C7B]">
                Refined Stays • Curated Sanctuary
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl font-light tracking-tight text-[#0C0C0C] uppercase leading-tight">
                Refined<br />Stays
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5D6C7B] leading-relaxed font-light">
                <p>
                  The Grand Pavilion brings together a selection of private and shared student chambers in the heart of Gulberg III, Lahore, each shaped for academic serenity and uncompromised comfort.
                </p>
                <p>
                  Across each wing, the resident experience stays unwavering: calm spaces, ergonomic solid wood study desks, three wholesome meals prepared daily, and uninterrupted 24-hour hybrid solar electricity.
                </p>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#0C0C0C]/10">
                <div>
                  <div className="font-serif text-3xl font-light text-[#0C0C0C]">100%</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#5D6C7B] mt-1">Solar &amp; Gen Backup</div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-light text-[#0C0C0C]">PFA-A</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#5D6C7B] mt-1">Food Safety Grade</div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-light text-[#0C0C0C]">Form 15</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#5D6C7B] mt-1">Police Registered</div>
                </div>
              </div>
            </div>

            {/* Right Architectural Visual */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#0C0C0C]/10 bg-[#EAE4DC]">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                  alt="Student Study Desk in Natural Daylight"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. RESIDENCES SECTION - DARK LUXURY CONTRAST (`section_home_residences`) */}
        {/* ========================================================================= */}
        <section id="residences" className="py-28 bg-[#0C0C0C] text-[#FBF8F1] transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            {/* Header: Split Subtitle and Massive Serif Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#FBF8F1]/15 pb-8">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FBF8F1]/60">
                  Curated Chambers
                </span>
                <p className="text-sm text-[#FBF8F1]/70 max-w-sm">
                  A selection of private and shared stays crafted for comfort, focus, and simplicity.
                </p>
              </div>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.05em] uppercase text-[#FBF8F1]">
                Residences
              </h2>
            </div>

            {/* 3 Chamber Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {chambers.map((chamber) => (
                <div
                  key={chamber.id}
                  className="group bg-[#141414] border border-[#FBF8F1]/10 flex flex-col justify-between overflow-hidden hover:border-[#FBF8F1]/30 transition-all duration-300"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-black/40">
                    <img
                      src={chamber.image}
                      alt={chamber.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 right-4 bg-[#0C0C0C]/80 backdrop-blur-sm border border-[#FBF8F1]/20 text-[10px] uppercase tracking-widest text-[#FBF8F1] px-2.5 py-1">
                      {chamber.vacant}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="text-[11px] uppercase tracking-widest text-[#FBF8F1]/50">
                        {chamber.type}
                      </div>
                      <h3 className="font-serif text-2xl font-light text-[#FBF8F1]">
                        {chamber.name}
                      </h3>
                      <p className="text-xs text-[#FBF8F1]/60 leading-relaxed font-light">
                        {chamber.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#FBF8F1]/10 space-y-4">
                      {/* Specs pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {chamber.specs.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider text-[#FBF8F1]/70 bg-[#FBF8F1]/5 px-2 py-0.5 border border-[#FBF8F1]/10"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Pricing & CTA */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="font-serif text-2xl text-[#FBF8F1] tracking-tight">
                            {chamber.rent}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest text-[#FBF8F1]/50 font-mono">
                            / {chamber.period}
                          </div>
                        </div>

                        <a
                          href="#book"
                          className="lyndor-roll-btn bg-[#FBF8F1] text-[#0C0C0C] py-2 px-4 text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-white transition-colors"
                        >
                          <span className="lyndor-roll-text">Reserve</span>
                          <span className="lyndor-roll-clone">Reserve →</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. AMENITIES SECTION (`section_home_amenities`) */}
        {/* ========================================================================= */}
        <section id="amenities" className="py-28 px-6 max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0C0C0C]/10 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5D6C7B]">
                Hospitality &amp; Infrastructure
              </span>
              <p className="text-sm text-[#5D6C7B] max-w-sm">
                Carefully considered facilities designed for seamless student living.
              </p>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.05em] uppercase text-[#0C0C0C]">
              Amenities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="border border-[#0C0C0C]/10 bg-white p-8 space-y-4 hover:border-[#0C0C0C]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 border border-[#0C0C0C]/15 flex items-center justify-center text-[#0C0C0C]">
                    <Icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#0C0C0C]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5D6C7B] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. SCHOLAR STORIES / TESTIMONIALS (`section_home_testimonials`) */}
        {/* ========================================================================= */}
        <section id="stories" className="py-24 bg-[#F4EFEA] border-y border-[#0C0C0C]/10">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5D6C7B]">
                Verified Resident Experiences
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light uppercase text-[#0C0C0C]">
                Scholar Stories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Having 24-hour uninterrupted solar power with zero flicker during FAST final project evaluations made all the difference.",
                  author: "Muhammad Hamza",
                  uni: "FAST-NUCES • BS Computer Science",
                  room: "Room 101 (Executive Single)",
                },
                {
                  quote: "The quiet environment, high-speed fiber internet, and home-cooked clean meals made shifting from Multan to Lahore completely effortless.",
                  author: "Ali Raza",
                  uni: "LUMS • Undergraduate Economics",
                  room: "Room 204 (Bed 2 - Scholar Wing)",
                },
                {
                  quote: "From automated monthly WhatsApp receipts to biometric turnstile security, the management is remarkably transparent and dignified.",
                  author: "Shahmir Ali Khan",
                  uni: "FC College • Pre-Medical Fellow",
                  room: "Room 102 (Twin Sharing)",
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="bg-[#FBF8F1] border border-[#0C0C0C]/10 p-8 space-y-6 flex flex-col justify-between"
                >
                  <p className="font-serif text-lg text-[#0C0C0C] font-light italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-[#0C0C0C]/10 space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0C0C0C]">
                      {t.author}
                    </div>
                    <div className="text-[11px] text-[#5D6C7B]">
                      {t.uni}
                    </div>
                    <div className="text-[10px] text-emerald-800 font-medium">
                      {t.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. COMMON QUESTIONS / ACCORDION FAQ (`section_home_faq`) */}
        {/* ========================================================================= */}
        <section id="faq" className="py-24 px-6 max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5D6C7B]">
              Residency Clarifications
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light uppercase text-[#0C0C0C]">
              Common Questions
            </h2>
          </div>

          <div className="divide-y divide-[#0C0C0C]/10 border-y border-[#0C0C0C]/10">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="font-serif text-xl sm:text-2xl font-normal text-[#0C0C0C] group-hover:text-emerald-800 transition-colors">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 border border-[#0C0C0C]/15 flex items-center justify-center text-xs ml-4 shrink-0 transition-transform duration-300">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-xs sm:text-sm text-[#5D6C7B] leading-relaxed font-light">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. BOOK A BED / ADMISSION FORM (`section_home_book`) */}
        {/* ========================================================================= */}
        <section id="book" className="py-28 bg-[#0C0C0C] text-[#FBF8F1]">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FBF8F1]/60">
                Semester 2026 Admissions
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl font-light uppercase text-[#FBF8F1]">
                Reserve A Chamber
              </h2>
              <p className="text-xs sm:text-sm text-[#FBF8F1]/70 max-w-lg mx-auto font-light">
                Submit your academic residency reservation. No advance booking fee is charged online. Challans are issued upon physical room inspection.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#141414] border border-emerald-500/40 p-10 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-2xl text-[#FBF8F1]">
                  Reservation Request Dispatched
                </h3>
                <p className="text-xs text-[#FBF8F1]/70 max-w-md mx-auto">
                  Thank you, <strong>{formState.fullName}</strong>. An official admission challan and chamber assignment pass have been scheduled for dispatch to <strong>{formState.phone}</strong>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-emerald-400 underline pt-4 cursor-pointer"
                >
                  Submit Another Inscription
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="bg-[#141414] border border-[#FBF8F1]/10 p-8 sm:p-12 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-[#FBF8F1]/70 font-medium">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Raza"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-4 py-3 text-sm text-[#FBF8F1] focus:outline-hidden focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-[#FBF8F1]/70 font-medium">
                      Pakistani CNIC / B-Form *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="35202-XXXXXXX-X"
                      value={formState.cnic}
                      onChange={(e) => setFormState({ ...formState, cnic: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-4 py-3 text-sm text-[#FBF8F1] focus:outline-hidden focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-[#FBF8F1]/70 font-medium">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-4 py-3 text-sm text-[#FBF8F1] focus:outline-hidden focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-[#FBF8F1]/70 font-medium">
                      Enrolled University / Institute *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FAST-NUCES, LUMS, PU"
                      value={formState.university}
                      onChange={(e) => setFormState({ ...formState, university: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-4 py-3 text-sm text-[#FBF8F1] focus:outline-hidden focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-[#FBF8F1]/70 font-medium">
                      Chamber Tier Preference *
                    </label>
                    <select
                      value={formState.chamberType}
                      onChange={(e) => setFormState({ ...formState, chamberType: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-4 py-3 text-sm text-[#FBF8F1] focus:outline-hidden focus:border-emerald-500 transition-colors"
                    >
                      <option value="SINGLE">The Horizon (Single Chamber - Rs. 40,000/mo)</option>
                      <option value="DOUBLE">The Terra (Twin Sharing - Rs. 30,000/mo)</option>
                      <option value="TRIPLE">The Solara (Triple Sharing - Rs. 15,000/mo)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-[#FBF8F1]/70 font-medium">
                      Planned Move-in Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formState.moveInDate}
                      onChange={(e) => setFormState({ ...formState, moveInDate: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-4 py-3 text-sm text-[#FBF8F1] focus:outline-hidden focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Statutory Legal Consent Box (Item 6) */}
                <div className="p-4 bg-[#0C0C0C] border border-[#FBF8F1]/15 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="statutory-consent-check"
                    checked={formState.consent}
                    onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded-none accent-emerald-600 border-[#FBF8F1]/30 cursor-pointer"
                  />
                  <label htmlFor="statutory-consent-check" className="text-xs text-[#FBF8F1]/70 leading-relaxed cursor-pointer select-none">
                    I agree to share my CNIC, mobile number, and tenancy details strictly for hostel admission, emergency communication, and mandatory Punjab Police Form 15 registration under the Punjab Information of Temporary Residents Act 2015.
                  </label>
                </div>

                {/* Lyndor Rolling Submit Button */}
                <button
                  type="submit"
                  className="lyndor-roll-btn w-full bg-[#FBF8F1] text-[#0C0C0C] py-4 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white transition-colors cursor-pointer"
                >
                  <span className="lyndor-roll-text">Submit Reservation Request</span>
                  <span className="lyndor-roll-clone">Submit Reservation Request →</span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. LUXURY FOOTER & STATUTORY ATTESTATIONS */}
        {/* ========================================================================= */}
        <footer className="bg-[#0C0C0C] text-[#FBF8F1] border-t border-[#FBF8F1]/15 py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Identity */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#FBF8F1] flex items-center justify-center font-serif text-sm">
                    GP
                  </div>
                  <span className="font-serif tracking-[0.2em] text-sm uppercase">
                    Grand Pavilion
                  </span>
                </div>
                <p className="text-xs text-[#FBF8F1]/60 leading-relaxed font-light">
                  Serviced student residency and educational accommodation in Gulberg III, Lahore, Pakistan.
                </p>
                <div className="text-[11px] text-[#FBF8F1]/40 font-mono space-y-0.5">
                  <div>License: #LHR-49102</div>
                  <div>NTN: 8291044-7 (FBR Registered)</div>
                  <div>Director: Major (R) Tariq Mehmood</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F1]">
                  Residency Sections
                </div>
                <ul className="space-y-2 text-xs text-[#FBF8F1]/60">
                  <li><a href="#about" className="hover:text-[#FBF8F1]">The Sanctuary</a></li>
                  <li><a href="#residences" className="hover:text-[#FBF8F1]">Chambers &amp; Rent</a></li>
                  <li><a href="#amenities" className="hover:text-[#FBF8F1]">Solar &amp; Facilities</a></li>
                  <li><a href="#faq" className="hover:text-[#FBF8F1]">Common Questions</a></li>
                  <li><a href="#book" className="hover:text-[#FBF8F1]">Chamber Booking</a></li>
                </ul>
              </div>

              {/* ERP Portal & Administrative */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F1]">
                  Management &amp; ERP
                </div>
                <ul className="space-y-2 text-xs text-[#FBF8F1]/60">
                  <li><Link href="/login" className="hover:text-[#FBF8F1] text-emerald-400">Resident / Warden Login →</Link></li>
                  <li><Link href="/dashboard" className="hover:text-[#FBF8F1]">Operations Dashboard</Link></li>
                  <li><Link href="/dashboard/students" className="hover:text-[#FBF8F1]">Student Management</Link></li>
                  <li><Link href="/dashboard/fees" className="hover:text-[#FBF8F1]">Rent Ledger</Link></li>
                </ul>
              </div>

              {/* Pakistan Statutory Compliance */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F1]">
                  Statutory Policies
                </div>
                <ul className="space-y-2 text-xs text-[#FBF8F1]/60">
                  <li><Link href="/privacy" className="hover:text-[#FBF8F1] underline">Privacy &amp; CNIC Protection</Link></li>
                  <li><Link href="/terms" className="hover:text-[#FBF8F1] underline">Residency Bylaws &amp; Curfew</Link></li>
                  <li><Link href="/refund" className="hover:text-[#FBF8F1] underline">Security Deposit Refund Policy</Link></li>
                  <li><Link href="/cookies" className="hover:text-[#FBF8F1] underline">Cookie &amp; Tracking Disclosures</Link></li>
                  <li className="pt-2 text-emerald-400 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Punjab Police Form 15 Compliant
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-[#FBF8F1]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FBF8F1]/40 gap-4">
              <div>
                &copy; {new Date().getFullYear()} The Grand Pavilion Residency. All statutory rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <span>PECA 2016 Encrypted</span>
                <span>•</span>
                <span>Punjab Rented Premises Act</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LenisProvider>
  );
}
