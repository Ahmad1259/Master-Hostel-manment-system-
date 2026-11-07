"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "../../../lib/store";
import { ComplaintItem } from "../../../lib/mock-data";
import { DestructiveConfirmModal } from "../../../components/ui/destructive-modal";
import {
  AlertCircle,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Wrench,
  Wifi,
  Zap,
  Utensils,
  Shield,
  Trash2,
  X,
  Check,
  Building,
} from "lucide-react";

export default function ComplaintsPage() {
  const { complaints, raiseComplaint, updateComplaintStatus, deleteComplaint, students, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Modals state
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState<ComplaintItem | null>(null);

  // New Complaint State
  const [newComplaint, setNewComplaint] = useState({
    studentId: students[0]?.id || "",
    studentName: students[0]?.name || "",
    roomNumber: students[0]?.roomNumber || "101",
    category: "Wi-Fi" as ComplaintItem["category"],
    title: "",
    description: "",
    priority: "MEDIUM" as ComplaintItem["priority"],
  });

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.studentName.toLowerCase().includes(q) ||
          c.roomNumber.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (statusFilter !== "ALL" && c.status !== statusFilter) {
        return false;
      }

      if (categoryFilter !== "ALL" && c.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [complaints, searchQuery, statusFilter, categoryFilter]);

  const openCount = complaints.filter((c) => c.status === "OPEN").length;
  const inProgressCount = complaints.filter((c) => c.status === "IN_PROGRESS").length;
  const resolvedCount = complaints.filter((c) => c.status === "RESOLVED").length;

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.title || !newComplaint.studentName) return;

    raiseComplaint(newComplaint);
    setShowRaiseModal(false);
    setNewComplaint({
      studentId: students[0]?.id || "",
      studentName: students[0]?.name || "",
      roomNumber: students[0]?.roomNumber || "101",
      category: "Wi-Fi",
      title: "",
      description: "",
      priority: "MEDIUM",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Electrical":
        return Zap;
      case "Plumbing":
        return Wrench;
      case "Wi-Fi":
        return Wifi;
      case "Mess / Food":
        return Utensils;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Hostel Helpdesk &amp; Facilities
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Maintenance Complaints &amp; Work Orders
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Log, track, and resolve facility issues raised by room residents.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowRaiseModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Complaint</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Open Tickets
          </span>
          <p className="text-3xl font-bold text-red-600 mt-1 tabular-nums">
            {openCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Pending duty warden assignment</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            In Progress
          </span>
          <p className="text-3xl font-bold text-amber-600 mt-1 tabular-nums">
            {inProgressCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Technician / vendor dispatched</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Resolved This Month
          </span>
          <p className="text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
            {resolvedCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Turnaround &lt; 24 hours</p>
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
            placeholder="Search complaint, room, resident..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open Only</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Wi-Fi">Wi-Fi / Internet</option>
            <option value="Mess / Food">Mess / Food</option>
            <option value="Housekeeping">Housekeeping</option>
          </select>
        </div>
      </div>

      {/* Complaints List with EMPTY STATE (UX Pattern #5) */}
      {filteredComplaints.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 shadow-xs">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <p className="text-base font-bold text-slate-900">No complaints found</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Everything in the hostel is running smoothly. Zero facility issues logged in this view.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredComplaints.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Room {item.roomNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.priority === "HIGH"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : item.priority === "MEDIUM"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-50 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span>Reported by: <strong className="text-slate-700">{item.studentName}</strong></span>
                      <span>•</span>
                      <span>{item.createdAt}</span>
                      {item.resolvedAt && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">
                            Resolved: {item.resolvedAt}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Switcher & Delete (Optimistic UI Pattern #1) */}
                <div className="flex items-center gap-2 sm:self-center shrink-0">
                  <select
                    value={item.status}
                    onChange={(e) => updateComplaintStatus(item.id, e.target.value as any)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                      item.status === "RESOLVED"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : item.status === "IN_PROGRESS"
                        ? "bg-amber-50 text-amber-800 border-amber-300"
                        : "bg-red-50 text-red-800 border-red-300"
                    }`}
                  >
                    <option value="OPEN">Open Ticket</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => setComplaintToDelete(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Ticket"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Raise Complaint Modal */}
      {showRaiseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Raise Maintenance Complaint
              </h3>
              <button
                onClick={() => setShowRaiseModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRaiseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reporting Resident / Reporter *
                </label>
                {students.length === 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Reporter / Resident name"
                      value={newComplaint.studentName}
                      onChange={(e) =>
                        setNewComplaint({
                          ...newComplaint,
                          studentName: e.target.value,
                          studentId: `walkin-${Date.now()}`,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Room # (e.g. 101)"
                      value={newComplaint.roomNumber}
                      onChange={(e) =>
                        setNewComplaint({
                          ...newComplaint,
                          roomNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                ) : (
                  <select
                    value={newComplaint.studentId}
                    onChange={(e) => {
                      const std = students.find((s) => s.id === e.target.value);
                      if (std) {
                        setNewComplaint({
                          ...newComplaint,
                          studentId: std.id,
                          studentName: std.name,
                          roomNumber: std.roomNumber,
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
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Issue Category *
                  </label>
                  <select
                    value={newComplaint.category}
                    onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Wi-Fi">Wi-Fi</option>
                    <option value="Mess / Food">Mess / Food</option>
                    <option value="Housekeeping">Housekeeping</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={newComplaint.priority}
                    onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High (Urgent)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Complaint Subject / Summary *
                </label>
                <input
                  type="text"
                  required
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                  placeholder="e.g. Geyser thermostat failure in ensuite bathroom"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  placeholder="Describe location, symptoms, when it started..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRaiseModal(false)}
                  className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Register Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Destructive Delete Complaint Modal (UX Pattern #19) */}
      <DestructiveConfirmModal
        isOpen={!!complaintToDelete}
        onClose={() => setComplaintToDelete(null)}
        onConfirm={() => {
          if (complaintToDelete) {
            deleteComplaint(complaintToDelete.id);
            setComplaintToDelete(null);
          }
        }}
        title="Delete Maintenance Ticket"
        description="Are you sure you want to delete this maintenance ticket from the register?"
        itemName={complaintToDelete ? `${complaintToDelete.title} (Room ${complaintToDelete.roomNumber})` : undefined}
        confirmButtonText="Delete Ticket"
      />
    </div>
  );
}
