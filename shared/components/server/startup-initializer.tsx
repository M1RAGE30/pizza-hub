import { ensureAdminExists } from "../../lib/ensure-admin";

export async function StartupInitializer() {
  await ensureAdminExists();
  return null;
}