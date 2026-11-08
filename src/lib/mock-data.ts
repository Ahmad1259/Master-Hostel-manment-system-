export interface PropertyBranch {
  id: string;
  name: string;
  nameUrdu: string;
  city: string;
  address: string;
  addressUrdu: string;
  phone: string;
  currency: string;
  totalRooms: number;
  totalBeds: number;
}

export interface BedItem {
  id: string;
  roomId: string;
  bedLabel: string;
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED";
  studentName?: string;
  studentId?: string;
}

export interface RoomItem {
  id: string;
  floorId: string;
  roomNumber: string;
  capacity: number;
  monthlyRate: number;
  type: "SINGLE" | "DOUBLE" | "TRIPLE" | "DORMITORY";
  isAc?: boolean;
  beds: BedItem[];
}

export interface FloorItem {
  id: string;
  propertyId: string;
  floorNumber: number;
  name: string;
  nameUrdu: string;
  rooms: RoomItem[];
}

export interface StudentItem {
  id: string;
  propertyId: string;
  userId: string;
  name: string;
  fatherName: string;
  cnic: string;
  phone: string;
  guardianPhone: string;
  institution: string;
  admissionDate: string;
  leavingDate?: string;
  status: "ACTIVE" | "INACTIVE" | "ALUMNI";
  floorNumber: number;
  roomNumber: string;
  bedLabel: string;
  roomId: string;
  monthlyRate: number;
  advancePaid?: number;
  messStatus?: "ON" | "OFF";
  messBill?: number;
  pendingArrears: number;
  laundryUsed: number;
  laundryQuota: number;
}

export interface FeeInvoiceItem {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  month: string;
  year: number;
  amount: number;
  discount: number;
  discountReason?: string;
  arrears: number;
  totalDue: number;
  paidAmount: number;
  balanceDues: number;
  status: "PAID" | "PARTIAL" | "UNPAID";
  dueDate: string;
  paymentDate?: string;
  bankReceiptRef?: string;
}

export interface StaffItem {
  id: string;
  propertyId: string;
  name: string;
  role: "Warden" | "Cook" | "Cleaner" | "Guard" | "Accountant" | "Manager";
  monthlySalary: number;
  phone: string;
  joiningDate: string;
  attendanceToday: "PRESENT" | "ABSENT" | "LEAVE";
  checkIn?: string;
  checkOut?: string;
  lastSalaryMonth: string;
  lastSalaryStatus: "PAID" | "PENDING";
  permissions: {
    canManageFees: boolean;
    canManageRooms: boolean;
    canManageExpenses: boolean;
    canManageStaff: boolean;
  };
}

export interface ExpenseItem {
  id: string;
  propertyId: string;
  category: "Electricity" | "Rent" | "Gas" | "Water" | "Groceries" | "Repairs" | "Internet" | "Other";
  title: string;
  amount: number;
  date: string;
  status: "PAID" | "UNPAID";
  receiptUrl?: string;
}

export interface AuxiliaryIncomeItem {
  id: string;
  propertyId: string;
  source: "LAUNDRY" | "TUCK_SHOP" | "VENDING" | "LOCKER_RENT" | "OTHER";
  title: string;
  amount: number;
  date: string;
  note?: string;
}

export interface PartnerItem {
  id: string;
  propertyId: string;
  name: string;
  sharePercentage: number;
  totalInvested: number;
  totalWithdrawn: number;
}

export interface VisitorItem {
  id: string;
  propertyId: string;
  studentId?: string;
  studentName?: string;
  visitorName: string;
  cnic: string;
  phone: string;
  checkIn: string;
  checkOut?: string;
  charges: number;
  status: "CHECKED_IN" | "CHECKED_OUT";
}

export interface LaundryRecordItem {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  piecesSubmitted: number;
  submittedDate: string;
  returnedDate?: string;
  status: "IN_PROCESS" | "READY" | "RETURNED";
  notes?: string;
}

export interface ComplaintItem {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  category: "Plumbing" | "Electrical" | "Wi-Fi" | "Mess / Food" | "Housekeeping" | "Security";
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  resolvedAt?: string;
}

