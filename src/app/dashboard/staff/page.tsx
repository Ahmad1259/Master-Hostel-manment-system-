"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import { StaffItem } from "../../../lib/mock-data";
import hostelConfig from "../../../../hostel.config";
import { formatCurrency, formatDate } from "../../../lib/utils";
import {
  UserCheck,
  Search,
  Filter,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  X,
  CreditCard,
  Shield,
  Phone,
  Briefcase,
} from "lucide-react";

export default function StaffPage() {
  const {
    staff,
    updateStaffAttendance,
    disburseSalary,
    t,
  } = useApp();

  const [selectedStaffForSlip, setSelectedStaffForSlip] = useState<StaffItem | null>(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

  // Bonus/Deduction state for slip
  const [bonusAmount, setBonusAmount] = useState<number>(0);
  const [deductionAmount, setDeductionAmount] = useState<number>(0);

  const handlePrint = () => {
    window.print();
  };

  const handleDisburse = (staffId: string) => {
    disburseSalary(staffId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Module 04 • Personnel Directorate
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.staffTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.staffSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-border bg-canvas-surface px-3 py-1.5 text-caption font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-status-occupied" />
            <span>Biometric Duty Roster Active</span>
          </div>
        </div>
      </div>

      {/* Staff Roster & Daily Attendance Table */}
      <div className="border border-border bg-canvas-surface overflow-x-auto">
        <table className="w-full text-left text-body border-collapse">
          <thead>
            <tr className="border-b border-border bg-canvas-subtle text-[11px] font-mono text-ink-muted uppercase">
              <th className="p-3 font-semibold">Staff Identity</th>
              <th className="p-3 font-semibold">Assigned Role</th>
              <th className="p-3 font-semibold">Base Honorarium</th>
              <th className="p-3 font-semibold">Today&apos;s Duty Status</th>
              <th className="p-3 font-semibold">Shift Timings</th>
              <th className="p-3 font-semibold">Last Payroll</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map((stf) => (
              <tr key={stf.id} className="hover:bg-canvas-subtle/50 transition-colors">
                <td className="p-3">
                  <p className="font-serif text-subhead font-medium text-ink leading-tight">
                    {stf.name}
                  </p>
                  <p className="text-[11px] text-ink-muted font-mono flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-brass" />
                    <span>{stf.phone}</span>
                  </p>
                </td>

                <td className="p-3">
                  <span className="inline-block border border-border bg-canvas-subtle px-2 py-0.5 text-caption font-mono font-medium text-ink">
                    {stf.role}
                  </span>
                  <p className="text-[10px] text-ink-muted mt-0.5 font-mono">
                    Since {formatDate(stf.joiningDate)}
                  </p>
                </td>

                <td className="p-3 font-mono text-caption font-medium text-ink">
                  {formatCurrency(stf.monthlySalary)}/mo
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={stf.attendanceToday}
                      onChange={(e) =>
                        updateStaffAttendance(
                          stf.id,
                          e.target.value as "PRESENT" | "ABSENT" | "LEAVE"
                        )
                      }
                      className={`text-caption font-mono uppercase px-2 py-1 border text-[11px] ${
                        stf.attendanceToday === "PRESENT"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : stf.attendanceToday === "LEAVE"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-red-50 text-red-800 border-red-300"
                      }`}
                    >
                      <option value="PRESENT">On Duty (Present)</option>
                      <option value="LEAVE">Authorized Leave</option>
                      <option value="ABSENT">Unexcused Absence</option>
                    </select>
                  </div>
                </td>

                <td className="p-3 font-mono text-caption text-ink-muted">
                  <p>In: {stf.checkIn || "08:00 AM"}</p>
                  <p className="text-[11px]">Out: {stf.checkOut || "05:00 PM"}</p>
                </td>

                <td className="p-3 font-mono text-caption">
                  <span className="text-zinc-700 block">{stf.lastSalaryMonth}</span>
                  <span
                    className={`inline-block text-[10px] font-mono uppercase px-1.5 py-0.2 mt-0.5 ${
                      stf.lastSalaryStatus === "PAID"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {stf.lastSalaryStatus}
                  </span>
                </td>

                <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                  {/* Disburse Salary Button */}
                  <button
                    onClick={() => handleDisburse(stf.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono border border-border bg-ink text-canvas hover:bg-brass px-2.5 py-1 transition-colors"
                  >
                    <CreditCard className="w-3 h-3" />
                    <span>Disburse</span>
                  </button>

                  {/* Print Salary Slip */}
                  <button
                    onClick={() => {
                      setSelectedStaffForSlip(stf);
                      setShowSlipModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-mono border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-2.5 py-1 transition-colors"
                  >
                    <Printer className="w-3 h-3 text-brass" />
                    <span>Pay Slip</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Salary Slip Print Modal */}
      {showSlipModal && selectedStaffForSlip && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border print:hidden">
              <span className="font-serif text-subhead tracking-tight text-ink font-medium">
                Official Personnel Honorarium Voucher
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1 border border-border text-caption hover:bg-canvas-subtle"
                >
                  <Printer className="w-3.5 h-3.5 text-brass" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setShowSlipModal(false)}
                  className="p-1 border border-border text-ink-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Slip Body */}
            <div className="border border-zinc-300 p-6 bg-white space-y-4 print:border-none print:p-0">
              <div className="text-center border-b border-zinc-800 pb-3">
                <h2 className="font-serif font-bold text-lg text-zinc-900 uppercase">
                  {hostelConfig.identity.name}
                </h2>
                <p className="text-[10px] font-mono text-zinc-600">
                  {hostelConfig.identity.legalEntity} • Personnel Payroll Slip
                </p>
                <p className="text-caption font-mono font-medium text-brass mt-1">
                  Month of November 2026
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-b border-zinc-200 pb-3">
                <div>
                  <span className="text-zinc-500">Employee:</span>
                  <p className="font-bold text-zinc-900">{selectedStaffForSlip.name}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Assigned Function:</span>
                  <p className="font-bold text-zinc-900">{selectedStaffForSlip.role}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Phone Contact:</span>
                  <p>{selectedStaffForSlip.phone}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Voucher Ref:</span>
                  <p>PAY-{selectedStaffForSlip.id}-202611</p>
                </div>
              </div>

              {/* Adjustments in modal */}
              <div className="grid grid-cols-2 gap-3 print:hidden text-caption">
                <div>
                  <label className="block text-zinc-600 mb-1">Bonus/Overtime (Rs.):</label>
                  <input
                    type="number"
                    value={bonusAmount}
                    onChange={(e) => setBonusAmount(Number(e.target.value))}
                    className="w-full border border-zinc-300 px-2 py-1 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 mb-1">Statutory Deductions (Rs.):</label>
                  <input
                    type="number"
                    value={deductionAmount}
                    onChange={(e) => setDeductionAmount(Number(e.target.value))}
                    className="w-full border border-zinc-300 px-2 py-1 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-caption font-mono pt-2">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-600">Base Monthly Salary:</span>
                  <span className="font-bold text-zinc-900">
                    {formatCurrency(selectedStaffForSlip.monthlySalary)}
                  </span>
                </div>
                {bonusAmount > 0 && (
                  <div className="flex justify-between py-1 border-b border-zinc-100 text-emerald-700">
                    <span>Performance Incentive:</span>
                    <span>+{formatCurrency(bonusAmount)}</span>
                  </div>
                )}
                {deductionAmount > 0 && (
                  <div className="flex justify-between py-1 border-b border-zinc-100 text-red-700">
                    <span>Advance / Tax Deductions:</span>
                    <span>-{formatCurrency(deductionAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t-2 border-zinc-900 font-bold text-base text-zinc-900">
                  <span>Net Disbursed Honorarium:</span>
                  <span>
                    {formatCurrency(
                      selectedStaffForSlip.monthlySalary + bonusAmount - deductionAmount
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-8 flex justify-between text-[10px] text-zinc-500 font-mono">
                <div className="border-t border-zinc-400 pt-1 text-center w-28">
                  Staff Signature
                </div>
                <div className="border-t border-zinc-400 pt-1 text-center w-28">
                  Bursar Clearance
                </div>
              </div>
            </div>

            <div className="text-right print:hidden">
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
