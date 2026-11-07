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

// ----------------------------------------------------------------------------
// SEEDED DEMO DATA
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
    totalRooms: 24,
    totalBeds: 58,
  },
  {
    id: "prop-dha",
    name: "Scholars Court (DHA Phase 5 Executive)",
    nameUrdu: "اسکالرز کورٹ (ڈی ایچ اے فیز 5 ایگزیکٹو)",
    city: "Lahore",
    address: "Street 14, Sector J, DHA Phase 5",
    addressUrdu: "اسٹریٹ 14، سیکٹر جے، ڈی ایچ اے فیز 5",
    phone: "+92 42 3719 4402",
    currency: "PKR",
    totalRooms: 16,
    totalBeds: 36,
  },
  {
    id: "prop-islamabad",
    name: "Margalla Vista (H-12 Academic Suites)",
    nameUrdu: "مارگلہ وسٹا (ایچ 12 اکیڈمک سویٹس)",
    city: "Islamabad",
    address: "Service Road West, Sector H-12, Opposite NUST Gate 2",
    addressUrdu: "سروس روڈ ویسٹ، سیکٹر ایچ 12، بالمقابل نسٹ گیٹ 2",
    phone: "+92 51 8440 910",
    currency: "PKR",
    totalRooms: 20,
    totalBeds: 45,
  },
];

