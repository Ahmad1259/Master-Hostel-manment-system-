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
// INITIAL PRODUCTION-READY BASE DATA (CLEAN STATE - ZERO DEMO DATA)
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
    totalRooms: 0,
    totalBeds: 0,
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
    totalRooms: 0,
    totalBeds: 0,
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
    totalRooms: 0,
    totalBeds: 0,
  },
];

export const initialFloors: FloorItem[] = [
  {
    id: "floor-1",
    propertyId: "prop-gulberg",
    floorNumber: 1,
    name: "Ground Floor",
    nameUrdu: "گراؤنڈ فلور",
    rooms: [],
  },
  {
    id: "floor-2",
    propertyId: "prop-gulberg",
    floorNumber: 2,
    name: "First Floor",
    nameUrdu: "پہلی منزل",
    rooms: [],
  },
];

// Clean empty datasets - Ready for real-world entries
export const initialStudents: StudentItem[] = [];
export const initialFeeInvoices: FeeInvoiceItem[] = [];
export const initialStaff: StaffItem[] = [];
export const initialExpenses: ExpenseItem[] = [];
export const initialAuxiliaryIncome: AuxiliaryIncomeItem[] = [];
export const initialPartners: PartnerItem[] = [];
export const initialVisitors: VisitorItem[] = [];
export const initialLaundryRecords: LaundryRecordItem[] = [];
export const initialComplaints: ComplaintItem[] = [];
export const initialReferrals: ReferralRecord[] = [];
