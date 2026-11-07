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
  
  // Actions
  addFloor: (name: string, nameUrdu: string) => void;
  addRoom: (floorId: string, roomNumber: string, capacity: number, monthlyRate: number, type: "SINGLE" | "DOUBLE" | "TRIPLE" | "DORMITORY") => void;
  allocateBed: (bedId: string, studentId: string, studentName: string) => void;
  deallocateBed: (bedId: string) => void;
  addStudent: (student: Omit<StudentItem, "id" | "userId" | "laundryUsed" | "laundryQuota">) => void;
  transferStudentRoom: (studentId: string, newRoomNumber: string, newBedLabel: string, newMonthlyRate: number) => void;
  recordFeePayment: (invoiceId: string, amount: number, bankRef?: string) => void;
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
    type: "SINGLE" | "DOUBLE" | "TRIPLE" | "DORMITORY"
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
                beds,
              },
            ],
          };
        }
        return floor;
      })
    );
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
    };
    setStudents([...students, newStudent]);
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
        addFloor,
        addRoom,
        allocateBed,
        deallocateBed,
        addStudent,
        transferStudentRoom,
        recordFeePayment,
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