export const initialFloors: FloorItem[] = [
  {
    id: "floor-1",
    propertyId: "prop-gulberg",
    floorNumber: 1,
    name: "Ground Tier (Executive Wing)",
    nameUrdu: "گراؤنڈ فلور (ایگزیکٹو ونگ)",
    rooms: [
      {
        id: "room-101",
        floorId: "floor-1",
        roomNumber: "101",
        capacity: 1,
        monthlyRate: 45000,
        type: "SINGLE",
        beds: [
          { id: "bed-101-a", roomId: "room-101", bedLabel: "Bed A", status: "OCCUPIED", studentName: "Muhammad Hamza", studentId: "std-001" },
        ],
      },
      {
        id: "room-102",
        floorId: "floor-1",
        roomNumber: "102",
        capacity: 2,
        monthlyRate: 32000,
        type: "DOUBLE",
        beds: [
          { id: "bed-102-a", roomId: "room-102", bedLabel: "Bed A", status: "OCCUPIED", studentName: "Shahmir Ali Khan", studentId: "std-002" },
          { id: "bed-102-b", roomId: "room-102", bedLabel: "Bed B", status: "AVAILABLE" },
        ],
      },
      {
        id: "room-103",
        floorId: "floor-1",
        roomNumber: "103",
        capacity: 2,
        monthlyRate: 32000,
        type: "DOUBLE",
        beds: [
          { id: "bed-103-a", roomId: "room-103", bedLabel: "Bed A", status: "OCCUPIED", studentName: "Zaid Bin Tariq", studentId: "std-003" },
          { id: "bed-103-b", roomId: "room-103", bedLabel: "Bed B", status: "OCCUPIED", studentName: "Daniyal Farooq", studentId: "std-004" },
        ],
      },
      {
        id: "room-104",
        floorId: "floor-1",
        roomNumber: "104",
        capacity: 3,
        monthlyRate: 26000,
        type: "TRIPLE",
        beds: [
          { id: "bed-104-a", roomId: "room-104", bedLabel: "Bed A", status: "OCCUPIED", studentName: "Usman Ghani", studentId: "std-005" },
          { id: "bed-104-b", roomId: "room-104", bedLabel: "Bed B", status: "OCCUPIED", studentName: "Rayan Arshad", studentId: "std-006" },
          { id: "bed-104-c", roomId: "room-104", bedLabel: "Bed C", status: "AVAILABLE" },
        ],
      },
    ],
  },
  {
    id: "floor-2",
    propertyId: "prop-gulberg",
    floorNumber: 2,
    name: "First Tier (Scholars Quad)",
    nameUrdu: "پہلی منزل (اسکالرز کواڈ)",
    rooms: [
      {
        id: "room-201",
        floorId: "floor-2",
        roomNumber: "201",
        capacity: 2,
        monthlyRate: 32000,
        type: "DOUBLE",
        beds: [
          { id: "bed-201-a", roomId: "room-201", bedLabel: "Bed A", status: "OCCUPIED", studentName: "Bilal Hassan", studentId: "std-007" },
          { id: "bed-201-b", roomId: "room-201", bedLabel: "Bed B", status: "OCCUPIED", studentName: "Mustafa Kamal", studentId: "std-008" },
        ],
      },
      {
        id: "room-202",
        floorId: "floor-2",
        roomNumber: "202",
        capacity: 2,
        monthlyRate: 32000,
        type: "DOUBLE",
        beds: [
          { id: "bed-202-a", roomId: "room-202", bedLabel: "Bed A", status: "AVAILABLE" },
          { id: "bed-202-b", roomId: "room-202", bedLabel: "Bed B", status: "AVAILABLE" },
        ],
      },
      {
        id: "room-203",
        floorId: "floor-2",
        roomNumber: "203",
        capacity: 4,
        monthlyRate: 22000,
        type: "DORMITORY",
        beds: [
          { id: "bed-203-a", roomId: "room-203", bedLabel: "Bed A", status: "OCCUPIED", studentName: "Talha Zubair", studentId: "std-009" },
          { id: "bed-203-b", roomId: "room-203", bedLabel: "Bed B", status: "OCCUPIED", studentName: "Saad Rafique", studentId: "std-010" },
          { id: "bed-203-c", roomId: "room-203", bedLabel: "Bed C", status: "OCCUPIED", studentName: "Ahmad Raza", studentId: "std-011" },
          { id: "bed-203-d", roomId: "room-203", bedLabel: "Bed D", status: "AVAILABLE" },
        ],
      },
    ],
  },
  {
    id: "floor-3",
    propertyId: "prop-gulberg",
    floorNumber: 3,
    name: "Penthouse Tier (Silent Study Loft)",
    nameUrdu: "تیسری منزل (سائلنٹ اسٹڈی لوفٹ)",
    rooms: [
      {
        id: "room-301",
        floorId: "floor-3",
        roomNumber: "301",
        capacity: 1,
        monthlyRate: 48000,
        type: "SINGLE",
        beds: [
          { id: "bed-301-a", roomId: "room-301", bedLabel: "Bed A", status: "OCCUPIED", studentName: "Hashim Jahangir", studentId: "std-012" },
        ],
      },
      {
        id: "room-302",
        floorId: "floor-3",
        roomNumber: "302",
        capacity: 2,
        monthlyRate: 34000,
        type: "DOUBLE",
        beds: [
          { id: "bed-302-a", roomId: "room-302", bedLabel: "Bed A", status: "AVAILABLE" },
          { id: "bed-302-b", roomId: "room-302", bedLabel: "Bed B", status: "RESERVED" },
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
    fatherName: "Chaudhry Riaz Ahmad",
    cnic: "35201-8492019-1",
    phone: "+92 301 4589210",
    guardianPhone: "+92 321 8492019",
    institution: "LUMS - Suleman Dawood School of Business (MBA)",
    admissionDate: "2024-09-01",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "101",
    bedLabel: "Bed A",
    roomId: "room-101",
    monthlyRate: 45000,
    pendingArrears: 0,
    laundryUsed: 22,
    laundryQuota: 30,
  },
  {
    id: "std-002",
    propertyId: "prop-gulberg",
    userId: "usr-002",
    name: "Shahmir Ali Khan",
    fatherName: "Maj. (R) Tariq Mahmud Khan",
    cnic: "35202-9182301-3",
    phone: "+92 300 9482711",
    guardianPhone: "+92 333 4291840",
    institution: "FC College University - BS Computer Science",
    admissionDate: "2024-10-15",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "102",
    bedLabel: "Bed A",
    roomId: "room-102",
    monthlyRate: 32000,
    pendingArrears: 4500,
    laundryUsed: 18,
    laundryQuota: 30,
  },
  {
    id: "std-003",
    propertyId: "prop-gulberg",
    userId: "usr-003",
    name: "Zaid Bin Tariq",
    fatherName: "Tariq Jameel",
    cnic: "35102-4910283-5",
    phone: "+92 312 8492018",
    guardianPhone: "+92 300 4810294",
    institution: "FAST-NUCES Lahore - Software Engineering",
    admissionDate: "2024-08-20",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "103",
    bedLabel: "Bed A",
    roomId: "room-103",
    monthlyRate: 32000,
    pendingArrears: 0,
    laundryUsed: 14,
    laundryQuota: 30,
  },
  {
    id: "std-004",
    propertyId: "prop-gulberg",
    userId: "usr-004",
    name: "Daniyal Farooq",
    fatherName: "Farooq Bashir",
    cnic: "35201-1928401-7",
    phone: "+92 322 8401928",
    guardianPhone: "+92 300 8192840",
    institution: "Punjab University - College of Pharmacy",
    admissionDate: "2024-09-10",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "103",
    bedLabel: "Bed B",
    roomId: "room-103",
    monthlyRate: 32000,
    pendingArrears: 12000,
    laundryUsed: 28,
    laundryQuota: 30,
  },
  {
    id: "std-005",
    propertyId: "prop-gulberg",
    userId: "usr-005",
    name: "Usman Ghani",
    fatherName: "Sheikh Abdul Ghani",
    cnic: "38403-9182341-9",
    phone: "+92 304 9182340",
    guardianPhone: "+92 334 9182341",
    institution: "Information Technology University (ITU) - AI",
    admissionDate: "2024-09-05",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "104",
    bedLabel: "Bed A",
    roomId: "room-104",
    monthlyRate: 26000,
    pendingArrears: 0,
    laundryUsed: 25,
    laundryQuota: 30,
  },
  {
    id: "std-006",
    propertyId: "prop-gulberg",
    userId: "usr-006",
    name: "Rayan Arshad",
    fatherName: "Arshad Mehmood",
    cnic: "35202-0192847-1",
    phone: "+92 331 4920194",
    guardianPhone: "+92 301 4920194",
    institution: "National College of Arts (NCA) - Architecture",
    admissionDate: "2024-09-15",
    status: "ACTIVE",
    floorNumber: 1,
    roomNumber: "104",
    bedLabel: "Bed B",
    roomId: "room-104",
    monthlyRate: 26000,
    pendingArrears: 0,
    laundryUsed: 19,
    laundryQuota: 30,
  },
  {
    id: "std-007",
    propertyId: "prop-gulberg",
    userId: "usr-007",
    name: "Bilal Hassan",
    fatherName: "Hassan Raza",
    cnic: "35201-9284710-5",
    phone: "+92 302 9182049",
    guardianPhone: "+92 322 9182049",
    institution: "Allama Iqbal Medical College (AIMC) - MBBS 3rd Year",
    admissionDate: "2024-08-01",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "201",
    bedLabel: "Bed A",
    roomId: "room-201",
    monthlyRate: 32000,
    pendingArrears: 0,
    laundryUsed: 26,
    laundryQuota: 30,
  },
  {
    id: "std-008",
    propertyId: "prop-gulberg",
    userId: "usr-008",
    name: "Mustafa Kamal",
    fatherName: "Kamal Pasha",
    cnic: "35202-8192840-3",
    phone: "+92 335 8192840",
    guardianPhone: "+92 305 8192840",
    institution: "LUMS - Law School (BA-LL.B)",
    admissionDate: "2024-09-01",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "201",
    bedLabel: "Bed B",
    roomId: "room-201",
    monthlyRate: 32000,
    pendingArrears: 8000,
    laundryUsed: 12,
    laundryQuota: 30,
  },
  {
    id: "std-009",
    propertyId: "prop-gulberg",
    userId: "usr-009",
    name: "Talha Zubair",
    fatherName: "Zubair Masood",
    cnic: "35201-7192849-9",
    phone: "+92 313 7192849",
    guardianPhone: "+92 303 7192849",
    institution: "FAST-NUCES - Data Science",
    admissionDate: "2024-09-20",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "203",
    bedLabel: "Bed A",
    roomId: "room-203",
    monthlyRate: 22000,
    pendingArrears: 0,
    laundryUsed: 29,
    laundryQuota: 30,
  },
  {
    id: "std-010",
    propertyId: "prop-gulberg",
    userId: "usr-010",
    name: "Saad Rafique",
    fatherName: "Rafique Akhtar",
    cnic: "35202-4819204-1",
    phone: "+92 323 4819204",
    guardianPhone: "+92 300 4819204",
    institution: "University of Central Punjab (UCP) - Accounting & Finance",
    admissionDate: "2024-10-01",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "203",
    bedLabel: "Bed B",
    roomId: "room-203",
    monthlyRate: 22000,
    pendingArrears: 0,
    laundryUsed: 20,
    laundryQuota: 30,
  },
  {
    id: "std-011",
    propertyId: "prop-gulberg",
    userId: "usr-011",
    name: "Ahmad Raza",
    fatherName: "Syed Raza Shah",
    cnic: "35201-3819204-7",
    phone: "+92 345 3819204",
    guardianPhone: "+92 315 3819204",
    institution: "Lahore School of Economics (LSE) - B.Sc. Economics",
    admissionDate: "2024-09-10",
    status: "ACTIVE",
    floorNumber: 2,
    roomNumber: "203",
    bedLabel: "Bed C",
    roomId: "room-203",
    monthlyRate: 22000,
    pendingArrears: 0,
    laundryUsed: 16,
    laundryQuota: 30,
  },
  {
    id: "std-012",
    propertyId: "prop-gulberg",
    userId: "usr-012",
    name: "Hashim Jahangir",
    fatherName: "Jahangir Tareen",
    cnic: "35202-2819204-5",
    phone: "+92 308 2819204",
    guardianPhone: "+92 328 2819204",
    institution: "KPMG Taseer Hadi & Co. (Chartered Accountancy Trainee)",
    admissionDate: "2024-07-15",
    status: "ACTIVE",
    floorNumber: 3,
    roomNumber: "301",
    bedLabel: "Bed A",
    roomId: "room-301",
    monthlyRate: 48000,
    pendingArrears: 0,
    laundryUsed: 21,
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
    amount: 45000,
    discount: 2000,
    discountReason: "Corporate Executive Early-Settlement Courtesy",
    arrears: 0,
    totalDue: 43000,
    paidAmount: 43000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-03",
    bankReceiptRef: "MEZN-9481920",
  },
  {
    id: "inv-2026-11-002",
    studentId: "std-002",
    studentName: "Shahmir Ali Khan",
    roomNumber: "102",
    month: "November",
    year: 2026,
    amount: 32000,
    discount: 0,
    arrears: 4500,
    totalDue: 36500,
    paidAmount: 32000,
    balanceDues: 4500,
    status: "PARTIAL",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-04",
    bankReceiptRef: "MEZN-9481925",
  },
  {
    id: "inv-2026-11-003",
    studentId: "std-003",
    studentName: "Zaid Bin Tariq",
    roomNumber: "103",
    month: "November",
    year: 2026,
    amount: 32000,
    discount: 3000,
    discountReason: "Dean's Honor Roll Merit Scholarship",
    arrears: 0,
    totalDue: 29000,
    paidAmount: 29000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-05",
    bankReceiptRef: "MEZN-9482001",
  },
  {
    id: "inv-2026-11-004",
    studentId: "std-004",
    studentName: "Daniyal Farooq",
    roomNumber: "103",
    month: "November",
    year: 2026,
    amount: 32000,
    discount: 0,
    arrears: 12000,
    totalDue: 44000,
    paidAmount: 0,
    balanceDues: 44000,
    status: "UNPAID",
    dueDate: "2026-11-05",
  },
  {
    id: "inv-2026-11-005",
    studentId: "std-005",
    studentName: "Usman Ghani",
    roomNumber: "104",
    month: "November",
    year: 2026,
    amount: 26000,
    discount: 0,
    arrears: 0,
    totalDue: 26000,
    paidAmount: 26000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-02",
    bankReceiptRef: "MEZN-9481740",
  },
  {
    id: "inv-2026-11-006",
    studentId: "std-006",
    studentName: "Rayan Arshad",
    roomNumber: "104",
    month: "November",
    year: 2026,
    amount: 26000,
    discount: 1000,
    discountReason: "Annual Advance Loyalty Concession",
    arrears: 0,
    totalDue: 25000,
    paidAmount: 25000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-04",
    bankReceiptRef: "MEZN-9481890",
  },
  {
    id: "inv-2026-11-007",
    studentId: "std-007",
    studentName: "Bilal Hassan",
    roomNumber: "201",
    month: "November",
    year: 2026,
    amount: 32000,
    discount: 0,
    arrears: 0,
    totalDue: 32000,
    paidAmount: 32000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-05",
    bankReceiptRef: "MEZN-9482015",
  },
  {
    id: "inv-2026-11-008",
    studentId: "std-008",
    studentName: "Mustafa Kamal",
    roomNumber: "201",
    month: "November",
    year: 2026,
    amount: 32000,
    discount: 0,
    arrears: 8000,
    totalDue: 40000,
    paidAmount: 32000,
    balanceDues: 8000,
    status: "PARTIAL",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-05",
    bankReceiptRef: "MEZN-9482040",
  },
  {
    id: "inv-2026-11-009",
    studentId: "std-009",
    studentName: "Talha Zubair",
    roomNumber: "203",
    month: "November",
    year: 2026,
    amount: 22000,
    discount: 0,
    arrears: 0,
    totalDue: 22000,
    paidAmount: 22000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-03",
    bankReceiptRef: "MEZN-9481820",
  },
  {
    id: "inv-2026-11-010",
    studentId: "std-010",
    studentName: "Saad Rafique",
    roomNumber: "203",
    month: "November",
    year: 2026,
    amount: 22000,
    discount: 0,
    arrears: 0,
    totalDue: 22000,
    paidAmount: 22000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-04",
    bankReceiptRef: "MEZN-9481910",
  },
  {
    id: "inv-2026-11-011",
    studentId: "std-011",
    studentName: "Ahmad Raza",
    roomNumber: "203",
    month: "November",
    year: 2026,
    amount: 22000,
    discount: 0,
    arrears: 0,
    totalDue: 22000,
    paidAmount: 22000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-05",
    bankReceiptRef: "MEZN-9482088",
  },
  {
    id: "inv-2026-11-012",
    studentId: "std-012",
    studentName: "Hashim Jahangir",
    roomNumber: "301",
    month: "November",
    year: 2026,
    amount: 48000,
    discount: 0,
    arrears: 0,
    totalDue: 48000,
    paidAmount: 48000,
    balanceDues: 0,
    status: "PAID",
    dueDate: "2026-11-05",
    paymentDate: "2026-11-01",
    bankReceiptRef: "MEZN-9481550",
  },
];

export const initialStaff: StaffItem[] = [
  {
    id: "stf-001",
    propertyId: "prop-gulberg",
    name: "Major (R) Tariq Mehmood",
    role: "Warden",
    monthlySalary: 85000,
    phone: "+92 300 8472910",
    joiningDate: "2021-03-01",
    attendanceToday: "PRESENT",
    checkIn: "07:45 AM",
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
    name: "Muhammad Asim Qureshi",
    role: "Accountant",
    monthlySalary: 65000,
    phone: "+92 321 4458920",
    joiningDate: "2022-01-15",
    attendanceToday: "PRESENT",
    checkIn: "08:30 AM",
    lastSalaryMonth: "October 2026",
    lastSalaryStatus: "PAID",
    permissions: {
      canManageFees: true,
      canManageRooms: false,
      canManageExpenses: true,
      canManageStaff: false,
    },
  },
  {
    id: "stf-003",
    propertyId: "prop-gulberg",
    name: "Ustad Muhammad Ramzan",
    role: "Cook",
    monthlySalary: 48000,
    phone: "+92 303 9182344",
    joiningDate: "2020-08-01",
    attendanceToday: "PRESENT",
    checkIn: "05:30 AM",
    lastSalaryMonth: "October 2026",
    lastSalaryStatus: "PAID",
    permissions: {
      canManageFees: false,
      canManageRooms: false,
      canManageExpenses: false,
      canManageStaff: false,
    },
  },
  {
    id: "stf-004",
    propertyId: "prop-gulberg",
    name: "Subedar (R) Muhammad Boota",
    role: "Guard",
    monthlySalary: 38000,
    phone: "+92 304 8192849",
    joiningDate: "2022-06-10",
    attendanceToday: "PRESENT",
    checkIn: "06:00 AM",
    lastSalaryMonth: "October 2026",
    lastSalaryStatus: "PAID",
    permissions: {
      canManageFees: false,
      canManageRooms: false,
      canManageExpenses: false,
      canManageStaff: false,
    },
  },
  {
    id: "stf-005",
    propertyId: "prop-gulberg",
    name: "Babu Lal Masih",
    role: "Cleaner",
    monthlySalary: 32000,
    phone: "+92 312 9182301",
    joiningDate: "2023-02-01",
    attendanceToday: "PRESENT",
    checkIn: "07:00 AM",
    lastSalaryMonth: "October 2026",
    lastSalaryStatus: "PAID",
    permissions: {
      canManageFees: false,
      canManageRooms: false,
      canManageExpenses: false,
      canManageStaff: false,
    },
  },
];

export const initialExpenses: ExpenseItem[] = [
  {
    id: "exp-001",
    propertyId: "prop-gulberg",
    category: "Electricity",
    title: "LESCO Commercial 3-Phase Tariff - Cycle 10/2026",
    amount: 142500,
    date: "2026-11-02",
    status: "PAID",
  },
  {
    id: "exp-002",
    propertyId: "prop-gulberg",
    category: "Groceries",
    title: "Metro Cash & Carry - Organic Produce, Poultry & Lentils",
    amount: 68400,
    date: "2026-11-04",
    status: "PAID",
  },
  {
    id: "exp-003",
    propertyId: "prop-gulberg",
    category: "Gas",
    title: "Sui Northern Gas Pipelines Ltd (SNGPL) Commercial Meter",
    amount: 18200,
    date: "2026-11-03",
    status: "PAID",
  },
  {
    id: "exp-004",
    propertyId: "prop-gulberg",
    category: "Internet",
    title: "Nayatel & StormFiber Load-Balanced Redundant Leased Lines",
    amount: 16500,
    date: "2026-11-01",
    status: "PAID",
  },
  {
    id: "exp-005",
    propertyId: "prop-gulberg",
    category: "Repairs",
    title: "Quarterly Inverter HVAC Filter Replacement & Coil Sanitization",
    amount: 14800,
    date: "2026-11-06",
    status: "PAID",
  },
  {
    id: "exp-006",
    propertyId: "prop-gulberg",
    category: "Water",
    title: "WASA Commercial Extraction & RO Membrane Service",
    amount: 9500,
    date: "2026-11-05",
    status: "PAID",
  },
];

export const initialAuxiliaryIncome: AuxiliaryIncomeItem[] = [
  {
    id: "aux-001",
    propertyId: "prop-gulberg",
    source: "TUCK_SHOP",
    title: "Provisions Dispensary & Midnight Study Snackery Receipts",
    amount: 38400,
    date: "2026-11-05",
  },
  {
    id: "aux-002",
    propertyId: "prop-gulberg",
    source: "LAUNDRY",
    title: "Excess Quota Garment Care & Express Steam Press Surcharges",
    amount: 12800,
    date: "2026-11-06",
  },
  {
    id: "aux-003",
    propertyId: "prop-gulberg",
    source: "LOCKER_RENT",
    title: "Heavy Luggage Basement Secure Vault Rental",
    amount: 8000,
    date: "2026-11-01",
  },
];

export const initialPartners: PartnerItem[] = [
  {
    id: "prt-001",
    propertyId: "prop-gulberg",
    name: "Dr. Salman Farooq (Managing Principal)",
    sharePercentage: 50.0,
    totalInvested: 15000000,
    totalWithdrawn: 4200000,
  },
  {
    id: "prt-002",
    propertyId: "prop-gulberg",
    name: "Engr. Bilal Ahmad (Operations Director)",
    sharePercentage: 30.0,
    totalInvested: 9000000,
    totalWithdrawn: 2520000,
  },
  {
    id: "prt-003",
    propertyId: "prop-gulberg",
    name: "Tariq Mehmood Bajwa (Strategic Advisor)",
    sharePercentage: 20.0,
    totalInvested: 6000000,
    totalWithdrawn: 1680000,
  },
];

export const initialVisitors: VisitorItem[] = [
  {
    id: "vis-001",
    propertyId: "prop-gulberg",
    studentId: "std-001",
    studentName: "Muhammad Hamza",
    visitorName: "Chaudhry Riaz Ahmad",
    cnic: "35201-1928491-3",
    phone: "+92 321 8492019",
    checkIn: "2026-11-06 14:30",
    checkOut: "2026-11-07 10:15",
    charges: 2500,
    status: "CHECKED_OUT",
  },
  {
    id: "vis-002",
    propertyId: "prop-gulberg",
    studentId: "std-003",
    studentName: "Zaid Bin Tariq",
    visitorName: "Faizan Jameel",
    cnic: "35102-8491029-7",
    phone: "+92 300 4810294",
    checkIn: "2026-11-07 11:00",
    charges: 1500,
    status: "CHECKED_IN",
  },
];

export const initialLaundryRecords: LaundryRecordItem[] = [
  {
    id: "lnd-001",
    studentId: "std-001",
    studentName: "Muhammad Hamza",
    roomNumber: "101",
    piecesSubmitted: 8,
    submittedDate: "2026-11-05",
    returnedDate: "2026-11-07",
    status: "RETURNED",
    notes: "3 Formal Shirts, 2 Trousers, 3 Linens",
  },
  {
    id: "lnd-002",
    studentId: "std-004",
    studentName: "Daniyal Farooq",
    roomNumber: "103",
    piecesSubmitted: 10,
    submittedDate: "2026-11-06",
    status: "IN_PROCESS",
    notes: "4 Shalwar Kameez suits, 2 Towels",
  },
  {
    id: "lnd-003",
    studentId: "std-007",
    studentName: "Bilal Hassan",
    roomNumber: "201",
    piecesSubmitted: 6,
    submittedDate: "2026-11-06",
    status: "READY",
    notes: "Lab coats steam pressed",
  },
];
