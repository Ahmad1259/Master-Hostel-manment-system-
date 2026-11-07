"use client";

import React, { useState } from "react";
import { DoorClosed, DoorOpen, KeyRound, Sparkles } from "lucide-react";

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
    <div className="relative w-full max-w-4xl mx-auto my-12 overflow-hidden border border-border bg-canvas-subtle p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-widest">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Architectural Portico &amp; Entrance Gate</span>
          </div>
          <h2 className="font-serif text-subhead tracking-tight text-ink mt-1">
            Ceremonial 3D Portal Transition
          </h2>
        </div>

        <button
          onClick={handleToggle}
          className="inline-flex items-center gap-2 px-4 py-2 text-caption uppercase tracking-wider font-medium border border-border bg-canvas-surface hover:border-brass hover:text-brass transition-all duration-300"
        >
          {isOpen ? (
            <>
              <DoorClosed className="w-4 h-4 stroke-[1.25]" />
              <span>Close Portico Gates</span>
            </>
          ) : (
            <>
              <DoorOpen className="w-4 h-4 stroke-[1.25]" />
              <span>Swing Open Architectural Entrance</span>
            </>
          )}
        </button>
      </div>

      {/* 3D Perspective Door Frame Container */}
      <div
        className="relative h-80 sm:h-96 w-full mt-6 bg-[#18181B] border border-border flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Interior Chamber View Revealed Underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#202024] to-[#121214] text-canvas">
          <div className="w-12 h-12 rounded-full border border-brass/40 flex items-center justify-center mb-4 text-brass">
            <Sparkles className="w-5 h-5 stroke-[1.25]" />
          </div>
          <p className="text-caption font-mono uppercase tracking-widest text-brass mb-1">
            Interior Sanctuary Revealed
          </p>
          <h3 className="font-serif text-title tracking-tight text-canvas max-w-md">
            Welcome to The Grand Pavilion Chambers
          </h3>
          <p className="text-body text-zinc-400 max-w-lg mt-2 leading-relaxed">
            Soundproof Fenesta double-glazing, individual Daikin inverter climate zoning, ergonomic walnut study desks, and private en-suite amenities.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-caption font-mono text-zinc-400">
            <span className="border border-zinc-700 px-3 py-1">65 kVA Perkins Backup</span>
            <span className="border border-zinc-700 px-3 py-1">Dual 500M Fiber</span>
            <span className="border border-zinc-700 px-3 py-1">Reverse Osmosis Water</span>
          </div>
        </div>

        {/* Left Architectural Door Wing */}
        <div
          onClick={handleToggle}
          className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left border-r border-[#2C2C30] z-20"
          style={{
            transform: isOpen ? "rotateY(-105deg)" : "rotateY(0deg)",
            background: "linear-gradient(135deg, #2A2A2E 0%, #1A1A1D 100%)",
            boxShadow: isOpen ? "15px 0 35px rgba(0,0,0,0.8)" : "none",
          }}
        >
          {/* Architectural Panel Moulding */}
          <div className="h-full w-full p-4 flex flex-col justify-between border-8 border-[#1C1C1F]">
            <div className="h-28 border border-brass/30 p-3 flex items-center justify-center">
              <div className="w-full h-full border border-dashed border-zinc-600/50 flex items-center justify-center">
                <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase">
                  Left Portico
                </span>
              </div>
            </div>

            <div className="flex justify-end pr-3">
              <div className="w-3 h-14 bg-brass rounded-sm shadow-md border border-brass-dark" />
            </div>

            <div className="h-28 border border-brass/30 p-3 flex items-center justify-center">
              <div className="w-full h-full border border-dashed border-zinc-600/50" />
            </div>
          </div>
        </div>

        {/* Right Architectural Door Wing */}
        <div
          onClick={handleToggle}
          className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-right border-l border-[#2C2C30] z-20"
          style={{
            transform: isOpen ? "rotateY(105deg)" : "rotateY(0deg)",
            background: "linear-gradient(225deg, #2A2A2E 0%, #1A1A1D 100%)",
            boxShadow: isOpen ? "-15px 0 35px rgba(0,0,0,0.8)" : "none",
          }}
        >
          {/* Architectural Panel Moulding */}
          <div className="h-full w-full p-4 flex flex-col justify-between border-8 border-[#1C1C1F]">
            <div className="h-28 border border-brass/30 p-3 flex items-center justify-center">
              <div className="w-full h-full border border-dashed border-zinc-600/50 flex items-center justify-center">
                <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase">
                  Right Portico
                </span>
              </div>
            </div>

            <div className="flex justify-start pl-3">
              <div className="w-3 h-14 bg-brass rounded-sm shadow-md border border-brass-dark" />
            </div>

            <div className="h-28 border border-brass/30 p-3 flex items-center justify-center">
              <div className="w-full h-full border border-dashed border-zinc-600/50" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-caption text-ink-muted mt-3">
        {isOpen
          ? "Portico open. Click gates or the button above to close the threshold."
          : "Click upon the architectural portal to initiate the 3D swing transition."}
      </p>
    </div>
  );
}
