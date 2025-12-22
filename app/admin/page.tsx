import { redirect } from "next/navigation";
import { getUserSession } from "@/shared/lib/get-user-session";
import { ensureAdminExists } from "@/shared/lib/ensure-admin";
import { AdminDashboard } from "@/shared/components/shared/admin-dashboard";

export default async function AdminPage() {
  await ensureAdminExists();
  
  const session = await getUserSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/");
  }

  return <AdminDashboard />;
}