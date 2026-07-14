"use client";

import { useRef, useState } from "react";
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


  // otp state 
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // otp ref
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

  // Password
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      newErrors.otp = "Enter the 6 digit verification code.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      setLoading(true);

      const { error } = await authClient.emailOtp.resetPassword({
        email,
        otp: otpCode,
        password: formData.password,
      });

      if (error) {
        setErrors((prev) => ({
          ...prev,
          server: error.message ?? "Something went wrong.",
        }));
        return;
      }

      toast.success("🎉 Password reset successfully.");

      router.replace("/sign-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-53px)] md:min-h-[calc(100vh-82px)]  flex items-center justify-center bg-gradient-to-br from-[#f0faf0] to-[#e6f5e6] p-6">
        <div className="max-w-md w-full h-full flex flex-col justify-center rounded-3xl bg-white shadow-xl border border-gray-200 p-8">
          {/* Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-10 w-10 text-emerald-600" />
          </div>

          {/* Title */}
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
            Verify Your Email
          </h2>

          <p className="mt-3 text-center text-gray-500">
            We've sent a verification code to {email}
          </p>
          {/* OTP */}
          <div>
            <label className="mb-3 block text-center font-medium text-main">
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

          <div className="flex flex-col gap-5 mt-5">
            {/* Password */}
            <PasswordInput
              label="New Password"
              name="password"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              icon={FaLock}
            />

            {/* Confirm */}
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
              icon={FaLock}
            />

            {errors.server && (
              <p className="text-center text-sm text-red-600">
                {errors.server}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-300"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </div>
      </div>
      );
}