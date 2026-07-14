'use client'
import VerifyEmailCard from "@/components/auth/VerifyEmailCard";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email')

    return (
        <main className="flex min-h-[calc(100vh-53px)] md:min-h-[calc(100vh-82px)]  items-center justify-centerbg-gradient-to-br from-[#f0faf0] to-[#e6f5e6] p-6">
            <VerifyEmailCard
                email={email!}
            />
        </main>
    );
}