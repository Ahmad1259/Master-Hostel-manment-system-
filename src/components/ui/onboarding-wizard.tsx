"use client";

import React, { useState } from "react";
import { useApp } from "../../lib/store";
import { Building2, Layers, UserPlus, CheckCircle2, ArrowRight, ArrowLeft, X } from "lucide-react";

export function OnboardingWizard() {
  const { isOnboardingOpen, setIsOnboardingOpen, addRoom, addStudent, floors, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Hostel Details
  const [hostelData, setHostelData] = useState({
    name: "The Grand Pavilion & Scholars Residency",
    city: "Lahore",
    neighborhood: "Gulberg III",
    totalCapacityTarget: 60,
  });

  // Step 2: Add Initial Room
  const [roomData, setRoomData] = useState({
    roomNumber: "301",
    floorId: floors[0]?.id || "floor-1",
    capacity: 2,
    monthlyRate: 34000,
    type: "DOUBLE" as const,
    isAc: true,
  });

  // Step 3: Add First Resident
  const [studentData, setStudentData] = useState({
    name: "Usman Ghani",
    fatherName: "Tariq Ghani",
    cnic: "35201-9401827-3",
    phone: "0300-4819201",
    guardianPhone: "0321-9876543",
    institution: "LUMS",
    admissionDate: new Date().toISOString().split("T")[0],
    monthlyRate: 34000,
  });

  if (!isOnboardingOpen) return null;

  const handleFinish = () => {
    // Commit room
    addRoom(
      roomData.floorId,
      roomData.roomNumber,
      roomData.capacity,
      roomData.monthlyRate,
      roomData.type,
      roomData.isAc
    );

    // Commit student
    addStudent({
      ...studentData,
      status: "ACTIVE",
      floorNumber: 3,
      roomNumber: roomData.roomNumber,
      bedLabel: "Bed A",
      roomId: `room-${roomData.roomNumber}`,
      pendingArrears: 0,
      propertyId: "prop-gulberg",
    });

    setIsOnboardingOpen(false);
    showToast("🎉 Onboarding Completed! Initial chambers and resident ready.", "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Wizard Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Hostel Setup Wizard • Step {step} of 3
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {step === 1 && "1. Commercial Property Identity"}
              {step === 2 && "2. Configure First Chamber"}
              {step === 3 && "3. Register First Resident"}
            </h3>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`h-1.5 rounded-full transition-colors ${
              step >= 1 ? "bg-blue-600" : "bg-slate-200"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-colors ${
              step >= 2 ? "bg-blue-600" : "bg-slate-200"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-colors ${
              step === 3 ? "bg-blue-600" : "bg-slate-200"
            }`}
          />
        </div>

        {/* Step 1 Form */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Commercial Hostel Name
              </label>
              <input
                type="text"
                value={hostelData.name}
                onChange={(e) => setHostelData({ ...hostelData, name: e.target.value })}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={hostelData.city}
                  onChange={(e) => setHostelData({ ...hostelData, city: e.target.value })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Neighborhood / Sector
                </label>
                <input
                  type="text"
                  value={hostelData.neighborhood}
                  onChange={(e) => setHostelData({ ...hostelData, neighborhood: e.target.value })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Capacity (Beds)
              </label>
              <input
                type="number"
                value={hostelData.totalCapacityTarget}
                onChange={(e) => setHostelData({ ...hostelData, totalCapacityTarget: Number(e.target.value) })}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent tabular-nums"
              />
            </div>
          </div>
        )}

        {/* Step 2 Form */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chamber / Room Number
                </label>
                <input
                  type="text"
                  value={roomData.roomNumber}
                  onChange={(e) => setRoomData({ ...roomData, roomNumber: e.target.value })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Room Type
                </label>
                <select
                  value={roomData.type}
                  onChange={(e) => setRoomData({ ...roomData, type: e.target.value as any })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="SINGLE">Single Private</option>
                  <option value="DOUBLE">Double Sharing</option>
                  <option value="TRIPLE">Triple Sharing</option>
                  <option value="DORMITORY">Quad / Dormitory</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Monthly Rent Rate (PKR)
                </label>
                <input
                  type="number"
                  value={roomData.monthlyRate}
                  onChange={(e) => setRoomData({ ...roomData, monthlyRate: Number(e.target.value) })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Climate Control
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="ac-toggle"
                    checked={roomData.isAc}
                    onChange={(e) => setRoomData({ ...roomData, isAc: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="ac-toggle" className="text-xs text-slate-700 font-medium">
                    Equipped with Inverter AC
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Form */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resident Full Name
                </label>
                <input
                  type="text"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pakistani CNIC
                </label>
                <input
                  type="text"
                  value={studentData.cnic}
                  onChange={(e) => setStudentData({ ...studentData, cnic: e.target.value })}
                  placeholder="35201-XXXXXXX-X"
                  className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={studentData.phone}
                  onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                  placeholder="0300-XXXXXXX"
                  className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  value={studentData.institution}
                  onChange={(e) => setStudentData({ ...studentData, institution: e.target.value })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Setup &amp; Enter Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
