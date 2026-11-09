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
  Building,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sun,
  Sofa,
  Snowflake,
  Car,
  Briefcase,
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
    const timer = setTimeout(() => {
      setPreloaderComplete(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const chambers = [
    {
      id: "horizon",
      name: "The Executive Horizon",
      type: "Single occupancy chamber",
      rent: "Rs 40,000",
      period: "month",
      description: "Private room with attached bath, executive study desk, inverter AC, and smart lock entry.",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      specs: ["1 Resident", "Attached bath", "Inverter AC", "Study desk"],
      vacant: "1 chamber available",
    },
    {
      id: "terra",
      name: "The Scholar Terra",
      type: "Deluxe twin chamber",
      rent: "Rs 30,000",
      period: "month",
      description: "Dual-desk room with personal wardrobe towers, balcony ventilation, fiber internet, and ceiling fans.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      specs: ["2 Residents", "Dual desks", "Balcony", "Inverter AC"],
      vacant: "2 beds available",
    },
    {
      id: "solara",
      name: "The Heritage Solara",
      type: "Classic triple chamber",
      rent: "Rs 15,000",
      period: "month",
      description: "Student accommodation with partitioned bunks, private lockers, and natural window light.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      specs: ["3 Residents", "Triple lockers", "Shared bath", "Study tables"],
      vacant: "2 beds available",
    },
  ];

  const amenities = [
    {
      icon: Sun,
      title: "100% solar backup with zero load-shedding.",
    },
    {
      icon: ({ className = "w-8 h-8" }: { className?: string }) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5v2m-3.5-2v2m7-2v2M4 8.5h16M5.5 8.5v8.5a2 2 0 002 2h9a2 2 0 002-2V8.5M2 10.5h2m16 0h2" />
        </svg>
      ),
      title: "Modern kitchen with complete essentials.",
    },
    {
      icon: Sofa,
      title: "Open-air seating for easy living.",
    },
    {
      icon: Wifi,
      title: "Fast, reliable connection throughout.",
    },
    {
      icon: Snowflake,
      title: "Cool, comfortable rooms all day.",
    },
    {
      icon: Car,
      title: "Secure on-site parking available.",
    },
    {
      icon: Briefcase,
      title: "Quiet workspace for focused time.",
    },
    {
      icon: ShieldCheck,
      title: "24/7 biometric security & CCTV surveillance.",
    },
  ];

  const faqs = [
    {
      q: "How is the advance security deposit refunded?",
      a: "The refundable deposit is returned via direct bank transfer (IBFT) within 15 banking days upon vacating, after a 30-day prior notice and room inventory clearance.",
    },
    {
      q: "What are the gate closing and evening curfew rules?",
      a: "The main gate closes at 22:30. Late arrival requires prior written permission from a registered guardian through the portal.",
    },
    {
      q: "Is Punjab Police tenant registration (Form 15) mandatory?",
      a: "Yes. Under the Punjab Information of Temporary Residents Act 2015, all student residents submit their CNIC and guardian details within 48 hours of admission.",
    },
    {
      q: "What happens to the mess bill during semester vacations?",
      a: "Residents can toggle their mess status to off through the mobile portal at least 48 hours in advance during semester breaks.",
    },
    {
      q: "Are air conditioning electrical units billed separately?",
      a: "Monthly rent includes basic solar and generator power. Sub-metered AC electricity during peak summer months is billed at official NEPRA tariff rates.",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.consent) {
      alert("Please accept the statutory data consent checkbox.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <LenisProvider>
      <div className="bg-[#FBF8F1] text-[#0C0C0C] font-sans antialiased selection:bg-[#0C0C0C] selection:text-[#FBF8F1] relative min-h-screen overflow-x-hidden">
        {/* Preloader Curtain */}
        <AnimatePresence>
          {!preloaderComplete && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
              className="fixed inset-0 z-50 bg-[#F4EFEA] flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="text-center space-y-3">
                <div className="w-12 h-12 border border-[#0C0C0C] mx-auto flex items-center justify-center font-serif text-xl font-light text-[#0C0C0C]">
                  GP
                </div>
                <div className="space-y-0.5">
                  <h1 className="font-serif text-2xl tracking-wide text-[#0C0C0C]">
                    The Grand Pavilion
                  </h1>
                  <p className="text-xs text-[#5D6C7B]">
                    Student chambers in Gulberg III, Lahore
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Sticky Navbar */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-[#FBF8F1]/90 backdrop-blur-md border-b border-[#0C0C0C]/10 transition-colors">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Left: Menu Trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#0C0C0C] py-1.5 px-2.5 rounded-md hover:bg-[#0C0C0C]/5 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4 text-gray-700" />
              <span>Menu</span>
            </button>

            {/* Center: Brand Monogram & Name */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 border border-[#0C0C0C] flex items-center justify-center font-serif text-xs font-semibold">
                GP
              </div>
              <span className="font-serif text-base tracking-wide text-[#0C0C0C]">
                Grand Pavilion
              </span>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-[#5D6C7B] hover:text-[#0C0C0C] transition-colors"
              >
                <span>ERP portal</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </Link>

              <a
                href="#book"
                className="bg-[#0C0C0C] hover:bg-[#222222] text-[#FBF8F1] py-2 px-3.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
              >
                Reserve a bed
              </a>
            </div>
          </div>
        </header>

        {/* Full-Screen Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-[#0C0C0C] text-[#FBF8F1] flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#FBF8F1]/15 pb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 border border-[#FBF8F1] flex items-center justify-center font-serif text-xs text-[#FBF8F1]">
                    GP
                  </div>
                  <span className="font-serif tracking-wide text-sm">
                    Grand Pavilion Residency
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#FBF8F1]/70 hover:text-[#FBF8F1] py-1.5 px-3 border border-[#FBF8F1]/20 rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-8 space-y-3 max-w-xl">
                {[
                  { num: "01", label: "The residency", href: "#about" },
                  { num: "02", label: "Chambers & rent", href: "#residences" },
                  { num: "03", label: "Amenities & power", href: "#amenities" },
                  { num: "04", label: "Scholar stories", href: "#stories" },
                  { num: "05", label: "Common questions", href: "#faq" },
                  { num: "06", label: "Reserve a bed", href: "#book" },
                  { num: "07", label: "Management login", href: "/login" },
                ].map((item) => (
                  <div key={item.num} className="border-b border-[#FBF8F1]/10 pb-3">
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline justify-between"
                    >
                      <span className="font-serif text-2xl sm:text-3xl font-light text-[#FBF8F1] group-hover:text-emerald-400 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-xs text-[#FBF8F1]/40 font-mono">
                        {item.num}
                      </span>
                    </a>
                  </div>
                ))}
              </nav>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#FBF8F1]/15 text-xs text-[#FBF8F1]/60">
                <div>
                  <div className="font-medium text-[#FBF8F1] mb-1">Campus location</div>
                  <p>Plot 42-B, Sector C, Gulberg III, Lahore</p>
                </div>
                <div>
                  <div className="font-medium text-[#FBF8F1] mb-1">Inquiries</div>
                  <p>0300-8472911 • admissions@grandpavilion.pk</p>
                </div>
                <div>
                  <div className="font-medium text-[#FBF8F1] mb-1">Credentials</div>
                  <p>License #LHR-49102 • NTN 8291044-7</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="pt-28 sm:pt-36 pb-16 px-6 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-medium text-[#5D6C7B]">
              Gulberg III, Lahore campus
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl font-light tracking-tight text-[#0C0C0C]">
              Grand Pavilion
            </h1>

            <p className="text-sm sm:text-base text-[#5D6C7B] max-w-xl mx-auto font-normal">
              Serviced student chambers in Gulberg III, Lahore, with 100% solar redundancy, wholesome meals, and quiet study spaces.
            </p>
          </div>

          {/* Hero Visual Frame */}
          <div className="relative w-full aspect-[16/10] max-h-[580px] overflow-hidden rounded-lg border border-[#0C0C0C]/10 bg-[#EAE4DC]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="The Grand Pavilion student residency courtyard"
              className="w-full h-full object-cover"
            />

            {/* Quiet Floating CTA */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <a
                href="#residences"
                className="inline-flex items-center gap-2 bg-[#0C0C0C] hover:bg-[#222222] text-[#FBF8F1] py-2.5 px-5 text-xs font-medium rounded-md shadow-sm border border-white/10 transition-colors"
              >
                <span>Explore chambers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* About Section: Refined Stays */}
        <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#0C0C0C]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-medium text-[#5D6C7B]">
                Curated residency
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#0C0C0C] leading-tight">
                Refined stays
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#5D6C7B] leading-relaxed">
                <p>
                  The Grand Pavilion provides private and shared chambers in Gulberg III, Lahore, configured for academic focus and dependable comfort.
                </p>
                <p>
                  Each wing maintains solid wood study desks, three meals prepared daily in a certified kitchen, and uninterrupted hybrid solar power with generator backup.
                </p>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#0C0C0C]/10">
                <div>
                  <div className="font-serif text-2xl text-[#0C0C0C]">100%</div>
                  <div className="text-[11px] text-[#5D6C7B] mt-0.5">Solar backup</div>
                </div>
                <div>
                  <div className="font-serif text-2xl text-[#0C0C0C]">PFA-A</div>
                  <div className="text-[11px] text-[#5D6C7B] mt-0.5">Food grade</div>
                </div>
                <div>
                  <div className="font-serif text-2xl text-[#0C0C0C]">Form 15</div>
                  <div className="text-[11px] text-[#5D6C7B] mt-0.5">Police verified</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/5] overflow-hidden rounded-lg border border-[#0C0C0C]/10 bg-[#EAE4DC]">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                  alt="Student study room with desk"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Residences Section (Dark Neutral Contrast) */}
        <section id="residences" className="py-24 bg-[#0C0C0C] text-[#FBF8F1]">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#FBF8F1]/15 pb-6">
              <div className="space-y-1">
                <span className="text-xs text-[#FBF8F1]/60">
                  Room allocations
                </span>
                <p className="text-xs text-[#FBF8F1]/70 max-w-sm">
                  Private and shared accommodations with transparent monthly rates.
                </p>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1]">
                Residences
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chambers.map((chamber) => (
                <div
                  key={chamber.id}
                  className="bg-[#141414] border border-[#FBF8F1]/10 rounded-lg flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-black/40">
                    <img
                      src={chamber.image}
                      alt={chamber.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#0C0C0C]/80 border border-[#FBF8F1]/20 text-[11px] text-[#FBF8F1] px-2 py-0.5 rounded-sm">
                      {chamber.vacant}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-[11px] text-[#FBF8F1]/50">
                        {chamber.type}
                      </div>
                      <h3 className="font-serif text-xl font-normal text-[#FBF8F1]">
                        {chamber.name}
                      </h3>
                      <p className="text-xs text-[#FBF8F1]/60 leading-relaxed font-light">
                        {chamber.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#FBF8F1]/10 space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {chamber.specs.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-[#FBF8F1]/70 bg-[#FBF8F1]/5 px-2 py-0.5 border border-[#FBF8F1]/10 rounded-sm"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="font-serif text-xl text-[#FBF8F1] tabular-nums">
                            {chamber.rent}
                          </div>
                          <div className="text-[10px] text-[#FBF8F1]/50 font-mono">
                            / {chamber.period}
                          </div>
                        </div>

                        <a
                          href="#book"
                          className="bg-[#FBF8F1] hover:bg-white text-[#0C0C0C] py-1.5 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer"
                        >
                          Reserve
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities Section (Lyndor Dark Minimalist Grid with Scroll Stagger) */}
        <section id="amenities" className="py-24 sm:py-32 bg-[#0C0C0C] text-[#FBF8F1] overflow-hidden border-t border-[#FBF8F1]/10">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header: Appears first on scroll */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16 sm:mb-20 space-y-3"
            >
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#FBF8F1]">
                Amenities
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#FBF8F1]/65 font-light tracking-wide max-w-md mx-auto">
                Thoughtfully selected essentials to enhance your stay.
              </p>
            </motion.div>

            {/* Grid of 8 items: Appears ~0.5s (half second) after header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.5, // Adha second delay
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                    staggerChildren: 0.07,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#FBF8F1]/15"
            >
              {amenities.map((item, idx) => {
                const Icon = item.icon;
                const mobileBorder = idx === 7 ? "border-b-0" : "border-b border-[#FBF8F1]/15";
                const tabletRight = idx % 2 === 0 ? "sm:border-r sm:border-[#FBF8F1]/15" : "sm:border-r-0";
                const tabletBottom = idx >= 6 ? "sm:border-b-0" : "sm:border-b sm:border-[#FBF8F1]/15";
                const desktopRight = (idx + 1) % 4 !== 0 ? "lg:border-r lg:border-[#FBF8F1]/15" : "lg:border-r-0";
                const desktopBottom = idx < 4 ? "lg:border-b lg:border-[#FBF8F1]/15" : "lg:border-b-0";

                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className={`py-12 sm:py-16 md:py-20 px-6 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 min-h-[200px] sm:min-h-[230px] transition-colors hover:bg-white/[0.02] ${mobileBorder} ${tabletRight} ${tabletBottom} ${desktopRight} ${desktopBottom}`}
                  >
                    <div className="text-[#FBF8F1] flex items-center justify-center">
                      <Icon className="w-8 h-8 stroke-[1.4]" />
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#FBF8F1]/85 font-light leading-relaxed max-w-[210px] mx-auto">
                      {item.title}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Scholar Stories / Resident Reviews (Dual Marquee with Side Blur) */}
        <section id="stories" className="py-24 bg-[#F4EFEA] border-y border-[#0C0C0C]/10 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center space-y-2">
            <span className="text-xs text-[#5D6C7B] tracking-wide">
              Resident experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0C0C0C]">
              Stories from our scholars
            </h2>
            <p className="text-xs sm:text-sm text-[#5D6C7B] max-w-md mx-auto">
              Authentic reflections from university residents and visiting fellows who call Grand Pavilion home.
            </p>
          </div>

          {/* Marquee Carousel Container with Side Blur / Fade Effect */}
          <div className="relative w-full overflow-hidden space-y-6">
            {/* Left & Right Edge Blur and Gradient Overlays */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 z-20 bg-gradient-to-r from-[#F4EFEA] via-[#F4EFEA]/85 to-transparent backdrop-blur-[3px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 z-20 bg-gradient-to-l from-[#F4EFEA] via-[#F4EFEA]/85 to-transparent backdrop-blur-[3px]"
              aria-hidden="true"
            />

            {/* Row 1: Moves Right to Left */}
            <div className="overflow-hidden w-full flex">
              <div className="animate-marquee-left flex gap-6 px-3">
                {[
                  {
                    quote: "Private, peaceful, and effortless. We spent every evening in the study courtyard just... existing.",
                    author: "Alisha K.",
                  },
                  {
                    quote: "It's rare to find a place that feels designed for slowing down and deep focus. Grand Pavilion understood exactly what we needed.",
                    author: "Daniel W.",
                  },
                  {
                    quote: "We planned to explore the area every weekend. Instead, we stayed inside with uninterrupted solar power. Zero regrets.",
                    author: "Rafael G.",
                  },
                  {
                    quote: "It didn't feel like a rental or student hostel. It felt like our own private retreat — even during FAST finals week.",
                    author: "Sofia P.",
                  },
                  {
                    quote: "The quiet environment and high-speed fiber internet made completing my economics thesis straightforward and stress-free.",
                    author: "Ali Raza",
                  },
                  {
                    quote: "The management is calm, courteous, and transparent. Every WhatsApp inquiry was handled within minutes.",
                    author: "Taimur M.",
                  },
                  // Duplicated for seamless infinite ticker
                  {
                    quote: "Private, peaceful, and effortless. We spent every evening in the study courtyard just... existing.",
                    author: "Alisha K.",
                  },
                  {
                    quote: "It's rare to find a place that feels designed for slowing down and deep focus. Grand Pavilion understood exactly what we needed.",
                    author: "Daniel W.",
                  },
                  {
                    quote: "We planned to explore the area every weekend. Instead, we stayed inside with uninterrupted solar power. Zero regrets.",
                    author: "Rafael G.",
                  },
                  {
                    quote: "It didn't feel like a rental or student hostel. It felt like our own private retreat — even during FAST finals week.",
                    author: "Sofia P.",
                  },
                  {
                    quote: "The quiet environment and high-speed fiber internet made completing my economics thesis straightforward and stress-free.",
                    author: "Ali Raza",
                  },
                  {
                    quote: "The management is calm, courteous, and transparent. Every WhatsApp inquiry was handled within minutes.",
                    author: "Taimur M.",
                  },
                ].map((t, idx) => (
                  <div
                    key={`r1-${idx}`}
                    className="w-[320px] sm:w-[390px] h-[230px] sm:h-[250px] p-7 sm:p-8 rounded-xl sm:rounded-2xl bg-[#EAE4DC] border border-[#0C0C0C]/5 flex flex-col justify-between items-center text-center shrink-0 select-none shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:border-[#0C0C0C]/15"
                  >
                    {/* 5 Stars at top center */}
                    <div className="flex items-center justify-center gap-1.5 text-[#0C0C0C]">
                      {[...Array(5)].map((_, sIdx) => (
                        <svg
                          key={sIdx}
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="font-sans text-[14px] sm:text-[15px] text-[#1F1F1F] font-light leading-[1.65] text-center max-w-xs sm:max-w-sm">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author in elegant serif */}
                    <div className="font-serif text-xl sm:text-2xl text-[#0C0C0C] font-normal tracking-wide text-center">
                      {t.author}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Moves Left to Right */}
            <div className="overflow-hidden w-full flex">
              <div className="animate-marquee-right flex gap-6 px-3">
                {[
                  {
                    quote: "From monthly WhatsApp ledger receipts to PFA-A food hygiene, the transparency here is unprecedented.",
                    author: "Hamza M.",
                  },
                  {
                    quote: "Form 15 Punjab Police tenant verification was executed seamlessly on day one. Total security and peace of mind.",
                    author: "Fatima Z.",
                  },
                  {
                    quote: "Solid wood desks, natural lighting, and respectful fellow scholars. The best academic residency in Gulberg.",
                    author: "Usman G.",
                  },
                  {
                    quote: "Nutritious, hot home-style meals served punctually every single evening. You genuinely feel cared for here.",
                    author: "Ayesha N.",
                  },
                  {
                    quote: "Zero generator noise, 100% solar redundancy, and pristine private washrooms with instant hot water.",
                    author: "Bilal K.",
                  },
                  {
                    quote: "Coming from Multan to Lahore for LUMS was daunting. Grand Pavilion made the transition completely effortless.",
                    author: "Shahmir Ali",
                  },
                  // Duplicated for seamless infinite ticker
                  {
                    quote: "From monthly WhatsApp ledger receipts to PFA-A food hygiene, the transparency here is unprecedented.",
                    author: "Hamza M.",
                  },
                  {
                    quote: "Form 15 Punjab Police tenant verification was executed seamlessly on day one. Total security and peace of mind.",
                    author: "Fatima Z.",
                  },
                  {
                    quote: "Solid wood desks, natural lighting, and respectful fellow scholars. The best academic residency in Gulberg.",
                    author: "Usman G.",
                  },
                  {
                    quote: "Nutritious, hot home-style meals served punctually every single evening. You genuinely feel cared for here.",
                    author: "Ayesha N.",
                  },
                  {
                    quote: "Zero generator noise, 100% solar redundancy, and pristine private washrooms with instant hot water.",
                    author: "Bilal K.",
                  },
                  {
                    quote: "Coming from Multan to Lahore for LUMS was daunting. Grand Pavilion made the transition completely effortless.",
                    author: "Shahmir Ali",
                  },
                ].map((t, idx) => (
                  <div
                    key={`r2-${idx}`}
                    className="w-[320px] sm:w-[390px] h-[230px] sm:h-[250px] p-7 sm:p-8 rounded-xl sm:rounded-2xl bg-[#EAE4DC] border border-[#0C0C0C]/5 flex flex-col justify-between items-center text-center shrink-0 select-none shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:border-[#0C0C0C]/15"
                  >
                    {/* 5 Stars at top center */}
                    <div className="flex items-center justify-center gap-1.5 text-[#0C0C0C]">
                      {[...Array(5)].map((_, sIdx) => (
                        <svg
                          key={sIdx}
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="font-sans text-[14px] sm:text-[15px] text-[#1F1F1F] font-light leading-[1.65] text-center max-w-xs sm:max-w-sm">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author in elegant serif */}
                    <div className="font-serif text-xl sm:text-2xl text-[#0C0C0C] font-normal tracking-wide text-center">
                      {t.author}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions */}
        <section id="faq" className="py-20 px-6 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs text-[#5D6C7B]">
              Residency details
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0C0C0C]">
              Common questions
            </h2>
          </div>

          <div className="divide-y divide-[#0C0C0C]/10 border-y border-[#0C0C0C]/10">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-serif text-lg font-normal text-[#0C0C0C] hover:text-emerald-800 transition-colors">
                      {faq.q}
                    </span>
                    <span className="text-xs text-gray-500 ml-4 shrink-0 font-mono">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-xs text-[#5D6C7B] leading-relaxed">
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

        {/* Reservation Form */}
        <section id="book" className="py-24 bg-[#0C0C0C] text-[#FBF8F1]">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs text-[#FBF8F1]/60">
                Semester 2026 admissions
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#FBF8F1]">
                Reserve a chamber
              </h2>
              <p className="text-xs text-[#FBF8F1]/70 max-w-md mx-auto">
                Submit an admission request. Challans are issued upon physical room inspection.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#141414] border border-emerald-500/30 p-8 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-xl text-[#FBF8F1]">
                  Reservation request received
                </h3>
                <p className="text-xs text-[#FBF8F1]/70 max-w-md mx-auto">
                  Thank you, <strong>{formState.fullName}</strong>. An official admission pass will be sent to <strong>{formState.phone}</strong>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-emerald-400 underline pt-2 cursor-pointer"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="bg-[#141414] border border-[#FBF8F1]/10 rounded-lg p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs text-[#FBF8F1]/70 font-medium">
                      Student full name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Raza"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-3 py-2 text-xs text-[#FBF8F1] rounded-md focus:outline-hidden focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs text-[#FBF8F1]/70 font-medium">
                      CNIC / B-Form number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="35202-XXXXXXX-X"
                      value={formState.cnic}
                      onChange={(e) => setFormState({ ...formState, cnic: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-3 py-2 text-xs text-[#FBF8F1] rounded-md focus:outline-hidden focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs text-[#FBF8F1]/70 font-medium">
                      Mobile / WhatsApp number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-3 py-2 text-xs text-[#FBF8F1] rounded-md focus:outline-hidden focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs text-[#FBF8F1]/70 font-medium">
                      University / Institute
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FAST-NUCES, LUMS"
                      value={formState.university}
                      onChange={(e) => setFormState({ ...formState, university: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-3 py-2 text-xs text-[#FBF8F1] rounded-md focus:outline-hidden focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs text-[#FBF8F1]/70 font-medium">
                      Chamber preference
                    </label>
                    <select
                      value={formState.chamberType}
                      onChange={(e) => setFormState({ ...formState, chamberType: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-3 py-2 text-xs text-[#FBF8F1] rounded-md focus:outline-hidden focus:border-emerald-500 transition-colors"
                    >
                      <option value="SINGLE">The Horizon (Single - Rs 40,000/mo)</option>
                      <option value="DOUBLE">The Terra (Twin - Rs 30,000/mo)</option>
                      <option value="TRIPLE">The Solara (Triple - Rs 15,000/mo)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs text-[#FBF8F1]/70 font-medium">
                      Planned move-in date
                    </label>
                    <input
                      type="date"
                      required
                      value={formState.moveInDate}
                      onChange={(e) => setFormState({ ...formState, moveInDate: e.target.value })}
                      className="w-full bg-[#0C0C0C] border border-[#FBF8F1]/15 px-3 py-2 text-xs text-[#FBF8F1] rounded-md focus:outline-hidden focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#0C0C0C] border border-[#FBF8F1]/15 rounded-md flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="statutory-consent-check"
                    checked={formState.consent}
                    onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                    className="mt-0.5 w-3.5 h-3.5 rounded-none accent-emerald-600 border-[#FBF8F1]/30 cursor-pointer"
                  />
                  <label htmlFor="statutory-consent-check" className="text-xs text-[#FBF8F1]/70 leading-relaxed cursor-pointer select-none">
                    I agree to share my CNIC and contact details for hostel admission and mandatory Punjab Police Form 15 verification under the Temporary Residents Act 2015.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FBF8F1] hover:bg-white text-[#0C0C0C] py-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
                >
                  Submit reservation request
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0C0C0C] text-[#FBF8F1] border-t border-[#FBF8F1]/15 py-12 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 border border-[#FBF8F1] flex items-center justify-center font-serif text-xs">
                    GP
                  </div>
                  <span className="font-serif text-sm">
                    Grand Pavilion
                  </span>
                </div>
                <p className="text-xs text-[#FBF8F1]/60 leading-relaxed font-light">
                  Serviced student residency in Gulberg III, Lahore, Pakistan.
                </p>
                <div className="text-[11px] text-[#FBF8F1]/40 font-mono space-y-0.5">
                  <div>License: #LHR-49102</div>
                  <div>NTN: 8291044-7 (FBR Registered)</div>
                  <div>Director: Major (R) Tariq Mehmood</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-[#FBF8F1]">
                  Sections
                </div>
                <ul className="space-y-1.5 text-xs text-[#FBF8F1]/60">
                  <li><a href="#about" className="hover:text-[#FBF8F1]">The sanctuary</a></li>
                  <li><a href="#residences" className="hover:text-[#FBF8F1]">Chambers &amp; rent</a></li>
                  <li><a href="#amenities" className="hover:text-[#FBF8F1]">Facilities</a></li>
                  <li><a href="#faq" className="hover:text-[#FBF8F1]">Questions</a></li>
                  <li><a href="#book" className="hover:text-[#FBF8F1]">Reservation</a></li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-[#FBF8F1]">
                  Portal
                </div>
                <ul className="space-y-1.5 text-xs text-[#FBF8F1]/60">
                  <li><Link href="/login" className="hover:text-[#FBF8F1] text-emerald-400">Login to portal →</Link></li>
                  <li><Link href="/dashboard" className="hover:text-[#FBF8F1]">Dashboard</Link></li>
                  <li><Link href="/dashboard/students" className="hover:text-[#FBF8F1]">Students</Link></li>
                  <li><Link href="/dashboard/fees" className="hover:text-[#FBF8F1]">Rent ledger</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-[#FBF8F1]">
                  Statutory policies
                </div>
                <ul className="space-y-1.5 text-xs text-[#FBF8F1]/60">
                  <li><Link href="/privacy" className="hover:text-[#FBF8F1] underline">Privacy charter</Link></li>
                  <li><Link href="/terms" className="hover:text-[#FBF8F1] underline">Residency bylaws</Link></li>
                  <li><Link href="/refund" className="hover:text-[#FBF8F1] underline">Security deposit refund</Link></li>
                  <li><Link href="/cookies" className="hover:text-[#FBF8F1] underline">Cookie disclosures</Link></li>
                  <li className="pt-1 text-emerald-400 flex items-center gap-1.5 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Police Form 15 compliant
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#FBF8F1]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FBF8F1]/40 gap-4">
              <div>
                &copy; {new Date().getFullYear()} The Grand Pavilion. All statutory rights reserved.
              </div>
              <div className="flex items-center gap-3">
                <span>PECA 2016 encrypted</span>
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
