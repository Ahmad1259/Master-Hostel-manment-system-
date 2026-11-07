const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding commercial hostel database...");

  // 1. Create Default Commercial Property
  const property = await prisma.property.upsert({
    where: { id: "prop-gulberg" },
    update: {},
    create: {
      id: "prop-gulberg",
      name: "The Grand Pavilion & Scholars Residency",
      city: "Lahore",
      address: "Plot 42-B, Sector C, Commercial Enclave, Gulberg III",
      phone: "+92 42 3578 9201",
      currency: "PKR",
    },
  });

  // 2. Create Architectural Floors
  const floor1 = await prisma.floor.upsert({
    where: { id: "floor-1" },
    update: {},
    create: {
      id: "floor-1",
      propertyId: property.id,
      floorNumber: 1,
      name: "Ground Tier (Executive Wing)",
    },
  });

  const floor2 = await prisma.floor.upsert({
    where: { id: "floor-2" },
    update: {},
    create: {
      id: "floor-2",
      propertyId: property.id,
      floorNumber: 2,
      name: "First Tier (Scholars Quad)",
    },
  });

  // 3. Create Rooms & Beds
  const room101 = await prisma.room.upsert({
    where: { id: "room-101" },
    update: {},
    create: {
      id: "room-101",
      floorId: floor1.id,
      roomNumber: "101",
      capacity: 1,
      monthlyRate: 45000,
      type: "SINGLE",
    },
  });

  await prisma.bed.upsert({
    where: { id: "bed-101-a" },
    update: {},
    create: {
      id: "bed-101-a",
      roomId: room101.id,
      bedLabel: "Bed A",
      status: "OCCUPIED",
    },
  });

  const room102 = await prisma.room.upsert({
    where: { id: "room-102" },
    update: {},
    create: {
      id: "room-102",
      floorId: floor1.id,
      roomNumber: "102",
      capacity: 2,
      monthlyRate: 32000,
      type: "DOUBLE",
    },
  });

  await prisma.bed.upsert({
    where: { id: "bed-102-a" },
    update: {},
    create: {
      id: "bed-102-a",
      roomId: room102.id,
      bedLabel: "Bed A",
      status: "OCCUPIED",
    },
  });

  await prisma.bed.upsert({
    where: { id: "bed-102-b" },
    update: {},
    create: {
      id: "bed-102-b",
      roomId: room102.id,
      bedLabel: "Bed B",
      status: "AVAILABLE",
    },
  });

  // 4. Create Staff & Permissions
  const warden = await prisma.staff.upsert({
    where: { id: "stf-001" },
    update: {},
    create: {
      id: "stf-001",
      propertyId: property.id,
      name: "Major (R) Tariq Mehmood",
      role: "Warden",
      monthlySalary: 85000,
      phone: "+92 300 8472910",
      permissions: {
        create: {
          canManageFees: true,
          canManageRooms: true,
          canManageExpenses: true,
          canManageStaff: true,
        },
      },
    },
  });

  const accountant = await prisma.staff.upsert({
    where: { id: "stf-002" },
    update: {},
    create: {
      id: "stf-002",
      propertyId: property.id,
      name: "Muhammad Asim Qureshi",
      role: "Accountant",
      monthlySalary: 65000,
      phone: "+92 321 4458920",
      permissions: {
        create: {
          canManageFees: true,
          canManageRooms: false,
          canManageExpenses: true,
          canManageStaff: false,
        },
      },
    },
  });

  // 5. Create Expenses
  await prisma.expense.createMany({
    data: [
      {
        propertyId: property.id,
        category: "Electricity",
        title: "LESCO Commercial 3-Phase Tariff - Cycle 10/2026",
        amount: 142500,
        status: "PAID",
      },
      {
        propertyId: property.id,
        category: "Groceries",
        title: "Metro Cash & Carry - Organic Produce & Poultry",
        amount: 68400,
        status: "PAID",
      },
      {
        propertyId: property.id,
        category: "Internet",
        title: "Nayatel & StormFiber Load-Balanced Lines",
        amount: 16500,
        status: "PAID",
      },
    ],
  });

  // 6. Create Partners
  await prisma.partner.createMany({
    data: [
      {
        propertyId: property.id,
        name: "Dr. Salman Farooq (Managing Principal)",
        sharePercentage: 50.0,
        totalInvested: 15000000,
        totalWithdrawn: 4200000,
      },
      {
        propertyId: property.id,
        name: "Engr. Bilal Ahmad (Operations Director)",
        sharePercentage: 30.0,
        totalInvested: 9000000,
        totalWithdrawn: 2520000,
      },
    ],
  });

  console.log("Database seeded successfully with commercial data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
