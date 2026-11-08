"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../../lib/store";
import { formatCurrency } from "../../../lib/utils";
import { RoomItem, BedItem, FloorItem } from "../../../lib/mock-data";
import { DestructiveConfirmModal } from "../../../components/ui/destructive-modal";
import { BedArcTransferModal } from "../../../components/motion/bed-arc-transfer-modal";
import { MotionButton } from "../../../components/motion/motion-button";
import {
  pageEntranceVariants,
  staggerListVariants,
  staggerRowVariants,
  EASE_IN_OUT,
} from "../../../lib/motion";
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
  Trash2,
  Wind,
  Check,
  DoorOpen,
  DollarSign,
} from "lucide-react";

export default function InventoryPage() {
  const {
    floors,
    addFloor,
    addRoom,
    deleteRoom,
    allocateBed,
    deallocateBed,
    students,
    currentBranch,
    showToast,
  } = useApp();

  const [selectedFloorId, setSelectedFloorId] = useState<string>("ALL");
  const [acFilter, setAcFilter] = useState<string>("ALL");
  const [occupancyFilter, setOccupancyFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showAddFloorModal, setShowAddFloorModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<RoomItem | null>(null);
  const [arcTransferTarget, setArcTransferTarget] = useState<{ bed: BedItem; room: RoomItem } | null>(null);

  // New Room Form State
  const [newRoom, setNewRoom] = useState({
    floorId: floors[0]?.id || "",
    roomNumber: "",
    capacity: 2,
    monthlyRate: 32000,
    type: "DOUBLE" as "SINGLE" | "DOUBLE" | "TRIPLE" | "DORMITORY",
    isAc: true,
  });

  // New Floor Form State
  const [newFloorName, setNewFloorName] = useState("");
  const [newFloorNameUrdu, setNewFloorNameUrdu] = useState("");

  // Bed Allocation Modal (UX Pattern #1: Optimistic UI updates)
  const [selectedBedForAllocation, setSelectedBedForAllocation] = useState<BedItem | null>(null);
  const [selectedStudentForBed, setSelectedStudentForBed] = useState<string>("");

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    const list: (RoomItem & { floorName: string })[] = [];
    floors.forEach((floor) => {
      if (selectedFloorId !== "ALL" && floor.id !== selectedFloorId) return;

      floor.rooms.forEach((room) => {
        // AC filter
        if (acFilter === "AC" && !room.isAc) return;
        if (acFilter === "NON_AC" && room.isAc) return;

        // Occupancy filter
        const occupied = room.beds.filter((b) => b.status === "OCCUPIED").length;
        if (occupancyFilter === "VACANT" && occupied === room.capacity) return;
        if (occupancyFilter === "FULL" && occupied < room.capacity) return;

        // Search query
        if (searchQuery && !room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())) {
          return;
        }

        list.push({ ...room, floorName: floor.name });
      });
    });
    return list;
  }, [floors, selectedFloorId, acFilter, occupancyFilter, searchQuery]);

  // Handle Add Room Submit
  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoom.roomNumber || !newRoom.floorId) return;

    addRoom(
      newRoom.floorId,
      newRoom.roomNumber,
      newRoom.capacity,
      newRoom.monthlyRate,
      newRoom.type,
      newRoom.isAc
    );

    setShowAddRoomModal(false);
    setNewRoom({
      floorId: floors[0]?.id || "",
      roomNumber: "",
      capacity: 2,
      monthlyRate: 32000,
      type: "DOUBLE",
      isAc: true,
    });
  };

  // Optimistic Bed Allocation (UX Pattern #1)
  const handleConfirmBedAllocation = () => {
    if (!selectedBedForAllocation || !selectedStudentForBed) return;
    const std = students.find((s) => s.id === selectedStudentForBed);
    if (!std) return;

    // Optimistically update instantly
    allocateBed(selectedBedForAllocation.id, std.id, std.name);
    showToast(`Bed assigned to ${std.name} instantly.`, "success");
    setSelectedBedForAllocation(null);
    setSelectedStudentForBed("");
  };

  // Optimistic Bed Deallocation (UX Pattern #1)
  const handleVacateBed = (bed: BedItem) => {
    deallocateBed(bed.id);
    showToast(`Bed ${bed.bedLabel} is now vacant.`, "info");
  };

  const handleArcTransfer = (targetRoomId: string) => {
    if (!arcTransferTarget) return;
    const { bed } = arcTransferTarget;
    if (!bed.studentId || !bed.studentName) return;

    deallocateBed(bed.id);

    let targetBedId: string | null = null;
    let targetRoomNum = "";
    floors.forEach((f) => {
      f.rooms.forEach((r) => {
        if (r.id === targetRoomId) {
          targetRoomNum = r.roomNumber;
          const avail = r.beds.find((b) => b.status === "AVAILABLE");
          if (avail) targetBedId = avail.id;
        }
      });
    });

    if (targetBedId) {
      allocateBed(targetBedId, bed.studentId, bed.studentName);
      showToast(`Arc transfer complete: ${bed.studentName} relocated to Room ${targetRoomNum}.`, "success");
    } else {
      showToast("Selected chamber has no available beds.", "warning");
    }
  };

  return (
    <motion.div
      variants={pageEntranceVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
            Chambers &amp; Accommodations
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Rooms &amp; Beds Inventory
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Capacity management, climate controls, and real-time bed slot allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <MotionButton
            variant="outline"
            size="sm"
            onClick={() => setShowAddFloorModal(true)}
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span>Add Floor</span>
          </MotionButton>

          <MotionButton
            variant="primary"
            size="sm"
            onClick={() => setShowAddRoomModal(true)}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Chamber</span>
          </MotionButton>
        </div>
      </div>

      {/* Filter and Search Bar (UX Pattern #12) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search room number..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Floor filter */}
          <select
            value={selectedFloorId}
            onChange={(e) => setSelectedFloorId(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Floors ({floors.length})</option>
            {floors.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          {/* AC / Non-AC filter */}
          <select
            value={acFilter}
            onChange={(e) => setAcFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Climate Types</option>
            <option value="AC">Air-Conditioned (Inverter)</option>
            <option value="NON_AC">Non-AC (Regular)</option>
          </select>

          {/* Occupancy filter */}
          <select
            value={occupancyFilter}
            onChange={(e) => setOccupancyFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Availability</option>
            <option value="VACANT">Has Vacant Beds</option>
            <option value="FULL">Fully Occupied</option>
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          <DoorOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800">No chambers matching filters</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the floor or climate filter.</p>
        </div>
      ) : (
        <motion.div
          variants={staggerListVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredRooms.map((room) => {
            const occupiedBedsCount = room.beds.filter((b) => b.status === "OCCUPIED").length;
            const isFull = occupiedBedsCount === room.capacity;

            return (
              <motion.div
                key={room.id}
                variants={staggerRowVariants}
                layout
                transition={{ layout: { ease: EASE_IN_OUT, duration: 0.22 } }}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* Top Bar: Room No, Floor, AC indicator & Delete */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          Room {room.roomNumber}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {room.type}
                        </span>
                        {room.isAc ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            <Wind className="w-2.5 h-2.5 text-blue-600" />
                            <span>AC</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                            Non-AC
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        {room.floorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setRoomToDelete(room)}
                        className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Chamber"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Pricing and Capacity Status */}
                  <div className="mt-3 py-2 px-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Monthly Rent
                      </span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {formatCurrency(room.monthlyRate)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Occupancy
                      </span>
                      <span
                        className={`font-semibold tabular-nums ${
                          isFull ? "text-amber-600" : "text-emerald-600"
                        }`}
                      >
                        {occupiedBedsCount} of {room.capacity} Beds
                      </span>
                    </div>
                  </div>

                  {/* Bed Slots Grid (Optimistic UI Pattern #1) */}
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Bed Slots:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {room.beds.map((bed) => {
                        const isOccupied = bed.status === "OCCUPIED";
                        return (
                          <div
                            key={bed.id}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                              isOccupied
                                ? "bg-slate-50 border-slate-200 text-slate-700"
                                : "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isOccupied ? "bg-slate-400" : "bg-emerald-600"
                                }`}
                              />
                              <span className="font-bold">{bed.bedLabel}</span>
                              {isOccupied && bed.studentName ? (
                                <span className="text-[11px] text-slate-600 truncate max-w-28">
                                  • {bed.studentName}
                                </span>
                              ) : (
                                <span className="text-[11px] text-emerald-700 font-semibold">
                                  Vacant
                                </span>
                              )}
                            </div>

                            {/* Optimistic Allocation/Vacate Buttons with Rule 7 Arc Transfer */}
                            {isOccupied ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setArcTransferTarget({ bed, room })}
                                  className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[10px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                                  title="Relocate via Arc Motion (Rule 7)"
                                >
                                  <span>Arc Move</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleVacateBed(bed)}
                                  className="text-[10px] font-semibold text-slate-400 hover:text-red-600 underline"
                                >
                                  Vacate
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setSelectedBedForAllocation(bed)}
                                className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-semibold shadow-2xs"
                              >
                                Assign Bed
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Bed Assignment Modal (UX Pattern #1) */}
      {selectedBedForAllocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Assign {selectedBedForAllocation.bedLabel} to Resident
              </h3>
              <button
                onClick={() => setSelectedBedForAllocation(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Select Active Resident:
              </label>
              <select
                value={selectedStudentForBed}
                onChange={(e) => setSelectedStudentForBed(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">-- Choose Resident --</option>
                {students
                  .filter((s) => s.status === "ACTIVE")
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.cnic})
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedBedForAllocation(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedStudentForBed}
                onClick={handleConfirmBedAllocation}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs"
              >
                Assign Instantly
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Chamber Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Chamber</h3>
              <button
                onClick={() => setShowAddRoomModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRoom} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Building Floor</label>
                <select
                  value={newRoom.floorId}
                  onChange={(e) => setNewRoom({ ...newRoom, floorId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  <label className="block font-semibold text-slate-700 mb-1">Room Number *</label>
                  <input
                    type="text"
                    required
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                    placeholder="e.g. 204"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Room Type</label>
                  <select
                    value={newRoom.type}
                    onChange={(e) => {
                      const type = e.target.value as any;
                      const cap = type === "SINGLE" ? 1 : type === "DOUBLE" ? 2 : type === "TRIPLE" ? 3 : 4;
                      setNewRoom({ ...newRoom, type, capacity: cap });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="SINGLE">Single</option>
                    <option value="DOUBLE">Double</option>
                    <option value="TRIPLE">Triple</option>
                    <option value="DORMITORY">Dormitory</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Monthly Rent (PKR)</label>
                  <input
                    type="number"
                    value={newRoom.monthlyRate}
                    onChange={(e) => setNewRoom({ ...newRoom, monthlyRate: Number(e.target.value) })}
                    className="w-full font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Climate</label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="ac-check"
                      checked={newRoom.isAc}
                      onChange={(e) => setNewRoom({ ...newRoom, isAc: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <label htmlFor="ac-check" className="text-slate-700 font-medium">
                      Inverter AC
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddRoomModal(false)}
                  className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Save Chamber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Floor Modal */}
      {showAddFloorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Building Floor</h3>
              <button
                onClick={() => setShowAddFloorModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newFloorName) return;
                addFloor(newFloorName, newFloorNameUrdu || newFloorName);
                setShowAddFloorModal(false);
                setNewFloorName("");
                setNewFloorNameUrdu("");
                showToast(`Floor "${newFloorName}" added.`, "success");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Floor Name (English)</label>
                <input
                  type="text"
                  required
                  value={newFloorName}
                  onChange={(e) => setNewFloorName(e.target.value)}
                  placeholder="e.g. Third Floor (Scholars Attic)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Floor Name (Urdu)</label>
                <input
                  type="text"
                  value={newFloorNameUrdu}
                  onChange={(e) => setNewFloorNameUrdu(e.target.value)}
                  placeholder="e.g. تیسری منزل"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddFloorModal(false)}
                  className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Add Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Destructive Delete Room Confirmation Modal (UX Pattern #19) */}
      <DestructiveConfirmModal
        isOpen={!!roomToDelete}
        onClose={() => setRoomToDelete(null)}
        onConfirm={() => {
          if (roomToDelete) {
            deleteRoom(roomToDelete.id);
            setRoomToDelete(null);
          }
        }}
        title="Delete Chamber from Inventory"
        description="Are you sure you want to permanently delete this room? Any attached bed records and allocations will be destroyed."
        itemName={roomToDelete ? `Room ${roomToDelete.roomNumber} (${roomToDelete.type})` : undefined}
        confirmButtonText="Delete Chamber"
      />

      {/* Rule 7 & 9: Bed Arc Relocation Modal */}
      {arcTransferTarget && (
        <BedArcTransferModal
          isOpen={!!arcTransferTarget}
          onClose={() => setArcTransferTarget(null)}
          bed={arcTransferTarget.bed}
          currentRoom={arcTransferTarget.room}
          floors={floors}
          onTransfer={handleArcTransfer}
        />
      )}
    </motion.div>
  );
}
