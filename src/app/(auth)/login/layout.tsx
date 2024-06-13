import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return <div>{children}</div>;
}
