"use client";

import React, { useState } from "react";
import Link from "next/link";
import hostelConfig from "../../hostel.config";
import { useApp } from "../lib/store";
import { LiveRoomExplorer } from "../components/live-room-explorer";
import { CleanBookingForm } from "../components/clean-booking-form";
import { LanguageSwitcher } from "../components/language-switcher";
import {
  Building2,
  Users,
  Shield,
  Zap,
  Utensils,
  Wind,
  Wifi,
  Phone,
  Mail,
  MapPin,
  Clock,
  LayoutDashboard,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { RoomItem, BedItem } from "../lib/mock-data";

export default function ShowcasePage() {
  const { language, floors } = useApp();
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomItem | null>(null);
  const [selectedBedForBooking, setSelectedBedForBooking] = useState<BedItem | null>(null);

  const totalChambers = floors.reduce((acc, f) => acc + f.rooms.length, 0);
  const totalCapacity = floors.reduce((acc, f) => acc + f.rooms.reduce((bAcc, r) => bAcc + r.beds.length, 0), 0);

  const handleSelectBed = (room: RoomItem, bed: BedItem) => {
    setSelectedRoomForBooking(room);
    setSelectedBedForBooking(bed);
    const formEl = document.getElementById("booking-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Navigation Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {hostelConfig.identity.monogram}
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block leading-tight">
                {hostelConfig.identity.name}
              </span>
              <span className="text-xs text-slate-500 block">
                {hostelConfig.geo.neighborhood}, {hostelConfig.geo.city}
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#rooms" className="hover:text-emerald-700 transition-colors">
              Chambers &amp; Availability
            </a>
            <a href="#facilities" className="hover:text-emerald-700 transition-colors">
              Facilities
            </a>
            <a href="#transit" className="hover:text-emerald-700 transition-colors">
              Nearby Universities
            </a>
            <a href="#booking-form" className="hover:text-emerald-700 transition-colors">
              Book a Bed
            </a>
          </nav>

          {/* Action Header Items */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>ERP Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            <span>Admissions Open for Semester 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Student accommodation and resident management, simplified.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fully serviced private and shared chambers in Gulberg III, Lahore. 100% solar and generator power redundancy, three home-cooked meals daily, and high-speed fiber internet.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#rooms"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-xs transition-colors"
            >
              <span>Explore Available Beds</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-sm px-6 py-3 rounded-lg shadow-xs transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>Hostel Management Console</span>
            </Link>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Total Chambers</span>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {totalChambers > 0 ? totalChambers : "Open"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {totalChambers > 0 ? "Single, Double & Triple" : "Ready for Allocation"}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Student Capacity</span>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {totalCapacity > 0 ? `${totalCapacity} Beds` : "Active"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Gulberg Main Campus</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Power Backup</span>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">100%</p>
            <p className="text-xs text-slate-500 mt-0.5">65 kVA Perkins + Solar</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Food Service</span>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">3 Meals</p>
            <p className="text-xs text-slate-500 mt-0.5">PFA Hygiene Certified</p>
          </div>
        </div>
      </section>

      {/* ENLARGED MAIN FEATURE: Live Interactive Room & Bed Explorer */}
      <section id="rooms" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <LiveRoomExplorer onSelectBedForBooking={handleSelectBed} />
      </section>

      {/* Section 2: Core Facilities */}
      <section id="facilities" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Built for Academic Focus and Daily Comfort
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every room includes verified commercial utilities, safety infrastructure, and dedicated amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Uninterrupted Power (100% Backup)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automatic changeover system powered by a 65 kVA Perkins commercial diesel generator and on-grid solar array. Zero downtime for AC, lighting, and Wi-Fi.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3 Balanced Meals Daily</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Freshly prepared rotational menu covering breakfast, lunch, and dinner. Food safety standards verified under Punjab Food Authority (PFA) compliance.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Individual Climate Control</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every chamber features dedicated Daikin inverter AC/heat units and double-glazed acoustic windows for soundproof, whisper-quiet study sessions.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Biometric Security &amp; 24/7 CCTV</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fingerprint biometric gate turnstiles, 32 IP security cameras covering all common corridors, and certified perimeter guards stationed 24 hours.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Dual 500 Mbps Optical Fiber</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Redundant fiber backbones from Nayatel and StormFiber with automatic failover and mesh access points on every floor for lag-free video calls and coursework.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Laundry &amp; Housekeeping</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Commercial laundry with 30 pieces monthly quota included. Regular room cleaning and daily sanitation of attached bathrooms.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Transit Benchmarks */}
      <section id="transit" className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Proximity to Leading Campuses
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Centrally situated at Plot 42-B, Sector C, Commercial Enclave, Gulberg III, Lahore.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hostelConfig.geo.nearbyInstitutions.slice(0, 4).map((inst, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <span className="text-xs font-bold text-blue-600 tabular-nums">
                  {inst.transitTimeMinutes} Mins Transit
                </span>
                <p className="text-sm font-bold text-slate-900 mt-1 truncate" title={inst.name}>
                  {inst.name.split(" (")[0]}
                </p>
                <p className="text-xs text-slate-500 tabular-nums mt-0.5">{inst.distanceKm} km commute</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Admissions & Reservation Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <CleanBookingForm
          initialRoom={selectedRoomForBooking}
          initialBed={selectedBedForBooking}
        />
      </section>

      {/* Footer (Legal Item 17: Real business details, Legal Item 1: Privacy, 2: Terms, 3: Refund, 4: Cookies) */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-12 text-gray-600 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {hostelConfig.identity.monogram}
              </div>
              <span className="font-bold text-gray-900">
                {hostelConfig.identity.name}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Serviced student residency and educational accommodation in Gulberg III, Lahore.
            </p>
            <div className="text-xs text-gray-500 space-y-0.5 pt-1">
              <p><strong>License:</strong> Punjab Directorate of Hostels #LHR-49102</p>
              <p><strong>NTN:</strong> 8291044-7 (FBR Registered)</p>
              <p><strong>Chief Warden:</strong> Major (R) Tariq Mehmood</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              Accommodation &amp; Services
            </h4>
            <ul className="text-xs space-y-2">
              <li><a href="#rooms" className="hover:text-emerald-700">Room &amp; Bed Availability</a></li>
              <li><a href="#facilities" className="hover:text-emerald-700">Power Backup &amp; Facilities</a></li>
              <li><a href="#transit" className="hover:text-emerald-700">Nearby Universities (LUMS, FAST)</a></li>
              <li><a href="#booking-form" className="hover:text-emerald-700">Online Reservation Form</a></li>
              <li><Link href="/dashboard" className="text-emerald-700 font-semibold hover:underline">Staff ERP Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              Campus Location &amp; Contact
            </h4>
            <ul className="text-xs space-y-2 text-gray-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <span>Plot 42-B, Sector C, Commercial Enclave, Gulberg III, Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>+92 42 3578 9201 / +92 300 8472911</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>admissions@grandpavilion.pk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              Pakistan Statutory Compliance
            </h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/privacy" className="hover:text-emerald-700">Privacy &amp; CNIC Protection</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-700">Tenancy Charter &amp; Curfew Rules</Link></li>
              <li><Link href="/refund" className="hover:text-emerald-700">Security Deposit Refund Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-700">Cookie &amp; Tracking Transparency</Link></li>
              <li className="pt-1 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Punjab Police Form 15 Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} The Grand Pavilion Residency. Governed by Pakistan Law.</p>
          <p className="mt-2 sm:mt-0 font-medium">Verified Academic Residency ERP</p>
        </div>
      </footer>
    </div>
  );
}
