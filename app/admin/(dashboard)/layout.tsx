import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth-server";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell user={session}>{children}</AdminShell>;
}
