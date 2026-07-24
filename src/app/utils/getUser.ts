'use server'
import { cookies } from 'next/headers'

export interface IWhoMeUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

export async function getUser(): Promise<IWhoMeUser | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/who-me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null; 

    const data = await res.json();
    return data.user ?? null;
  } catch (error) {
    console.error("whoMe error:", error);
    return null; // network error হলেও silently null, throw করবে না
  }
}