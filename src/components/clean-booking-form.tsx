"use client";

import React, { useState } from "react";
import { RoomItem, BedItem } from "../lib/mock-data";
import { formatCurrency } from "../lib/utils";
import { CheckCircle2, Send, Loader2, Phone, Mail, ShieldCheck } from "lucide-react";
import hostelConfig from "../../hostel.config";

interface CleanBookingFormProps {
  initialRoom?: RoomItem | null;
  initialBed?: BedItem | null;
}

export function CleanBookingForm({ initialRoom, initialBed }: CleanBookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    cnic: "",
    phone: "",
    email: "",
    institution: "",
    moveInDate: "",
    roomPreference: initialRoom ? `${initialRoom.type} (Room ${initialRoom.roomNumber})` : "DOUBLE",
    notes: "",
    consentGiven: false,
    honeypot: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent reject bot

    setIsLoading(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setReferenceId(`GP-${Date.now().toString().slice(-6)}`);
    }, 600);
  };

  return (
    <div id="booking-form" className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center pb-8 border-b border-slate-100">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
            Online Reservation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Book Your Chamber at {hostelConfig.identity.name}
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
            Fill in your details below. Our admissions warden will review your request and confirm your allocation within 4 hours.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Reservation Request Received
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Reference ID: <span className="font-mono font-bold text-slate-900">{referenceId}</span>
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-sm text-slate-700 max-w-md mx-auto space-y-2">
              <p>
                <strong>Applicant:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Contact:</strong> {formData.phone}
              </p>
              <p>
                <strong>Institution:</strong> {formData.institution}
              </p>
              <p>
                <strong>Preferred Move-in:</strong> {formData.moveInDate || "Immediate"}
              </p>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                A confirmation SMS with challan download link has been dispatched to {formData.phone}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  fullName: "",
                  cnic: "",
                  phone: "",
                  email: "",
                  institution: "",
                  moveInDate: "",
                  roomPreference: "DOUBLE",
                  notes: "",
                  consentGiven: false,
                  honeypot: "",
                });
              }}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
            >
              Submit Another Reservation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Honeypot field */}
            <input
              type="text"
              name="website_dummy"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Row 1: Name and CNIC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Raza"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  CNIC / B-Form Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="35201-1234567-1"
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white font-mono"
                />
              </div>
            </div>

            {/* Row 2: Phone and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="student@university.edu.pk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Row 3: Institution and Room Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  University / College / Employer *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LUMS, FAST, FC College"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Room Category *
                </label>
                <select
                  value={formData.roomPreference}
                  onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white font-medium"
                >
                  <option value="SINGLE">Executive Single Suite (Private Ensuite) — Rs 45,000/mo</option>
                  <option value="DOUBLE">Premium Double Chamber (Twin Desks) — Rs 32,000/mo</option>
                  <option value="TRIPLE">Standard Triple Suite — Rs 26,000/mo</option>
                  <option value="DORMITORY">4-Bed Dormitory — Rs 22,000/mo</option>
                </select>
              </div>
            </div>

            {/* Row 4: Move-in Date and Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Planned Move-in Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Special Requests / Dietary
                </label>
                <input
                  type="text"
                  placeholder="Parking, meal timings, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Statutory Legal Consent Box (Legal Item 6) */}
            <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-lg">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentGiven}
                  onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span>
                  I agree to share my CNIC, mobile number, and tenancy details for hostel admission, emergency records, and mandatory Punjab Police Form 15 verification under the Temporary Residents Act 2015.
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Zero advance booking fee. Pay challan upon move-in confirmation.
              </span>

              <button
                type="submit"
                disabled={isLoading || !formData.consentGiven}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-7 py-3 rounded-lg shadow-xs transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Reservation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
