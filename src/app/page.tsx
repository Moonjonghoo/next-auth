import { getSession } from "@/lib/getSession";
import Image from "next/image";

export default async function Home() {
  const session = await getSession();
  console.log(session);
  return (
    <>
      <div>Home Componet</div>
      {JSON.stringify(session, null, 2)}
    </>
  );
}