export interface ReferralRecord {
  id: string;
  hostelName: string;
  ownerName: string;
  city: string;
  contact: string;
  status: "PENDING" | "ACTIVE" | "PAID";
  rewardAmount: number;
  signupDate: string;
}

// ----------------------------------------------------------------------------
// PRODUCTION BASE INITIAL DATA
// ----------------------------------------------------------------------------

export const initialBranches: PropertyBranch[] = [
  {
    id: "prop-gulberg",
    name: "Grand Pavilion (Gulberg III Main Campus)",
    nameUrdu: "گرینڈ پیویلین (گلبرگ 3 مین کیمپس)",
    city: "Lahore",
    address: "Plot 42-B, Sector C, Commercial Enclave, Gulberg III",
    addressUrdu: "پلاٹ 42-بی، سیکٹر سی، کمرشل ایریا، گلبرگ 3",
    phone: "+92 42 3578 9201",
    currency: "PKR",
    totalRooms: 6,
    totalBeds: 12,
  },
];

export const initialFloors: FloorItem[] = [
  {
    id: "floor-1",
    propertyId: "prop-gulberg",
    floorNumber: 1,
    name: "Ground Floor",
    nameUrdu: "گراؤنڈ فلور",
    rooms: [
      {
        id: "room-101",
        floorId: "floor-1",
        roomNumber: "101",
        capacity: 1,
        monthlyRate: 40000,
        type: "SINGLE",
        isAc: true,
        beds: [
          {
            id: "bed-101-a",
            roomId: "room-101",
            bedLabel: "Bed A",
            status: "OCCUPIED",
            studentName: "Muhammad Hamza",
            studentId: "std-001",
          },
        ],
      },
      {
        id: "room-102",
        floorId: "floor-1",
        roomNumber: "102",
        capacity: 2,
        monthlyRate: 30000,
        type: "DOUBLE",
        isAc: true,
        beds: [
          {
            id: "bed-102-a",
            roomId: "room-102",
            bedLabel: "Bed A",
            status: "OCCUPIED",
            studentName: "Shahmir Ali Khan",
            studentId: "std-002",
          },
          {
            id: "bed-102-b",
            roomId: "room-102",
            bedLabel: "Bed B",
            status: "AVAILABLE",
          },
        ],
      },
      {
        id: "room-103",
        floorId: "floor-1",
        roomNumber: "103",
        capacity: 2,
        monthlyRate: 30000,
        type: "DOUBLE",
        isAc: true,
        beds: [
          {
            id: "bed-103-a",
            roomId: "room-103",
            bedLabel: "Bed A",
            status: "OCCUPIED",
            studentName: "Zaid Bin Tariq",
            studentId: "std-003",
          },
          {
            id: "bed-103-b",
            roomId: "room-103",
            bedLabel: "Bed B",
            status: "OCCUPIED",
            studentName: "Daniyal Farooq",
            studentId: "std-004",
          },
        ],
      },
    ],
  },
  {
    id: "floor-2",
    propertyId: "prop-gulberg",
    floorNumber: 2,
    name: "First Floor",
    nameUrdu: "پہلی منزل",
    rooms: [
      {
        id: "room-201",
        floorId: "floor-2",
        roomNumber: "201",
        capacity: 3,
        monthlyRate: 24000,
        type: "TRIPLE",
        isAc: true,
        beds: [
          {
            id: "bed-201-a",
            roomId: "room-201",
            bedLabel: "Bed A",
            status: "OCCUPIED",
            studentName: "Bilal Hassan",
            studentId: "std-005",
          },
          {
            id: "bed-201-b",
            roomId: "room-201",
            bedLabel: "Bed B",
            status: "AVAILABLE",
          },
          {
            id: "bed-201-c",
            roomId: "room-201",
            bedLabel: "Bed C",
            status: "AVAILABLE",
          },
        ],
      },
      {
        id: "room-202",
        floorId: "floor-2",
        roomNumber: "202",
        capacity: 2,
        monthlyRate: 26000,
        type: "DOUBLE",
        isAc: false,
        beds: [
          {
            id: "bed-202-a",
            roomId: "room-202",
            bedLabel: "Bed A",
            status: "OCCUPIED",
            studentName: "Usman Ghani",
            studentId: "std-006",
          },
          {
            id: "bed-202-b",
            roomId: "room-202",
            bedLabel: "Bed B",
            status: "AVAILABLE",
          },
        ],
      },
      {
        id: "room-204",
        floorId: "floor-2",
        roomNumber: "204",
        capacity: 2,
        monthlyRate: 15000,
        type: "DOUBLE",
        isAc: false,
        beds: [
          {
            id: "bed-204-1",
            roomId: "room-204",
            bedLabel: "Bed 1",
            status: "AVAILABLE",
          },
          {
            id: "bed-204-2",
            roomId: "room-204",
            bedLabel: "Bed 2",
            status: "OCCUPIED",
            studentName: "Ali Raza",
            studentId: "std-007",
          },
        ],
      },
    ],
  },
];

