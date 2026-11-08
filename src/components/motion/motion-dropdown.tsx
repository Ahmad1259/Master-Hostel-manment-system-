"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants } from "../../lib/motion";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  id: string;
  label: string;
  icon?: any;
  action: () => void;
  destructive?: boolean;
}

interface MotionDropdownProps {
  triggerLabel: string;
  triggerIcon?: any;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

/**
 * Rule 2: Dropdowns at 150-250ms (Duration: 180ms)
 * Rule 10: Start popovers at 0.95
 * Rule 15: Make exits 20% shorter (180ms * 0.8 = 144ms)
 * Rule 4: Scale to 0.97 on press for trigger
 */
export function MotionDropdown({
  triggerLabel,
  triggerIcon: TriggerIcon,
  items,
  align = "right",
  className = "",
}: MotionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }} // Rule 4
        transition={{ duration: 0.08, ease: "linear" }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {TriggerIcon && <TriggerIcon className="w-3.5 h-3.5 text-slate-500" />}
        <span>{triggerLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute z-50 mt-1.5 w-48 rounded-xl bg-white border border-slate-200 p-1.5 shadow-xl ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {items.map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    item.destructive
                      ? "text-red-600 hover:bg-red-50"
                      : "text-slate-700 hover:bg-slate-100/80"
                  }`}
                >
                  {ItemIcon && <ItemIcon className="w-3.5 h-3.5 shrink-0 opacity-75" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
