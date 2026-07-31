"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import OTPInput from "./OTPInput";
import { sendOtpUtility } from "@/lib/sendOtp";
import { success } from "better-auth";

export default function VerifyEmailCard() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email")!;

    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [verifyError, setVerifyError] = useState<string>("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    // Send OTP
    const sendOtp = async () => {
        setLoading(true);

        try {
            const sendotpResult = await sendOtpUtility(email);
            if (sendotpResult?.success) {
                setTimeLeft(300);
                toast.success("📧 Verification code sent successfully.");
                return
            }
            toast.error(sendotpResult.messagge);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResend = async () => {
        if (loading || timeLeft > 0) return;

        try {
            setLoading(true);
            await sendOtp();
        } finally {
            setLoading(false);
        }
    };

    // Initial timer
    useEffect(() => {
        const expiry = localStorage.getItem(
            "email-verification-expiry"
        );

        if (!expiry) return;

        const remaining = Math.max(
            0,
            Math.floor((Number(expiry) - Date.now()) / 1000)
        );

        setTimeLeft(remaining);
    }, []);

    // Countdown
    useEffect(() => {
        const interval = setInterval(() => {
            const expiry = localStorage.getItem(
                "email-verification-expiry"
            );

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
                localStorage.removeItem(
                    "email-verification-expiry"
                );

                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // OTP change
    const handleOtpChange = (
        index: number,
        value: string
    ) => {
        if (!/^\d?$/.test(value)) return;

        setOtp((prev) => {
            const newOtp = [...prev];
            newOtp[index] = value;
            return newOtp;
        });

        if (
            value &&
            index < otp.length - 1
        ) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Verify OTP
    const handleSubmitOTP = async () => {
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            return;
        }

        try {
            setVerifyError("");
            setSubmitting(true);

            const verifyRes = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email?email=${email}&otpForVerify=${otpCode}`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );

            const verifyResult = await verifyRes.json();

            if (!verifyRes.ok) {
                return setVerifyError(
                    verifyResult.message!
                );
            }

            toast.success(
                "🎉 Email verified successfully!"
            );

            const redirect =
                searchParams.get("redirect");

            router.replace(redirect ?? "/");
            router.refresh();
        } catch (error) {
            toast.error(
                "Something went wrong!"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const minutes = String(
        Math.floor(timeLeft / 60)
    ).padStart(2, "0");

    const seconds = String(
        timeLeft % 60
    ).padStart(2, "0");

    return (
        <div
            className="
                mx-auto
                w-full
                max-w-md
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-8
                shadow-xl

                dark:border-gray-700
                dark:bg-gray-900
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
                    bg-emerald-100

                    dark:bg-emerald-950/50
                "
            >
                <Mail
                    className="
                        h-10
                        w-10
                        text-emerald-600

                        dark:text-emerald-400
                    "
                />
            </div>

            {/* Title */}
            <h2
                className="
                    mt-6
                    text-center
                    text-3xl
                    font-bold
                    text-gray-800

                    dark:text-gray-100
                "
            >
                Verify Your Email
            </h2>

            <p
                className="
                    mt-3
                    text-center
                    text-gray-500

                    dark:text-gray-400
                "
            >
                We've sent a verification link to
            </p>

            <p
                className="
                    mt-2
                    break-all
                    text-center
                    font-semibold
                    text-emerald-600

                    dark:text-emerald-400
                "
            >
                {email}
            </p>

            <p
                className="
                    mt-5
                    text-center
                    text-sm
                    text-gray-500

                    dark:text-gray-400
                "
            >
                Please check your inbox and click the
                verification link to activate your account.
            </p>

            {/* Countdown */}
            <div className="mt-8">
                <p
                    className="
                        text-center
                        text-sm
                        text-gray-500

                        dark:text-gray-400
                    "
                >
                    Resend available in
                </p>

                <h3
                    className="
                        mt-2
                        text-center
                        text-4xl
                        font-bold
                        tracking-widest
                        text-emerald-600

                        dark:text-emerald-400
                    "
                >
                    {minutes}:{seconds}
                </h3>
            </div>

            {/* OTP */}
            <div className="mt-8">
                <label
                    className="
                        mb-3
                        block
                        text-center
                        font-medium
                        text-gray-700

                        dark:text-gray-300
                    "
                >
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

            {/* Verify */}
            <div className="mt-8">
                {verifyError && (
                    <p className="text-center text-sm text-red-600 dark:text-red-400">
                        {verifyError}
                    </p>
                )}

                <button
                    onClick={handleSubmitOTP}
                    disabled={timeLeft <= 0 || loading}
                    className={`
                        mt-2
                        h-12
                        w-full
                        cursor-pointer
                        rounded-xl
                        font-semibold
                        transition-all
                        duration-300

                        ${timeLeft <= 0
                            ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-500"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }
                    `}
                >
                    {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Verifying...
                        </span>
                    ) : (
                        "Verify"
                    )}
                </button>
            </div>

            {/* Resend */}
            <button
                onClick={handleResend}
                disabled={timeLeft > 0 || loading}
                className={`
                    mt-4
                    h-12
                    w-full
                    cursor-pointer
                    rounded-xl
                    font-semibold
                    transition-all
                    duration-300

                    ${timeLeft > 0
                        ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-500"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }
                `}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Sending...
                    </span>
                ) : (
                    "Send Again"
                )}
            </button>

            {/* Footer */}
            <div
                className="
                    mt-8
                    rounded-xl
                    bg-gray-50
                    p-4

                    dark:bg-gray-800/60
                "
            >
                <h4
                    className="
                        font-semibold
                        text-gray-700

                        dark:text-gray-200
                    "
                >
                    Didn't receive the email?
                </h4>

                <ul
                    className="
                        mt-3
                        list-disc
                        space-y-1
                        pl-5
                        text-sm
                        text-gray-500

                        dark:text-gray-400
                    "
                >
                    <li>Check your Spam or Junk folder.</li>
                    <li>Make sure your email address is correct.</li>
                    <li>
                        Wait until the countdown finishes to resend.
                    </li>
                </ul>
            </div>
        </div>
    );
}