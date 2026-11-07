"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "../../../lib/store";
import { VisitorItem } from "../../../lib/mock-data";
import {
  FileText,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  X,
  Phone,
  Shield,
  UserCheck,
  AlertCircle,
  Check,
} from "lucide-react";

export default function VisitorsPage() {
  const { visitors, registerVisitor, checkoutVisitor, students, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // New Visitor Form State with Smart Validation (UX Pattern #9)
  const [newVisitor, setNewVisitor] = useState({
    visitorName: "",
    cnic: "",
    phone: "",
    studentId: students[0]?.id || "",
    studentName: students[0]?.name || "",
    charges: 0,
    propertyId: "prop-gulberg",
    checkIn: new Date().toISOString().replace("T", " ").slice(0, 16),
  });

  const isCnicValid = /^\d{5}-\d{7}-\d{1}$/.test(newVisitor.cnic);
  const isPhoneValid = /^(03\d{2}-\d{7}|03\d{9}|\+92\d{10})$/.test(newVisitor.phone);

  const filteredVisitors = useMemo(() => {
    return visitors.filter((v) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          v.visitorName.toLowerCase().includes(q) ||
          v.cnic.includes(q) ||
          (v.studentName && v.studentName.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (statusFilter !== "ALL" && v.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [visitors, searchQuery, statusFilter]);

  const activeVisitorsCount = visitors.filter((v) => v.status === "CHECKED_IN").length;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitor.visitorName || !isCnicValid || !isPhoneValid) {
      showToast("Please verify CNIC and mobile number formats.", "warning");
      return;
    }

    registerVisitor(newVisitor);
    setShowRegisterModal(false);
    showToast(`Visitor ${newVisitor.visitorName} logged at reception gate.`, "success");
    setNewVisitor({
      visitorName: "",
      cnic: "",
      phone: "",
      studentId: students[0]?.id || "",
      studentName: students[0]?.name || "",
      charges: 0,
      propertyId: "prop-gulberg",
      checkIn: new Date().toISOString().replace("T", " ").slice(0, 16),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Perimeter Security &amp; Access Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Gate Visitors &amp; Guest Registry
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Biometric gate turnstile log, national identity cards, and checkout timestamps.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowRegisterModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Guest / Visitor</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Currently Inside Hostel
          </span>
          <p className="text-3xl font-bold text-blue-600 mt-1 tabular-nums">
            {activeVisitorsCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Checked in at main reception</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Visiting Hours
          </span>
          <p className="text-lg font-bold text-slate-900 mt-1">
            04:00 PM – 09:30 PM
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Strict security gate curfew</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Security Compliance
          </span>
          <p className="text-lg font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>100% CNIC Verified</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Gulberg police station compliant</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search visitor name, CNIC, or resident..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Log Statuses</option>
            <option value="CHECKED_IN">Currently Inside (Checked In)</option>
            <option value="CHECKED_OUT">Departed (Checked Out)</option>
          </select>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="px-4 py-3">Visitor Name</th>
                <th className="px-4 py-3">CNIC</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Hostel Resident Visited</th>
                <th className="px-4 py-3">Time In</th>
                <th className="px-4 py-3">Time Out</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 px-4 text-center text-slate-500">
                    <p className="text-sm font-semibold text-slate-800">
                      {statusFilter === "CHECKED_IN"
                        ? "No active visitors on premises"
                        : "No visitor logs found"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {statusFilter === "CHECKED_IN"
                        ? "All logged visitors have safely checked out through the turnstile."
                        : "Try adjusting your search criteria."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((v) => {
                  const isInside = v.status === "CHECKED_IN";
                  return (
                    <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {v.visitorName}
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums text-slate-700">
                        {v.cnic}
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums text-slate-600">
                        {v.phone}
                      </td>
                      <td className="px-4 py-3 text-slate-800 font-medium">
                        {v.studentName || "General Inquiry"}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 tabular-nums">
                        {v.checkIn}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 tabular-nums">
                        {v.checkOut || "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isInside
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {isInside ? "Inside" : "Departed"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isInside ? (
                          <button
                            type="button"
                            onClick={() => {
                              checkoutVisitor(v.id);
                              showToast(`Visitor ${v.visitorName} checked out.`, "info");
                            }}
                            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold transition-colors shadow-2xs"
                          >
                            Check Out
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">Cleared</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Visitor Modal with Smart Validation (UX Pattern #9) */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Register Reception Visitor
              </h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Visitor Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newVisitor.visitorName}
                  onChange={(e) => setNewVisitor({ ...newVisitor, visitorName: e.target.value })}
                  placeholder="e.g. Faizan Jameel"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* CNIC Validation (UX Pattern #9) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Pakistani CNIC (13 Digits) *</label>
                  {newVisitor.cnic && (
                    <span
                      className={`text-[10px] font-semibold flex items-center gap-1 ${
                        isCnicValid ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isCnicValid ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {isCnicValid ? "Valid format" : "XXXXX-XXXXXXX-X"}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  value={newVisitor.cnic}
                  onChange={(e) => setNewVisitor({ ...newVisitor, cnic: e.target.value })}
                  placeholder="35102-8491029-7"
                  className={`w-full font-mono px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    newVisitor.cnic && !isCnicValid
                      ? "border-red-300 focus:ring-red-500"
                      : "border-slate-300 focus:ring-blue-600"
                  }`}
                />
              </div>

              {/* Phone Validation (UX Pattern #9) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Mobile Number *</label>
                  {newVisitor.phone && (
                    <span
                      className={`text-[10px] font-semibold ${
                        isPhoneValid ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isPhoneValid ? "Valid" : "03XX-XXXXXXX"}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  value={newVisitor.phone}
                  onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                  placeholder="0300-4810294"
                  className="w-full font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Resident to Visit *
                </label>
                <select
                  value={newVisitor.studentId}
                  onChange={(e) => {
                    const std = students.find((s) => s.id === e.target.value);
                    if (std) {
                      setNewVisitor({
                        ...newVisitor,
                        studentId: std.id,
                        studentName: `${std.name} (Room ${std.roomNumber})`,
                      });
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Room {s.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isCnicValid || !isPhoneValid}
                  className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs"
                >
                  Register Guest &amp; Open Gate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
