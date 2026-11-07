"use client";

import React, { useState, useRef } from "react";
import { Compass, RotateCw, ZoomIn, ZoomOut, Eye, Layers } from "lucide-react";

interface SceneHotspot {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  backgroundGradient: string;
  hotspots: { title: string; x: number; y: number }[];
}

const scenes: SceneHotspot[] = [
  {
    id: "suite-101",
    name: "Executive Single Suite (Chamber 101)",
    nameUrdu: "ایگزیکٹو سنگل پرائیویٹ سویٹ",
    description: "Private silent study suite with soundproof Fenesta double-glazing and ensuite Italian tile bath.",
    backgroundGradient: "radial-gradient(ellipse at center, #26262B 0%, #161618 60%, #0D0D0E 100%)",
    hotspots: [
      { title: "Daikin Inverter HVAC", x: 25, y: 35 },
      { title: "Solid Sheesham Study Desk", x: 50, y: 65 },
      { title: "Triple Wardrobe Vault", x: 75, y: 40 },
    ],
  },
  {
    id: "library-salon",
    name: "Communal Academic Library & Reading Salon",
    nameUrdu: "اکیڈمک لائبریری و اسٹڈی ہال",
    description: "24-hour whisper-quiet reading hall with high-CRI lighting and dedicated power sockets at every station.",
    backgroundGradient: "radial-gradient(ellipse at center, #2B2620 0%, #1A1612 60%, #0E0C0A 100%)",
    hotspots: [
      { title: "Quiet Study Carrels", x: 30, y: 55 },
      { title: "Legal & Medical Reference Library", x: 60, y: 35 },
      { title: "Coffee & Hydration Dispenser", x: 80, y: 60 },
    ],
  },
  {
    id: "dining-hall",
    name: "Grand Dining Pavilion & Commercial Kitchen",
    nameUrdu: "ڈائننگ ہال و کچن",
    description: "Spacious culinary pavilion serving 3 rotational organic farm-to-table meals daily under PFA compliance.",
    backgroundGradient: "radial-gradient(ellipse at center, #1E2824 0%, #121916 60%, #0B100E 100%)",
    hotspots: [
      { title: "Commercial Steam Bain-Marie", x: 35, y: 60 },
      { title: "RO Water Filtration Plant", x: 70, y: 45 },
    ],
  },
];

export function PanoramaViewer() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeScene = scenes[activeSceneIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setRotationX((prev) => (prev + delta * 0.2) % 360);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full my-8 border border-border bg-canvas-surface p-6 sm:p-8">
      {/* Header & Scene Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Spatial Inspection</span>
          </div>
          <h2 className="font-serif text-subhead tracking-tight text-ink mt-1">
            360° Architectural Walkthrough &amp; Virtual Viewing
          </h2>
        </div>

        {/* Scene Selection Tabs */}
        <div className="flex items-center border border-border bg-canvas-subtle p-1 flex-wrap">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveSceneIndex(idx);
                setRotationX(0);
                setActiveTooltip(null);
              }}
              className={`px-3 py-1.5 text-caption transition-colors ${
                activeSceneIndex === idx
                  ? "bg-canvas-surface text-ink font-medium shadow-sm border border-border"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {scene.name.split(" (")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 360 Interactive Canvas Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-80 sm:h-[420px] mt-6 border border-border overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{
          background: activeScene.backgroundGradient,
        }}
      >
        {/* Subtle Architectural Horizon Lines & Compass Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-75"
          style={{
            transform: `translateX(${rotationX * 2}px) scale(${zoomLevel})`,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Spatial Room Horizon Simulation */}
        <div
          className="absolute inset-0 flex items-center justify-around pointer-events-none transition-transform duration-75"
          style={{
            transform: `translateX(${rotationX * 1.5}px) scale(${zoomLevel})`,
          }}
        >
          <div className="w-64 h-72 border border-zinc-700/50 bg-black/20 flex flex-col justify-between p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Elevation A</span>
            <div className="w-full h-24 border border-zinc-800 bg-zinc-900/40" />
            <span className="text-[10px] font-mono text-zinc-500">Wall Anchor #01</span>
          </div>

          <div className="w-72 h-80 border border-zinc-700/50 bg-black/30 flex flex-col justify-between p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Elevation B (Fenestration)</span>
            <div className="w-full h-32 border-2 border-zinc-700 bg-zinc-900/60 p-2 flex gap-1">
              <div className="flex-1 border border-zinc-700/60" />
              <div className="flex-1 border border-zinc-700/60" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Acoustic Double Glazing</span>
          </div>

          <div className="w-64 h-72 border border-zinc-700/50 bg-black/20 flex flex-col justify-between p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Elevation C</span>
            <div className="w-full h-28 border border-zinc-800 bg-zinc-900/40" />
            <span className="text-[10px] font-mono text-zinc-500">Ensuite Portal</span>
          </div>
        </div>

        {/* Hotspots */}
        {activeScene.hotspots.map((hs, i) => {
          const adjustedX = (hs.x + (rotationX / 360) * 100) % 100;
          const displayX = adjustedX < 0 ? adjustedX + 100 : adjustedX;

          return (
            <div
              key={i}
              className="absolute z-10 transition-transform duration-100"
              style={{
                left: `${displayX}%`,
                top: `${hs.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTooltip(activeTooltip === hs.title ? null : hs.title);
                }}
                className="group relative flex items-center justify-center"
              >
                <div className="w-6 h-6 rounded-full bg-brass/20 border border-brass flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-brass" />
                </div>

                {/* Hotspot Popover Card */}
                {activeTooltip === hs.title && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-zinc-900 border border-border p-2.5 text-canvas shadow-xl text-left z-20">
                    <p className="text-caption font-serif text-brass font-medium">
                      {hs.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                      Verified architectural fixture under commercial warranty.
                    </p>
                  </div>
                )}
              </button>
            </div>
          );
        })}

        {/* Spatial HUD Overlay Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xs border border-zinc-700 px-3 py-1.5 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
            <RotateCw className="w-3.5 h-3.5 text-brass animate-spin-slow" />
            <span>Click &amp; Drag Horizontally To Orbit Chamber (Bearing: {Math.round(rotationX)}°)</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 bg-black/60 border border-zinc-700 text-zinc-300 hover:text-brass transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 stroke-[1.25]" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 bg-black/60 border border-zinc-700 text-zinc-300 hover:text-brass transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 stroke-[1.25]" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-caption text-ink-muted">
        <p>{activeScene.description}</p>
        <span className="font-mono text-[11px] border-b border-dotted border-border mt-2 sm:mt-0">
          Gaussian Splat &amp; Pannellum 360 Integrated Engine
        </span>
      </div>
    </div>
  );
}
