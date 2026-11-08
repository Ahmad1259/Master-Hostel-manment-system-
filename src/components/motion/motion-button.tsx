"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { buttonPressProps } from "../../lib/motion";

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

/**
 * Rule 4: Scale to 0.97 on press
 * Rule 13: No bounce on everyday UI
 * Rule 14: Don't tween while held
 */
export function MotionButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: MotionButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 select-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 shadow-2xs",
    md: "text-xs sm:text-sm px-4 py-2.5 gap-2 shadow-xs",
    lg: "text-sm sm:text-base px-5 py-3 gap-2.5 shadow-sm",
  };

  const variantStyles = {
    primary: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white shadow-xs",
    outline: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-2xs",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-xs",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  return (
    <motion.button
      {...buttonPressProps}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
