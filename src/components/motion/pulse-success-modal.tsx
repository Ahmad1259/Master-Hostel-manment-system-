"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlayVariants, modalDialogVariants, pulseSuccessVariants } from "../../lib/motion";
import { Check, Receipt, X } from "lucide-react";
import { MotionButton } from "./motion-button";

interface PulseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  referenceNumber?: string;
  amount?: number;
}

/**
 * Rule 8: Pulse to confirm success - when payment is marked paid, pulse the success tick
 * Rule 10: Start popovers at 0.95
 * Rule 15: Make exits 20% shorter
 */
export function PulseSuccessModal({
  isOpen,
  onClose,
  title,
  subtitle,
  referenceNumber,
  amount,
}: PulseSuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // Can auto close or let user dismiss
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with ease-out */}
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Modal Container: Starts at scale 0.95 (Rule 10), exits 20% faster (Rule 15) */}
          <motion.div
            variants={modalDialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-center space-y-4"
          >
            {/* Rule 8: Pulse Success Tick */}
            <div className="relative mx-auto flex items-center justify-center w-16 h-16">
              <motion.div
                animate={{
                  scale: [1, 1.4, 1.6],
                  opacity: [0.6, 0.2, 0],
                }}
                transition={{
                  repeat: 2,
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-emerald-500/30"
              />
              <motion.div
                variants={pulseSuccessVariants}
                initial="initial"
                animate="animate"
                className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
              >
                <Check className="w-8 h-8 stroke-[3]" />
              </motion.div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                {subtitle}
              </p>
            </div>

            {amount && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs">
                <span className="text-slate-500 block">Total Settled</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  Rs {amount.toLocaleString()}
                </span>
                {referenceNumber && (
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                    Ref: {referenceNumber}
                  </span>
                )}
              </div>
            )}

            <div className="pt-2">
              <MotionButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={onClose}
              >
                Done
              </MotionButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
