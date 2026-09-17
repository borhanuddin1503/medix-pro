'use server'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'


export default async function getRole() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("access_token")?.value!;
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as any;


    return decoded?.role
}
