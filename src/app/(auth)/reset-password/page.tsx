"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Loading from "@/components/loading/Loading";
import Logo from "@/components/logo/Logo";
import React, { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <div
            className="
                flex
                min-h-[calc(100vh-53px)]
                items-center
                justify-center
                bg-gradient-to-br
                from-[#f0faf0]
                to-[#e6f5e6]
                p-6

                md:min-h-[calc(100vh-82px)]

                dark:from-gray-950
                dark:via-gray-800
                dark:to-gray-950
            "
        >
            <div
                className="
                    flex
                    min-h-[600px]
                    w-full
                    max-w-[1000px]
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    shadow-[0_20px_60px_rgba(46,156,46,0.15)]

                    dark:border
                    dark:border-gray-700
                    dark:bg-gray-950
                    dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                "
            >
                {/* Left Side */}
                <div
                    className="
                        relative
                        hidden
                        flex-col
                        items-center
                        justify-center
                        overflow-hidden
                        bg-gradient-to-br
                        from-[#9cee9c]
                        to-white
                        p-12

                        md:flex
                        md:flex-[0_0_40%]

                        dark:from-emerald-950
                        dark:to-gray-900
                    "
                >
                    {/* Decorative Background */}
                    <div
                        className="
                            absolute
                            -left-20
                            top-10
                            h-64
                            w-64
                            rounded-full
                            bg-emerald-400/20
                            blur-3xl

                            dark:bg-emerald-700/20
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-20
                            -right-20
                            h-72
                            w-72
                            rounded-full
                            bg-emerald-300/20
                            blur-3xl

                            dark:bg-emerald-800/20
                        "
                    />

                    {/* Logo */}
                    <div className="relative z-10">
                        <Logo />
                    </div>

                    <p
                        className="
                            relative
                            z-10
                            mt-3
                            text-center
                            text-sm
                            tracking-[0.2em]
                            text-black/70

                            dark:text-white/70
                        "
                    >
                        Create a New Secure Password
                    </p>

                    {/* Decorative Circles */}
                    <div
                        className="
                            absolute
                            bottom-8
                            left-8
                            h-20
                            w-20
                            rounded-full
                            border-2
                            border-white/20
                        "
                    />

                    <div
                        className="
                            absolute
                            right-8
                            top-8
                            h-12
                            w-12
                            rounded-full
                            border-2
                            border-white/20
                        "
                    />
                </div>

                {/* Right Side */}
                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        justify-center
                        p-8

                        md:p-12
                    "
                >
                    {/* Mobile Logo */}
                    <div className="mb-6 flex justify-center md:hidden">
                        <Logo />
                    </div>

                    {/* Heading */}
                    <h1
                        className="
                            text-center
                            text-2xl
                            font-bold
                            text-gray-900

                            md:text-left
                            md:text-3xl

                            dark:text-gray-100
                        "
                    >
                        Reset Password
                    </h1>

                    <p
                        className="
                            mt-2
                            mb-8
                            text-center
                            text-sm
                            text-gray-500

                            md:text-left

                            dark:text-gray-400
                        "
                    >
                        Enter the verification code sent to your email and create a
                        new secure password for your account.
                    </p>

                    {/* Form */}
                    <Suspense fallback={<Loading />}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}