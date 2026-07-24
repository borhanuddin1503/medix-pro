"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "@/components/auth/PasswordInput";
import { Mail, RefreshCw } from "lucide-react";
import { FaLock } from "react-icons/fa";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";
import OTPInput from "@/components/auth/OTPInput";

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";

    // OTP state
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        otp: "",
        password: "",
        confirmPassword: "",
        server: "",
    });

    const [loading, setLoading] = useState(false);

    // Handle OTP change
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

    // Handle password change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Submit
    const handleSubmit = async () => {
        const otpCode = otp.join("");

        const newErrors = {
            otp: "",
            password: "",
            confirmPassword: "",
            server: "",
        };

        if (otpCode.length !== 6) {
            newErrors.otp =
                "Enter the 6 digit verification code.";
        }

        if (!formData.password) {
            newErrors.password =
                "Password is required.";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Confirm password is required.";
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp: otpCode,
                        newPassword: formData.password,
                        confirmPassword: formData.confirmPassword
                    }),
                }
            );

            const resetResult = await response.json();

            if (!response.ok) {
                setErrors((prev) => ({
                    ...prev,
                    server:
                        resetResult.message ??
                        "Something went wrong.",
                }));

                return;
            }

            toast.success(
                "🎉 Password reset successfully."
            );

            router.replace("/sign-in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">

            {/* Icon */}
            <div
                className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-100
                    shadow-sm

                    dark:bg-emerald-950/60
                "
            >
                <Mail
                    className="
                        h-9
                        w-9
                        text-emerald-600

                        dark:text-emerald-400
                    "
                />
            </div>

            {/* Title */}
            <h2
                className="
                    mt-5
                    text-center
                    text-2xl
                    font-bold
                    text-gray-800

                    dark:text-gray-100
                "
            >
                Reset Your Password
            </h2>

            {/* Description */}
            <p
                className="
                    mt-3
                    text-center
                    text-sm
                    leading-6
                    text-gray-500

                    dark:text-gray-400
                "
            >
                We've sent a verification code to
            </p>

            <p
                className="
                    mt-1
                    break-all
                    text-center
                    text-sm
                    font-semibold
                    text-emerald-600

                    dark:text-emerald-400
                "
            >
                {email}
            </p>

            {/* OTP */}
            <div className="mt-7">
                <label
                    className="
                        mb-3
                        block
                        text-center
                        text-sm
                        font-medium
                        text-gray-700

                        dark:text-gray-300
                    "
                >
                    Verification Code
                </label>

                <div className="flex justify-center gap-3">
                    <OTPInput
                        value={otp}
                        onChange={handleOtpChange}
                        inputRefs={inputRefs}
                    />
                </div>

                {errors.otp && (
                    <p className="mt-2 text-center text-sm text-red-600">
                        {errors.otp}
                    </p>
                )}
            </div>

            {/* Password Fields */}
            <div className="mt-6 flex flex-col gap-5">

                <PasswordInput
                    label="New Password"
                    name="password"
                    value={formData.password}
                    error={errors.password}
                    onChange={handleChange}
                    icon={FaLock}
                />

                <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={handleChange}
                    icon={FaLock}
                />

                {/* Server Error */}
                {errors.server && (
                    <p className="text-center text-sm text-red-600">
                        {errors.server}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                        flex
                        h-12
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-600
                        font-semibold
                        text-white
                        transition
                        hover:bg-emerald-700
                        active:scale-[.98]

                        disabled:cursor-not-allowed
                        disabled:bg-gray-300

                        dark:disabled:bg-gray-800
                        dark:disabled:text-gray-500
                    "
                >
                    {loading ? (
                        <>
                            <RefreshCw
                                className="
                                    mr-2
                                    h-4
                                    w-4
                                    animate-spin
                                "
                            />
                            Resetting...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </button>
            </div>
        </div>
    );
}