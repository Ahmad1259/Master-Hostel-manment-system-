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
} from "lucide-react";
import { RoomItem, BedItem } from "../lib/mock-data";

export default function ShowcasePage() {
  const { language } = useApp();
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomItem | null>(null);
  const [selectedBedForBooking, setSelectedBedForBooking] = useState<BedItem | null>(null);

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
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
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
            <a href="#rooms" className="hover:text-blue-600 transition-colors">
              Chambers &amp; Availability
            </a>
            <a href="#facilities" className="hover:text-blue-600 transition-colors">
              Facilities
            </a>
            <a href="#transit" className="hover:text-blue-600 transition-colors">
              Nearby Universities
            </a>
            <a href="#booking-form" className="hover:text-blue-600 transition-colors">
              Book a Bed
            </a>
          </nav>

          {/* Action Header Items */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
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
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-xs transition-colors"
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
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">24</p>
            <p className="text-xs text-slate-500 mt-0.5">Single, Double &amp; Triple</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Student Capacity</span>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">58 Beds</p>
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

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-12 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {hostelConfig.identity.monogram}
              </div>
              <span className="font-bold text-slate-900">
                {hostelConfig.identity.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Commercial student accommodations and multi-property management system.
            </p>
            <p className="text-xs text-slate-400 font-mono">
              NTN: 8291044-7 • License #LHR-49102
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Direct Links
            </h4>
            <ul className="text-xs space-y-2">
              <li><a href="#rooms" className="hover:text-blue-600">Room Availability</a></li>
              <li><a href="#facilities" className="hover:text-blue-600">Facilities &amp; Mess</a></li>
              <li><a href="#booking-form" className="hover:text-blue-600">Apply for Admission</a></li>
              <li><Link href="/dashboard" className="hover:text-blue-600">ERP Administrative Console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Chief Warden Office
            </h4>
            <ul className="text-xs space-y-2 text-slate-500">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{hostelConfig.geo.address}, {hostelConfig.geo.city}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{hostelConfig.identity.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{hostelConfig.identity.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Compliance &amp; Legal
            </h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Safeguards</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Resident Tenancy Terms</Link></li>
              <li><span className="text-xs text-slate-400">PWA Offline Capable</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {hostelConfig.identity.name}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-medium">Bespoke Commercial ERP v2.0</p>
        </div>
      </footer>
    </div>
  );
}
