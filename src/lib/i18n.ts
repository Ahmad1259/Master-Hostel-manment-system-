export type Language = "en" | "ur";

export interface Translations {
  // Navigation & Shell
  navShowcase: string;
  navDashboard: string;
  navInventory: string;
  navStudents: string;
  navFees: string;
  navStaff: string;
  navExpenses: string;
  navReports: string;
  navVisitorsLaundry: string;
  navSettings: string;
  navPermissions: string;
  branchSelectorLabel: string;
  switchBranch: string;
  activeBranch: string;
  languageToggle: string;
  systemOperational: string;
  signOut: string;
  roleBadge: string;

  // Actions & Buttons (Humanized operational microcopy)
  btnConfirmBedAllocation: string;
  btnDownloadChallan: string;
  btnDispatchWhatsAppSlip: string;
  btnIssueGatePass: string;
  btnRecordPayment: string;
  btnAddNewStudent: string;
  btnCreateRoom: string;
  btnAddFloor: string;
  btnDisburseSalary: string;
  btnRecordExpense: string;
  btnExportCsv: string;
  btnPrintLedger: string;
  btnScheduleVisit: string;
  btnSubmitInquiry: string;
  btnFilter: string;
  btnSearch: string;
  btnCancel: string;
  btnSave: string;
  btnTransferRoom: string;
  btnMarkCheckOut: string;

  // Status Labels
  statusVacant: string;
  statusPartiallyFilled: string;
  statusFullyOccupied: string;
  statusPaid: string;
  statusPartial: string;
  statusUnpaid: string;
  statusActive: string;
  statusInactive: string;
  statusPresent: string;
  statusAbsent: string;
  statusInProcess: string;
  statusReturned: string;

  // Dashboard Overview
  overviewTitle: string;
  overviewSubtitle: string;
  metricTotalBeds: string;
  metricOccupancyRate: string;
  metricMonthlyReceivables: string;
  metricPendingDues: string;
  metricActiveStudents: string;
  metricMonthlyExpenses: string;
  metricNetOperatingMargin: string;
  recentActivity: string;
  occupancyByWing: string;

  // Module 1: Inventory
  inventoryTitle: string;
  inventorySubtitle: string;
  floorLabel: string;
  roomLabel: string;
  bedLabel: string;
  roomTypeSingle: string;
  roomTypeDouble: string;
  roomTypeTriple: string;
  roomTypeDormitory: string;
  capacityLabel: string;
  rateLabel: string;
  allocatedTo: string;

  // Module 2: Students
  studentsTitle: string;
  studentsSubtitle: string;
  fullName: string;
  fatherName: string;
  cnicNumber: string;
  phoneContact: string;
  guardianPhone: string;
  institutionEmployer: string;
  admissionDate: string;
  assignedRoomBed: string;
  emergencyContact: string;

  // Module 3: Fees & Slips
  feesTitle: string;
  feesSubtitle: string;
  invoiceNumber: string;
  billingMonth: string;
  baseRent: string;
  arrearsBroughtForward: string;
  discountApplied: string;
  discountReason: string;
  netPayableAmount: string;
  amountReceived: string;
  remainingBalance: string;
  dueDate: string;
  bankChallanTitle: string;
  whatsAppDirectSlip: string;
  studentCopy: string;
  bankCopy: string;
  hostelCopy: string;

  // Module 4: Staff & Attendance
  staffTitle: string;
  staffSubtitle: string;
  staffName: string;
  staffRole: string;
  monthlySalary: string;
  dailyAttendance: string;
  checkInTime: string;
  checkOutTime: string;
  disbursedDate: string;
  salarySlipTitle: string;

  // Module 5: Expenses & Auxiliary
  expensesTitle: string;
  expensesSubtitle: string;
  expenseCategory: string;
  expenseTitle: string;
  expenseAmount: string;
  auxiliaryIncomeTitle: string;
  incomeSource: string;
  tuckShop: string;
  laundryService: string;
  vendingKiosk: string;
  lockerRental: string;

  // Module 6: Financial Reports & Partner Equity
  reportsTitle: string;
  reportsSubtitle: string;
  profitAndLossStatement: string;
  grossIncome: string;
  operatingExpenses: string;
  netOperatingSurplus: string;
  partnerEquityLedger: string;
  partnerName: string;
  equityShare: string;
  totalCapitalInvested: string;
  totalDrawingsDistributed: string;

