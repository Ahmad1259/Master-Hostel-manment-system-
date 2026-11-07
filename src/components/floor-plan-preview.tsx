"use client";

import React, { useState } from "react";
import { BedItem, RoomItem } from "../lib/mock-data";
import { useApp } from "../lib/store";
import { formatCurrency } from "../lib/utils";
import {
  Maximize2,
  Users,
  Compass,
  CheckCircle2,
  Clock,
  Ban,
  Building,
} from "lucide-react";

export function FloorPlanPreview() {
  const { floors, t } = useApp();
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
            <Compass className="w-3.5 h-3.5" />
            <span>Architectural Cadastral Cadastre</span>
          </div>
          <h2 className="font-serif text-subhead tracking-tight text-ink mt-1">
            2D Interactive Chamber &amp; Bed Configuration Explorer
          </h2>
        </div>

        {/* Floor Selection Tabs */}
        <div className="flex items-center border border-border bg-canvas-subtle p-1">
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
                  ? "bg-canvas-surface text-ink font-medium shadow-sm border border-border"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {floor.name.split(" ")[0]} {floor.name.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Drawing Canvas */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schematic Floor Grid */}
        <div className="lg:col-span-2 border border-border bg-[#F5F4EE] p-6 relative min-h-[420px]">
          {/* Blueprint subtle grid markers */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#18181B 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
            <div className="flex items-center gap-2 text-caption text-ink font-mono">
              <Building className="w-3.5 h-3.5 text-brass" />
              <span>{activeFloor.name}</span>
            </div>
            <div className="flex items-center gap-4 text-caption text-ink-muted">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-status-vacant rounded-xs" />
                <span>Vacant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-status-occupied rounded-xs" />
                <span>Allocated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-status-partial rounded-xs" />
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
                      ? "border-brass ring-1 ring-brass shadow-sm"
                      : "border-border hover:border-zinc-400"
                  }`}
                >
                  {/* Room Header & Type */}
                  <div className="flex items-start justify-between mb-3 pb-2 border-b border-border">
                    <div>
                      <span className="text-caption font-mono uppercase text-ink-muted">
                        Chamber
                      </span>
                      <h4 className="font-serif text-subhead tracking-tight text-ink">
                        Suite #{room.roomNumber}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono border border-border px-1.5 py-0.5 text-ink-muted">
                        {room.type}
                      </span>
                      <p className="text-caption text-brass font-medium mt-1">
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
                              ? "border-zinc-200 bg-zinc-50"
                              : bed.status === "RESERVED"
                              ? "border-amber-200 bg-amber-50/50"
                              : "border-blue-200 bg-blue-50/40 hover:bg-blue-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-caption font-mono font-medium text-ink">
                              {bed.bedLabel}
                            </span>
                            {bed.status === "OCCUPIED" ? (
                              <CheckCircle2 className="w-3 h-3 text-status-occupied" />
                            ) : bed.status === "RESERVED" ? (
                              <Clock className="w-3 h-3 text-status-partial" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-status-vacant" />
                            )}
                          </div>
                          <p className="text-[10px] text-ink-muted truncate mt-1">
                            {bed.status === "OCCUPIED"
                              ? bed.studentName || "Occupied"
                              : bed.status === "RESERVED"
                              ? "Reserved"
                              : "Available"}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Architectural Status Footprint */}
                  <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted font-mono">
                    <span>
                      Occupancy: {occupiedCount}/{room.capacity}
                    </span>
                    <span
                      className={`font-medium ${
                        isFull
                          ? "text-status-occupied"
                          : isPartial
                          ? "text-status-partial"
                          : "text-status-vacant"
                      }`}
                    >
                      {isFull ? "Fully Allocated" : isPartial ? "Partial Occupancy" : "Fully Available"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Inspection Dossier Panel */}
        <div className="border border-border bg-canvas-subtle p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-widest mb-3">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Inspection Dossier</span>
            </div>

            {selectedBed ? (
              <div className="space-y-4">
                <div className="border-b border-border pb-3">
                  <span className="text-caption font-mono text-ink-muted uppercase">
                    Selected Bed Slot
                  </span>
                  <h3 className="font-serif text-subhead tracking-tight text-ink mt-0.5">
                    Chamber #{selectedRoom?.roomNumber} — {selectedBed.bedLabel}
                  </h3>
                </div>

                <div className="space-y-2 text-body">
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-caption text-ink-muted">Allocation Status:</span>
                    <span
                      className={`text-caption font-mono uppercase font-medium ${
                        selectedBed.status === "OCCUPIED"
                          ? "text-status-occupied"
                          : selectedBed.status === "RESERVED"
                          ? "text-status-partial"
                          : "text-status-vacant"
                      }`}
                    >
                      {selectedBed.status}
                    </span>
                  </div>

                  {selectedBed.studentName && (
                    <div className="flex justify-between py-1 border-b border-border/60">
                      <span className="text-caption text-ink-muted">Assigned Resident:</span>
                      <span className="text-caption font-medium text-ink">
                        {selectedBed.studentName}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-caption text-ink-muted">Suite Tariff:</span>
                    <span className="text-caption font-mono font-medium text-brass">
                      {formatCurrency(selectedRoom?.monthlyRate || 0)} / Month
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-caption text-ink-muted">Layout Category:</span>
                    <span className="text-caption font-mono text-ink">
                      {selectedRoom?.type}
                    </span>
                  </div>
                </div>

                <div className="bg-canvas-surface border border-border p-3 text-caption text-ink-muted space-y-1">
                  <p className="font-medium text-ink">Chamber Fixtures Included:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    <li>Solid Sheesham wood study bureau with ergonomic chair</li>
                    <li>Individual 2.5-ton Daikin Inverter climate zoning</li>
                    <li>Triple-door wardrobe with digital vault locker</li>
                    <li>High-CRI anti-flicker architectural reading lamp</li>
                  </ul>
                </div>
              </div>
            ) : selectedRoom ? (
              <div className="space-y-4">
                <div className="border-b border-border pb-3">
                  <span className="text-caption font-mono text-ink-muted uppercase">
                    Selected Chamber Overview
                  </span>
                  <h3 className="font-serif text-subhead tracking-tight text-ink mt-0.5">
                    Suite #{selectedRoom.roomNumber} ({selectedRoom.type})
                  </h3>
                </div>

                <div className="space-y-2 text-body">
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-caption text-ink-muted">Capacity:</span>
                    <span className="text-caption font-mono text-ink">
                      {selectedRoom.capacity} Bed Slots
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-caption text-ink-muted">Monthly Rate:</span>
                    <span className="text-caption font-mono font-medium text-brass">
                      {formatCurrency(selectedRoom.monthlyRate)}
                    </span>
                  </div>
                </div>
                <p className="text-caption text-ink-muted">
                  Click on an individual bed slot within the chamber blueprint to inspect specific occupant allocations.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-center py-12 text-ink-muted">
                <Users className="w-8 h-8 mx-auto text-zinc-300 stroke-[1.25]" />
                <p className="text-caption">
                  Select any chamber or bed slot on the left schematic to examine live resident credentials and suite specifications.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <a
              href="#inquire"
              className="w-full inline-flex items-center justify-center gap-2 bg-ink text-canvas py-2.5 px-4 text-caption uppercase tracking-wider font-medium hover:bg-brass transition-colors"
            >
              <span>Inquire For Chamber Reservation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
