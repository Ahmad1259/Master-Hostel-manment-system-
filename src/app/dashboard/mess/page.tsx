"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../../lib/store";
import { formatCurrency } from "../../../lib/utils";
import { StudentItem } from "../../../lib/mock-data";
import { MotionToggle } from "../../../components/motion/motion-toggle";
import { MotionButton } from "../../../components/motion/motion-button";
import {
  pageEntranceVariants,
  staggerListVariants,
  staggerRowVariants,
  EASE_IN_OUT,
} from "../../../lib/motion";
import {
  Utensils,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  ChefHat,
  Coffee,
  Sun,
  Moon,
  AlertCircle,
  Edit2,
  X,
  Check,
} from "lucide-react";

export default function MessPage() {
  const { students, toggleMessStatus, updateMessBill, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Edit mess bill modal
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);
  const [newBillAmount, setNewBillAmount] = useState<number>(8500);

  // Active mess count calculation
  const totalStudents = students.filter((s) => s.status === "ACTIVE").length;
  const messOnStudents = students.filter((s) => s.status === "ACTIVE" && s.messStatus !== "OFF").length;
  const messOffStudents = totalStudents - messOnStudents;

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => s.status === "ACTIVE")
      .filter((s) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matches =
            s.name.toLowerCase().includes(q) ||
            s.roomNumber.toLowerCase().includes(q) ||
            s.cnic.includes(q);
          if (!matches) return false;
        }

        const messStatus = s.messStatus || "ON";
        if (statusFilter !== "ALL" && messStatus !== statusFilter) {
          return false;
        }

        return true;
      });
  }, [students, searchQuery, statusFilter]);

  const handleOpenEditBill = (s: StudentItem) => {
    setEditingStudent(s);
    setNewBillAmount(s.messBill || 8500);
  };

  const handleSaveBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    updateMessBill(editingStudent.id, newBillAmount);
    setEditingStudent(null);
  };

  return (
    <motion.div
      variants={pageEntranceVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
            Catering &amp; Dining Hall
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Mess Management &amp; Meal Roster
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Real-time Mess On/Off toggles, daily meal counts, and monthly dining charges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-xs">
            Standard Plan: <strong className="text-slate-900 font-mono">Rs 8,500/mo</strong>
          </span>
        </div>
      </div>

      {/* Daily Kitchen Headcount Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Diners Today
            </span>
            <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Utensils className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2 tabular-nums">
            {messOnStudents}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {totalStudents > 0 ? Math.round((messOnStudents / totalStudents) * 100) : 0}% of hostel dining
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Breakfast Headcount
            </span>
            <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
              <Coffee className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2 tabular-nums">
            {messOnStudents}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Served 07:00 - 09:30 AM</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Dinner Headcount
            </span>
            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <Moon className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2 tabular-nums">
            {messOnStudents}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Served 07:30 - 10:00 PM</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Mess Off / Suspended
            </span>
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
              <XCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-600 mt-2 tabular-nums">
            {messOffStudents}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Leave or home visit</p>
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
            placeholder="Search resident or room number..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Mess Statuses</option>
            <option value="ON">Mess Active (ON)</option>
            <option value="OFF">Mess Suspended (OFF)</option>
          </select>
        </div>
      </div>

      {/* Roster Table with Optimistic Mess Toggle (UX Pattern #1) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="px-4 py-3">Resident</th>
                <th className="px-4 py-3">Chamber</th>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3 text-right">Monthly Mess Bill</th>
                <th className="px-4 py-3 text-center">Mess Status</th>
                <th className="px-4 py-3 text-center">Toggle State</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              variants={staggerListVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-slate-100"
            >
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center text-slate-500">
                    <p className="text-sm font-semibold text-slate-800">
                      {statusFilter === "OFF"
                        ? "All residents active on mess today"
                        : "No residents match criteria"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {statusFilter === "OFF"
                        ? "Zero off-mess requests logged for today's kitchen preparation."
                        : "Try clearing your search query."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isMessOn = student.messStatus !== "OFF";
                  return (
                    <motion.tr
                      key={student.id}
                      variants={staggerRowVariants}
                      layout
                      transition={{ layout: { ease: EASE_IN_OUT, duration: 0.22 } }}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {student.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        Room {student.roomNumber} ({student.bedLabel})
                      </td>
                      <td className="px-4 py-3 text-slate-600">{student.institution}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                        {formatCurrency(student.messBill || 8500)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isMessOn
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {isMessOn ? "MESS ON" : "MESS OFF"}
                        </span>
                      </td>
                      {/* Rule 5: Motion Toggle with 12% moving knob stretch */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <MotionToggle
                            checked={isMessOn}
                            onChange={() => toggleMessStatus(student.id)}
                            activeLabel="ON"
                            inactiveLabel="OFF"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenEditBill(student)}
                          className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                          title="Adjust Mess Bill"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Adjust Mess Bill Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Adjust Mess Charges for {editingStudent.name}
              </h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBill} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Monthly Mess Charges (PKR)
                </label>
                <input
                  type="number"
                  required
                  value={newBillAmount}
                  onChange={(e) => setNewBillAmount(Number(e.target.value))}
                  className="w-full font-mono text-sm px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
                Applied on the next month billing invoice cycle.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Save Charges
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