  // Module 7: Visitors & Laundry Tracking
  visitorsTitle: string;
  visitorsSubtitle: string;
  visitorName: string;
  visitingStudent: string;
  checkInTimestamp: string;
  checkOutTimestamp: string;
  perDayCharge: string;
  laundryTrackerTitle: string;
  laundryQuotaMonthly: string;
  piecesSubmitted: string;
  piecesRemaining: string;
  submissionDate: string;
  returnDate: string;

  // Showcase Landing Page
  showcaseHeroTitle: string;
  showcaseHeroSubtitle: string;
  showcaseEnterButton: string;
  showcaseExploreRooms: string;
  showcaseAmenitiesHeading: string;
  showcaseFloorPlanHeading: string;
  showcaseFloorPlanSubheading: string;
  showcase360Heading: string;
  showcase360Subheading: string;
  showcaseInquiryHeading: string;
  showcaseInquirySubheading: string;
  showcaseDoorPrompt: string;
  showcaseDoorEnter: string;

  // RBAC & Permissions
  permissionsTitle: string;
  permissionsSubtitle: string;
  permFees: string;
  permRooms: string;
  permExpenses: string;
  permStaff: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    navShowcase: "Public Showcase",
    navDashboard: "Executive Overview",
    navInventory: "Inventory & Beds",
    navStudents: "Student Biodata",
    navFees: "Fees & Challans",
    navStaff: "Staff & Payroll",
    navExpenses: "Expenses & Auxiliary",
    navReports: "Financial P&L & Partners",
    navVisitorsLaundry: "Visitors & Laundry",
    navSettings: "White-Label Setup",
    navPermissions: "Staff Access (RBAC)",
    branchSelectorLabel: "Current Branch",
    switchBranch: "Switch Property Branch",
    activeBranch: "Active Facility",
    languageToggle: "اردو (Urdu)",
    systemOperational: "All Security Systems Live",
    signOut: "End Session",
    roleBadge: "Authorized Personnel",

    btnConfirmBedAllocation: "Confirm Bed Allocation",
    btnDownloadChallan: "Download Bank Fee Challan",
    btnDispatchWhatsAppSlip: "Dispatch Official WhatsApp Slip",
    btnIssueGatePass: "Issue Official Gate Pass",
    btnRecordPayment: "Record Remittance",
    btnAddNewStudent: "Register Resident Biodata",
    btnCreateRoom: "Register Suite Inventory",
    btnAddFloor: "Register Architectural Tier",
    btnDisburseSalary: "Disburse Payroll Remittance",
    btnRecordExpense: "Post Operational Expense",
    btnExportCsv: "Export Verified CSV",
    btnPrintLedger: "Print Formal Ledger",
    btnScheduleVisit: "Schedule Architectural Viewing",
    btnSubmitInquiry: "Submit Formal Reservation Request",
    btnFilter: "Refine Filter",
    btnSearch: "Query Records",
    btnCancel: "Dismiss",
    btnSave: "Commit Record",
    btnTransferRoom: "Reassign Chamber",
    btnMarkCheckOut: "Process Formal Departure",

    statusVacant: "Vacant (Available)",
    statusPartiallyFilled: "Partially Occupied",
    statusFullyOccupied: "Fully Allocated",
    statusPaid: "Cleared / Settled",
    statusPartial: "Partial Remittance",
    statusUnpaid: "Arrears Outstanding",
    statusActive: "Active Resident",
    statusInactive: "De-registered",
    statusPresent: "On Duty / Present",
    statusAbsent: "Unexcused Absence",
    statusInProcess: "In Thermal Treatment",
    statusReturned: "Delivered & Inspected",

    overviewTitle: "Executive Management Console",
    overviewSubtitle: "Centralized operational telemetrics, fiscal compliance, and chamber allocations.",
    metricTotalBeds: "Installed Capacity",
    metricOccupancyRate: "Structural Occupancy",
    metricMonthlyReceivables: "Gross Monthly Billing",
    metricPendingDues: "Uncollected Arrears",
    metricActiveStudents: "Enrolled Scholars",
    metricMonthlyExpenses: "Operating Outflows",
    metricNetOperatingMargin: "Net Operating Surplus",
    recentActivity: "Chronological Access & Fiscal Journal",
    occupancyByWing: "Wing Occupancy Distribution",

