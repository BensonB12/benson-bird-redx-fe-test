import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with faker data...");

  // Clear existing users first
  await prisma.user.deleteMany();
  console.log("🗑️ Cleared existing users");

  // Generate 150 users with faker
  const users = [];
  for (let i = 0; i < 150; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    
    users.push({
      email,
      name: `${firstName} ${lastName}`,
    });
  }

  // Insert users in batches for better performance
  const batchSize = 25;
  let createdCount = 0;

  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    await prisma.user.createMany({
      data: batch,
      skipDuplicates: true,
    });
    createdCount += batch.length;
    console.log(`📝 Created ${createdCount}/${users.length} users...`);
  }

  console.log(`✅ Successfully created ${createdCount} users with faker data!`);
  console.log("🌱 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 