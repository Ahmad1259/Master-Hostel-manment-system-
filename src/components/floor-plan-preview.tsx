"use client";

import React, { useState } from "react";
import { BedItem, RoomItem } from "../lib/mock-data";
import { useApp } from "../lib/store";
import { formatCurrency } from "../lib/utils";
import {
  Compass,
  CheckCircle2,
  Clock,
  Building,
} from "lucide-react";

export function FloorPlanPreview() {
  const { floors } = useApp();
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
  const [selectedBed, setSelectedBed] = useState<BedItem | null>(null);

  const activeFloor = floors[selectedFloorIndex] || floors[0];

  return (
    <div className="w-full my-8 border border-border bg-canvas-surface p-6 sm:p-8">
      {/* Header & Floor Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Architectural Cadastre</span>
          </div>
          <h2 className="font-serif text-subhead tracking-tight text-ink mt-1">
            Chamber &amp; Bed Cadastral Layout
          </h2>
        </div>

        {/* Floor Selection Tabs */}
        <div className="flex items-center border border-border bg-canvas p-1 gap-1">
          {floors.map((floor, idx) => (
            <button
              key={floor.id}
              onClick={() => {
                setSelectedFloorIndex(idx);
                setSelectedRoom(null);
                setSelectedBed(null);
              }}
              className={`px-3 py-1.5 text-caption transition-colors ${
                selectedFloorIndex === idx
                  ? "bg-canvas-surface text-ink font-medium shadow-xs border border-border"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {floor.name}
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Drawing Canvas */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schematic Floor Grid */}
        <div className="lg:col-span-2 border border-border bg-[#F8F6F0] p-6 relative min-h-96">
          {/* Blueprint subtle grid markers */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #18181B 1px, transparent 1px), linear-gradient(to bottom, #18181B 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/80">
            <div className="flex items-center gap-2 text-caption text-ink font-mono">
              <Building className="w-3.5 h-3.5 text-brass stroke-[1.25]" />
              <span className="font-medium">{activeFloor.name}</span>
            </div>
            <div className="flex items-center gap-4 text-caption text-ink-muted">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-border bg-canvas-surface" />
                <span>Vacant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-ink" />
                <span>Allocated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-brass" />
                <span>Reserved</span>
              </div>
            </div>
          </div>

          {/* Rooms Layout Schematic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeFloor.rooms.map((room) => {
              const isSelected = selectedRoom?.id === room.id;
              const occupiedCount = room.beds.filter((b) => b.status === "OCCUPIED").length;
              const isFull = occupiedCount === room.capacity;
              const isPartial = occupiedCount > 0 && !isFull;

              return (
                <div
                  key={room.id}
                  onClick={() => {
                    setSelectedRoom(room);
                    setSelectedBed(null);
                  }}
                  className={`border p-4 transition-all cursor-pointer relative bg-canvas-surface ${
                    isSelected
                      ? "border-brass ring-1 ring-brass shadow-xs"
                      : "border-border hover:border-zinc-400"
                  }`}
                >
                  {/* Room Header & Type */}
                  <div className="flex items-start justify-between mb-3 pb-2 border-b border-border">
                    <div>
                      <span className="text-micro font-mono uppercase text-ink-muted tracking-wider">
                        Chamber
                      </span>
                      <h4 className="font-serif text-subhead tracking-tight text-ink">
                        Suite #{room.roomNumber}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-micro font-mono border border-border bg-canvas px-1.5 py-0.5 text-ink-muted">
                        {room.type}
                      </span>
                      <p className="text-caption text-brass font-medium mt-1 font-mono">
                        {formatCurrency(room.monthlyRate)}/mo
                      </p>
                    </div>
                  </div>

                  {/* Room Beds Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {room.beds.map((bed) => {
                      const isBedSelected = selectedBed?.id === bed.id;
                      return (
                        <button
                          key={bed.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoom(room);
                            setSelectedBed(bed);
                          }}
                          className={`p-2 border text-left transition-all relative ${
                            isBedSelected
                              ? "border-brass bg-brass-light"
                              : bed.status === "OCCUPIED"
                              ? "border-border bg-canvas-subtle"
                              : bed.status === "RESERVED"
                              ? "border-brass/40 bg-brass-light/40"
                              : "border-border bg-canvas-surface hover:border-zinc-400"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-caption font-mono font-medium text-ink">
                              {bed.bedLabel}
                            </span>
                            {bed.status === "OCCUPIED" ? (
                              <CheckCircle2 className="w-3 h-3 text-ink" />
                            ) : bed.status === "RESERVED" ? (
                              <Clock className="w-3 h-3 text-brass" />
                            ) : (
                              <div className="w-2 h-2 rounded-full border border-ink-muted" />
                            )}
                          </div>
                          <p className="text-micro text-ink-muted truncate mt-1">
                            {bed.status === "OCCUPIED"
                              ? bed.studentName || "Occupied"
                              : bed.status === "RESERVED"
                              ? "Reserved"
                              : "Vacant"}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Architectural Status Footprint */}
                  <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-micro text-ink-muted font-mono">
                    <span>
                      Occupancy: {occupiedCount}/{room.capacity}
                    </span>
                    <span
                      className={`font-medium ${
                        isFull
                          ? "text-ink"
                          : isPartial
                          ? "text-brass"
                          : "text-olive"
                      }`}
                    >
                      {isFull ? "Fully Allocated" : isPartial ? "Partial Occupancy" : "Available"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected Chamber / Bed Specifications */}
        <div className="border border-border bg-canvas-surface p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <span className="text-caption font-mono uppercase tracking-wider text-brass">
                Specification Dossier
              </span>
            </div>

            {selectedRoom ? (
              <div className="mt-4 space-y-4">
                <div>
                  <span className="text-micro font-mono text-ink-muted uppercase">Selected Suite</span>
                  <h3 className="font-serif text-title tracking-tight text-ink">
                    Chamber #{selectedRoom.roomNumber}
                  </h3>
                  <p className="text-caption text-brass font-mono mt-0.5">
                    {selectedRoom.type} Allocation • {selectedRoom.capacity} Bed Capacity
                  </p>
                </div>

                <div className="space-y-2 py-3 border-y border-border text-caption font-mono">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Monthly Rate:</span>
                    <span className="text-ink font-medium">{formatCurrency(selectedRoom.monthlyRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Floor Level:</span>
                    <span className="text-ink">{activeFloor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Occupancy Ratio:</span>
                    <span className="text-ink">
                      {selectedRoom.beds.filter((b) => b.status === "OCCUPIED").length} / {selectedRoom.capacity} Beds
                    </span>
                  </div>
                </div>

                {selectedBed && (
                  <div className="border border-brass/50 bg-brass-light p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-caption font-serif font-medium text-ink">
                        Bed Position {selectedBed.bedLabel}
                      </span>
                      <span className="text-micro font-mono px-1.5 py-0.5 border border-brass text-brass uppercase">
                        {selectedBed.status}
                      </span>
                    </div>
                    {selectedBed.studentName && (
                      <p className="text-caption text-ink">
                        Resident: <span className="font-medium">{selectedBed.studentName}</span>
                      </p>
                    )}
                    <p className="text-micro text-ink-muted">
                      Allocated study desk, wardrobe vault, and high-speed LAN drop included.
                    </p>
                  </div>
                )}

                <div className="pt-2 space-y-2 text-caption text-ink-muted leading-relaxed">
                  <p className="font-serif text-ink font-medium">Standard Chamber Appointments:</p>
                  <ul className="space-y-1 pl-4 list-disc text-body text-caption">
                    <li>Daikin inverter air-conditioning &amp; heating</li>
                    <li>Soundproof acoustic double-glazed windows</li>
                    <li>Solid hardwood study carrel &amp; high-back task chair</li>
                    <li>Private en-suite bath with instantaneous hot water</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <Compass className="w-8 h-8 text-ink-faint mx-auto stroke-[1.25]" />
                <p className="text-caption font-mono uppercase tracking-wider text-ink-muted">
                  No Chamber Selected
                </p>
                <p className="text-body text-caption text-ink-faint max-w-xs mx-auto">
                  Click any suite or bed on the floor cadastre to review architectural specifications.
                </p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-border">
            <a
              href="#inquire"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-ink text-canvas text-caption uppercase tracking-wider hover:bg-brass transition-colors"
            >
              Reserve Selected Chamber
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
