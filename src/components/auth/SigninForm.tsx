"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import AuthDivider from "./AuthDivider";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { UserRole } from "@/types/auth/authTypes";
import { signInAction } from "@/app/actions/auth.action";

export default function SigninForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    console.log(searchParams.get("redirect"));

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [signInError, setSignInError] = useState("");
    const [signUpping, setIsSignUpping] = useState<boolean>(false);

    // Change on field value change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle sign in
    const handleSignIn = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const newErrors = {
            email: "",
            password: "",
        };

        setSignInError("");

        if (!formData.email) {
            newErrors.email = "Email is required.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        try {
            setIsSignUpping(true);

            const result = await signInAction({
                email: formData.email,
                password: formData.password,
            });

            if (!result.success) {
                setSignInError(
                    result.message ??
                    "Invalid email or password."
                );
                return;
            }

            console.log("result of sign in", result);

            if (result.success) {
                const user =
                    result.user as typeof result.user & UserRole;

                const redirect =
                    searchParams.get("redirect");

                const redirectPath =
                    redirect ??
                    (!user.role ||
                    user.role === "user"
                        ? "/"
                        : `/dashboard/${user.role.toLowerCase()}`);

                console.log("redirect path", redirectPath);

                router.replace(redirectPath);
            }
        } finally {
            setIsSignUpping(false);
        }
    };

    return (
        <form
            onSubmit={handleSignIn}
            className="space-y-5"
        >
            {/* Email */}
            <AuthInput
                label="Email Address"
                icon={MdEmail}
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
            />

            {/* Password */}
            <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                error={errors.password}
                onChange={handleChange}
                icon={FaLock}
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
                <Link
                    href="/forgot-password"
                    className="
                        text-sm
                        font-medium
                        text-emerald-600
                        transition
                        hover:text-emerald-700

                        dark:text-emerald-400
                        dark:hover:text-emerald-300
                    "
                >
                    Forgot Password?
                </Link>
            </div>

            {/* Sign In */}
            <button
                type="submit"
                className="
                    h-12
                    w-full
                    cursor-pointer
                    rounded-xl
                    bg-emerald-600
                    font-semibold
                    text-white
                    transition
                    hover:bg-emerald-700
                    active:scale-[.98]
                "
            >
                {signUpping ? (
                    <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Sign-in...
                    </span>
                ) : (
                    "Sign-in"
                )}
            </button>

            {signInError && (
                <p className="text-center text-sm text-red-600 dark:text-red-400">
                    {signInError}
                </p>
            )}

            <AuthDivider />

            <GoogleButton />

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}

                <Link
                    href="/sign-up"
                    className="
                        font-semibold
                        text-emerald-600
                        transition
                        hover:text-emerald-700

                        dark:text-emerald-400
                        dark:hover:text-emerald-300
                    "
                >
                    Create Account
                </Link>
            </p>
        </form>
    );
}