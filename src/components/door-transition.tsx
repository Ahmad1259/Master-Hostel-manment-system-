"use client";

import React, { useState } from "react";
import { DoorClosed, DoorOpen, KeyRound, Compass, CheckCircle2 } from "lucide-react";

interface DoorTransitionProps {
  onEnter?: () => void;
  isOpenDefault?: boolean;
}

export function DoorTransition({ onEnter, isOpenDefault = false }: DoorTransitionProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next && onEnter) {
      onEnter();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 border border-border bg-canvas-surface p-6 sm:p-8">
      {/* Portico Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-widest">
            <KeyRound className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Architectural Portico Entry</span>
          </div>
          <h2 className="font-serif text-subhead tracking-tight text-ink mt-1">
            Ceremonial Double-Leaf Portal
          </h2>
        </div>

        <button
          onClick={handleToggle}
          className="inline-flex items-center gap-2 px-4 py-2 text-caption uppercase tracking-wider font-medium border border-border bg-canvas hover:border-brass hover:text-brass transition-colors duration-200"
        >
          {isOpen ? (
            <>
              <DoorClosed className="w-4 h-4 stroke-[1.25]" />
              <span>Close Portico Doors</span>
            </>
          ) : (
            <>
              <DoorOpen className="w-4 h-4 stroke-[1.25]" />
              <span>Open Portico Doors</span>
            </>
          )}
        </button>
      </div>

      {/* 3D Perspective Door Frame Container - Natural Architectural Materiality */}
      <div
        className="relative h-88 sm:h-96 w-full mt-6 bg-[#F4F2EC] border border-border flex items-center justify-center overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        {/* Interior Chamber Revealed - Warm naturally lit architectural salon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#FAF9F6] text-ink z-0">
          {/* Subtle architectural drawing backdrop */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #18181B 1px, transparent 1px), linear-gradient(to bottom, #18181B 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-lg space-y-3">
            <div className="w-10 h-10 mx-auto border border-brass flex items-center justify-center text-brass">
              <Compass className="w-5 h-5 stroke-[1.25]" />
            </div>
            <p className="text-caption font-mono uppercase tracking-widest text-brass">
              Chamber Interior Unlocked
            </p>
            <h3 className="font-serif text-title tracking-tight text-ink">
              The Grand Pavilion Residence
            </h3>
            <p className="text-body text-ink-muted leading-relaxed max-w-md mx-auto">
              Natural daylight fenestration, solid walnut study appointments, Daikin inverter climate zoning, and private acoustic isolation.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 justify-center text-caption font-mono text-ink-muted">
              <span className="border border-border bg-canvas px-3 py-1">65 kVA Synchronous Power</span>
              <span className="border border-border bg-canvas px-3 py-1">Dual 500M Optical Fiber</span>
              <span className="border border-border bg-canvas px-3 py-1">Certified Mineral Water</span>
            </div>
          </div>
        </div>

        {/* Left Door Leaf (Natural White Oak & Muted Brass Hardware) */}
        <div
          onClick={handleToggle}
          className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left border-r border-[#D4D1C7] z-20"
          style={{
            transform: isOpen ? "rotateY(-105deg)" : "rotateY(0deg)",
            backgroundColor: "#EFECE4",
            boxShadow: isOpen ? "16px 0 32px rgba(24,24,27,0.12)" : "none",
          }}
        >
          {/* Architectural Panel Moulding & Raised Stiles */}
          <div className="h-full w-full p-4 flex flex-col justify-between border-4 border-[#E2DDD3]">
            {/* Upper Raised Bevel */}
            <div className="h-28 border border-[#D5D0C4] bg-[#F7F5EF] p-3 flex flex-col items-center justify-center text-center">
              <span className="text-micro tracking-widest font-mono text-ink-muted uppercase">
                Chamber Wing A
              </span>
              <div className="w-8 h-px bg-brass/40 my-1" />
              <span className="text-micro font-mono text-ink-faint">EST. 2024</span>
            </div>

            {/* Solid Brass Pull Handle Plate */}
            <div className="flex justify-end pr-2">
              <div className="w-2.5 h-14 bg-brass border border-brass-dark shadow-xs flex items-center justify-center">
                <div className="w-1 h-6 bg-brass-dark/30 rounded-xs" />
              </div>
            </div>

            {/* Lower Raised Bevel */}
            <div className="h-28 border border-[#D5D0C4] bg-[#F7F5EF] p-3 flex items-center justify-center">
              <span className="text-micro font-mono text-ink-faint tracking-wider">
                ACOUSTIC SEAL 42dB
              </span>
            </div>
          </div>
        </div>

        {/* Right Door Leaf (Natural White Oak & Muted Brass Hardware) */}
        <div
          onClick={handleToggle}
          className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-right border-l border-[#D4D1C7] z-20"
          style={{
            transform: isOpen ? "rotateY(105deg)" : "rotateY(0deg)",
            backgroundColor: "#EFECE4",
            boxShadow: isOpen ? "-16px 0 32px rgba(24,24,27,0.12)" : "none",
          }}
        >
          {/* Architectural Panel Moulding & Raised Stiles */}
          <div className="h-full w-full p-4 flex flex-col justify-between border-4 border-[#E2DDD3]">
            {/* Upper Raised Bevel */}
            <div className="h-28 border border-[#D5D0C4] bg-[#F7F5EF] p-3 flex flex-col items-center justify-center text-center">
              <span className="text-micro tracking-widest font-mono text-ink-muted uppercase">
                Chamber Wing B
              </span>
              <div className="w-8 h-px bg-brass/40 my-1" />
              <span className="text-micro font-mono text-ink-faint">SUITE 101-404</span>
            </div>

            {/* Solid Brass Escutcheon & Keyway */}
            <div className="flex justify-start pl-2">
              <div className="w-2.5 h-14 bg-brass border border-brass-dark shadow-xs flex items-center justify-center">
                <div className="w-1 h-6 bg-brass-dark/30 rounded-xs" />
              </div>
            </div>

            {/* Lower Raised Bevel */}
            <div className="h-28 border border-[#D5D0C4] bg-[#F7F5EF] p-3 flex items-center justify-center">
              <span className="text-micro font-mono text-ink-faint tracking-wider">
                THERMAL BARRIER A++
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-caption text-ink-muted">
        <p>Click door leaves or use toggle button to inspect chamber reveal.</p>
        <span className="font-mono text-micro text-ink-faint mt-1 sm:mt-0">
          Perspective Render • 1400px Depth Horizon
        </span>
      </div>
    </div>
  );
}
