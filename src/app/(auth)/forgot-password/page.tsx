"use client";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Logo from "@/components/logo/Logo";

export default function ForgotPasswordPage() {
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
                        hidden
                        flex-col
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-[#9cee9c]
                        to-white
                        p-12

                        md:flex
                        md:w-[40%]

                        dark:from-emerald-950
                        dark:to-gray-900
                    "
                >
                    <div
                        className="
                            relative
                            z-10
                            mb-2
                            flex
                            h-20
                            w-50
                            items-center
                            gap-3
                        "
                    >
                        <Logo />
                    </div>

                    <p
                        className="
                            mt-3
                            text-center
                            text-sm
                            tracking-[0.2em]
                            text-black/70

                            dark:text-white/70
                        "
                    >
                        Recover Your Account Securely
                    </p>
                </div>

                {/* Right Side */}
                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        justify-center
                        p-12
                    "
                >
                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-gray-900

                            dark:text-gray-100
                        "
                    >
                        Forgot Password
                    </h1>

                    <p
                        className="
                            mb-8
                            mt-2
                            text-gray-500

                            dark:text-gray-400
                        "
                    >
                        Enter your registered email address and we'll
                        send you a verification code to reset your
                        password.
                    </p>

                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
}