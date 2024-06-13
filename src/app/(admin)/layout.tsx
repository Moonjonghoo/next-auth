import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getSession();
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
