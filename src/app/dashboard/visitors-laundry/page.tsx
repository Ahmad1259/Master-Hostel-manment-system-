"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import { formatCurrency, formatDate, formatCnic } from "../../../lib/utils";
import {
  Shirt,
  Users,
  Clock,
  Plus,
  CheckCircle2,
  X,
  Printer,
  ShieldCheck,
  Phone,
  FileText,
  Building,
  KeyRound,
} from "lucide-react";

export default function VisitorsLaundryPage() {
  const {
    visitors,
    laundryRecords,
    students,
    registerVisitor,
    checkoutVisitor,
    addLaundryDrop,
    updateLaundryStatus,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"visitors" | "laundry">("visitors");
  const [showAddVisitorModal, setShowAddVisitorModal] = useState(false);
  const [showAddLaundryModal, setShowAddLaundryModal] = useState(false);
  const [gatePassVisitor, setGatePassVisitor] = useState<any | null>(null);

  // New Visitor Form State
  const [visitorName, setVisitorName] = useState("");
  const [visitorCnic, setVisitorCnic] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [hostStudentId, setHostStudentId] = useState(students[0]?.id || "");
  const [charges, setCharges] = useState(1500);

  // New Laundry Drop State
  const [laundryStudentId, setLaundryStudentId] = useState(students[0]?.id || "");
  const [piecesCount, setPiecesCount] = useState(8);
  const [laundryNotes, setLaundryNotes] = useState("");

  const handleRegisterVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorCnic) return;
    const std = students.find((s) => s.id === hostStudentId);
    registerVisitor({
      propertyId: "prop-gulberg",
      visitorName,
      cnic: visitorCnic,
      phone: visitorPhone,
      studentId: hostStudentId,
      studentName: std?.name || "Resident",
      checkIn: new Date().toISOString().replace("T", " ").slice(0, 16),
      charges,
    });
    setShowAddVisitorModal(false);
    setVisitorName("");
    setVisitorCnic("");
    setVisitorPhone("");
  };

  const handleCreateLaundryDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!laundryStudentId || piecesCount <= 0) return;
    addLaundryDrop(laundryStudentId, piecesCount, laundryNotes);
    setShowAddLaundryModal(false);
    setPiecesCount(8);
    setLaundryNotes("");
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Module 07 • Transient Ingress &amp; Textile Operations
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.visitorsTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.visitorsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "visitors" ? (
            <button
              onClick={() => setShowAddVisitorModal(true)}
              className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Register Short-Stay Guest</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddLaundryModal(true)}
              className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              <Shirt className="w-3.5 h-3.5" />
              <span>Log Garment Laundry Drop</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("visitors")}
          className={`py-3 px-6 text-caption font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "visitors"
              ? "border-brass text-brass font-serif text-subhead"
              : "border-transparent text-ink-muted hover:text-ink"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Short-Stay Guests &amp; Gate Passes ({visitors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("laundry")}
          className={`py-3 px-6 text-caption font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "laundry"
              ? "border-brass text-brass font-serif text-subhead"
              : "border-transparent text-ink-muted hover:text-ink"
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>Resident Laundry Quotas &amp; Cycles ({laundryRecords.length})</span>
        </button>
      </div>

      {activeTab === "visitors" ? (
        /* Visitors Ledger View */
        <div className="space-y-6">
          <div className="border border-border bg-canvas-surface overflow-x-auto">
            <table className="w-full text-left text-body border-collapse">
              <thead>
                <tr className="border-b border-border bg-canvas-subtle text-micro font-mono text-ink-muted uppercase">
                  <th className="p-3 font-semibold">Guest Full Name</th>
                  <th className="p-3 font-semibold">National Identity (CNIC)</th>
                  <th className="p-3 font-semibold">Host Resident</th>
                  <th className="p-3 font-semibold">Arrival Clearance</th>
                  <th className="p-3 font-semibold">Departure</th>
                  <th className="p-3 font-semibold">Tariff</th>
                  <th className="p-3 font-semibold text-right">Gate Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-canvas-subtle/50 transition-colors">
                    <td className="p-3">
                      <p className="font-serif text-subhead font-medium text-ink leading-tight">
                        {v.visitorName}
                      </p>
                      <p className="text-micro text-ink-muted font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-brass" />
                        <span>{v.phone || "—"}</span>
                      </p>
                    </td>

                    <td className="p-3 font-mono text-caption text-ink">
                      {formatCnic(v.cnic)}
                    </td>

                    <td className="p-3 text-caption">
                      <span className="font-medium text-ink">{v.studentName}</span>
                    </td>

                    <td className="p-3 font-mono text-caption text-ink-muted">
                      {v.checkIn}
                    </td>

                    <td className="p-3 font-mono text-caption text-ink-muted">
                      {v.checkOut || "Active In-Residency"}
                    </td>

                    <td className="p-3 font-mono text-caption text-brass font-medium">
                      {formatCurrency(v.charges)}
                    </td>

                    <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                      {v.status === "CHECKED_IN" && (
                        <button
                          onClick={() => checkoutVisitor(v.id)}
                          className="inline-flex items-center gap-1 text-micro font-mono border border-border bg-ink text-canvas hover:bg-brass px-2.5 py-1 transition-colors"
                        >
                          <Clock className="w-3 h-3" />
                          <span>Check Out</span>
                        </button>
                      )}

                      <button
                        onClick={() => setGatePassVisitor(v)}
                        className="inline-flex items-center gap-1 text-micro font-mono border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-2.5 py-1 transition-colors"
                      >
                        <KeyRound className="w-3 h-3 text-brass" />
                        <span>Gate Pass</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Laundry Quotas & Drops View */
        <div className="space-y-6">
          <div className="border border-border bg-canvas-surface overflow-x-auto">
            <table className="w-full text-left text-body border-collapse">
              <thead>
                <tr className="border-b border-border bg-canvas-subtle text-micro font-mono text-ink-muted uppercase">
                  <th className="p-3 font-semibold">Resident Particulars</th>
                  <th className="p-3 font-semibold">Pieces Submitted</th>
                  <th className="p-3 font-semibold">Deposit Date</th>
                  <th className="p-3 font-semibold">Notes / Garment Types</th>
                  <th className="p-3 font-semibold">Cycle Status</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {laundryRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-canvas-subtle/50 transition-colors">
                    <td className="p-3">
                      <p className="font-serif text-subhead font-medium text-ink leading-tight">
                        {r.studentName}
                      </p>
                      <p className="text-micro text-ink-muted font-mono">
                        Suite #{r.roomNumber}
                      </p>
                    </td>

                    <td className="p-3 font-mono text-caption font-bold text-ink">
                      {r.piecesSubmitted} Pieces
                    </td>

                    <td className="p-3 font-mono text-caption text-ink-muted">
                      {formatDate(r.submittedDate)}
                    </td>

                    <td className="p-3 text-caption text-ink-muted max-w-xs truncate">
                      {r.notes || "Standard Cycle"}
                    </td>

                    <td className="p-3">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          updateLaundryStatus(r.id, e.target.value as any)
                        }
                        className={`text-caption font-mono uppercase px-2 py-0.5 border text-micro ${
                          r.status === "RETURNED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : r.status === "READY"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : "bg-amber-50 text-amber-800 border-amber-300"
                        }`}
                      >
                        <option value="IN_PROCESS">In Treatment</option>
                        <option value="READY">Ready at Desk</option>
                        <option value="RETURNED">Returned &amp; Inspected</option>
                      </select>
                    </td>

                    <td className="p-3 text-right font-mono text-micro text-ink-muted">
                      {r.returnedDate ? formatDate(r.returnedDate) : "In Process"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Register Short-Stay Guest Modal */}
      {showAddVisitorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Register Short-Stay Guest Dossier
              </h3>
              <button
                onClick={() => setShowAddVisitorModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterVisitor} className="space-y-4">
              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Guest Legal Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faizan Jameel"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    CNIC Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="35102-8491029-7"
                    value={visitorCnic}
                    onChange={(e) => setVisitorCnic(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Cell Phone Contact
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Host Resident *
                </label>
                <select
                  value={hostStudentId}
                  onChange={(e) => setHostStudentId(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Chamber #{s.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Transient Tariff / Per-Night Surcharge (Rs.) *
                </label>
                <input
                  type="number"
                  required
                  value={charges}
                  onChange={(e) => setCharges(Number(e.target.value))}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddVisitorModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  {t.btnIssueGatePass}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Laundry Drop Modal */}
      {showAddLaundryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Log Resident Textile Laundry Drop
              </h3>
              <button
                onClick={() => setShowAddLaundryModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLaundryDrop} className="space-y-4">
              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Resident *
                </label>
                <select
                  value={laundryStudentId}
                  onChange={(e) => setLaundryStudentId(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Chamber #{s.roomNumber}) — Used: {s.laundryUsed}/{s.laundryQuota} pieces
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Pieces Submitted *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={30}
                  value={piecesCount}
                  onChange={(e) => setPiecesCount(Number(e.target.value))}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                />
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Garment Descriptions / Steam Press Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 Shirts, 2 Trousers, 1 Kurta (Steam press required)"
                  value={laundryNotes}
                  onChange={(e) => setLaundryNotes(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddLaundryModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Confirm Laundry Ingestion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gate Pass Print Slip Modal */}
      {gatePassVisitor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-sm p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border print:hidden">
              <span className="font-serif text-subhead tracking-tight text-ink font-medium">
                Official Ingress Clearance Gate Pass
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintPass}
                  className="p-1.5 border border-border hover:bg-canvas-subtle"
                >
                  <Printer className="w-3.5 h-3.5 text-brass" />
                </button>
                <button
                  onClick={() => setGatePassVisitor(null)}
                  className="p-1 border border-border text-ink-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="border border-zinc-800 p-4 bg-white text-center space-y-3 font-mono text-micro print:border-none print:p-0">
              <p className="font-serif font-bold text-base text-zinc-900 uppercase">
                OFFICIAL RESIDENT GATE PASS
              </p>
              <p className="text-micro text-zinc-600">Grand Pavilion Security Directorate</p>

              <div className="border-t border-b border-zinc-300 py-2 text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Pass No:</span>
                  <span className="font-bold text-zinc-900">{gatePassVisitor.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Guest:</span>
                  <span className="font-bold text-zinc-900">{gatePassVisitor.visitorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">CNIC:</span>
                  <span>{formatCnic(gatePassVisitor.cnic)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Resident Host:</span>
                  <span>{gatePassVisitor.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Clearance:</span>
                  <span>{gatePassVisitor.checkIn}</span>
                </div>
              </div>

              <p className="text-micro text-zinc-500">
                Authorized for entry. Must be surrendered to guard desk at egress before 20:00.
              </p>

              <div className="pt-4 border-t border-zinc-300 flex justify-between text-micro text-zinc-400">
                <span>Guard Stamp</span>
                <span>Warden Initials</span>
              </div>
            </div>

            <div className="text-right print:hidden">
              <button
                onClick={() => setGatePassVisitor(null)}
                className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
