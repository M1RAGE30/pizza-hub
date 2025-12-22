import { prisma } from "@/prisma/prisma-client";
import { hashSync } from "bcrypt";

export async function ensureAdminExists() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@pizzahub.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin123456!";

    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: adminEmail,
      },
    });

    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          fullName: "Администратор Pizza Hub",
          email: adminEmail,
          password: hashSync(adminPassword, 10),
          role: "ADMIN",
          verified: new Date(),
        },
      });
      console.log("Admin user created successfully");
    } else if (existingAdmin.role !== "ADMIN") {
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { role: "ADMIN" },
      });
      console.log("User role updated to ADMIN");
    }
  } catch (error) {
    console.error("Error ensuring admin exists:", error);
  }
}