export const initialStudents: StudentItem[] = [
  {
    id: "std-001",
    propertyId: "prop-gulberg",
    userId: "usr-001",
    name: "Muhammad Hamza",
    fatherName: "Tariq Mehmood",
    cnic: "35202-9182741-5",
    phone: "0300-8472911",
    guardianPhone: "0321-4910283",
    institution: "LUMS (BSCS)",
    admissionDate: "2026-08-15",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "101",
    bedLabel: "Bed A",
    roomId: "room-101",
    monthlyRate: 40000,
    advancePaid: 40000,
    messStatus: "ON",
    messBill: 8500,
    pendingArrears: 0,
    laundryUsed: 12,
    laundryQuota: 30,
  },
  {
    id: "std-002",
    propertyId: "prop-gulberg",
    userId: "usr-002",
    name: "Shahmir Ali Khan",
    fatherName: "Jahangir Khan",
    cnic: "37405-4819203-1",
    phone: "0333-5192840",
    guardianPhone: "0301-8592014",
    institution: "FAST-NUCES (SE)",
    admissionDate: "2026-09-01",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "102",
    bedLabel: "Bed A",
    roomId: "room-102",
    monthlyRate: 30000,
    advancePaid: 30000,
    messStatus: "ON",
    messBill: 8500,
    pendingArrears: 15000,
    laundryUsed: 8,
    laundryQuota: 30,
  },
  {
    id: "std-003",
    propertyId: "prop-gulberg",
    userId: "usr-003",
    name: "Zaid Bin Tariq",
    fatherName: "Tariq Jameel",
    cnic: "35201-1849204-7",
    phone: "0322-4910293",
    guardianPhone: "0300-4819204",
    institution: "FC College (Econ)",
    admissionDate: "2026-09-10",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "103",
    bedLabel: "Bed A",
    roomId: "room-103",
    monthlyRate: 30000,
    advancePaid: 30000,
    messStatus: "OFF",
    messBill: 0,
    pendingArrears: 0,
    laundryUsed: 6,
    laundryQuota: 30,
  },
  {
    id: "std-004",
    propertyId: "prop-gulberg",
    userId: "usr-004",
    name: "Daniyal Farooq",
    fatherName: "Farooq Ahmed",
    cnic: "35102-7491028-3",
    phone: "0312-9481029",
    guardianPhone: "0345-4819203",
    institution: "Punjab University (Law)",
    admissionDate: "2026-09-15",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "103",
    bedLabel: "Bed B",
    roomId: "room-103",
    monthlyRate: 30000,
    advancePaid: 30000,
    messStatus: "ON",
    messBill: 8500,
    pendingArrears: 30000,
    laundryUsed: 14,
    laundryQuota: 30,
  },
  {
    id: "std-005",
    propertyId: "prop-gulberg",
    userId: "usr-005",
    name: "Bilal Hassan",
    fatherName: "Hassan Raza",
    cnic: "35202-3849102-9",
    phone: "0304-4819204",
    guardianPhone: "0321-4819204",
    institution: "King Edward Medical (MBBS)",
    admissionDate: "2026-10-01",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "201",
    bedLabel: "Bed A",
    roomId: "room-201",
    monthlyRate: 24000,
    advancePaid: 24000,
    messStatus: "ON",
    messBill: 8500,
    pendingArrears: 0,
    laundryUsed: 10,
    laundryQuota: 30,
  },
  {
    id: "std-006",
    propertyId: "prop-gulberg",
    userId: "usr-006",
    name: "Usman Ghani",
    fatherName: "Abdul Ghani",
    cnic: "35201-9401827-3",
    phone: "0300-4819201",
    guardianPhone: "0321-9876543",
    institution: "LUMS (MBA)",
    admissionDate: "2026-10-15",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "202",
    bedLabel: "Bed A",
    roomId: "room-202",
    monthlyRate: 26000,
    advancePaid: 26000,
    messStatus: "ON",
    messBill: 8500,
    pendingArrears: 26000,
    laundryUsed: 4,
    laundryQuota: 30,
  },
  {
    id: "std-007",
    propertyId: "prop-gulberg",
    userId: "usr-007",
    name: "Ali Raza",
    fatherName: "Raza Muhammad",
    cnic: "35202-7194820-5",
    phone: "0302-8491024",
    guardianPhone: "0321-4820194",
    institution: "FAST-NUCES (CS)",
    admissionDate: "2026-10-20",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "204",
    bedLabel: "Bed 2",
    roomId: "room-204",
    monthlyRate: 15000,
    advancePaid: 15000,
    messStatus: "ON",
    messBill: 8500,
    pendingArrears: 15000,
    laundryUsed: 2,
    laundryQuota: 30,
  },
];

