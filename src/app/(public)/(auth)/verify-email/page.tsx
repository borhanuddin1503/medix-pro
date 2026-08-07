"use client";

import VerifyEmailCard from "@/components/auth/VerifyEmailCard";
import Loading from "@/components/loading/Loading";
import React, { Suspense } from "react";

export default function VerifyEmailPage() {
    return (
        <main
            className="
                relative
                flex
                min-h-[calc(100vh-53px)]
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-emerald-50
                via-white
                to-main/20
                p-6

                md:min-h-[calc(100vh-82px)]

                dark:from-gray-950
                dark:via-gray-900
                dark:to-gray-950
            "
        >
            {/* Background Blobs */}
            <div
                className="
                    absolute
                    -left-24
                    top-10
                    h-72
                    w-72
                    rounded-full
                    bg-emerald-200/30
                    blur-3xl

                    dark:bg-emerald-900/20
                "
            />

            <div
                className="
                    absolute
                    -right-24
                    bottom-0
                    h-80
                    w-80
                    rounded-full
                    bg-emerald-300/20
                    blur-3xl

                    dark:bg-emerald-800/20
                "
            />

            {/* Verify Email Card */}
            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-xl
                "
            >
                <Suspense fallback={<Loading />}>
                    <VerifyEmailCard />
                </Suspense>
            </div>
        </main>
    );
}