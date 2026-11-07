"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "../lib/store";
import { formatCurrency } from "../lib/utils";
import {
  Building2,
  Users,
  Check,
  ChevronRight,
  Shield,
  Zap,
  Wifi,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { RoomItem, BedItem } from "../lib/mock-data";

interface LiveRoomExplorerProps {
  onSelectBedForBooking?: (room: RoomItem, bed: BedItem) => void;
}

export function LiveRoomExplorer({ onSelectBedForBooking }: LiveRoomExplorerProps) {
  const { floors, currentBranch, branches, setCurrentBranchId, currentBranchId, language } = useApp();

  const [selectedFloorId, setSelectedFloorId] = useState<string>("all");
  const [selectedRoomType, setSelectedRoomType] = useState<string>("all");
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<(RoomItem & { floorName?: string }) | null>(null);
  const [selectedBed, setSelectedBed] = useState<BedItem | null>(null);

  // Filter rooms according to user selection
  const filteredRooms = useMemo(() => {
    const allRooms: (RoomItem & { floorName: string })[] = [];
    floors.forEach((floor) => {
      if (selectedFloorId !== "all" && floor.id !== selectedFloorId) return;
      floor.rooms.forEach((room) => {
        if (selectedRoomType !== "all" && room.type !== selectedRoomType) return;
        if (showAvailableOnly) {
          const hasAvailable = room.beds.some((b) => b.status === "AVAILABLE");
          if (!hasAvailable) return;
        }
        allRooms.push({ ...room, floorName: floor.name });
      });
    });
    return allRooms;
  }, [floors, selectedFloorId, selectedRoomType, showAvailableOnly]);

  const handleBedClick = (room: RoomItem & { floorName?: string }, bed: BedItem) => {
    setSelectedRoom(room);
    setSelectedBed(bed);
  };

  const handleBookNow = () => {
    if (selectedRoom && selectedBed && onSelectBedForBooking) {
      onSelectBedForBooking(selectedRoom, selectedBed);
    } else {
      const el = document.getElementById("booking-form");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Product Console Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Live Room &amp; Bed Availability
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Real-time occupancy and reservation across verified student chambers.
          </p>
        </div>

        {/* Branch / Property Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Campus:
          </label>
          <select
            value={currentBranchId}
            onChange={(e) => setCurrentBranchId(e.target.value)}
            className="text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-slate-100">
        {/* Floor Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 font-medium mr-1">Floor:</span>
          <button
            onClick={() => setSelectedFloorId("all")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedFloorId === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Floors
          </button>
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setSelectedFloorId(floor.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedFloorId === floor.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {floor.name.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Room Type & Availability Toggles */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Type:</span>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Room Types</option>
              <option value="SINGLE">Single Suites</option>
              <option value="DOUBLE">Double Sharing</option>
              <option value="TRIPLE">Triple Sharing</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span>Available Beds Only</span>
          </label>
        </div>
      </div>

      {/* Main Product Layout: Grid + Side Inspection Dossier */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rooms Listing (2 Columns) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredRooms.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-sm font-medium text-slate-700">No rooms match the selected filters.</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting floor or room type filters.</p>
            </div>
          ) : (
            filteredRooms.map((room) => {
              const availableCount = room.beds.filter((b) => b.status === "AVAILABLE").length;
              const isSelected = selectedRoom?.id === room.id;

              return (
                <div
                  key={room.id}
                  onClick={() => {
                    setSelectedRoom(room);
                    const firstAvail = room.beds.find((b) => b.status === "AVAILABLE") || room.beds[0];
                    setSelectedBed(firstAvail);
                  }}
                  className={`border rounded-xl p-4 transition-all cursor-pointer relative bg-white ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-600/10 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  {/* Card Header: Room #, Floor, Price */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">
                          Room {room.roomNumber}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {room.type}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        {room.floorName}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {formatCurrency(room.monthlyRate)}
                      </span>
                      <span className="text-xs text-slate-500 block">/ month</span>
                    </div>
                  </div>

                  {/* Bed Slots Grid */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                      <span className="font-medium">Beds:</span>
                      <span
                        className={`font-semibold ${
                          availableCount > 0 ? "text-emerald-700" : "text-slate-500"
                        }`}
                      >
                        {availableCount > 0
                          ? `${availableCount} of ${room.capacity} Available`
                          : "Fully Occupied"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {room.beds.map((bed) => {
                        const isBedActive = selectedBed?.id === bed.id;
                        const isAvail = bed.status === "AVAILABLE";

                        return (
                          <button
                            key={bed.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBedClick(room, bed);
                            }}
                            className={`p-2.5 rounded-lg border text-left transition-all ${
                              isBedActive
                                ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                                : isAvail
                                ? "border-emerald-200 bg-emerald-50/30 hover:border-emerald-300"
                                : "border-slate-200 bg-slate-50 opacity-75"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800">
                                {bed.bedLabel}
                              </span>
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isAvail ? "bg-emerald-600" : "bg-slate-400"
                                }`}
                              />
                            </div>
                            <span className="text-xs text-slate-500 block truncate mt-1">
                              {isAvail ? "Vacant" : bed.studentName || "Occupied"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Side Panel: Selected Room & Bed Details (Enlarged Feature) */}
        <div className="border border-slate-200 bg-slate-50/60 rounded-xl p-5 flex flex-col justify-between shadow-xs">
          {selectedRoom && selectedBed ? (
            <div className="space-y-5">
              {/* Selected Room Header */}
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
                  Selection Summary
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Room {selectedRoom.roomNumber} • {selectedBed.bedLabel}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {selectedRoom.type} Suite{selectedRoom.floorName ? ` • ${selectedRoom.floorName}` : ""}
                </p>
              </div>

              {/* Status and Pricing */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Bed Status:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-xs ${
                      selectedBed.status === "AVAILABLE"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {selectedBed.status === "AVAILABLE" ? "Available for Move-in" : "Currently Occupied"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Monthly Rent:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatCurrency(selectedRoom.monthlyRate)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Security Deposit:</span>
                  <span className="text-slate-700 tabular-nums">
                    {formatCurrency(selectedRoom.monthlyRate)} (Refundable)
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-2">
                  <span className="text-slate-600">Utility Package:</span>
                  <span className="text-emerald-700 font-medium">Included (Generator + Solar)</span>
                </div>
              </div>

              {/* Key Features Included */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Chamber Amenities:
                </span>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Daikin inverter air-conditioning &amp; heating</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Acoustic double-glazed windows for quiet study</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Solid wood study desk &amp; personal wardrobe</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Attached bathroom with 24/7 hot water</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>3 daily home-cooked meals included</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleBookNow}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 px-4 rounded-lg shadow-xs transition-colors"
              >
                <span>Reserve {selectedBed.bedLabel} in Room {selectedRoom.roomNumber}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-20 text-center space-y-3">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Select Any Room to Inspect</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click on a room card or specific bed to view full pricing, features, and reserve your spot.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
