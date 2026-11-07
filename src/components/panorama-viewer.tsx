"use client";

import React, { useState, useRef } from "react";
import { Compass, RotateCw, ZoomIn, ZoomOut, Eye, Layers } from "lucide-react";

interface SceneHotspot {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  environmentTone: string;
  elevationDetails: { label: string; sub: string; detail: string };
  hotspots: { title: string; category: string; x: number; y: number }[];
}

const scenes: SceneHotspot[] = [
  {
    id: "suite-101",
    name: "Executive Single Suite (Chamber 101)",
    nameUrdu: "ایگزیکٹو سنگل پرائیویٹ سویٹ",
    description: "Private silent study suite with soundproof Fenesta double-glazing and ensuite Italian porcelain bath.",
    environmentTone: "#F7F5EE",
    elevationDetails: {
      label: "Chamber Elevation 01-A",
      sub: "Fenestration & Thermal Envelope",
      detail: "Double-Glazed Argon Insulated",
    },
    hotspots: [
      { title: "Daikin Inverter Climate HVAC", category: "Climate Zoning", x: 25, y: 32 },
      { title: "Solid Sheesham Study Carrel", category: "Ergonomics", x: 50, y: 64 },
      { title: "Floor-to-Ceiling Wardrobe Vault", category: "Storage", x: 75, y: 38 },
    ],
  },
  {
    id: "library-salon",
    name: "Academic Library & Reading Hall",
    nameUrdu: "اکیڈمک لائبریری و اسٹڈی ہال",
    description: "24-hour whisper-quiet reading hall with high-CRI 3000K illumination and dedicated shielded outlets at every carrel.",
    environmentTone: "#F5F3EC",
    elevationDetails: {
      label: "Chamber Elevation 02-B",
      sub: "Reference Stacks & Carrel Rows",
      detail: "Acoustic Slats NRC 0.85",
    },
    hotspots: [
      { title: "Acoustically Isolated Carrels", category: "Acoustics", x: 30, y: 55 },
      { title: "Medical & Engineering Stacks", category: "Curated Reference", x: 60, y: 32 },
      { title: "Reverse Osmosis Hydration Point", category: "Amenities", x: 80, y: 58 },
    ],
  },
  {
    id: "dining-hall",
    name: "Refectory & Dining Pavilion",
    nameUrdu: "ڈائننگ ہال و کچن",
    description: "Spacious culinary refectory serving 3 balanced rotational farm-to-table meals daily under certified food safety standards.",
    environmentTone: "#F6F4EB",
    elevationDetails: {
      label: "Chamber Elevation 03-C",
      sub: "Stainless Bain-Marie & Prep Bays",
      detail: "Commercial Hygiene Grade 316",
    },
    hotspots: [
      { title: "Commercial Steam Bain-Marie", category: "Thermal Serving", x: 35, y: 60 },
      { title: "5-Stage Water Purification Plant", category: "Sanitation", x: 70, y: 44 },
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
    setRotationX((prev) => (prev + delta * 0.25) % 360);
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
            <Eye className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Spatial Inspection Chamber</span>
          </div>
          <h2 className="font-serif text-subhead tracking-tight text-ink mt-1">
            360° Architectural Elevation Walkthrough
          </h2>
        </div>

        {/* Scene Selection Tabs */}
        <div className="flex items-center border border-border bg-canvas p-1 flex-wrap gap-1">
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
                  ? "bg-canvas-surface text-ink font-medium shadow-xs border border-border"
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
        className="relative w-full h-84 sm:h-96 mt-6 border border-border overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{
          backgroundColor: activeScene.environmentTone,
        }}
      >
        {/* Subtle Architectural Drafting Grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none transition-transform duration-75"
          style={{
            transform: `translateX(${rotationX * 1.5}px) scale(${zoomLevel})`,
            backgroundImage:
              "linear-gradient(to right, #18181B 1px, transparent 1px), linear-gradient(to bottom, #18181B 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Architectural Elevation Horizon Frames */}
        <div
          className="absolute inset-0 flex items-center justify-around pointer-events-none transition-transform duration-75"
          style={{
            transform: `translateX(${rotationX * 1.2}px) scale(${zoomLevel})`,
          }}
        >
          {/* Elevation Plate 1: Western Wall */}
          <div className="w-68 h-76 border border-[#DDD8CB] bg-[#FCFBF8]/80 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E3D8] pb-2">
              <span className="text-micro font-mono text-ink-muted uppercase">Elevation W-01</span>
              <span className="text-micro font-mono text-brass">Section A</span>
            </div>
            <div className="w-full h-32 border border-[#E0DCCE] bg-[#FAF8F2] p-2 flex flex-col justify-between">
              <div className="w-full h-1 bg-brass/30" />
              <div className="text-center">
                <span className="text-micro font-serif text-ink font-medium">Inverter Climate Terminal</span>
                <p className="text-micro font-mono text-ink-faint">R32 Eco-Refrigerant • Quiet 19dB</p>
              </div>
              <div className="w-full flex justify-between border-t border-[#EAE6DB] pt-1">
                <span className="text-micro font-mono text-ink-faint">1.5 TON</span>
                <span className="text-micro font-mono text-ink-faint">COP 4.1</span>
              </div>
            </div>
            <div className="text-micro font-mono text-ink-faint flex justify-between">
              <span>W-FRAME: ANODIZED</span>
              <span>DATUM +2.40m</span>
            </div>
          </div>

          {/* Elevation Plate 2: Central Fenestration */}
          <div className="w-80 h-84 border-2 border-[#D8D2C2] bg-[#FFFFFF]/90 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E3D8] pb-2">
              <span className="text-micro font-mono text-ink-muted uppercase">Central Aperture</span>
              <span className="text-micro font-mono text-brass">Acoustic Glazing</span>
            </div>
            <div className="w-full h-40 border border-[#DDD8CB] bg-[#F7F5EE] p-3 flex gap-2">
              <div className="flex-1 border border-[#DDD8CB] bg-[#FFFFFF] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-micro font-serif text-ink">Left Leaf</span>
                <span className="text-micro font-mono text-ink-faint mt-1">Fenesta System</span>
              </div>
              <div className="flex-1 border border-[#DDD8CB] bg-[#FFFFFF] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-micro font-serif text-ink">Right Leaf</span>
                <span className="text-micro font-mono text-ink-faint mt-1">Multi-Point Locking</span>
              </div>
            </div>
            <div className="text-micro font-mono text-ink-faint flex justify-between">
              <span>NATURAL DAYLIGHT 6500K</span>
              <span>U-VALUE 1.2 W/m²K</span>
            </div>
          </div>

          {/* Elevation Plate 3: Study Bay & Joinery */}
          <div className="w-68 h-76 border border-[#DDD8CB] bg-[#FCFBF8]/80 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E3D8] pb-2">
              <span className="text-micro font-mono text-ink-muted uppercase">Elevation E-03</span>
              <span className="text-micro font-mono text-brass">Study Joinery</span>
            </div>
            <div className="w-full h-32 border border-[#E0DCCE] bg-[#FAF8F2] p-3 flex flex-col justify-between">
              <span className="text-micro font-serif text-ink">Solid Walnut Desk</span>
              <p className="text-micro font-mono text-ink-muted">Integrated Wire Management &amp; Task Illumination</p>
              <div className="w-full border-t border-[#EAE6DB] pt-1 flex justify-between text-micro font-mono text-ink-faint">
                <span>1200 x 600 mm</span>
                <span>FSC CERTIFIED</span>
              </div>
            </div>
            <div className="text-micro font-mono text-ink-faint flex justify-between">
              <span>JOINERY FIX #04</span>
              <span>DATUM +0.75m</span>
            </div>
          </div>
        </div>

        {/* Hotspots - Elegant architectural brass markers */}
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
                {/* Minimalist Brass Target Ring */}
                <div className="w-6 h-6 rounded-full bg-canvas-surface border border-brass flex items-center justify-center shadow-xs hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-brass" />
                </div>

                {/* Hotspot Editorial Popover Card */}
                {activeTooltip === hs.title && (
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-canvas-surface border border-border p-3 text-ink shadow-md text-left z-20">
                    <span className="text-micro font-mono text-brass uppercase tracking-wider block">
                      {hs.category}
                    </span>
                    <p className="text-caption font-serif font-medium text-ink mt-0.5">
                      {hs.title}
                    </p>
                    <p className="text-micro text-ink-muted mt-1 leading-snug">
                      Commercial fixture verified against institutional specifications.
                    </p>
                  </div>
                )}
              </button>
            </div>
          );
        })}

        {/* Minimalist Architectural HUD Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="bg-canvas-surface/90 border border-border px-3 py-1.5 text-micro font-mono text-ink-muted flex items-center gap-2 shadow-xs">
            <RotateCw className="w-3.5 h-3.5 text-brass" />
            <span>Drag Horizontally To Orbit Chamber (Bearing: {Math.round(rotationX)}°)</span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
              className="p-1.5 bg-canvas-surface border border-border text-ink hover:text-brass hover:border-brass transition-colors shadow-xs"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 stroke-[1.25]" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.1))}
              className="p-1.5 bg-canvas-surface border border-border text-ink hover:text-brass hover:border-brass transition-colors shadow-xs"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 stroke-[1.25]" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-caption text-ink-muted">
        <p>{activeScene.description}</p>
        <span className="font-mono text-micro text-ink-faint mt-2 sm:mt-0">
          Gaussian Splat &amp; Pannellum 360 Dual-Pipeline Ready
        </span>
      </div>
    </div>
  );
}
