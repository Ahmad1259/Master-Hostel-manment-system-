"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../../lib/store";
import { StudentItem } from "../../../lib/mock-data";
import { formatCurrency, formatDate } from "../../../lib/utils";
import { useDebounce } from "../../../hooks/use-debounce";
import { DataTable, Column } from "../../../components/ui/data-table";
import { TableSkeleton } from "../../../components/ui/skeleton-loaders";
import { DestructiveConfirmModal } from "../../../components/ui/destructive-modal";
import { StudentDetailDrawer } from "../../../components/motion/student-detail-drawer";
import { MotionButton } from "../../../components/motion/motion-button";
import {
  pageEntranceVariants,
  modalOverlayVariants,
  modalDialogVariants,
} from "../../../lib/motion";
import {
  Users,
  Search,
  Filter,
  Plus,
  Send,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  Phone,
  CreditCard,
  Building,
  Check,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";

export default function StudentsPage() {
  const {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    bulkSendRentReminder,
    bulkMarkPaid,
    floors,
    showToast,
  } = useApp();

  // Search & Filtering
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300); // UX Pattern #7
  const [floorFilter, setFloorFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [messFilter, setMessFilter] = useState<string>("ALL");

  // Selection & Bulk Actions (UX Pattern #10)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  // Skeleton Loading simulation on initial render (UX Pattern #2)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<StudentItem | null>(null);
  const [inspectingStudent, setInspectingStudent] = useState<StudentItem | null>(null);

  // New Student Form State with Smart Validation (UX Pattern #9)
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
    roomNumber: "101",
    bedLabel: "Bed A",
    roomId: "room-101",
    monthlyRate: 32000,
    advancePaid: 32000,
    messStatus: "ON" as const,
    messBill: 8500,
    pendingArrears: 0,
    propertyId: "prop-gulberg",
  });

  // Validation rules for inline feedback
  const isCnicValid = /^\d{5}-\d{7}-\d{1}$/.test(newStudent.cnic);
  const isPhoneValid = /^(03\d{2}-\d{7}|03\d{9}|\+92\d{10})$/.test(newStudent.phone);
  const isRentValid = newStudent.monthlyRate >= 5000;

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((std) => {
      // Debounced search
      if (debouncedSearch) {
        const query = debouncedSearch.toLowerCase();
        const matches =
          std.name.toLowerCase().includes(query) ||
          std.cnic.includes(query) ||
          std.roomNumber.toLowerCase().includes(query) ||
          std.phone.includes(query) ||
          std.institution.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Floor filter
      if (floorFilter !== "ALL" && String(std.floorNumber) !== floorFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== "ALL" && std.status !== statusFilter) {
        return false;
      }

      // Mess filter
      if (messFilter !== "ALL" && (std.messStatus || "ON") !== messFilter) {
        return false;
      }

      return true;
    });
  }, [students, debouncedSearch, floorFilter, statusFilter, messFilter]);

  // Handle Add Student Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !isCnicValid || !isPhoneValid || !isRentValid) {
      showToast("Please fill all required fields correctly.", "warning");
      return;
    }

    addStudent(newStudent);
    setShowAddModal(false);
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
      roomNumber: "101",
      bedLabel: "Bed A",
      roomId: "room-101",
      monthlyRate: 32000,
      advancePaid: 32000,
      messStatus: "ON",
      messBill: 8500,
      pendingArrears: 0,
      propertyId: "prop-gulberg",
    });
  };

  // Autosave handler for Editing Student (UX Pattern #6)
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const handleAutosaveField = (field: keyof StudentItem, value: any) => {
    if (!editingStudent) return;
    setSaveStatus("Autosaving...");
    const updated = { ...editingStudent, [field]: value };
    setEditingStudent(updated);

    // Debounce save toast
    setTimeout(() => {
      updateStudent(editingStudent.id, { [field]: value });
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setSaveStatus(`Changes saved at ${timeStr}`);
    }, 400);
  };

  // Reusable Table Columns (UX Pattern #11)
  const columns: Column<StudentItem>[] = [
    {
      key: "name",
      header: "Resident Name",
      sortable: true,
      render: (s) => (
        <motion.div
          layoutId={`student-card-${s.id}`} // Rule 20: shared layoutId
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            {s.name.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight hover:text-blue-600 transition-colors">
              {s.name}
            </span>
            <span className="text-[11px] text-slate-500 block">S/O {s.fatherName}</span>
          </div>
        </motion.div>
      ),
    },
    {
      key: "cnic",
      header: "CNIC",
      sortable: true,
      render: (s) => <span className="font-mono text-xs tabular-nums">{s.cnic}</span>,
    },
    {
      key: "phone",
      header: "Contact",
      render: (s) => (
        <span className="font-mono text-xs text-slate-700 tabular-nums">{s.phone}</span>
      ),
    },
    {
      key: "roomNumber",
      header: "Chamber & Bed",
      sortable: true,
      render: (s) => (
        <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Room {s.roomNumber} ({s.bedLabel})</span>
        </span>
      ),
    },
    {
      key: "admissionDate",
      header: "Enrolled",
      sortable: true,
      render: (s) => <span className="font-mono text-xs tabular-nums">{s.admissionDate}</span>,
    },
    {
      key: "monthlyRate",
      header: "Monthly Rent",
      sortable: true,
      render: (s) => (
        <span className="font-mono font-bold text-slate-900 tabular-nums">
          {formatCurrency(s.monthlyRate)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (s) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            s.status === "ACTIVE"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          {s.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (s) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setEditingStudent(s)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            title="Edit Resident Profile"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setStudentToDelete(s)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete Resident"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      variants={pageEntranceVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Resident Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Registered Student Residents
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Active resident profiles, room assignments, biometric tenancy records. Click any resident to inspect details.
          </p>
        </div>

        <MotionButton
          variant="primary"
          size="md"
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll New Resident</span>
        </MotionButton>
      </div>

      {/* Filter and Search Bar (UX Pattern #7 & #12) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Debounced Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by student name, CNIC, room number, university..."
              className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Advanced Dropdown Filters (UX Pattern #12) */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Floors</option>
              {floors.map((f) => (
                <option key={f.id} value={f.floorNumber}>
                  Floor {f.floorNumber} ({f.name})
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Residents</option>
              <option value="INACTIVE">Inactive / Alumni</option>
            </select>

            <select
              value={messFilter}
              onChange={(e) => setMessFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Mess Tiers</option>
              <option value="ON">Mess Active (ON)</option>
              <option value="OFF">Mess Suspended (OFF)</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions Bar (UX Pattern #10) */}
        {selectedStudentIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-2 font-semibold text-blue-900">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{selectedStudentIds.length} resident(s) selected</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => bulkSendRentReminder(selectedStudentIds)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-300 hover:bg-blue-100/50 text-blue-800 font-semibold rounded-md shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>Bulk Send Rent Reminder</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  bulkMarkPaid(selectedStudentIds);
                  setSelectedStudentIds([]);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bulk Mark Paid</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStudentIds([])}
                className="p-1 text-slate-400 hover:text-slate-600"
                title="Deselect all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Data Table with Skeleton Loader (UX Patterns #2 & #11) */}
      {isLoading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : (
        <DataTable
          data={filteredStudents}
          columns={columns}
          keyExtractor={(s) => s.id}
          selectable={true}
          selectedIds={selectedStudentIds}
          onSelectionChange={setSelectedStudentIds}
          onRowClick={(s) => setInspectingStudent(s)}
          enableRubberBand={true}
          emptyTitle="No residents found"
          emptySubtitle="Try adjusting your search query or floor filter."
          defaultPageSize={10}
        />
      )}

      {/* Enroll Resident Modal with Smart Inline Validation (UX Pattern #9) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Enroll New Student Resident
                </h3>
                <p className="text-xs text-slate-500">
                  Enter student identity, guardian contact, and chamber details.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="e.g. Zaid Bin Tariq"
                    className="w-full text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* CNIC with Smart Validation (UX Pattern #9) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Pakistani CNIC (13 digits) *
                  </label>
                  {newStudent.cnic && (
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        isCnicValid ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isCnicValid ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {isCnicValid ? "Valid format" : "Format: 35201-XXXXXXX-X"}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  value={newStudent.cnic}
                  onChange={(e) => setNewStudent({ ...newStudent, cnic: e.target.value })}
                  placeholder="35201-1234567-1"
                  className={`w-full text-xs font-mono px-3.5 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                    newStudent.cnic && !isCnicValid
                      ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                      : "border-slate-300 focus:ring-blue-600"
                  }`}
                />
              </div>

              {/* Phone with Smart Validation (UX Pattern #9) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Resident Mobile *
                    </label>
                    {newStudent.phone && (
                      <span
                        className={`text-[10px] font-semibold ${
                          isPhoneValid ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {isPhoneValid ? "Valid" : "03XX-XXXXXXX"}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className={`w-full text-xs font-mono px-3.5 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                      newStudent.phone && !isPhoneValid
                        ? "border-red-300 focus:ring-red-500"
                        : "border-slate-300 focus:ring-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Guardian Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                    placeholder="0321-7654321"
                    className="w-full text-xs font-mono px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* University & Room Allocation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.institution}
                    onChange={(e) => setNewStudent({ ...newStudent, institution: e.target.value })}
                    placeholder="e.g. LUMS / FAST / PU"
                    className="w-full text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assigned Room *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.roomNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, roomNumber: e.target.value })}
                    placeholder="e.g. 102"
                    className="w-full text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Rent & Advance Paid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Rent (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newStudent.monthlyRate}
                    onChange={(e) => setNewStudent({ ...newStudent, monthlyRate: Number(e.target.value) })}
                    className="w-full text-xs font-mono px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Advance Security Deposit (PKR)
                  </label>
                  <input
                    type="number"
                    value={newStudent.advancePaid}
                    onChange={(e) => setNewStudent({ ...newStudent, advancePaid: Number(e.target.value) })}
                    className="w-full text-xs font-mono px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isCnicValid || !isPhoneValid || !isRentValid}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs"
                >
                  Enroll Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Resident Profile Drawer with AUTOSAVE (UX Pattern #6) */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Edit Resident Profile
                  </h3>
                  <p className="text-xs text-slate-500">Live autosaving enabled</p>
                </div>
                <button
                  onClick={() => setEditingStudent(null)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Autosave Status Badge (UX Pattern #6) */}
              {saveStatus && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center gap-1.5 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{saveStatus}</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Resident Name</label>
                  <input
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) => handleAutosaveField("name", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={editingStudent.phone}
                    onChange={(e) => handleAutosaveField("phone", e.target.value)}
                    className="w-full font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College / University</label>
                  <input
                    type="text"
                    value={editingStudent.institution}
                    onChange={(e) => handleAutosaveField("institution", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Monthly Rent Rate (PKR)</label>
                  <input
                    type="number"
                    value={editingStudent.monthlyRate}
                    onChange={(e) => handleAutosaveField("monthlyRate", Number(e.target.value))}
                    className="w-full font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mess Service Status</label>
                  <select
                    value={editingStudent.messStatus || "ON"}
                    onChange={(e) => handleAutosaveField("messStatus", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="ON">Mess Active (ON)</option>
                    <option value="OFF">Mess Suspended (OFF)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Done Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Destructive Delete Confirmation Modal (UX Pattern #19) */}
      <DestructiveConfirmModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={() => {
          if (studentToDelete) {
            deleteStudent(studentToDelete.id);
            setStudentToDelete(null);
          }
        }}
        title="Remove Resident from Registry"
        description="Are you sure you want to permanently remove this student record? This will vacate their allocated bed and archive all historic records."
        itemName={studentToDelete ? `${studentToDelete.name} (CNIC: ${studentToDelete.cnic})` : undefined}
        confirmButtonText="Delete Resident"
      />

      {/* Rule 6 & 20: Student Detail Drawer with shared layoutId & staggered settling */}
      <StudentDetailDrawer
        student={inspectingStudent}
        onClose={() => setInspectingStudent(null)}
        onSendRentReminder={(s) => bulkSendRentReminder([s.id])}
        onMarkPaid={(s) => {
          bulkMarkPaid([s.id]);
          setInspectingStudent(null);
        }}
      />
    </motion.div>
  );
}
