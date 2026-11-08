"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "../../lib/motion";

interface MotionToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  disabled?: boolean;
}

/**
 * Rule 5: Stretch moving knobs 12% - toggles like Mess On/Off stretch 12% while moving
 * Rule 4: Scale to 0.97 on press
 * Rule 14: Don't tween while held
 */
export function MotionToggle({
  checked,
  onChange,
  activeLabel = "ON",
  inactiveLabel = "OFF",
  disabled = false,
}: MotionToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsAnimating(true);
    onChange(!checked);
    setTimeout(() => setIsAnimating(false), 240);
  };

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }} // Rule 4: Scale to 0.97 on press
      transition={{ duration: 0.08, ease: "linear" }} // Rule 14: Don't tween while held
      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${
        checked ? "bg-emerald-700" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {/* Moving Knob with Rule 5: 12% stretch while in motion */}
      <motion.span
        layout
        transition={{
          type: "tween",
          ease: EASE_IN_OUT, // Rule 9: Ease-in-out for moves
          duration: 0.22,
        }}
        animate={{
          x: checked ? 26 : 0,
          scaleX: isAnimating ? 1.12 : 1, // Rule 5: Stretch knob 12% while moving!
        }}
        className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md"
      />

      {/* Internal Text Indicator */}
      <span
        className={`absolute font-mono text-[9px] font-bold select-none transition-opacity duration-150 ${
          checked ? "left-2 text-white" : "right-2 text-slate-600"
        }`}
      >
        {checked ? activeLabel : inactiveLabel}
      </span>
    </motion.button>
  );
}
