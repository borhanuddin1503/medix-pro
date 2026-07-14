"use client";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Logo from "@/components/logo/Logo";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0faf0] to-[#e6f5e6] p-6">
      <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(46,156,46,0.15)] min-h-[600px]">

        {/* Left Side */}
        <div className="hidden md:flex md:w-[40%] flex-col items-center justify-center bg-gradient-to-br from-[#9cee9c] to-white p-12">
          <div className="relative z-10 w-50 h-20 flex items-center gap-3 mb-2">
            <Logo></Logo>
          </div>

          <p className="mt-3 text-center text-sm tracking-[0.2em] text-black/70">
            Recover Your Account Securely
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 flex-col justify-center p-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Forgot Password
          </h1>

          <p className="mt-2 mb-8 text-gray-500">
            Enter your registered email address and we'll send you a verification code to reset your password.
          </p>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}