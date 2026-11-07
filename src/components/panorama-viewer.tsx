"use client";

import React, { useState, useRef } from "react";
import { Compass, RotateCw, ZoomIn, ZoomOut, Eye, Layers, ShieldCheck, Thermometer, Volume2 } from "lucide-react";

interface SceneHotspot {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  environmentTone: string;
  elevationDetails: { label: string; sub: string; detail: string };
  hotspots: { title: string; category: string; rating: string; x: number; y: number }[];
}

const scenes: SceneHotspot[] = [
  {
    id: "suite-101",
    name: "Executive Single Suite (Chamber 101)",
    nameUrdu: "ایگزیکٹو سنگل پرائیویٹ سویٹ",
    description: "Private quiet study suite featuring Fenesta double-glazed acoustic windows and ensuite Italian porcelain bath.",
    environmentTone: "#F7F5EE",
    elevationDetails: {
      label: "Elevation A • North Fenestration",
      sub: "Double-Glazed Argon Insulated",
      detail: "U-Value 1.2 W/m²K",
    },
    hotspots: [
      { title: "Daikin Inverter Climate HVAC", category: "Climate Zoning", rating: "Quiet 19dB • Inverter Class A+++", x: 25, y: 32 },
      { title: "Solid Sheesham Study Carrel", category: "Ergonomics", rating: "FSC Hardwood • High-CRI Task Light", x: 50, y: 64 },
      { title: "Floor-to-Ceiling Wardrobe Vault", category: "Personal Storage", rating: "Triple Security Lock • 240L Volume", x: 75, y: 38 },
    ],
  },
  {
    id: "library-salon",
    name: "Academic Library & Reading Hall",
    nameUrdu: "اکیڈمک لائبریری و اسٹڈی ہال",
    description: "24-hour whisper-quiet reading hall with high-CRI 3000K illumination and dedicated shielded outlets at every station.",
    environmentTone: "#F5F3EC",
    elevationDetails: {
      label: "Elevation B • Academic Carrels",
      sub: "Acoustic Slatted Wall System",
      detail: "Noise Reduction Coeff NRC 0.85",
    },
    hotspots: [
      { title: "Acoustically Isolated Carrels", category: "Acoustics", rating: "Felt Baffles • Individual Power & LAN", x: 30, y: 55 },
      { title: "Medical & Engineering Reference", category: "Curated Library", rating: "1,200+ Core Reference Textbooks", x: 60, y: 32 },
      { title: "Filtered Hydration Station", category: "Amenities", rating: "5-Stage RO Mineralized Water", x: 80, y: 58 },
    ],
  },
  {
    id: "dining-hall",
    name: "Refectory & Dining Pavilion",
    nameUrdu: "ڈائننگ ہال و کچن",
    description: "Spacious culinary refectory serving 3 balanced rotational farm-to-table meals daily under certified food safety standards.",
    environmentTone: "#F6F4EB",
    elevationDetails: {
      label: "Elevation C • Culinary Service Bay",
      sub: "Commercial Steam Bain-Marie",
      detail: "Grade 316 Stainless Steel",
    },
    hotspots: [
      { title: "Thermal Food Serving Counter", category: "Culinary Service", rating: "Constant 75°C Steam Heat System", x: 35, y: 60 },
      { title: "Industrial RO Water Plant", category: "Sanitation", rating: "1,000 LPD Output • UV Disinfection", x: 70, y: 44 },
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
    <div className="w-full my-8 border border-border bg-canvas-surface card-elevation p-6 sm:p-10">
      {/* Top Header & Space Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Interactive Spatial Inspection</span>
          </div>
          <h2 className="font-serif text-title tracking-tight text-ink mt-1">
            360° Architectural Elevation Walkthrough
          </h2>
          <p className="text-body text-ink-muted mt-1 text-sm">
            Drag horizontally to orbit chamber elevations and inspect verified structural fixtures.
          </p>
        </div>

        {/* Space Selection Tabs */}
        <div className="flex items-center border border-border bg-canvas p-1 flex-wrap gap-1 shadow-xs">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveSceneIndex(idx);
                setRotationX(0);
                setActiveTooltip(null);
              }}
              className={`px-3.5 py-1.5 text-caption transition-colors ${
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
        className="relative w-full h-88 sm:h-[420px] mt-6 border border-border overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#F8F6F0]"
      >
        {/* Subtle Architectural Drafting Grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none transition-transform duration-75"
          style={{
            transform: `translateX(${rotationX * 1.5}px) scale(${zoomLevel})`,
            backgroundImage:
              "linear-gradient(to right, #18181B 1px, transparent 1px), linear-gradient(to bottom, #18181B 1px, transparent 1px)",
            backgroundSize: "40px 40px",
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
          <div className="w-72 h-80 border border-[#DDD8CB] bg-[#FCFBF8]/90 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E3D8] pb-2">
              <span className="text-micro font-mono text-ink-muted uppercase">Elevation W-01</span>
              <span className="text-micro font-mono text-brass">Section A</span>
            </div>
            <div className="w-full h-36 border border-[#E0DCCE] bg-[#FAF8F2] p-3 flex flex-col justify-between">
              <div className="w-full h-1 bg-brass/30" />
              <div className="text-center">
                <span className="text-caption font-serif text-ink font-medium">Inverter Climate Terminal</span>
                <p className="text-micro font-mono text-ink-muted mt-1">R32 Eco-Refrigerant • Ultra Quiet 19dB</p>
              </div>
              <div className="w-full flex justify-between border-t border-[#EAE6DB] pt-1.5 text-micro font-mono text-ink-faint">
                <span>1.5 TON CAPACITY</span>
                <span>COP 4.1 HIGH EFFICIENCY</span>
              </div>
            </div>
            <div className="text-micro font-mono text-ink-faint flex justify-between">
              <span>W-FRAME: ANODIZED ALUMINUM</span>
              <span>DATUM +2.40m</span>
            </div>
          </div>

          {/* Elevation Plate 2: Central Fenestration */}
          <div className="w-84 h-88 border-2 border-[#D8D2C2] bg-[#FFFFFF]/95 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E3D8] pb-2">
              <span className="text-micro font-mono text-ink-muted uppercase">Central Aperture</span>
              <span className="text-micro font-mono text-brass font-medium">Acoustic Glazing</span>
            </div>
            <div className="w-full h-44 border border-[#DDD8CB] bg-[#F7F5EE] p-3 flex gap-2.5">
              <div className="flex-1 border border-[#DDD8CB] bg-[#FFFFFF] flex flex-col items-center justify-center p-2 text-center shadow-xs">
                <span className="text-caption font-serif text-ink font-medium">Left Leaf</span>
                <span className="text-micro font-mono text-ink-muted mt-1">Fenesta System</span>
              </div>
              <div className="flex-1 border border-[#DDD8CB] bg-[#FFFFFF] flex flex-col items-center justify-center p-2 text-center shadow-xs">
                <span className="text-caption font-serif text-ink font-medium">Right Leaf</span>
                <span className="text-micro font-mono text-ink-muted mt-1">Multi-Point Locking</span>
              </div>
            </div>
            <div className="text-micro font-mono text-ink-faint flex justify-between">
              <span>DAYLIGHT BALANCED 6500K</span>
              <span>U-VALUE 1.2 W/m²K</span>
            </div>
          </div>

          {/* Elevation Plate 3: Study Bay & Joinery */}
          <div className="w-72 h-80 border border-[#DDD8CB] bg-[#FCFBF8]/90 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E3D8] pb-2">
              <span className="text-micro font-mono text-ink-muted uppercase">Elevation E-03</span>
              <span className="text-micro font-mono text-brass">Study Joinery</span>
            </div>
            <div className="w-full h-36 border border-[#E0DCCE] bg-[#FAF8F2] p-3 flex flex-col justify-between">
              <span className="text-caption font-serif text-ink font-medium">Solid Walnut Study Desk</span>
              <p className="text-micro font-mono text-ink-muted">Integrated Wire Management &amp; Shielded Outlets</p>
              <div className="w-full border-t border-[#EAE6DB] pt-1.5 flex justify-between text-micro font-mono text-ink-faint">
                <span>1200 x 600 mm</span>
                <span>FSC CERTIFIED OAK/WALNUT</span>
              </div>
            </div>
            <div className="text-micro font-mono text-ink-faint flex justify-between">
              <span>JOINERY FIXTURE #04</span>
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
                className="group relative flex items-center justify-center p-2"
              >
                {/* Minimalist Brass Target Ring */}
                <div className="w-7 h-7 rounded-full bg-canvas-surface border-2 border-brass flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <div className="w-2.5 h-2.5 rounded-full bg-brass" />
                </div>

                {/* Hotspot Editorial Popover Card */}
                {activeTooltip === hs.title && (
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-canvas-surface border border-border p-3.5 text-ink shadow-lg text-left z-30">
                    <span className="text-micro font-mono text-brass uppercase tracking-wider block">
                      {hs.category}
                    </span>
                    <p className="text-caption font-serif font-bold text-ink mt-0.5">
                      {hs.title}
                    </p>
                    <p className="text-micro text-ink-muted mt-1 leading-snug">
                      {hs.rating}
                    </p>
                    <div className="mt-2 pt-2 border-t border-border flex items-center gap-1.5 text-micro font-mono text-ink-faint">
                      <ShieldCheck className="w-3 h-3 text-brass" />
                      <span>Commercial Warranty Certified</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          );
        })}

        {/* HUD Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="bg-canvas-surface/95 border border-border px-3.5 py-1.5 text-micro font-mono text-ink-muted flex items-center gap-2 shadow-xs">
            <RotateCw className="w-3.5 h-3.5 text-brass" />
            <span>Drag Horizontally To Orbit (Bearing: {Math.round(rotationX)}°)</span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
              className="p-2 bg-canvas-surface border border-border text-ink hover:text-brass hover:border-brass transition-colors shadow-xs"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 stroke-[1.25]" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.1))}
              className="p-2 bg-canvas-surface border border-border text-ink hover:text-brass hover:border-brass transition-colors shadow-xs"
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
