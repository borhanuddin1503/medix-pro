"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import AuthDivider from "./AuthDivider";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { authClient } from "@/lib/authClient";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { UserRole } from "@/types/auth/authTypes";

export default function SigninForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log(searchParams.get("redirect"))

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


    // change on field value change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };



    // handle sign in
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
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
            setIsSignUpping(true)
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setSignInError(error.message ?? "Invalid email or password.");
                return;
            }

            if (data) {
                console.log(searchParams.get("redirect"))
                const user = data.user as typeof data.user & UserRole;
                toast.success("🎉 Signed in successfully.");
                const redirect = searchParams.get("redirect");

                const redirectPath =
                    redirect ??
                    (!user.role || user.role === "user"
                        ? "/"
                        : `/dashboard/${user.role.toLowerCase()}`);
                console.log('redirect path', redirectPath)
                router.replace(redirectPath);
            }
        } finally {
            setIsSignUpping(false)
        }
    };

    return (
        <form onSubmit={handleSignIn} className="space-y-5">
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
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
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
          rounded-xl
          bg-emerald-600
          text-white
          font-semibold
          transition
          hover:bg-emerald-700
          active:scale-[.98]
          cursor-pointer
        "
            >
                {signUpping ? <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Sign-in...
                </span> : 'Sign-in'}
            </button>

            {signInError && (
                <p className="text-center text-sm text-red-600">
                    {signInError}
                </p>
            )}

            <AuthDivider />

            <GoogleButton />

            <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    href="/sign-up"
                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                    Create Account
                </Link>
            </p>
        </form>
    );
}