export const initialFeeInvoices: FeeInvoiceItem[] = [
  {
    id: "inv-2026-11-001",
    studentId: "std-001",
    studentName: "Muhammad Hamza",
    roomNumber: "101",
    month: "November",
    year: 2026,
    amount: 40000,
    discount: 0,
    arrears: 0,
    totalDue: 40000,
    paidAmount: 40000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-10",
    paymentDate: "2026-11-05",
    bankReceiptRef: "MEEZ-849102",
  },
  {
    id: "inv-2026-11-002",
    studentId: "std-002",
    studentName: "Shahmir Ali Khan",
    roomNumber: "102",
    month: "November",
    year: 2026,
    amount: 30000,
    discount: 0,
    arrears: 0,
    totalDue: 30000,
    paidAmount: 15000,
    balanceDues: 15000,
    status: "PARTIAL",
    dueDate: "2026-11-10",
    paymentDate: "2026-11-06",
    bankReceiptRef: "HBL-291048",
  },
  {
    id: "inv-2026-11-003",
    studentId: "std-003",
    studentName: "Zaid Bin Tariq",
    roomNumber: "103",
    month: "November",
    year: 2026,
    amount: 30000,
    discount: 0,
    arrears: 0,
    totalDue: 30000,
    paidAmount: 30000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-10",
    paymentDate: "2026-11-04",
    bankReceiptRef: "BAHL-481920",
  },
  {
    id: "inv-2026-11-004",
    studentId: "std-004",
    studentName: "Daniyal Farooq",
    roomNumber: "103",
    month: "November",
    year: 2026,
    amount: 30000,
    discount: 0,
    arrears: 0,
    totalDue: 30000,
    paidAmount: 0,
    balanceDues: 30000,
    status: "UNPAID",
    dueDate: "2026-11-10",
  },
  {
    id: "inv-2026-11-005",
    studentId: "std-005",
    studentName: "Bilal Hassan",
    roomNumber: "201",
    month: "November",
    year: 2026,
    amount: 24000,
    discount: 0,
    arrears: 0,
    totalDue: 24000,
    paidAmount: 24000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-10",
    paymentDate: "2026-11-03",
    bankReceiptRef: "MEEZ-910293",
  },
  {
    id: "inv-2026-11-006",
    studentId: "std-006",
    studentName: "Usman Ghani",
    roomNumber: "202",
    month: "November",
    year: 2026,
    amount: 26000,
    discount: 0,
    arrears: 0,
    totalDue: 26000,
    paidAmount: 0,
    balanceDues: 26000,
    status: "UNPAID",
    dueDate: "2026-11-10",
  },
  {
    id: "inv-2026-11-007",
    studentId: "std-007",
    studentName: "Ali Raza",
    roomNumber: "204",
    month: "November",
    year: 2026,
    amount: 15000,
    discount: 0,
    arrears: 0,
    totalDue: 15000,
    paidAmount: 0,
    balanceDues: 15000,
    status: "UNPAID",
    dueDate: "2026-11-10",
  },
];

