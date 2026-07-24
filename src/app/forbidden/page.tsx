'use client';

import Link from "next/link";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <main
            className="
                relative
                flex
                min-h-[calc(100vh-53px)]
                md:min-h-[calc(100vh-82px)]
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-emerald-50
                via-white
                to-main/20
                px-6

               
               dark:from-gray-950
               dark:via-gray-800
                dark:to-gray-900
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

            <div
                className="
                    relative
                    w-full
                    max-w-xl
                    overflow-hidden
                    rounded-3xl
                    border
                    border-emerald-100
                    bg-white/90
                    p-10
                    text-center
                    shadow-2xl
                    backdrop-blur

                    dark:border-gray-700
                    dark:bg-gray-900/90
                    dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                "
            >

                {/* Icon */}
                <div
                    className="
                        mx-auto
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        bg-red-100
                        shadow-lg

                        dark:bg-red-950/50
                    "
                >
                    <ShieldX
                        className="
                            h-12
                            w-12
                            text-red-500

                            dark:text-red-400
                        "
                    />
                </div>

                {/* Badge */}
                <div
                    className="
                        mt-6
                        inline-flex
                        items-center
                        rounded-full
                        bg-red-50
                        px-4
                        py-1
                        text-sm
                        font-semibold
                        text-red-600

                        dark:bg-red-950/50
                        dark:text-red-400
                    "
                >
                    🚫 403 Forbidden
                </div>

                {/* Title */}
                <h1
                    className="
                        mt-6
                        text-5xl
                        font-extrabold
                        tracking-tight
                        text-gray-900

                        dark:text-gray-100
                    "
                >
                    Access Denied
                </h1>

                {/* Description */}
                <p
                    className="
                        mx-auto
                        mt-5
                        max-w-md
                        text-base
                        leading-7
                        text-gray-500

                        dark:text-gray-400
                    "
                >
                    You don't have permission to access this page.
                    This area is restricted to authorized users only.
                </p>

                {/* Divider */}
                <div
                    className="
                        my-8
                        h-px
                        w-full
                        bg-gradient-to-r
                        from-transparent
                        via-emerald-200
                        to-transparent

                        dark:via-emerald-800
                    "
                />

                {/* Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">

                    {/* Go Home */}
                    <Link
                        href="/"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-emerald-600
                            px-6
                            py-3
                            font-semibold
                            text-white
                            shadow-lg
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-emerald-700
                        "
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    {/* Go Back */}
                    <button
                        onClick={() => window.history.back()}
                        className="
                            inline-flex
                            cursor-pointer
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-emerald-600
                            px-6
                            py-3
                            font-semibold
                            text-emerald-700
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-emerald-50

                            dark:border-emerald-500
                            dark:text-emerald-400
                            dark:hover:bg-emerald-950/50
                        "
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                </div>

                {/* Footer */}
                <p
                    className="
                        mt-8
                        text-sm
                        text-gray-400

                        dark:text-gray-500
                    "
                >
                    If you believe this is a mistake, please contact your administrator.
                </p>

            </div>
        </main>
    );
}