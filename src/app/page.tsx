import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();

  const sessionRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/who-me`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  const session = await sessionRes.json();

  console.log(session);

  return <div>Hello {session?.user?.name}</div>;
}