"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import { StudentItem } from "../../../lib/mock-data";
import { formatCurrency, formatDate, formatCnic } from "../../../lib/utils";
import {
  Users,
  Search,
  Filter,
  Plus,
  UserCheck,
  Building,
  Phone,
  FileText,
  ArrowRightLeft,
  X,
  CreditCard,
  GraduationCap,
  Download,
} from "lucide-react";

export default function StudentsPage() {
  const {
    students,
    addStudent,
    transferStudentRoom,
    floors,
    t,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [floorFilter, setFloorFilter] = useState<string>("ALL");

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [transferTargetStudent, setTransferTargetStudent] = useState<StudentItem | null>(null);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    phone: "",
    guardianPhone: "",
    institution: "",
    admissionDate: new Date().toISOString().split("T")[0],
    status: "ACTIVE" as const,
    floorNumber: 1,
    roomNumber: "102",
    bedLabel: "Bed B",
    roomId: "room-102",
    monthlyRate: 32000,
    pendingArrears: 0,
    propertyId: "prop-gulberg",
  });

  // Transfer Form State
  const [transferRoomNumber, setTransferRoomNumber] = useState("");
  const [transferBedLabel, setTransferBedLabel] = useState("Bed A");
  const [transferRate, setTransferRate] = useState(32000);

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.cnic) return;
    addStudent(newStudent);
    setShowAddStudentModal(false);
    setNewStudent({
      name: "",
      fatherName: "",
      cnic: "",
      phone: "",
      guardianPhone: "",
      institution: "",
      admissionDate: new Date().toISOString().split("T")[0],
      status: "ACTIVE",
      floorNumber: 1,
      roomNumber: "102",
      bedLabel: "Bed B",
      roomId: "room-102",
      monthlyRate: 32000,
      pendingArrears: 0,
      propertyId: "prop-gulberg",
    });
  };

  const handleConfirmTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferTargetStudent || !transferRoomNumber) return;
    transferStudentRoom(
      transferTargetStudent.id,
      transferRoomNumber,
      transferBedLabel,
      transferRate
    );
    setTransferTargetStudent(null);
  };

  // Filter and search computation
  const filteredStudents = students.filter((std) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      std.name.toLowerCase().includes(query) ||
      std.cnic.toLowerCase().includes(query) ||
      std.phone.toLowerCase().includes(query) ||
      std.roomNumber.toLowerCase().includes(query) ||
      std.institution.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "ALL" || std.status === statusFilter;
    const matchesFloor = floorFilter === "ALL" || std.floorNumber.toString() === floorFilter;

    return matchesSearch && matchesStatus && matchesFloor;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Father Name",
      "CNIC",
      "Cell Phone",
      "Guardian Phone",
      "Institution",
      "Chamber",
      "Bed",
      "Monthly Tariff",
      "Arrears",
      "Admission Date",
      "Status",
    ];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.name}"`,
      `"${s.fatherName}"`,
      s.cnic,
      s.phone,
      s.guardianPhone,
      `"${s.institution}"`,
      s.roomNumber,
      s.bedLabel,
      s.monthlyRate,
      s.pendingArrears,
      s.admissionDate,
      s.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Resident_Registry_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Module 02 • Resident Directory
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.studentsTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.studentsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddStudentModal(true)}
            className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.btnAddNewStudent}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-canvas-surface p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 stroke-[1.25]" />
          <input
            type="text"
            placeholder="Search by legal name, CNIC, institution, or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-border pl-9 pr-3 py-1.5 text-body bg-canvas focus:outline-hidden focus:border-brass text-ink"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-caption text-ink-muted">Tier:</span>
            <select
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="border border-border bg-canvas px-3 py-1.5 text-caption text-ink"
            >
              <option value="ALL">All Tiers</option>
              {floors.map((f) => (
                <option key={f.id} value={f.floorNumber.toString()}>
                  Floor {f.floorNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-caption text-ink-muted">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-border bg-canvas px-3 py-1.5 text-caption text-ink"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Resident</option>
              <option value="INACTIVE">De-registered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="border border-border bg-canvas-surface overflow-x-auto">
        <table className="w-full text-left text-body border-collapse">
          <thead>
            <tr className="border-b border-border bg-canvas-subtle text-micro font-mono text-ink-muted uppercase">
              <th className="p-3 font-semibold">Resident Dossier</th>
              <th className="p-3 font-semibold">CNIC / B-Form</th>
              <th className="p-3 font-semibold">Contacts</th>
              <th className="p-3 font-semibold">Chamber / Bed</th>
              <th className="p-3 font-semibold">Affiliation</th>
              <th className="p-3 font-semibold">Tariff &amp; Arrears</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-caption text-ink-muted">
                  No resident records match your current filter parameters.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-canvas-subtle/50 transition-colors">
                  <td className="p-3">
                    <p className="font-serif text-subhead font-medium text-ink leading-tight">
                      {student.name}
                    </p>
                    <p className="text-micro text-ink-muted">
                      S/O: {student.fatherName}
                    </p>
                    <span className="inline-block text-micro font-mono uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 mt-1">
                      {student.status}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-caption text-ink">
                    {formatCnic(student.cnic)}
                  </td>

                  <td className="p-3 space-y-0.5 text-caption">
                    <p className="font-mono text-ink flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brass" />
                      <span>{student.phone}</span>
                    </p>
                    <p className="font-mono text-micro text-ink-muted">
                      Guardian: {student.guardianPhone}
                    </p>
                  </td>

                  <td className="p-3 font-mono text-caption">
                    <span className="border border-border bg-canvas-subtle px-2 py-0.5 font-medium text-ink">
                      Suite #{student.roomNumber} ({student.bedLabel})
                    </span>
                    <p className="text-micro text-ink-muted mt-1">
                      Tier {student.floorNumber}
                    </p>
                  </td>

                  <td className="p-3 max-w-xs text-caption text-ink truncate" title={student.institution}>
                    <p className="truncate font-medium">{student.institution}</p>
                    <p className="text-micro text-ink-muted font-mono">
                      Inducted: {formatDate(student.admissionDate)}
                    </p>
                  </td>

                  <td className="p-3 font-mono text-caption">
                    <p className="text-brass font-medium">
                      {formatCurrency(student.monthlyRate)}/mo
                    </p>
                    {student.pendingArrears > 0 ? (
                      <p className="text-micro text-status-unpaid">
                        Arrears: {formatCurrency(student.pendingArrears)}
                      </p>
                    ) : (
                      <p className="text-micro text-status-occupied">
                        Zero Arrears
                      </p>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setTransferTargetStudent(student);
                        setTransferRoomNumber(student.roomNumber);
                        setTransferBedLabel(student.bedLabel);
                        setTransferRate(student.monthlyRate);
                      }}
                      className="inline-flex items-center gap-1 text-micro font-mono border border-border px-2.5 py-1 bg-canvas-surface hover:bg-canvas-subtle text-ink transition-colors"
                      title="Reassign Chamber / Bed"
                    >
                      <ArrowRightLeft className="w-3 h-3 text-brass" />
                      <span>Transfer</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Register Resident Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-canvas-surface border border-border w-full max-w-xl my-8 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Register New Resident Biodata
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Legal Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daniyal Farooq"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Father / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farooq Bashir"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    CNIC / B-Form Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="35201-1928401-7"
                    value={newStudent.cnic}
                    onChange={(e) => setNewStudent({ ...newStudent, cnic: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Primary Cell Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Guardian Emergency Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 321 8492019"
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Academic Institution / Firm
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LUMS, FAST, FC College"
                    value={newStudent.institution}
                    onChange={(e) => setNewStudent({ ...newStudent, institution: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Chamber Suite
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="101"
                    value={newStudent.roomNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, roomNumber: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Bed Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bed A"
                    value={newStudent.bedLabel}
                    onChange={(e) => setNewStudent({ ...newStudent, bedLabel: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Monthly Tariff (Rs.)
                  </label>
                  <input
                    type="number"
                    required
                    value={newStudent.monthlyRate}
                    onChange={(e) => setNewStudent({ ...newStudent, monthlyRate: Number(e.target.value) })}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Save Resident Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Chamber Modal */}
      {transferTargetStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Reassign Chamber &amp; Bed Slot
              </h3>
              <button
                onClick={() => setTransferTargetStudent(null)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmTransfer} className="space-y-4">
              <div className="p-3 bg-canvas-subtle border border-border text-caption space-y-1">
                <p className="font-medium text-ink">Resident: {transferTargetStudent.name}</p>
                <p className="text-ink-muted">Current: Suite #{transferTargetStudent.roomNumber} ({transferTargetStudent.bedLabel})</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    New Suite Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={transferRoomNumber}
                    onChange={(e) => setTransferRoomNumber(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    New Bed Slot *
                  </label>
                  <input
                    type="text"
                    required
                    value={transferBedLabel}
                    onChange={(e) => setTransferBedLabel(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Adjusted Monthly Tariff (Rs.) *
                </label>
                <input
                  type="number"
                  required
                  value={transferRate}
                  onChange={(e) => setTransferRate(Number(e.target.value))}
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setTransferTargetStudent(null)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
