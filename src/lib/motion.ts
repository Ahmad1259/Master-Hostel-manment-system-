import { Variants, Transition, TargetAndTransition } from "framer-motion";

// ============================================================================
// 20 MOTION & ANIMATION RULES SPECIFICATION
// ============================================================================

// Rule 1: Ease-out for entrances (Cards, Modals, Pages)
// Custom cubic bezier for smooth, professional ease-out
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const; // Rule 9: Ease-in-out for layout moves

// Rule 1 & 17: Page & Card Entrance with Mask Reveal
export const pageEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    clipPath: "inset(0% 0% 4% 0%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.28,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    clipPath: "inset(0% 0% 3% 0%)",
    transition: {
      duration: 0.22, // Rule 15: 20% shorter exit (0.28 * 0.8 ≈ 0.22)
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Rule 2 & 10: Dropdowns at 150-250ms starting at scale 0.95
export const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -6,
    transformOrigin: "top right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2, // 200ms (strictly in 150-250ms range)
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: {
      duration: 0.16, // Rule 15: 20% shorter (200ms * 0.8 = 160ms)
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Rule 3: Stagger list rows by 30ms (Student list, payment list)
export const staggerListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Strictly 30ms
      delayChildren: 0.02,
    },
  },
};

export const staggerRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.17, // 20% shorter
      ease: EASE_IN_OUT,
    },
  },
};

// Rule 4, 13, 14: Scale to 0.97 on press, no bounce on everyday UI, don't tween while held
export const buttonPressProps: {
  whileTap: TargetAndTransition;
  whileHover: TargetAndTransition;
} = {
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.08, ease: "linear" as const }, // No tween/bounce while held
  },
  whileHover: {
    scale: 1.01,
    transition: { duration: 0.14, ease: EASE_OUT_EXPO },
  },
};

// Rule 10, 11, 12, 15: Popovers & Modals starting at 0.95, enter from trigger, exit 20% shorter
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.16, ease: EASE_IN_OUT },
  },
};

export const modalDialogVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95, // Rule 10: Start popovers at 0.95
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: EASE_OUT_EXPO, // Rule 1
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2, // Rule 15: 20% shorter exit (250ms * 0.8 = 200ms)
      ease: EASE_IN_OUT,
    },
  },
};

// Rule 6: Stagger as details settle (when opening student details, stagger inner items)
export const settleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Stagger inner detail items
      delayChildren: 0.08,
    },
  },
};

export const settleItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: EASE_OUT_EXPO },
  },
};

// Rule 16: Overlap old & new states when switching tabs
export const tabContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.16,
      ease: EASE_IN_OUT,
    },
  },
};

// Rule 18: Crossfade icons + blur
export const crossfadeIconVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(3px)",
    scale: 0.85,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.2,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(3px)",
    scale: 0.85,
    transition: {
      duration: 0.16,
      ease: EASE_IN_OUT,
    },
  },
};

// Rule 8: Pulse to confirm success (when payment is marked paid)
export const pulseSuccessVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [0.8, 1.25, 1],
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: EASE_OUT_EXPO,
    },
  },
};
