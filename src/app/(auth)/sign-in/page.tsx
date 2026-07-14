// app/signin/page.tsx
"use client";

import SigninForm from "@/components/auth/SigninForm";
import Logo from "@/components/logo/Logo";
import Link from "next/link";

export default function SigninPage() {
    return (
        <div className="min-h-[calc(100vh-53px)] md:min-h-[calc(100vh-82px)] flex items-center justify-center bg-gradient-to-br from-[#f0faf0] to-[#e6f5e6] p-6">
            <div className="flex w-full max-w-[1000px] min-h-[600px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(46,156,46,0.15)] animate-fade-in">
                {/* Left Side - Logo Section */}
                <div className="relative hidden md:flex md:flex-[0_0_40%] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#9cee9c] to-[#ffffff] p-12">
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

                    <p className="relative z-10 text-center text-sm font-light tracking-[0.2em] text-black opacity-80">
                        Secure Access to Your Healthcare Dashboard
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-8 left-8 h-20 w-20 rounded-full border-2 border-white/10" />
                    <div className="absolute top-8 right-8 h-12 w-12 rounded-full border-2 border-white/10" />
                </div>

                {/* Right Side - Form */}
                <div className="flex flex-1 flex-col justify-center p-12">
                    {/* Mobile Logo */}
                    <div className="lg:hidden">
                        <Logo></Logo>
                    </div>

                    {/* Heading */}
                    <h1 className="mb-1 text-center text-2xl font-bold text-gray-900 md:text-left md:text-3xl">
                        Welcome Back
                    </h1>

                    <p className="mb-6 text-center text-sm text-gray-500 md:text-left">
                        Sign in to your MedixPro account and continue managing your
                        healthcare services.
                    </p>

                    {/* Sign In Form */}
                    <SigninForm />
                   
                </div>
            </div>
        </div>
    );
}