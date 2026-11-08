"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { crossfadeIconVariants } from "../../lib/motion";

interface CrossfadeIconProps {
  iconKey: string;
  icon: any;
  className?: string;
  size?: number;
}

/**
 * Rule 18: Crossfade icons + blur - when icon changes, crossfade with slight blur
 */
export function CrossfadeIcon({
  iconKey,
  icon: IconComponent,
  className = "w-4 h-4",
  size,
}: CrossfadeIconProps) {
  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={iconKey}
          variants={crossfadeIconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center"
        >
          <IconComponent className={className} size={size} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
