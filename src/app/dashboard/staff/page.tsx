"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../../lib/store";
import { StaffItem } from "../../../lib/mock-data";
import { formatCurrency } from "../../../lib/utils";
import hostelConfig from "../../../../hostel.config";
import { MotionButton } from "../../../components/motion/motion-button";
import {
  pageEntranceVariants,
  staggerListVariants,
  staggerRowVariants,
  modalDialogVariants,
  EASE_IN_OUT,
} from "../../../lib/motion";
import {
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Briefcase,
  Phone,
  Printer,
  DollarSign,
  X,
  Plus,
  Shield,
  Utensils,
  Sparkles,
  Users,
} from "lucide-react";

export default function StaffPage() {
  const { staff, updateStaffAttendance, disburseSalary, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedStaffForSlip, setSelectedStaffForSlip] = useState<StaffItem | null>(null);

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          member.name.toLowerCase().includes(q) ||
          member.role.toLowerCase().includes(q) ||
          member.phone.includes(q);
        if (!matches) return false;
      }

      if (roleFilter !== "ALL" && member.role !== roleFilter) {
        return false;
      }

      return true;
    });
  }, [staff, searchQuery, roleFilter]);

  const totalPayroll = staff.reduce((acc, m) => acc + m.monthlySalary, 0);
  const presentCount = staff.filter((m) => m.attendanceToday === "PRESENT").length;

  const handleDisburse = (member: StaffItem) => {
    disburseSalary(member.id);
    showToast(`Salary disbursed for ${member.name} (${member.role}).`, "success");
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Cook":
        return Utensils;
      case "Warden":
        return Shield;
      default:
        return Briefcase;
    }
  };

  return (
    <motion.div
      variants={pageEntranceVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
            Personnel &amp; Human Resources
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Hostel Staff &amp; Payroll Roster
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Warden supervision, kitchen cooks, housekeeping team, and monthly salary disbursement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg px-3.5 py-2 shadow-xs">
            Total Monthly Payroll: <strong className="text-slate-900 font-mono tabular-nums">{formatCurrency(totalPayroll)}</strong>
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Total Staff Employed
          </span>
          <p className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">
            {staff.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Warden, Cooks, Housekeeping &amp; Security</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Attendance Today
          </span>
          <p className="text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
            {presentCount} / {staff.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">All critical duty posts staffed</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Payroll Status
          </span>
          <p className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Disbursements Active</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Direct bank vouchers ready</p>
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
            placeholder="Search staff name or phone..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Roles ({staff.length})</option>
            <option value="Warden">Chief &amp; Floor Wardens</option>
            <option value="Cook">Mess Kitchen Cooks</option>
            <option value="Cleaner">Cleaners &amp; Housekeeping</option>
            <option value="Guard">Security Guards</option>
            <option value="Accountant">Accountant</option>
          </select>
        </div>
      </div>

      {/* Staff Roster Grid */}
      <motion.div
        variants={staggerListVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filteredStaff.length === 0 ? (
          <div className="col-span-full bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 shadow-xs">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-900">No personnel registered</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Staff members (Warden, Cook, Cleaner, Security) will appear here for daily attendance tracking and salary disbursement.
            </p>
          </div>
        ) : (
          filteredStaff.map((member) => {
            const Icon = getRoleIcon(member.role);
            const isPaid = member.lastSalaryStatus === "PAID";
            const isPresent = member.attendanceToday === "PRESENT";

            return (
              <motion.div
                key={member.id}
                variants={staggerRowVariants}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                        <span className="text-[11px] font-semibold text-blue-600 block">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPresent
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {member.attendanceToday}
                    </span>
                  </div>

                  <div className="mt-4 p-3 bg-slate-50 rounded-lg space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact:</span>
                      <span className="font-mono text-slate-800 tabular-nums">{member.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Shift Timings:</span>
                      <span className="text-slate-800 font-medium">
                        {member.checkIn || "08:00 AM"} – {member.checkOut || "06:00 PM"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-1.5">
                      <span className="text-slate-500 font-semibold">Monthly Salary:</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {formatCurrency(member.monthlySalary)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Disburse Salary & Salary Slip */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <MotionButton
                    type="button"
                    onClick={() => setSelectedStaffForSlip(member)}
                    className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Salary Slip</span>
                  </MotionButton>

                  {isPaid ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Disbursed ({member.lastSalaryMonth})</span>
                    </span>
                  ) : (
                    <MotionButton
                      type="button"
                      onClick={() => handleDisburse(member)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-2xs transition-colors"
                    >
                      Disburse Salary
                    </MotionButton>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Salary Slip Modal */}
      <AnimatePresence>
        {selectedStaffForSlip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              variants={modalDialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Official Salary Voucher</h3>
                  <p className="text-xs text-slate-500">
                    {hostelConfig.identity.name} • Payroll Department
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStaffForSlip(null)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{selectedStaffForSlip.name}</p>
                  <p className="text-slate-500">
                    Designation: <strong>{selectedStaffForSlip.role}</strong>
                  </p>
                  <p className="text-slate-500 font-mono">Disbursement Month: November 2026</p>
                </div>

                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600">Base Salary:</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {formatCurrency(selectedStaffForSlip.monthlySalary)}
                    </span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600">Meal Allowance:</span>
                    <span className="text-emerald-700 font-medium">Included (Hostel Mess)</span>
                  </div>
                  <div className="p-2.5 flex justify-between bg-slate-50 font-bold">
                    <span className="text-slate-900">Net Payable:</span>
                    <span className="font-mono text-slate-900 tabular-nums">
                      {formatCurrency(selectedStaffForSlip.monthlySalary)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">Chief Warden Signature Required</span>
                <MotionButton
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </MotionButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
