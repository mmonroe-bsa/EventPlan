import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const organization = await prisma.organization.upsert({
    where: { name: "Default Organization" },
    update: {},
    create: { name: "Default Organization" }
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@eventplan.local";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Default Admin",
      email: adminEmail,
      orgRole: "ADMIN",
      passwordHash,
      organizationId: organization.id
    }
  });

  const template = await prisma.eventTemplate.upsert({
    where: { name: "District Camporee" },
    update: {},
    create: {
      name: "District Camporee",
      description: "Default template for district camporees.",
      requiredRoles: {
        set: [
          "EVENT_MANAGER",
          "LOGISTICS_LEAD",
          "OPERATIONS_LEAD",
          "PROGRAM_LEAD",
          "REGISTRATION_LEAD",
          "HEALTH_SAFETY_LEAD"
        ]
      }
    }
  });

  const stations = [
    "Skills",
    "First Aid",
    "Orienteering",
    "Cooking",
    "Scoutcraft",
    "HQ / Command",
    "Check-in / Registration",
    "Health & Safety"
  ];

  await prisma.stationTemplate.deleteMany({ where: { templateId: template.id } });
  await prisma.rotationBlockTemplate.deleteMany({ where: { templateId: template.id } });
  await prisma.checklistTemplate.deleteMany({ where: { templateId: template.id } });
  await prisma.taskTemplate.deleteMany({ where: { templateId: template.id } });

  await prisma.stationTemplate.createMany({
    data: stations.map((name) => ({ name, templateId: template.id }))
  });

  await prisma.rotationBlockTemplate.createMany({
    data: [
      { startTime: "Sat 09:00", endTime: "Sat 09:50" },
      { startTime: "Sat 10:00", endTime: "Sat 10:50" },
      { startTime: "Sat 11:00", endTime: "Sat 11:50" },
      { startTime: "Sat 13:00", endTime: "Sat 13:50" },
      { startTime: "Sat 14:00", endTime: "Sat 14:50" }
    ].map((block) => ({ ...block, templateId: template.id }))
  });

  await prisma.checklistTemplate.createMany({
    data: [
      {
        title: "Import troop roster (Youth/Adult + roles)",
        phase: "Pre",
        dueOffsetDays: -14,
        ownerRole: "REGISTRATION_LEAD"
      },
      {
        title: "Collect medical form status + reference",
        phase: "Pre",
        dueOffsetDays: -7,
        ownerRole: "REGISTRATION_LEAD"
      },
      {
        title: "Resolve missing/expired medical forms",
        phase: "Pre",
        dueOffsetDays: -2,
        ownerRole: "HEALTH_SAFETY_LEAD"
      },
      {
        title: "Build troop rotations",
        phase: "Pre",
        dueOffsetDays: -7,
        ownerRole: "PROGRAM_LEAD"
      },
      {
        title: "Staff all station shifts",
        phase: "Pre",
        dueOffsetDays: -5,
        ownerRole: "OPERATIONS_LEAD"
      }
    ].map((item) => ({ ...item, templateId: template.id }))
  });

  await prisma.taskTemplate.createMany({
    data: [
      {
        title: "Confirm required event roles",
        dueOffsetDays: -21,
        ownerRule: "EVENT_ROLE",
        ownerRole: "EVENT_MANAGER"
      }
    ].map((task) => ({ ...task, templateId: template.id }))
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
