"use client";

import React, { useState } from "react";
import { DoorClosed, DoorOpen, KeyRound, Compass, ShieldCheck, Sparkles, Building2, CheckCircle2 } from "lucide-react";

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
    <div className="w-full max-w-5xl mx-auto my-12 border border-border bg-canvas-surface card-elevation p-6 sm:p-10">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-widest">
            <KeyRound className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Ceremonial Entrance Portico</span>
          </div>
          <h2 className="font-serif text-title tracking-tight text-ink mt-1">
            Tactile 3D Perspective Portal
          </h2>
          <p className="text-body text-ink-muted mt-1 text-sm">
            Interactive physical gate transition revealing the interior architectural chamber.
          </p>
        </div>

        <button
          onClick={handleToggle}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 text-caption uppercase tracking-wider font-medium border border-border bg-canvas hover:border-brass hover:text-brass transition-colors shadow-xs"
        >
          {isOpen ? (
            <>
              <DoorClosed className="w-4 h-4 stroke-[1.25]" />
              <span>Close Portico Doors</span>
            </>
          ) : (
            <>
              <DoorOpen className="w-4 h-4 stroke-[1.25]" />
              <span>Swing Open Portico Doors</span>
            </>
          )}
        </button>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="relative h-96 sm:h-[420px] w-full mt-6 bg-[#EBE7DF] border border-border flex items-center justify-center overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        {/* Interior Chamber View (Revealed when doors swing open) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#FAF9F6] text-ink z-0">
          {/* Subtle architectural drawing linework */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#18181B 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 max-w-lg space-y-4">
            <div className="w-12 h-12 mx-auto border border-brass bg-brass-light/40 flex items-center justify-center text-brass shadow-xs">
              <Compass className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <span className="text-micro font-mono uppercase tracking-widest text-brass block">
                Interior Sanctuary Unlocked
              </span>
              <h3 className="font-serif text-title tracking-tight text-ink mt-1">
                The Grand Pavilion Chamber Suite
              </h3>
            </div>
            <p className="text-body text-ink-muted leading-relaxed max-w-md mx-auto text-sm">
              Individually zoned Daikin inverter climate controls, Fenesta double-glazed acoustic fenestration, solid walnut study desks, and private en-suite amenities.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5 justify-center text-caption font-mono text-ink-muted">
              <span className="border border-border bg-canvas px-3 py-1 shadow-xs">65 kVA Perkins Backup</span>
              <span className="border border-border bg-canvas px-3 py-1 shadow-xs">Dual 500M Optical Fiber</span>
              <span className="border border-border bg-canvas px-3 py-1 shadow-xs">Reverse Osmosis Plant</span>
            </div>
          </div>
        </div>

        {/* Left Architectural Door Wing */}
        <div
          onClick={handleToggle}
          className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left border-r border-[#C8C3B5] z-20"
          style={{
            transform: isOpen ? "rotateY(-108deg)" : "rotateY(0deg)",
            backgroundColor: "#E4DFD3",
            boxShadow: isOpen ? "20px 0 35px rgba(24,24,27,0.18)" : "none",
          }}
        >
          {/* Raised Bevel Door Face */}
          <div className="h-full w-full p-4 sm:p-6 flex flex-col justify-between border-4 border-[#D9D3C5] bg-[#E9E5DC]">
            {/* Top Raised Panel */}
            <div className="h-32 border-2 border-[#D0C9BA] bg-[#F5F2EB] p-4 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-micro tracking-widest font-mono text-ink-muted uppercase">
                Chamber Wing A
              </span>
              <div className="w-10 h-px bg-brass my-1.5" />
              <span className="text-[10px] font-mono text-ink-faint">EXECUTIVE RESIDENCY</span>
            </div>

            {/* Solid Brass Pull Hardware Plate */}
            <div className="flex justify-end pr-2">
              <div className="w-3.5 h-16 bg-brass border border-brass-dark shadow-sm flex flex-col items-center justify-between py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brass-dark/40" />
                <div className="w-1.5 h-7 bg-brass-dark/30 rounded-xs" />
                <div className="w-1.5 h-1.5 rounded-full bg-brass-dark/40" />
              </div>
            </div>

            {/* Bottom Raised Panel */}
            <div className="h-32 border-2 border-[#D0C9BA] bg-[#F5F2EB] p-4 flex items-center justify-center text-center shadow-xs">
              <span className="text-micro font-mono text-ink-faint tracking-wider uppercase">
                42 dB Acoustic Isolation
              </span>
            </div>
          </div>
        </div>

        {/* Right Architectural Door Wing */}
        <div
          onClick={handleToggle}
          className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-right border-l border-[#C8C3B5] z-20"
          style={{
            transform: isOpen ? "rotateY(108deg)" : "rotateY(0deg)",
            backgroundColor: "#E4DFD3",
            boxShadow: isOpen ? "-20px 0 35px rgba(24,24,27,0.18)" : "none",
          }}
        >
          {/* Raised Bevel Door Face */}
          <div className="h-full w-full p-4 sm:p-6 flex flex-col justify-between border-4 border-[#D9D3C5] bg-[#E9E5DC]">
            {/* Top Raised Panel */}
            <div className="h-32 border-2 border-[#D0C9BA] bg-[#F5F2EB] p-4 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-micro tracking-widest font-mono text-ink-muted uppercase">
                Chamber Wing B
              </span>
              <div className="w-10 h-px bg-brass my-1.5" />
              <span className="text-[10px] font-mono text-ink-faint">SUITE 101-404</span>
            </div>

            {/* Solid Brass Pull Hardware Plate */}
            <div className="flex justify-start pl-2">
              <div className="w-3.5 h-16 bg-brass border border-brass-dark shadow-sm flex flex-col items-center justify-between py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brass-dark/40" />
                <div className="w-1.5 h-7 bg-brass-dark/30 rounded-xs" />
                <div className="w-1.5 h-1.5 rounded-full bg-brass-dark/40" />
              </div>
            </div>

            {/* Bottom Raised Panel */}
            <div className="h-32 border-2 border-[#D0C9BA] bg-[#F5F2EB] p-4 flex items-center justify-center text-center shadow-xs">
              <span className="text-micro font-mono text-ink-faint tracking-wider uppercase">
                Thermal Barrier Envelope
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-caption text-ink-muted">
        <p>Click door panels or use the top button to trigger the architectural perspective swing.</p>
        <span className="font-mono text-micro text-ink-faint mt-1 sm:mt-0">
          CSS 3D Engine • Origin Center Depth 1500px
        </span>
      </div>
    </div>
  );
}
