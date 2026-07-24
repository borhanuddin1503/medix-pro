// lib/auth.ts
import { cookies } from 'next/headers';

export async function getCookies() {
    const cookieStore = await cookies();
    return cookieStore;
}