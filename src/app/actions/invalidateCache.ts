"use server";

import { revalidateTag } from "next/cache";

export async function invalidateCache(tags: string[]) {
    for (const tag of tags) {
        revalidateTag(tag, "max");
    }
}