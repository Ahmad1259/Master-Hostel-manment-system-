"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  modalOverlayVariants,
  settleContainerVariants,
  settleItemVariants,
  EASE_OUT_EXPO,
  EASE_IN_OUT,
} from "../../lib/motion";
import { StudentItem } from "../../lib/mock-data";
import { MotionButton } from "./motion-button";
import { formatCurrency } from "../../lib/utils";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  DoorOpen,
  Calendar,
  CreditCard,
  Utensils,
  ShieldCheck,
  X,
  FileText,
} from "lucide-react";

interface StudentDetailDrawerProps {
  student: StudentItem | null;
  onClose: () => void;
  onSendRentReminder?: (student: StudentItem) => void;
  onMarkPaid?: (student: StudentItem) => void;
}

/**
 * Rule 20: Reuse the same layoutId - use same layoutId across shared objects (`layoutId={`student-card-${student.id}`}`)
 * Rule 6: Stagger as details settle - when opening student details, stagger inner items
 * Rule 11: Enter from the trigger & Rule 12: Exit to the trigger
 * Rule 15: Make exits 20% shorter (opening 260ms -> exit 208ms)
 */
export function StudentDetailDrawer({
  student,
  onClose,
  onSendRentReminder,
  onMarkPaid,
}: StudentDetailDrawerProps) {
  if (!student) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end">
        {/* Backdrop */}
        <motion.div
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* Shared Layout Drawer container with Rule 20: shared layoutId */}
        <motion.div
          layoutId={`student-card-${student.id}`} // Rule 20: shared layoutId
          transition={{
            duration: 0.26,
            ease: EASE_OUT_EXPO, // Rule 1
          }}
          className="relative z-10 w-full max-w-md h-full bg-white border-l border-slate-200 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
        >
          {/* Inner Content with Rule 6: Stagger as details settle */}
          <motion.div
            variants={settleContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Header Item */}
            <motion.div
              variants={settleItemVariants}
              className="flex items-start justify-between border-b border-slate-100 pb-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {student.name}
                  </h3>
                  <span className="text-xs text-slate-500 block">
                    S/O {student.fatherName || "Guardian"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Room & Bed Allocation Badge */}
            <motion.div
              variants={settleItemVariants}
              className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                  Chamber Allocation
                </span>
                <span className="text-base font-bold text-blue-950">
                  Room {student.roomNumber} • {student.bedLabel}
                </span>
                <span className="text-xs text-blue-600 block">
                  Floor {student.floorNumber}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Monthly Rent
                </span>
                <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                  {formatCurrency(student.monthlyRate)}
                </span>
              </div>
            </motion.div>

            {/* Resident Bio Details (Staggered settling) */}
            <motion.div variants={settleItemVariants} className="space-y-3 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Identification &amp; Contact
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">National CNIC</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {student.cnic}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Resident Mobile</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {student.phone}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Guardian Phone</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {student.guardianPhone}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Institution</span>
                  <span className="font-semibold text-slate-900 truncate block">
                    {student.institution}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tenancy & Arrears */}
            <motion.div variants={settleItemVariants} className="space-y-3 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Tenancy &amp; Dues Status
              </span>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Admission Date:</span>
                  <span className="font-mono font-medium text-slate-900">
                    {student.admissionDate}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Mess Dining:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      student.messStatus !== "OFF"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {student.messStatus !== "OFF" ? "MESS ACTIVE" : "MESS OFF"}
                  </span>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                  <span className="text-slate-600 font-semibold">Pending Arrears:</span>
                  <span
                    className={`font-mono font-bold text-sm tabular-nums ${
                      student.pendingArrears > 0 ? "text-amber-600" : "text-emerald-600"
                    }`}
                  >
                    {student.pendingArrears > 0
                      ? formatCurrency(student.pendingArrears)
                      : "Nil (All Clear)"}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions Footer with Rule 4: Scale on press */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
            <MotionButton
              variant="outline"
              size="sm"
              onClick={() => onSendRentReminder && onSendRentReminder(student)}
              className="flex-1"
            >
              Send SMS Reminder
            </MotionButton>

            <MotionButton
              variant="primary"
              size="sm"
              onClick={() => onMarkPaid && onMarkPaid(student)}
              className="flex-1"
            >
              Record Payment
            </MotionButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
