"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlayVariants, modalDialogVariants, EASE_IN_OUT, EASE_OUT_EXPO } from "../../lib/motion";
import { BedItem, RoomItem, FloorItem } from "../../lib/mock-data";
import { MotionButton } from "./motion-button";
import { ArrowRight, Bed, DoorOpen, X, Check } from "lucide-react";

interface BedArcTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  bed: BedItem;
  currentRoom: RoomItem;
  floors: FloorItem[];
  onTransfer: (targetRoomId: string, targetBedLabel: string) => void;
}

/**
 * Rule 7: Arcs for object movement - moving items like drag bed to another room should follow an arc, not straight line
 * Rule 9: Ease-in-out for moves
 * Rule 10: Start popovers at 0.95
 * Rule 15: Make exits 20% shorter
 */
export function BedArcTransferModal({
  isOpen,
  onClose,
  bed,
  currentRoom,
  floors,
  onTransfer,
}: BedArcTransferModalProps) {
  const [selectedTargetRoomId, setSelectedTargetRoomId] = useState<string>("");
  const [isArcFlying, setIsArcFlying] = useState<boolean>(false);

  // Available candidate rooms
  const allCandidateRooms: { room: RoomItem; floorName: string }[] = [];
  floors.forEach((f) => {
    f.rooms.forEach((r) => {
      if (r.id !== currentRoom.id) {
        allCandidateRooms.push({ room: r, floorName: f.name });
      }
    });
  });

  const targetRoom = allCandidateRooms.find((c) => c.room.id === selectedTargetRoomId)?.room;

  const handleStartTransfer = () => {
    if (!selectedTargetRoomId) return;

    // Trigger Rule 7: Arc Motion animation
    setIsArcFlying(true);

    setTimeout(() => {
      onTransfer(selectedTargetRoomId, "Bed A");
      setIsArcFlying(false);
      onClose();
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          <motion.div
            variants={modalDialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Motion Arc Relocation
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Transfer Bed &amp; Student Allocation
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Arc Flight Stage (Rule 7 & Rule 9) */}
            <div className="relative h-28 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between overflow-hidden">
              {/* Origin Room Slot */}
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-300 shadow-xs flex items-center justify-center text-slate-700">
                  <DoorOpen className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  Room {currentRoom.roomNumber}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {bed.bedLabel}
                </span>
              </div>

              {/* Arc Trajectory Visualization */}
              <div className="relative flex-1 px-4 flex items-center justify-center">
                <svg className="w-full h-16 overflow-visible" viewBox="0 0 200 60">
                  <path
                    d="M 10 40 Q 100 -20 190 40"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Active Arc Trace when flying */}
                  {isArcFlying && (
                    <motion.path
                      d="M 10 40 Q 100 -20 190 40"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: EASE_IN_OUT }}
                    />
                  )}
                </svg>

                {/* Flying Bed Token following Rule 7: Arc movement, Rule 9: ease-in-out */}
                <motion.div
                  animate={
                    isArcFlying
                      ? {
                          x: [0, 80, 155],
                          y: [0, -38, 0], // Parabolic / curved arc offset!
                          scale: [1, 1.15, 1],
                        }
                      : { x: 0, y: 0, scale: 1 }
                  }
                  transition={{
                    duration: 0.65,
                    ease: EASE_IN_OUT, // Rule 9: Ease-in-out for moves
                  }}
                  className="absolute left-6 top-7 z-20 flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-md"
                >
                  <Bed className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Destination Room Slot */}
              <div className="flex flex-col items-center gap-1 z-10">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                    targetRoom
                      ? "bg-blue-50 border-blue-400 text-blue-600 shadow-xs"
                      : "bg-slate-100 border-dashed border-slate-300 text-slate-400"
                  }`}
                >
                  <DoorOpen className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  {targetRoom ? `Room ${targetRoom.roomNumber}` : "Select Room"}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {targetRoom ? `${targetRoom.type}` : "Destination"}
                </span>
              </div>
            </div>

            {/* Selection Form */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Target Destination Chamber
                </label>
                <select
                  value={selectedTargetRoomId}
                  onChange={(e) => setSelectedTargetRoomId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">-- Choose destination chamber --</option>
                  {allCandidateRooms.map(({ room, floorName }) => (
                    <option key={room.id} value={room.id}>
                      Room {room.roomNumber} ({room.type}) • {floorName} • Rs{" "}
                      {room.monthlyRate.toLocaleString()}/mo
                    </option>
                  ))}
                </select>
              </div>

              {bed.studentName && (
                <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-slate-700">
                  <span className="font-semibold block text-blue-900">
                    Resident to relocate:
                  </span>
                  <span className="text-xs">
                    {bed.studentName} ({bed.bedLabel} of Room {currentRoom.roomNumber})
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <MotionButton variant="outline" size="sm" onClick={onClose}>
                Cancel
              </MotionButton>
              <MotionButton
                variant="primary"
                size="sm"
                disabled={!selectedTargetRoomId || isArcFlying}
                onClick={handleStartTransfer}
              >
                <span>Relocate via Arc Move</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MotionButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