export const initialStaff: StaffItem[] = [
  {
    id: "stf-001",
    propertyId: "prop-gulberg",
    name: "Major (R) Tariq Mehmood",
    role: "Warden",
    monthlySalary: 65000,
    phone: "0300-8472910",
    joiningDate: "2025-01-10",
    attendanceToday: "PRESENT",
    checkIn: "08:00 AM",
    checkOut: "08:00 PM",
    lastSalaryMonth: "October 2026",
    lastSalaryStatus: "PAID",
    permissions: {
      canManageFees: true,
      canManageRooms: true,
      canManageExpenses: true,
      canManageStaff: true,
    },
  },
  {
    id: "stf-002",
    propertyId: "prop-gulberg",
    name: "Ustad Rasheed Khan",
    role: "Cook",
    monthlySalary: 45000,
    phone: "0333-4910293",
    joiningDate: "2025-02-01",
    attendanceToday: "PRESENT",
    checkIn: "06:30 AM",
    checkOut: "09:30 PM",
    lastSalaryMonth: "October 2026",
    lastSalaryStatus: "PAID",
    permissions: {
      canManageFees: false,
      canManageRooms: false,
      canManageExpenses: true,
      canManageStaff: false,
    },
  },
  {
    id: "stf-003",
    propertyId: "prop-gulberg",
    name: "Muhammad Aslam",
    role: "Cleaner",
    monthlySalary: 28000,
    phone: "0321-4810294",
    joiningDate: "2025-03-15",
    attendanceToday: "PRESENT",
    checkIn: "07:30 AM",
    checkOut: "04:30 PM",
    lastSalaryMonth: "October 2026",
    lastSalaryStatus: "PENDING",
    permissions: {
      canManageFees: false,
      canManageRooms: false,
      canManageExpenses: false,
      canManageStaff: false,
    },
  },
];

export const initialExpenses: ExpenseItem[] = [];
export const initialAuxiliaryIncome: AuxiliaryIncomeItem[] = [];
export const initialPartners: PartnerItem[] = [];

export const initialVisitors: VisitorItem[] = [
  {
    id: "vis-001",
    propertyId: "prop-gulberg",
    studentId: "std-001",
    studentName: "Muhammad Hamza (Room 101)",
    visitorName: "Kamran Mehmood",
    cnic: "35202-4819204-1",
    phone: "0300-4819204",
    checkIn: "2026-11-08 09:30",
    charges: 0,
    status: "CHECKED_IN",
  },
];

export const initialLaundryRecords: LaundryRecordItem[] = [];

export const initialComplaints: ComplaintItem[] = [
  {
    id: "cmp-001",
    studentId: "std-002",
    studentName: "Shahmir Ali Khan",
    roomNumber: "102",
    category: "Wi-Fi",
    title: "Frequent packet loss in study desk corner",
    description: "Repeated dropouts during university zoom lectures. Signal drops to 1 bar near window.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    createdAt: "2026-11-07 14:30",
  },
  {
    id: "cmp-002",
    studentId: "std-004",
    studentName: "Daniyal Farooq",
    roomNumber: "103",
    category: "Plumbing",
    title: "Ensuite mixer tap dripping water",
    description: "Cold water tap in bathroom continuously drips overnight.",
    priority: "MEDIUM",
    status: "OPEN",
    createdAt: "2026-11-08 08:15",
  },
];

export const initialReferrals: ReferralRecord[] = [
  {
    id: "ref-001",
    hostelName: "Al-Razi Scholars Executive Residency",
    ownerName: "Malik Tariq Mehmood",
    city: "Rawalpindi",
    contact: "0300-8472911",
    status: "PAID",
    rewardAmount: 10000,
    signupDate: "2026-10-14",
  },
];
