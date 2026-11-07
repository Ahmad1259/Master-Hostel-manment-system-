"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PropertyBranch,
  FloorItem,
  StudentItem,
  FeeInvoiceItem,
  StaffItem,
  ExpenseItem,
  AuxiliaryIncomeItem,
  PartnerItem,
  VisitorItem,
  LaundryRecordItem,
  ComplaintItem,
  ReferralRecord,
  initialBranches,
  initialFloors,
  initialStudents,
  initialFeeInvoices,
  initialStaff,
  initialExpenses,
  initialAuxiliaryIncome,
  initialPartners,
  initialVisitors,
  initialLaundryRecords,
  initialComplaints,
  initialReferrals,
} from "./mock-data";
import { Language, translations, Translations } from "./i18n";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentBranchId: string;
  setCurrentBranchId: (id: string) => void;
  currentBranch: PropertyBranch;
  branches: PropertyBranch[];
  floors: FloorItem[];
  students: StudentItem[];
  feeInvoices: FeeInvoiceItem[];
  staff: StaffItem[];
  expenses: ExpenseItem[];
  auxiliaryIncome: AuxiliaryIncomeItem[];
  partners: PartnerItem[];
  visitors: VisitorItem[];
  laundryRecords: LaundryRecordItem[];
  complaints: ComplaintItem[];
  referrals: ReferralRecord[];
  saasTier: "BASIC" | "STANDARD" | "PREMIUM";
  setSaasTier: (tier: "BASIC" | "STANDARD" | "PREMIUM") => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  toast: { message: string; type?: "success" | "info" | "warning" | "error" } | null;
  showToast: (message: string, type?: "success" | "info" | "warning" | "error") => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  
  // Actions
  addFloor: (name: string, nameUrdu: string) => void;
  addRoom: (floorId: string, roomNumber: string, capacity: number, monthlyRate: number, type: "SINGLE" | "DOUBLE" | "TRIPLE" | "DORMITORY", isAc?: boolean) => void;
  deleteRoom: (roomId: string) => void;
  allocateBed: (bedId: string, studentId: string, studentName: string) => void;
  deallocateBed: (bedId: string) => void;
  addStudent: (student: Omit<StudentItem, "id" | "userId" | "laundryUsed" | "laundryQuota">) => void;
  updateStudent: (studentId: string, updates: Partial<StudentItem>) => void;
  deleteStudent: (studentId: string) => void;
  bulkSendRentReminder: (studentIds: string[]) => void;
  bulkMarkPaid: (studentIds: string[]) => void;
  toggleMessStatus: (studentId: string) => void;
  updateMessBill: (studentId: string, bill: number) => void;
  raiseComplaint: (complaint: Omit<ComplaintItem, "id" | "createdAt" | "status">) => void;
  updateComplaintStatus: (complaintId: string, status: ComplaintItem["status"]) => void;
  deleteComplaint: (complaintId: string) => void;
  transferStudentRoom: (studentId: string, newRoomNumber: string, newBedLabel: string, newMonthlyRate: number) => void;
  recordFeePayment: (invoiceId: string, amount: number, bankRef?: string) => void;
  deletePayment: (invoiceId: string) => void;
  generateMonthlyInvoices: (month: string, year: number) => void;
  addExpense: (expense: Omit<ExpenseItem, "id">) => void;
  addAuxiliaryIncome: (income: Omit<AuxiliaryIncomeItem, "id">) => void;
  updateStaffAttendance: (staffId: string, status: "PRESENT" | "ABSENT" | "LEAVE", checkIn?: string, checkOut?: string) => void;
  disburseSalary: (staffId: string) => void;
  updateStaffPermissions: (staffId: string, permissions: StaffItem["permissions"]) => void;
  registerVisitor: (visitor: Omit<VisitorItem, "id" | "status">) => void;
  checkoutVisitor: (visitorId: string) => void;
  addLaundryDrop: (studentId: string, pieces: number, notes?: string) => void;
  updateLaundryStatus: (recordId: string, status: LaundryRecordItem["status"]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [currentBranchId, setCurrentBranchId] = useState<string>("prop-gulberg");
  const [branches] = useState<PropertyBranch[]>(initialBranches);
  const [floors, setFloors] = useState<FloorItem[]>(initialFloors);
  const [students, setStudents] = useState<StudentItem[]>(initialStudents);
  const [feeInvoices, setFeeInvoices] = useState<FeeInvoiceItem[]>(initialFeeInvoices);
  const [staff, setStaff] = useState<StaffItem[]>(initialStaff);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [auxiliaryIncome, setAuxiliaryIncome] = useState<AuxiliaryIncomeItem[]>(initialAuxiliaryIncome);
  const [partners, setPartners] = useState<PartnerItem[]>(initialPartners);
  const [visitors, setVisitors] = useState<VisitorItem[]>(initialVisitors);
  const [laundryRecords, setLaundryRecords] = useState<LaundryRecordItem[]>(initialLaundryRecords);
  const [complaints, setComplaints] = useState<ComplaintItem[]>(initialComplaints);
  const [referrals, setReferrals] = useState<ReferralRecord[]>(initialReferrals);
  const [saasTier, setSaasTier] = useState<"BASIC" | "STANDARD" | "PREMIUM">("STANDARD");
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "info" | "warning" | "error" } | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const showToast = (message: string, type: "success" | "info" | "warning" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast("Back online. Nothing was lost.", "success");
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast("Connection lost. Working in offline mode.", "warning");
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Sync html dir and lang attributes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    }
  }, [language]);

  const currentBranch = branches.find((b) => b.id === currentBranchId) || branches[0];
  const t = translations[language];

  // Actions implementation
  const addFloor = (name: string, nameUrdu: string) => {
    const nextNum = floors.length + 1;
    const newFloor: FloorItem = {
      id: `floor-${Date.now()}`,
      propertyId: currentBranchId,
      floorNumber: nextNum,
      name,
      nameUrdu: nameUrdu || name,
      rooms: [],
    };
    setFloors([...floors, newFloor]);
  };

  const addRoom = (
    floorId: string,
    roomNumber: string,
    capacity: number,
    monthlyRate: number,
    type: "SINGLE" | "DOUBLE" | "TRIPLE" | "DORMITORY",
    isAc: boolean = true
  ) => {
    const roomId = `room-${Date.now()}`;
    const labels = ["Bed A", "Bed B", "Bed C", "Bed D", "Bed E", "Bed F"];
    const beds: FloorItem["rooms"][0]["beds"] = Array.from({ length: capacity }, (_, i) => ({
      id: `bed-${roomId}-${i + 1}`,
      roomId,
      bedLabel: labels[i] || `Bed ${i + 1}`,
      status: "AVAILABLE",
    }));

    setFloors(
      floors.map((floor) => {
        if (floor.id === floorId) {
          return {
            ...floor,
            rooms: [
              ...floor.rooms,
              {
                id: roomId,
                floorId,
                roomNumber,
                capacity,
                monthlyRate,
                type,
                isAc,
                beds,
              },
            ],
          };
        }
        return floor;
      })
    );
    showToast(`Chamber ${roomNumber} added successfully.`, "success");
  };

  const deleteRoom = (roomId: string) => {
    setFloors(
      floors.map((floor) => ({
        ...floor,
        rooms: floor.rooms.filter((r) => r.id !== roomId),
      }))
    );
    showToast("Chamber deleted from registry.", "info");
  };

  const allocateBed = (bedId: string, studentId: string, studentName: string) => {
    setFloors(
      floors.map((floor) => ({
        ...floor,
        rooms: floor.rooms.map((room) => ({
          ...room,
          beds: room.beds.map((bed) =>
            bed.id === bedId
              ? { ...bed, status: "OCCUPIED" as const, studentId, studentName }
              : bed
          ),
        })),
      }))
    );
  };

  const deallocateBed = (bedId: string) => {
    setFloors(
      floors.map((floor) => ({
        ...floor,
        rooms: floor.rooms.map((room) => ({
          ...room,
          beds: room.beds.map((bed) =>
            bed.id === bedId
              ? { ...bed, status: "AVAILABLE" as const, studentId: undefined, studentName: undefined }
              : bed
          ),
        })),
      }))
    );
  };

  const addStudent = (studentData: Omit<StudentItem, "id" | "userId" | "laundryUsed" | "laundryQuota">) => {
    const newId = `std-${Date.now().toString().slice(-4)}`;
    const newStudent: StudentItem = {
      ...studentData,
      id: newId,
      userId: `usr-${newId}`,
      laundryUsed: 0,
      laundryQuota: 30,
      messStatus: studentData.messStatus || "ON",
      messBill: studentData.messBill || 8500,
    };
    setStudents([...students, newStudent]);
    showToast(`Resident ${studentData.name} enrolled.`, "success");
  };

  const updateStudent = (studentId: string, updates: Partial<StudentItem>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, ...updates } : s))
    );
  };

  const deleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    showToast("Resident removed from registry.", "info");
  };

  const bulkSendRentReminder = (studentIds: string[]) => {
    showToast(`Dispatched payment reminders to ${studentIds.length} residents via SMS.`, "success");
  };

  const bulkMarkPaid = (studentIds: string[]) => {
    setFeeInvoices((prev) =>
      prev.map((inv) =>
        studentIds.includes(inv.studentId)
          ? {
              ...inv,
              status: "PAID",
              paidAmount: inv.totalDue,
              balanceDues: 0,
              paymentDate: new Date().toISOString().split("T")[0],
            }
          : inv
      )
    );
    showToast(`Marked ${studentIds.length} resident dues as Paid in full.`, "success");
  };

  const toggleMessStatus = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const nextStatus = s.messStatus === "OFF" ? "ON" : "OFF";
          showToast(
            `Mess turned ${nextStatus} for ${s.name}.`,
            nextStatus === "ON" ? "success" : "info"
          );
          return { ...s, messStatus: nextStatus };
        }
        return s;
      })
    );
  };

  const updateMessBill = (studentId: string, bill: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, messBill: bill } : s))
    );
    showToast("Mess charge updated.", "success");
  };

  const raiseComplaint = (complaintData: Omit<ComplaintItem, "id" | "createdAt" | "status">) => {
    const newComplaint: ComplaintItem = {
      ...complaintData,
      id: `cmp-${Date.now().toString().slice(-4)}`,
      status: "OPEN",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setComplaints([newComplaint, ...complaints]);
    showToast("Complaint registered and assigned to duty warden.", "success");
  };

  const updateComplaintStatus = (complaintId: string, status: ComplaintItem["status"]) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status,
              resolvedAt: status === "RESOLVED" ? new Date().toISOString().replace("T", " ").slice(0, 16) : undefined,
            }
          : c
      )
    );
    showToast(`Complaint status changed to ${status}.`, "info");
  };

  const deleteComplaint = (complaintId: string) => {
    setComplaints((prev) => prev.filter((c) => c.id !== complaintId));
    showToast("Complaint removed.", "info");
  };

  const deletePayment = (invoiceId: string) => {
    setFeeInvoices((prev) => prev.filter((i) => i.id !== invoiceId));
    showToast("Invoice deleted from ledger.", "info");
  };

  const transferStudentRoom = (
    studentId: string,
    newRoomNumber: string,
    newBedLabel: string,
    newMonthlyRate: number
  ) => {
    setStudents(
      students.map((std) =>
        std.id === studentId
          ? {
              ...std,
              roomNumber: newRoomNumber,
              bedLabel: newBedLabel,
              monthlyRate: newMonthlyRate,
            }
          : std
      )
    );
  };

  const recordFeePayment = (invoiceId: string, amount: number, bankRef?: string) => {
    setFeeInvoices(
      feeInvoices.map((inv) => {
        if (inv.id === invoiceId) {
          const newPaid = inv.paidAmount + amount;
          const newBalance = Math.max(0, inv.totalDue - newPaid);
          const newStatus = newBalance === 0 ? "PAID" : "PARTIAL";
          return {
            ...inv,
            paidAmount: newPaid,
            balanceDues: newBalance,
            status: newStatus as "PAID" | "PARTIAL",
            paymentDate: new Date().toISOString().split("T")[0],
            bankReceiptRef: bankRef || inv.bankReceiptRef || "CASH-OVER-COUNTER",
          };
        }
        return inv;
      })
    );
  };

  const generateMonthlyInvoices = (month: string, year: number) => {
    const generated: FeeInvoiceItem[] = students
      .filter((s) => s.status === "ACTIVE")
      .map((student) => {
        const id = `inv-${year}-${month.slice(0, 3).toLowerCase()}-${student.id}`;
        return {
          id,
          studentId: student.id,
          studentName: student.name,
          roomNumber: student.roomNumber,
          month,
          year,
          amount: student.monthlyRate,
          discount: 0,
          arrears: student.pendingArrears,
          totalDue: student.monthlyRate + student.pendingArrears,
          paidAmount: 0,
          balanceDues: student.monthlyRate + student.pendingArrears,
          status: "UNPAID" as const,
          dueDate: `${year}-${month === "November" ? "11" : "12"}-05`,
        };
      });
    setFeeInvoices([...feeInvoices, ...generated]);
  };

  const addExpense = (expenseData: Omit<ExpenseItem, "id">) => {
    const newExpense: ExpenseItem = {
      ...expenseData,
      id: `exp-${Date.now().toString().slice(-4)}`,
    };
    setExpenses([newExpense, ...expenses]);
  };

  const addAuxiliaryIncome = (incomeData: Omit<AuxiliaryIncomeItem, "id">) => {
    const newIncome: AuxiliaryIncomeItem = {
      ...incomeData,
      id: `aux-${Date.now().toString().slice(-4)}`,
    };
    setAuxiliaryIncome([newIncome, ...auxiliaryIncome]);
  };

  const updateStaffAttendance = (
    staffId: string,
    status: "PRESENT" | "ABSENT" | "LEAVE",
    checkIn?: string,
    checkOut?: string
  ) => {
    setStaff(
      staff.map((stf) =>
        stf.id === staffId
          ? {
              ...stf,
              attendanceToday: status,
              checkIn: checkIn || stf.checkIn,
              checkOut: checkOut || stf.checkOut,
            }
          : stf
      )
    );
  };

  const disburseSalary = (staffId: string) => {
    setStaff(
      staff.map((stf) =>
        stf.id === staffId
          ? {
              ...stf,
              lastSalaryMonth: "November 2026",
              lastSalaryStatus: "PAID" as const,
            }
          : stf
      )
    );
  };

  const updateStaffPermissions = (staffId: string, permissions: StaffItem["permissions"]) => {
    setStaff(
      staff.map((stf) =>
        stf.id === staffId
          ? {
              ...stf,
              permissions,
            }
          : stf
      )
    );
  };

  const registerVisitor = (visitorData: Omit<VisitorItem, "id" | "status">) => {
    const newVisitor: VisitorItem = {
      ...visitorData,
      id: `vis-${Date.now().toString().slice(-4)}`,
      status: "CHECKED_IN",
    };
    setVisitors([newVisitor, ...visitors]);
  };

  const checkoutVisitor = (visitorId: string) => {
    setVisitors(
      visitors.map((v) =>
        v.id === visitorId
          ? {
              ...v,
              status: "CHECKED_OUT" as const,
              checkOut: new Date().toISOString().replace("T", " ").slice(0, 16),
            }
          : v
      )
    );
  };

  const addLaundryDrop = (studentId: string, pieces: number, notes?: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const newRecord: LaundryRecordItem = {
      id: `lnd-${Date.now().toString().slice(-4)}`,
      studentId,
      studentName: student.name,
      roomNumber: student.roomNumber,
      piecesSubmitted: pieces,
      submittedDate: new Date().toISOString().split("T")[0],
      status: "IN_PROCESS",
      notes: notes || "Standard wash & steam iron cycle",
    };

    setLaundryRecords([newRecord, ...laundryRecords]);
    setStudents(
      students.map((s) =>
        s.id === studentId ? { ...s, laundryUsed: s.laundryUsed + pieces } : s
      )
    );
  };

  const updateLaundryStatus = (recordId: string, status: LaundryRecordItem["status"]) => {
    setLaundryRecords(
      laundryRecords.map((r) =>
        r.id === recordId
          ? {
              ...r,
              status,
              returnedDate: status === "RETURNED" ? new Date().toISOString().split("T")[0] : r.returnedDate,
            }
          : r
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentBranchId,
        setCurrentBranchId,
        currentBranch,
        branches,
        floors,
        students,
        feeInvoices,
        staff,
        expenses,
        auxiliaryIncome,
        partners,
        visitors,
        laundryRecords,
        complaints,
        referrals,
        saasTier,
        setSaasTier,
        isOnboardingOpen,
        setIsOnboardingOpen,
        toast,
        showToast,
        isOffline,
        setIsOffline,
        addFloor,
        addRoom,
        deleteRoom,
        allocateBed,
        deallocateBed,
        addStudent,
        updateStudent,
        deleteStudent,
        bulkSendRentReminder,
        bulkMarkPaid,
        toggleMessStatus,
        updateMessBill,
        raiseComplaint,
        updateComplaintStatus,
        deleteComplaint,
        transferStudentRoom,
        recordFeePayment,
        deletePayment,
        generateMonthlyInvoices,
        addExpense,
        addAuxiliaryIncome,
        updateStaffAttendance,
        disburseSalary,
        updateStaffPermissions,
        registerVisitor,
        checkoutVisitor,
        addLaundryDrop,
        updateLaundryStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
