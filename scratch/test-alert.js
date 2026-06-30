const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const farm = await prisma.farm.findFirst();
  if (!farm) {
    console.log("No farm found.");
    return;
  }

  await prisma.notification.create({
    data: {
      farm_id: farm.id,
      title: "Test System Alert",
      description: "This is a simulated critical alert to verify the notification system UI.",
      severity: "CRITICAL",
      type: "SYSTEM_TEST",
      fingerprint: "TEST_ALERT_" + Date.now(),
      is_read: false
    }
  });

  console.log("Dummy alert created successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
