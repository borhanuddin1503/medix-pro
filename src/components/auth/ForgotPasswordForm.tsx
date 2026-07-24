"use client";

import { useState } from "react";
import { MdEmail } from "react-icons/md";
import AuthInput from "./AuthInput";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setEmailError("");
        setServerError("");

        if (!email) {
            setEmailError("Email is required.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setServerError(data.message || "Failed to send reset OTP");
            }

            toast.success(
                "📧 Verification code sent successfully."
            );

            router.push(
                `/reset-password?email=${email}`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <AuthInput
                label="Email Address"
                icon={MdEmail}
                type="email"
                name="email"
                placeholder="john@example.com"
                value={email}
                error={emailError}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            {serverError && (
                <p
                    className="
                        text-center
                        text-sm
                        text-red-600

                        dark:text-red-400
                    "
                >
                    {serverError}
                </p>
            )}

            <button
                type="submit"
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

                    disabled:cursor-not-allowed
                    disabled:bg-gray-300

                    dark:disabled:bg-gray-800
                    dark:disabled:text-gray-500
                "
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Sending...
                    </span>
                ) : (
                    "Send Verification Code"
                )}
            </button>
        </form>
    );
}