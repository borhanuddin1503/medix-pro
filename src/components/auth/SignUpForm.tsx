"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import AuthDivider from "./AuthDivider";
import { SignupFormData } from "@/types/auth/authTypes";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { RefreshCw } from "lucide-react";



export default function SignupForm() {
  const router = useRouter();
  // email reg ex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // data handling
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  // error handling
  const [errors, setErrors] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [profileImage, setProfileImage] = useState<string>('');
  const [signUpError, setSignUpError] = useState<string>('');
  const [signUpping, setIsSignUpping] = useState<boolean>(false);


  // change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  // sign up
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    };

    setSignUpError('')

    if (!profileImage) {
      newErrors.image = "Profile image is required.";
    }

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is Invalid.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }


    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // return if there have any error
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setIsSignUpping(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/sign-up`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: profileImage
        })
      });

      const result = await res.json();

      if (!res.ok) {
        return setSignUpError(result?.message)
      }


      toast.success("✅ Account created successfully.");
      const expiresAt = Date.now() + 5 * 60 * 1000;

      localStorage.setItem(
        "email-verification-expiry",
        expiresAt.toString()
      );

      toast.success("📧 Verification code sent successfully.");
      router.replace(`/verify-email?email=${result?.user.email}`);
    } finally {
      setIsSignUpping(false)
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="space-y-5"
    >
      {/* Profile Image */}
      <ImageUpload
        value={profileImage}
        onChange={setProfileImage}
        error={errors.image}
        onClearError={() =>
          setErrors((prev) => ({
            ...prev,
            image: "",
          }))
        }
      />

      {/* Full Name */}
      <AuthInput
        label="Full Name"
        icon={FaUser}
        type="text"
        name="name"
        placeholder="John Doe"
        value={formData.name}
        error={errors.name}
        onChange={handleChange}
      />

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

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        error={errors.confirmPassword}
        onChange={handleChange}
        icon={FaLock}
      />

      {/* Submit */}
      <button
        type="submit"
        className="
          w-full
          h-12
          rounded-xl
          bg-main
          hover:bg-emerald-700
          active:scale-[.98]
          duration-200
          text-white
          font-semibold
          cursor-pointer
        "
      >
        {signUpping ? <span className="flex items-center justify-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          creating...
        </span> : 'Sign-up'}
      </button>

      {signUpError && <p className="mt-2 text-sm text-center text-red-600">
        {signUpError}
      </p>}

      <AuthDivider />

      <GoogleButton />

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href={'/sign-in'}
          className="
            text-main
            hover:text-emerald-700
            font-semibold
          "
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}