    inventoryTitle: "Floor & Chamber Inventory",
    inventorySubtitle: "Architectural tier hierarchy, suite capacities, and live bed occupancy statuses.",
    floorLabel: "Architectural Tier",
    roomLabel: "Chamber Number",
    bedLabel: "Assigned Bed Slot",
    roomTypeSingle: "Single Executive Suite",
    roomTypeDouble: "Double Scholars Chamber",
    roomTypeTriple: "Triple Residency Suite",
    roomTypeDormitory: "Fellowship Dormitory",
    capacityLabel: "Allocated Beds",
    rateLabel: "Monthly Tariff",
    allocatedTo: "Occupant",

    studentsTitle: "Resident Biodata & Registry",
    studentsSubtitle: "Permanent academic identification, verification dossiers, and accommodation histories.",
    fullName: "Legal Full Name",
    fatherName: "Father / Guardian Name",
    cnicNumber: "National Identity (CNIC / B-Form)",
    phoneContact: "Primary Cellular Contact",
    guardianPhone: "Next-of-Kin Emergency Line",
    institutionEmployer: "Academic Institution / Affiliation",
    admissionDate: "Induction Date",
    assignedRoomBed: "Chamber & Bed Slot",
    emergencyContact: "Emergency Verification Contact",

    feesTitle: "Fiscal Ledger, Arrears & Banking Challans",
    feesSubtitle: "Automated monthly receivables, rollover arrears calculations, and official bank remittances.",
    invoiceNumber: "Invoice Reference",
    billingMonth: "Accounting Cycle",
    baseRent: "Standard Tariff",
    arrearsBroughtForward: "Arrears Carried Forward",
    discountApplied: "Discretionary Waiver",
    discountReason: "Documented Waiver Justification",
    netPayableAmount: "Net Outstanding Amount",
    amountReceived: "Amount Realized",
    remainingBalance: "Cumulative Arrears",
    dueDate: "Statutory Settlement Deadline",
    bankChallanTitle: "Standard Commercial Bank Deposit Challan",
    whatsAppDirectSlip: "Instant WhatsApp Billing Dispatch",
    studentCopy: "Resident Retained Slip",
    bankCopy: "Bank Processing Voucher",
    hostelCopy: "Bursar Audit Record",

    staffTitle: "Personnel Directorate & Payroll",
    staffSubtitle: "Staff roster, compensation disbursements, and shift attendance journals.",
    staffName: "Staff Member",
    staffRole: "Assigned Function",
    monthlySalary: "Base Monthly Honorarium",
    dailyAttendance: "Biometric Duty Journal",
    checkInTime: "Shift Ingress",
    checkOutTime: "Shift Egress",
    disbursedDate: "Disbursement Timestamp",
    salarySlipTitle: "Official Remittance Voucher",

    expensesTitle: "Operational Disbursals & Ancillary Revenue",
    expensesSubtitle: "Facilities upkeep, utility ledgers, and supplementary retail transactions.",
    expenseCategory: "Disbursal Category",
    expenseTitle: "Expenditure Item",
    expenseAmount: "Disbursed Value",
    auxiliaryIncomeTitle: "Ancillary Revenue Ledger",
    incomeSource: "Revenue Channel",
    tuckShop: "Provisions Dispensary",
    laundryService: "Express Garment Care",
    vendingKiosk: "Hydration Dispensers",
    lockerRental: "Heavy Luggage Depository",

    reportsTitle: "Audited Financial Statements & Equity Ledger",
    reportsSubtitle: "Profit and loss telemetrics, exportable fiscal rolls, and partner capital distributions.",
    profitAndLossStatement: "Comprehensive Statement of Operations",
    grossIncome: "Aggregated Gross Inflows",
    operatingExpenses: "Total Operational Expenditures",
    netOperatingSurplus: "Audited Operating Surplus",
    partnerEquityLedger: "Managing Partner Equity Distribution",
    partnerName: "Partner Principal",
    equityShare: "Equity Allocation %",
    totalCapitalInvested: "Paid-in Capital",
    totalDrawingsDistributed: "Cumulative Profit Draws",

    visitorsTitle: "Short-Stay Registry & Garment Quotas",
    visitorsSubtitle: "Guest security screening, transient billing, and textile maintenance cycles.",
    visitorName: "Guest Full Name",
    visitingStudent: "Resident Host",
    checkInTimestamp: "Arrival Clearance",
    checkOutTimestamp: "Departure Departure",
    perDayCharge: "Transient Tariff",
    laundryTrackerTitle: "Resident Textile Maintenance Allowance",
    laundryQuotaMonthly: "Monthly Garment Quota",
    piecesSubmitted: "Dispatched for Laundering",
    piecesRemaining: "Remaining Entitlement",
    submissionDate: "Deposit Date",
    returnDate: "Ready for Collection",

