"use client";

import SigninForm from "@/components/auth/SigninForm";
import Loading from "@/components/loading/Loading";
import Logo from "@/components/logo/Logo";
import { Suspense } from "react";

export default function SigninPage() {
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
                dark:to-gray-900
            "
        >
            <div
                className="
                    flex
                    min-h-[600px]
                    w-full
                    max-w-[1000px]
                    animate-fade-in
                    overflow-hidden
                    rounded-2xl
                    border
                    border-transparent
                    bg-white

                    dark:border-gray-700
                    dark:bg-gray-950
                    dark:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                "
            >
                {/* Left Side - Logo Section */}
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
                        via-[#e8f9e8]
                        to-[#ffffff]
                        p-12
                        md:flex
                        md:flex-[0_0_40%]

                        md:border-r
                        md:border-[#cceccc]

                        dark:from-emerald-950
                        dark:via-emerald-950/80
                        dark:to-gray-900
                        dark:md:border-gray-800

                        after:absolute
                        after:right-0
                        after:top-0
                        after:h-full
                        after:w-16
                        after:bg-gradient-to-l
                        after:from-white/60
                        after:to-transparent
                        after:pointer-events-none

                        dark:after:from-gray-950/40
                        dark:after:to-transparent
                    "
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundSize: "60px 60px",
                            }}
                        />
                    </div>

                    {/* Logo */}
                    <Logo />

                    <p
                        className="
                            relative
                            z-10
                            text-center
                            text-sm
                            font-light
                            tracking-[0.2em]
                            text-black
                            opacity-80

                            dark:text-white
                        "
                    >
                        Secure Access to Your Healthcare Dashboard
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-8 left-8 h-20 w-20 rounded-full border-2 border-white/10" />
                    <div className="absolute right-8 top-8 h-12 w-12 rounded-full border-2 border-white/10" />
                </div>

                {/* Right Side - Form */}
                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        justify-center
                        bg-white
                        p-12

                        dark:bg-gray-950
                    "
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden">
                        <Logo />
                    </div>

                    {/* Heading */}
                    <h1
                        className="
                            mb-1
                            text-center
                            text-2xl
                            font-bold
                            text-gray-900
                            md:text-left
                            md:text-3xl

                            dark:text-gray-100
                        "
                    >
                        Welcome Back
                    </h1>

                    <p
                        className="
                            mb-6
                            text-center
                            text-sm
                            text-gray-500
                            md:text-left

                            dark:text-gray-400
                        "
                    >
                        Sign in to your MedixPro account and continue managing your
                        healthcare services.
                    </p>

                    {/* Sign In Form */}
                    <Suspense fallback={<Loading />}>
                        <SigninForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}