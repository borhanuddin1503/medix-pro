"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { authClient } from "@/lib/authClient";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import OTPInput from "./OTPInput";
import { UserRole } from "@/types/auth/authTypes";

interface VerifyEmailProps {
    email: string;
}


export default function VerifyEmailCard({
    email,
}: VerifyEmailProps) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [verifyError, setVerifyError] = useState<string>('');
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    // otp ref
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();



    // send otp function
    const sendOtp = async () => {
        setLoading(true);

        try {
            const { error } = await authClient.emailOtp.sendVerificationOtp({
                email,
                type: "email-verification",
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            const expiresAt = Date.now() + 5 * 60 * 1000;

            localStorage.setItem(
                "email-verification-expiry",
                expiresAt.toString()
            );

            setTimeLeft(300);

            toast.success("📧 Verification code sent successfully.");
        } finally {
            setLoading(false);
        }
    };



    // resend otp
    const handleResend = async () => {
        if (loading || timeLeft > 0) return;

        try {
            setLoading(true);
            await sendOtp();

        } finally {
            setLoading(false);
        }
    };


    // initial timing setting 
    useEffect(() => {
        const expiry = localStorage.getItem("email-verification-expiry");

        if (!expiry) return;

        const remaining = Math.max(
            0,
            Math.floor((Number(expiry) - Date.now()) / 1000)
        );

        setTimeLeft(remaining);
    }, []);

    // controll countdown
    useEffect(() => {
        const interval = setInterval(() => {
            const expiry = localStorage.getItem("email-verification-expiry");

            if (!expiry) {
                setTimeLeft(0);
                return;
            }

            const remaining = Math.max(
                0,
                Math.floor((Number(expiry) - Date.now()) / 1000)
            );

            setTimeLeft(remaining);

            if (remaining <= 0) {
                localStorage.removeItem("email-verification-expiry");
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // handle otp change
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        setOtp((prev) => {
            const newOtp = [...prev];
            newOtp[index] = value;
            return newOtp;
        });

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };


    // verify otp
    const handleSubmitOTP = async () => {
        const otpCode = otp.join("");
        console.log(otp)
        if (otpCode.length !== 6) {
            return;
        }

        try {
            console.log(otpCode)
            setVerifyError('');
            setSubmitting(true)
            const { data, error } =
                await authClient.emailOtp.verifyEmail({
                    email,
                    otp: otpCode,
                });

            if (error) {
                setVerifyError(error.message!)
            }
            if (data) {
                const user = data.user as typeof data.user & UserRole;
                toast.success("🎉 Email verified successfully!");
                const redirect = searchParams.get("redirect");

                const redirectPath =
                    redirect ??
                    (!user.role || user.role === "user"
                        ? "/"
                        : `/dashboard/${user.role.toLowerCase()}`);

                router.replace(redirectPath);
            }

        } finally {
            setSubmitting(false)
        }
    };



    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className="max-w-md w-full mx-auto rounded-3xl bg-white shadow-xl border border-gray-200 p-8">
            {/* Icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                <Mail className="h-10 w-10 text-emerald-600" />
            </div>

            {/* Title */}
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
                Verify Your Email
            </h2>

            <p className="mt-3 text-center text-gray-500">
                We've sent a verification link to
            </p>

            <p className="mt-2 text-center font-semibold text-emerald-600 break-all">
                {email}
            </p>

            <p className="mt-5 text-center text-sm text-gray-500">
                Please check your inbox and click the verification link to activate your
                account.
            </p>

            {/* Countdown */}
            <div className="mt-8">
                <p className="text-center text-sm text-gray-500">
                    Resend available in
                </p>

                <h3 className="mt-2 text-center text-4xl font-bold tracking-widest text-emerald-600">
                    {minutes}:{seconds}
                </h3>
            </div>

            {/* otp box */}
            <div className="mt-8">
                <label className="mb-3 block text-center font-medium text-gray-700">
                    Enter Verification Code
                </label>

                <div className="flex justify-center gap-3">
                    <OTPInput
                        value={otp}
                        onChange={handleOtpChange}
                        inputRefs={inputRefs}
                    />
                </div>
            </div>

            <div className="mt-8">
                {/* error message if email is not verified */}
                {verifyError && (
                    <p className=" text-center text-sm text-red-600">
                        {verifyError}
                    </p>
                )}

                {/* submit otp */}
                <button
                    onClick={handleSubmitOTP}
                    disabled={timeLeft <= 0 || loading}
                    className={`mt-2 h-12 w-full rounded-xl font-semibold transition-all duration-300 cursor-pointer
        ${timeLeft < 0
                            ? "cursor-not-allowed bg-gray-300 text-gray-500"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                >
                    {submitting ? <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        verifying...
                    </span> : 'verify'}
                </button>
            </div>


            {/* Resend */}
            <button
                onClick={handleResend}
                disabled={timeLeft > 0 || loading}
                className={`mt-4 h-12 w-full rounded-xl font-semibold transition-all duration-300 cursor-pointer
        ${timeLeft > 0
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Sending...
                    </span>
                ) : timeLeft > 0 ? (
                    "Send Again"
                ) : (
                    "Send Again"
                )}
            </button>

            {/* Footer */}
            <div className="mt-8 rounded-xl bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-700">
                    Didn't receive the email?
                </h4>

                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-500">
                    <li>Check your Spam or Junk folder.</li>
                    <li>Make sure your email address is correct.</li>
                    <li>Wait until the countdown finishes to resend.</li>
                </ul>
            </div>
        </div>
    );
}