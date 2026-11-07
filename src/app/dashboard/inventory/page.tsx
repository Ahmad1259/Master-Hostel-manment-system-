"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import { formatCurrency } from "../../../lib/utils";
import {
  Layers,
  Plus,
  Building,
  CheckCircle2,
  Clock,
  Users,
  Search,
  Filter,
  X,
  UserPlus,
  Maximize2,
} from "lucide-react";

export default function InventoryPage() {
  const {
    floors,
    addFloor,
    addRoom,
    allocateBed,
    deallocateBed,
    students,
    t,
    currentBranch,
  } = useApp();

  const [selectedFloorId, setSelectedFloorId] = useState<string>("ALL");
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("ALL");
  const [showAddFloorModal, setShowAddFloorModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  // New Floor Form state
  const [newFloorName, setNewFloorName] = useState("");
  const [newFloorNameUrdu, setNewFloorNameUrdu] = useState("");

  // New Room Form state
  const [targetFloorId, setTargetFloorId] = useState(floors[0]?.id || "");
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState(2);
  const [monthlyRate, setMonthlyRate] = useState(32000);
  const [roomType, setRoomType] = useState<"SINGLE" | "DOUBLE" | "TRIPLE" | "DORMITORY">("DOUBLE");

  // Bed allocation modal
  const [allocatingBedId, setAllocatingBedId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const handleCreateFloor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFloorName) return;
    addFloor(newFloorName, newFloorNameUrdu);
    setNewFloorName("");
    setNewFloorNameUrdu("");
    setShowAddFloorModal(false);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber) return;
    addRoom(targetFloorId, roomNumber, capacity, monthlyRate, roomType);
    setRoomNumber("");
    setShowAddRoomModal(false);
  };

  const handleConfirmBedAllocation = () => {
    if (!allocatingBedId || !selectedStudentId) return;
    const std = students.find((s) => s.id === selectedStudentId);
    if (std) {
      allocateBed(allocatingBedId, std.id, std.name);
    }
    setAllocatingBedId(null);
    setSelectedStudentId("");
  };

  const filteredFloors = floors.filter(
    (f) => selectedFloorId === "ALL" || f.id === selectedFloorId
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Module 01 • Physical Assets
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.inventoryTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.inventorySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddFloorModal(true)}
            className="inline-flex items-center gap-2 border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.btnAddFloor}</span>
          </button>

          <button
            onClick={() => setShowAddRoomModal(true)}
            className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
          >
            <Building className="w-3.5 h-3.5" />
            <span>{t.btnCreateRoom}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-border bg-canvas-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-caption font-medium text-ink-muted">Tier:</span>
            <select
              value={selectedFloorId}
              onChange={(e) => setSelectedFloorId(e.target.value)}
              className="border border-border bg-canvas px-3 py-1.5 text-caption text-ink"
            >
              <option value="ALL">All Architectural Tiers</option>
              {floors.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-caption font-medium text-ink-muted">Type:</span>
            <select
              value={roomTypeFilter}
              onChange={(e) => setRoomTypeFilter(e.target.value)}
              className="border border-border bg-canvas px-3 py-1.5 text-caption text-ink"
            >
              <option value="ALL">All Layout Types</option>
              <option value="SINGLE">Single Executive</option>
              <option value="DOUBLE">Double Scholars</option>
              <option value="TRIPLE">Triple Residency</option>
              <option value="DORMITORY">Fellowship Dormitory</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 text-caption text-ink-muted font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-status-vacant rounded-xs" />
            <span>Vacant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-status-partial rounded-xs" />
            <span>Partial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-status-occupied rounded-xs" />
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* Floors & Chambers List */}
      <div className="space-y-6">
        {filteredFloors.map((floor) => {
          const roomsToShow = floor.rooms.filter(
            (r) => roomTypeFilter === "ALL" || r.type === roomTypeFilter
          );

          return (
            <div key={floor.id} className="border border-border bg-canvas-surface p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brass" />
                  <h3 className="font-serif text-subhead tracking-tight text-ink font-medium">
                    {floor.name}
                  </h3>
                </div>
                <span className="text-caption font-mono text-ink-muted">
                  {roomsToShow.length} Chambers Registered
                </span>
              </div>

              {roomsToShow.length === 0 ? (
                <p className="text-caption text-ink-muted py-4 text-center">
                  No rooms matching the selected filter in this tier.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roomsToShow.map((room) => {
                    const occupied = room.beds.filter((b) => b.status === "OCCUPIED").length;
                    const isFull = occupied === room.capacity;
                    const isPartial = occupied > 0 && !isFull;

                    return (
                      <div
                        key={room.id}
                        className="border border-border bg-canvas-subtle p-4 space-y-3 hover:border-zinc-400 transition-colors"
                      >
                        <div className="flex items-start justify-between pb-2 border-b border-border">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-ink-muted">
                              Suite
                            </span>
                            <h4 className="font-serif text-subhead text-ink font-semibold">
                              #{room.roomNumber}
                            </h4>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono border border-border bg-canvas-surface px-1.5 py-0.5 text-ink-muted">
                              {room.type}
                            </span>
                            <p className="text-caption font-medium text-brass mt-0.5">
                              {formatCurrency(room.monthlyRate)}/mo
                            </p>
                          </div>
                        </div>

                        {/* Bed slots */}
                        <div className="space-y-2">
                          <p className="text-[11px] font-mono text-ink-muted uppercase">
                            Bed Allocation ({occupied}/{room.capacity}):
                          </p>
                          <div className="grid grid-cols-1 gap-1.5">
                            {room.beds.map((bed) => (
                              <div
                                key={bed.id}
                                className={`p-2 border flex items-center justify-between text-caption ${
                                  bed.status === "OCCUPIED"
                                    ? "bg-zinc-100 border-zinc-200"
                                    : "bg-canvas-surface border-border"
                                }`}
                              >
                                <div>
                                  <span className="font-mono font-medium text-ink mr-2">
                                    {bed.bedLabel}
                                  </span>
                                  <span className="text-ink-muted text-[11px]">
                                    {bed.status === "OCCUPIED"
                                      ? bed.studentName
                                      : "Available for Allocation"}
                                  </span>
                                </div>

                                <div>
                                  {bed.status === "OCCUPIED" ? (
                                    <button
                                      onClick={() => deallocateBed(bed.id)}
                                      className="text-[10px] font-mono text-red-600 hover:underline"
                                      title="Release Bed Slot"
                                    >
                                      Deallocate
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setAllocatingBedId(bed.id);
                                        setSelectedStudentId(students[0]?.id || "");
                                      }}
                                      className="text-[10px] font-mono text-brass hover:underline inline-flex items-center gap-1"
                                    >
                                      <UserPlus className="w-3 h-3" />
                                      <span>Allocate</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border flex justify-between items-center text-[11px] font-mono">
                          <span className="text-ink-muted">Status:</span>
                          <span
                            className={`font-medium ${
                              isFull
                                ? "text-status-occupied"
                                : isPartial
                                ? "text-status-partial"
                                : "text-status-vacant"
                            }`}
                          >
                            {isFull
                              ? "Fully Occupied"
                              : isPartial
                              ? "Partially Occupied"
                              : "Vacant"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Floor Modal */}
      {showAddFloorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Register New Architectural Tier (Floor)
              </h3>
              <button
                onClick={() => setShowAddFloorModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFloor} className="space-y-4">
              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Floor Name (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fourth Tier (Executive Suite)"
                  value={newFloorName}
                  onChange={(e) => setNewFloorName(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Floor Name (Urdu)
                </label>
                <input
                  type="text"
                  placeholder="e.g. چوتھی منزل (ایگزیکٹو سویٹ)"
                  value={newFloorNameUrdu}
                  onChange={(e) => setNewFloorNameUrdu(e.target.value)}
                  dir="rtl"
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddFloorModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Save Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Register New Suite Chamber
              </h3>
              <button
                onClick={() => setShowAddRoomModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Architectural Tier (Floor) *
                </label>
                <select
                  value={targetFloorId}
                  onChange={(e) => setTargetFloorId(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                >
                  {floors.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Chamber Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 105"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Layout Type *
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setRoomType(val);
                      if (val === "SINGLE") setCapacity(1);
                      if (val === "DOUBLE") setCapacity(2);
                      if (val === "TRIPLE") setCapacity(3);
                      if (val === "DORMITORY") setCapacity(4);
                    }}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  >
                    <option value="SINGLE">Single Executive</option>
                    <option value="DOUBLE">Double Scholars</option>
                    <option value="TRIPLE">Triple Residency</option>
                    <option value="DORMITORY">Fellowship Dormitory</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Bed Capacity
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Monthly Tariff (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    value={monthlyRate}
                    onChange={(e) => setMonthlyRate(Number(e.target.value))}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddRoomModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Commit Chamber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bed Allocation Modal */}
      {allocatingBedId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                {t.btnConfirmBedAllocation}
              </h3>
              <button
                onClick={() => setAllocatingBedId(null)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-caption font-medium text-ink mb-1.5">
                  Select Enrolled Resident to Allocate:
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                >
                  {students.map((std) => (
                    <option key={std.id} value={std.id}>
                      {std.name} — {std.institution.split(" - ")[0]} (Current: #{std.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-canvas-subtle border border-border text-caption text-ink-muted">
                Assigning this bed slot will immediately update the cadastral occupancy records and link monthly fee challans to this chamber.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  onClick={() => setAllocatingBedId(null)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBedAllocation}
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Confirm Allocation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