    showcaseHeroTitle: "An Architectural Sanctuary for Scholars",
    showcaseHeroSubtitle: "Purpose-built executive residences combining bespoke materiality, silent acoustic suites, and institutional rigor.",
    showcaseEnterButton: "Access Management System",
    showcaseExploreRooms: "Inspect Suite Specifications",
    showcaseAmenitiesHeading: "Engineered for Intellectual Focus",
    showcaseFloorPlanHeading: "Interactive Floor Plan & Chamber Layout",
    showcaseFloorPlanSubheading: "Inspect real-time bed configurations, window placements, and study workstation ergonomics.",
    showcase360Heading: "Immersive 360° Architectural Walkthrough",
    showcase360Subheading: "Explore the executive suites, communal dining library, and study lounges in 3D.",
    showcaseInquiryHeading: "Academic Residence Inquiry",
    showcaseInquirySubheading: "Submit your preliminary reservation request for admissions evaluation.",
    showcaseDoorPrompt: "Click To Open Architectural Entrance",
    showcaseDoorEnter: "Proceed Through Entrance",

    permissionsTitle: "Granular Role-Based Access Control",
    permissionsSubtitle: "Assign module permissions per staff identity to guarantee data compartmentalization.",
    permFees: "Manage Fees, Challans & Dues",
    permRooms: "Manage Floors, Rooms & Beds",
    permExpenses: "Manage Expenses & Auxiliary Income",
    permStaff: "Manage Staff, Payroll & Roles",
  },
  ur: {
    navShowcase: "عوامی پورٹل",
    navDashboard: "مرکزی جائزہ",
    navInventory: "کمرہ جات و بیڈز",
    navStudents: "طالب علم ریکارڈ",
    navFees: "فیس و بینک چالان",
    navStaff: "عملہ و تنخواہ",
    navExpenses: "اخراجات و آمدن",
    navReports: "مالیاتی نفع و نقصان",
    navVisitorsLaundry: "مہمان و لانڈری",
    navSettings: "ادارہ جاتی ترتیبات",
    navPermissions: "عملہ کے اختیارات",
    branchSelectorLabel: "موجودہ برانچ",
    switchBranch: "ہاسٹل برانچ تبدیل کریں",
    activeBranch: "فعال برانچ",
    languageToggle: "English",
    systemOperational: "سیکیورٹی و انتظامی نظام مکمل فعال ہے",
    signOut: "سیشن ختم کریں",
    roleBadge: "مجاز عملہ",

    btnConfirmBedAllocation: "بیڈ الاٹمنٹ کی تصدیق کریں",
    btnDownloadChallan: "بینک فیس چالان ڈاؤن لوڈ کریں",
    btnDispatchWhatsAppSlip: "واٹس ایپ فیس سلپ ارسال کریں",
    btnIssueGatePass: "آفیشل گیٹ پاس جاری کریں",
    btnRecordPayment: "وصولی کا اندراج کریں",
    btnAddNewStudent: "نیا طالب علم رجسٹر کریں",
    btnCreateRoom: "نیا کمرہ رجسٹر کریں",
    btnAddFloor: "نئی منزل شامل کریں",
    btnDisburseSalary: "تنخواہ کی ادائیگی کا اندراج",
    btnRecordExpense: "خرچ کا اندراج کریں",
    btnExportCsv: "ایکسل شیٹ برآمد کریں",
    btnPrintLedger: "کھاتہ پرنٹ کریں",
    btnScheduleVisit: "ہاسٹل وزٹ کا وقت طے کریں",
    btnSubmitInquiry: "رہائش کی درخواست جمع کروائیں",
    btnFilter: "فلٹر کریں",
    btnSearch: "تلاش کریں",
    btnCancel: "منسوخ",
    btnSave: "محفوظ کریں",
    btnTransferRoom: "کمرہ تبدیل کریں",
    btnMarkCheckOut: "ہاسٹل سے فراغت کا اندراج",

    statusVacant: "خالی (دستیاب)",
    statusPartiallyFilled: "جزوی بھرا ہوا",
    statusFullyOccupied: "مکمل الاٹ شدہ",
    statusPaid: "مکمل ادا شدہ",
    statusPartial: "جزوی ادائیگی",
    statusUnpaid: "واجب الادا بقایا جات",
    statusActive: "زیرِ رہائش",
    statusInactive: "فارغ التحصیل",
    statusPresent: "حاضر",
    statusAbsent: "غیر حاضر",
    statusInProcess: "دھلائی کے عمل میں",
    statusReturned: "مکمل و واپس شدہ",

    overviewTitle: "مرکزی انتظامی ڈیش بورڈ",
    overviewSubtitle: "ہاسٹل کے انتظامات، کمروں کی دستیابی اور فیس کا جامع گوشوارہ۔",
    metricTotalBeds: "کل بیڈز کی تعداد",
    metricOccupancyRate: "رہائشی تناسب",
    metricMonthlyReceivables: "ماہانہ وصولیاں",
    metricPendingDues: "واجب الادا فیس",
    metricActiveStudents: "موجودہ طلباء",
    metricMonthlyExpenses: "ماہانہ اخراجات",
    metricNetOperatingMargin: "خالص منافع",
    recentActivity: "حالیہ نقل و حرکت و اخراجات",
    occupancyByWing: "شعبہ وار گنجائش",

    inventoryTitle: "منزلیں، کمرہ جات اور بیڈز کی فہرست",
    inventorySubtitle: "ہر منزل کے کمرے، بیڈ کی الاٹمنٹ اور گنجائش کا جائزہ۔",
    floorLabel: "منزل",
    roomLabel: "کمرہ نمبر",
    bedLabel: "بیڈ نمبر",
    roomTypeSingle: "سنگل پرائیویٹ روم",
    roomTypeDouble: "ڈبل شیئرنگ روم",
    roomTypeTriple: "ٹرپل شیئرنگ روم",
    roomTypeDormitory: "ڈارمیٹری ہال",
    capacityLabel: "مجموعی گنجائش",
    rateLabel: "ماہانہ کرایہ",
    allocatedTo: "مکین",

    studentsTitle: "طلباء و مکینوں کا مکمل بائیو ڈیٹا",
    studentsSubtitle: "قومی شناختی کارڈ، سرپرست کے رابطے اور تعلیمی ریکارڈ کی تصدیق۔",
    fullName: "مکمل نام",
    fatherName: "والد / سرپرست کا نام",
    cnicNumber: "قومی شناختی کارڈ نمبر / ب فارم",
    phoneContact: "طالب علم موبائل نمبر",
    guardianPhone: "سرپرست کا فون نمبر",
    institutionEmployer: "تعلیمی ادارہ یا کمپنی",
    admissionDate: "تاریخ داخلہ",
    assignedRoomBed: "مخصوص کمرہ و بیڈ",
    emergencyContact: "ہنگامی رابطہ نمبر",

    feesTitle: "ماہانہ فیس، بقایا جات اور بینک چالان",
    feesSubtitle: "خودکار ماہانہ فیس کا نظام، پرانے بقایا جات کی منتقلی اور بینک واؤچرز۔",
    invoiceNumber: "انوائس نمبر",
    billingMonth: "ماہانہ دورانیہ",
    baseRent: "بنیادی فیس",
    arrearsBroughtForward: "سابقہ بقایا جات",
    discountApplied: "رعایت / ڈسکاؤنٹ",
    discountReason: "رعایت کی وجہ",
    netPayableAmount: "کل قابلِ ادا رقم",
    amountReceived: "وصول شدہ رقم",
    remainingBalance: "باقی واجب الادا رقم",
    dueDate: "آخری تاریخ ادائیگی",
    bankChallanTitle: "آفیشل بینک فیس چالان",
    whatsAppDirectSlip: "براہِ راست واٹس ایپ فیس سلپ",
    studentCopy: "طالب علم کاپی",
    bankCopy: "بینک کاپی",
    hostelCopy: "ہاسٹل ریکارڈ کاپی",

    staffTitle: "عملہ، تنخواہیں اور روزانہ حاضری",
    staffSubtitle: "ہاسٹل عملہ کی تفصیلات، تنخواہوں کی ادائیگی اور روزانہ حاضری لاگ۔",
    staffName: "عملے کے رکن کا نام",
    staffRole: "ذمہ داری / عہدہ",
    monthlySalary: "ماہانہ بنیادی تنخواہ",
    dailyAttendance: "روزانہ حاضری",
    checkInTime: "آمد کا وقت",
    checkOutTime: "روانگی کا وقت",
    disbursedDate: "ادائیگی کی تاریخ",
    salarySlipTitle: "تنخواہ کی رسید",

    expensesTitle: "ہاسٹل اخراجات اور اضافی آمدن",
    expensesSubtitle: "راشن، بلز، مرمت کے اخراجات اور کینٹین و لانڈری کی آمدنی۔",
    expenseCategory: "خرچ کی قسم",
    expenseTitle: "تفصیل",
    expenseAmount: "رقم",
    auxiliaryIncomeTitle: "دیگر ذرائع آمدن",
    incomeSource: "آمدنی کا ذریعہ",
    tuckShop: "ٹک شاپ و کینٹین",
    laundryService: "لانڈری سروس",
    vendingKiosk: "پانی و مشروبات",
    lockerRental: "لاکر کرایہ",

    reportsTitle: "مالیاتی گوشوارے، نفع و نقصان اور شراکت دار",
    reportsSubtitle: "ماہانہ آمدن، اخراجات، ایکسل ایکسپورٹ اور کاروباری شراکت داروں کا کھاتہ۔",
    profitAndLossStatement: "نفع و نقصان کا سالانہ و ماہانہ گوشوارہ",
    grossIncome: "کل وصول شدہ آمدن",
    operatingExpenses: "مجموعی اخراجات",
    netOperatingSurplus: "خالص نفع",
    partnerEquityLedger: "کاروباری شراکت داروں کا کھاتہ",
    partnerName: "شراکت دار کا نام",
    equityShare: "حصہ برائے فیصد",
    totalCapitalInvested: "کل لگایا گیا سرمایہ",
    totalDrawingsDistributed: "نکلوائی گئی رقم و منافع",

    visitorsTitle: "مہمانوں کا اندراج اور لانڈری کا ریکارڈ",
    visitorsSubtitle: "عارضی مہمانوں کے شناختی کوائف، یومیہ فیس اور لانڈری کوٹہ۔",
    visitorName: "مہمان کا نام",
    visitingStudent: "میزبان طالب علم",
    checkInTimestamp: "آمد کا وقت",
    checkOutTimestamp: "روانگی کا وقت",
    perDayCharge: "یومیہ چارجز",
    laundryTrackerTitle: "ماہانہ کپڑوں کی دھلائی کا کوٹہ",
    laundryQuotaMonthly: "ماہانہ کل کوٹہ",
    piecesSubmitted: "جمع کروائے گئے کپڑے",
    piecesRemaining: "باقی کوٹہ",
    submissionDate: "جمع کروانے کی تاریخ",
    returnDate: "واپسی کی تاریخ",

    showcaseHeroTitle: "طلباء و پیشہ ور افراد کے لیے اعلیٰ معیار کی رہائش",
    showcaseHeroSubtitle: "پرسکون ماحول، جدید فرنشڈ کمرے، معیاری کھانا، اور بغیر کسی تعطل بجلی کی بلاتعطل فراہمی۔",
    showcaseEnterButton: "انتظامی ڈیش بورڈ میں داخل ہوں",
    showcaseExploreRooms: "کمرہ جات کی تفصیلات دیکھیں",
    showcaseAmenitiesHeading: "بہترین سہولیات اور مکمل سیکیورٹی",
    showcaseFloorPlanHeading: "انٹرایکٹو فلور پلان اور کمروں کا نقشہ",
    showcaseFloorPlanSubheading: "کمرے کے لے آؤٹ، بیڈ پوزیشنز اور اسٹڈی ٹیبل کی سیٹنگ کا براہِ راست معائنہ کریں۔",
    showcase360Heading: "360 ڈگری ورچوئل ٹور",
    showcase360Subheading: "ہاسٹل کے اندرونی ماحول اور ڈائننگ ہال کا انٹرایکٹو نظارہ کریں۔",
    showcaseInquiryHeading: "آن لائن داخلہ و رہائش کی درخواست",
    showcaseInquirySubheading: "اپنی پسندیدہ رہائش اور سیٹ بک کروانے کے لیے فارم پر کریں۔",
    showcaseDoorPrompt: "دروازہ کھولنے کے لیے کلک کریں",
    showcaseDoorEnter: "اندر داخل ہوں",

    permissionsTitle: "عملے کے اختیارات کا انتظام",
    permissionsSubtitle: "ہر ملازم کو اس کی ذمہ داری کے مطابق ماڈیولز تک رسائی دیں۔",
    permFees: "فیس اور چالان کا انتظام",
    permRooms: "کمروں اور بیڈز کا انتظام",
    permExpenses: "اخراجات اور آمدن کا انتظام",
    permStaff: "عملہ اور تنخواہ کا انتظام",
  },
};
