export interface HostelConfig {
  identity: {
    name: string;
    legalEntity: string;
    tagline: string;
    taglineUrdu: string;
    monogram: string;
    phone: string;
    emergencyPhone: string;
    whatsappNumber: string;
    email: string;
    establishedYear: number;
    logoUrl?: string;
  };
  geo: {
    address: string;
    addressUrdu: string;
    neighborhood: string;
    city: string;
    postalCode: string;
    geoCoordinates: {
      latitude: number;
      longitude: number;
    };
    nearbyInstitutions: {
      name: string;
      distanceKm: number;
      transitTimeMinutes: number;
    }[];
  };
  banking: {
    bankName: string;
    branchCode: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    swiftCode?: string;
    paymentInstructions: string;
  };
  billing: {
    currencySymbol: string;
    currencyCode: string;
    monthlyDueDay: number; // e.g. 5th of every month
    lateSurchargePercent: number; // e.g. 5%
    standardSecurityDeposit: number;
    defaultLaundryAllowancePieces: number;
  };
  amenities: {
    id: string;
    title: string;
    titleUrdu: string;
    description: string;
  }[];
  analytics: {
    ga4MeasurementId: string;
    googleSearchConsoleVerification: string;
  };
  theme: {
    primaryAccent: string; // Antique Brass or Deep Olive
    canvasBackground: string;
    surfaceCard: string;
    textPrimary: string;
    textMuted: string;
    borderColor: string;
  };
}

export const hostelConfig: HostelConfig = {
  identity: {
    name: "The Grand Pavilion & Scholars Residency",
    legalEntity: "Grand Pavilion Commercial Living Ltd.",
    tagline: "Bespoke Architectural Living for Academic & Professional Distinction",
    taglineUrdu: "اعلیٰ تعلیمی و پیشہ ورانہ زندگی کے لیے باوقار رہائش",
    monogram: "GP",
    phone: "+92 42 3578 9201",
    emergencyPhone: "+92 300 8472910",
    whatsappNumber: "923008472910",
    email: "admissions@grandpavilion.pk",
    establishedYear: 2018,
    logoUrl: "/icons/monogram.svg",
  },
  geo: {
    address: "Plot 42-B, Sector C, Commercial Enclave, Gulberg III",
    addressUrdu: "پلاٹ 42-بی، سیکٹر سی، کمرشل ایریا، گلبرگ 3",
    neighborhood: "Gulberg III",
    city: "Lahore",
    postalCode: "54660",
    geoCoordinates: {
      latitude: 31.5204,
      longitude: 74.3587,
    },
    nearbyInstitutions: [
      { name: "LUMS (Lahore University of Management Sciences)", distanceKm: 6.2, transitTimeMinutes: 12 },
      { name: "FC College University", distanceKm: 2.4, transitTimeMinutes: 5 },
      { name: "University of the Punjab (New Campus)", distanceKm: 4.8, transitTimeMinutes: 10 },
      { name: "FAST-NUCES", distanceKm: 5.1, transitTimeMinutes: 11 },
      { name: "Information Technology University (ITU)", distanceKm: 3.5, transitTimeMinutes: 8 }
    ],
  },
  banking: {
    bankName: "Meezan Bank Limited",
    branchCode: "0219 (Gulberg Main Boulevard Branch)",
    accountTitle: "GRAND PAVILION HOSTEL MANAGEMENT",
    accountNumber: "01020108492011",
    iban: "PK72MEZN0001020108492011",
    swiftCode: "MEZNPKKA",
    paymentInstructions: "Please present this challan at any Meezan Bank counter nationwide or transfer via IBFT and present transaction reference slip to the warden desk within 24 hours.",
  },
  billing: {
    currencySymbol: "Rs.",
    currencyCode: "PKR",
    monthlyDueDay: 5,
    lateSurchargePercent: 5.0,
    standardSecurityDeposit: 15000,
    defaultLaundryAllowancePieces: 30,
  },
  amenities: [
    {
      id: "power",
      title: "100% Uninterrupted Solar & Diesel Hybrid Power",
      titleUrdu: "بلاتعطل سولر و ڈیزل بیک اپ برقی نظام",
      description: "Dedicated synchronous 65 kVA Perkins generator paired with 20 kW on-grid solar matrix providing zero cutover lag for computing workstations and high-speed Wi-Fi.",
    },
    {
      id: "mess",
      title: "Chef-Curated Organic Nutrition (3 Meals Daily)",
      titleUrdu: "غذائیت سے بھرپور متوازن روزانہ تین وقت کھانا",
      description: "Rotational farm-to-table menu supervised by commercial culinary leads, inspected by Punjab Food Authority standards with cold-pressed oils and purified reverse-osmosis prep.",
    },
    {
      id: "climate",
      title: "Acoustically Isolated Climate-Controlled Suites",
      titleUrdu: "مکمل ایئر کنڈیشنڈ و پرسکون مطالعہ کمرہ جات",
      description: "Daikin inverter thermal management with double-glazed soundproof Fenesta casements ensuring deep acoustic quiet for competitive examination study.",
    },
    {
      id: "security",
      title: "Tri-Layer Biometric Gate Access & Perimeter Radar",
      titleUrdu: "بائیو میٹرک داخلہ اور 24 گھنٹے سیکیورٹی مانیٹرنگ",
      description: "Facial recognition access points, full 4K H.265 Hikvision optical recording across common grounds, and licensed ex-armed-forces guard duty round the clock.",
    },
    {
      id: "laundry",
      title: "Industrial Steam Press & Hygienic Laundry",
      titleUrdu: "جدید اسٹیم پریس اور خودکار لانڈری سروس",
      description: "Included 30-piece monthly garment care quota with computerized tracking tags, gentle hypoallergenic washing cycles, and crisp upright steam finishing.",
    },
    {
      id: "connectivity",
      title: "Redundant Dual Gigabit Fiber Backbones",
      titleUrdu: "دوہری آپٹک فائبر انٹرنیٹ کنکشن",
      description: "Parallel 500 Mbps load-balanced lines (Nayatel & StormFiber) with enterprise Ubiquiti Wi-Fi 6 access points in every wing.",
    }
  ],
  analytics: {
    ga4MeasurementId: "G-HOSTELPROD2026",
    googleSearchConsoleVerification: "google-site-verification=a9d94f8b2c8e104e",
  },
  theme: {
    primaryAccent: "#B58544", // Antique Brass
    canvasBackground: "#FAF9F6", // Warm architectural ivory/stone
    surfaceCard: "#FFFFFF",
    textPrimary: "#18181B", // Deep charcoal slate
    textMuted: "#71717A",
    borderColor: "#E4E4E7",
  },
};

export default hostelConfig;
