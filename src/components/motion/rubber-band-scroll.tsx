"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface RubberBandScrollProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Rule 19: Rubber band past bounds - when scrolling list past end, rubber band resistance effect
 */
export function RubberBandScroll({ children, className = "" }: RubberBandScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.12} // Spring resistance feel
        dragTransition={{ bounceStiffness: 400, bounceDamping: 28 }}
        className="touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  );
}
