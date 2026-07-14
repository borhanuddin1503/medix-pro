"use client";

import { useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import { MdMedicalServices, MdSchool, MdAttachMoney, MdOutlineLocationOn, MdAccessTime, MdPerson, MdCalendarMonth } from "react-icons/md";
import { FaCertificate, FaHospital } from "react-icons/fa";
import { Stethoscope, UploadCloud, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/auth/ImageUpload";
import { IDoctorApplyForm } from "@/types/doctor-types/doctorTypes";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useUserSession } from "@/custom-hooks/user/useUserSession";
import { authClient } from "@/lib/authClient";

export default function DoctorApplyForm() {

    const [formData, setFormData] = useState<IDoctorApplyForm>({
        specialization: "",
        degree: "",
        experience: "",
        fees: "",
        licenseNumber: "",
        chamber: "",
        availableTime: "",
        address: "",
        roomNo: "",
        bio: "",
        name: "",
        availableDays: ''
    });

    const [errors, setErrors] = useState({
        specialization: "",
        degree: "",
        experience: "",
        fees: "",
        licenseNumber: "",
        chamber: "",
        address: "",
        roomNo: "",
        bio: "",
        image: "",
        ApplyingError: '',
        availableTime: "",
        availableDays: '',
        name: "",
    })

    const [profileImage, setProfileImage] = useState<string>('');
    const [isApplying, setIsApplaying] = useState<boolean>(false);
    const router = useRouter();
    const userSession = useUserSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const pathname = usePathname();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = { ...errors };
        newErrors.ApplyingError = '';
        for (const key in formData) {
            const field = key as keyof typeof formData;

            if (!formData[field].trim()) {
                newErrors[field] = `${field} is required.`;
            } else {
                newErrors[field] = "";
            }
        }

        if (!profileImage) {
            newErrors.image = 'Image is required'
        }
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            return;
        }


        const availableDays = formData.availableDays
            .split(",")
            .map(day => day.trim());

        // API call
        try {
            setIsApplaying(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors/apply`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ ...formData, profileImage, availableDays }),
                }
            );

            const result = await response.json();

            switch (response.status) {
                case 200:
                case 201:
                    toast.success(
                        `🎉 Application submitted successfully.\nApplicant ID: ${result.applicantId}`
                    );

                    router.replace("/");
                    break;

                case 401:
                    toast.error("Please sign in to continue.");

                    router.push(
                        `/sign-in?redirect=${encodeURIComponent(pathname)}`
                    );
                    break;

                case 403:
                    if (result.code === "EMAIL_NOT_VERIFIED") {
                        toast.error(result.message);
                        await authClient.emailOtp.sendVerificationOtp({
                            email: userSession.session?.user.email!,
                            type: "email-verification",
                        });
                        const expiresAt = Date.now() + 5 * 60 * 1000;

                        localStorage.setItem(
                            "email-verification-expiry",
                            expiresAt.toString()
                        );

                        router.push(
                            `/verify-email?email=${userSession.session?.user.email}&redirect=${encodeURIComponent(pathname)}`
                        );
                    } else {
                        toast.error(result.message ?? "Access denied.");

                        router.push("/forbidden");
                    }
                    break;

                case 400:
                    toast.error(result.message ?? "Invalid request.");
                    break;

                case 409:
                    errors.ApplyingError = "You have already submitted an application.";
                    toast.error(
                        result.message ?? "You have already submitted an application."
                    );
                    break;

                case 500:
                    toast.error(
                        result.message ?? "Internal server error. Please try again later."
                    );
                    break;

                default:
                    toast.error(
                        result.message ?? "Something went wrong. Please try again."
                    );
                    break;
            }

        } catch (error) {
            errors.ApplyingError = 'Something went wrong';
            toast.error("Internal Server Error , try again later");
        } finally {
            setIsApplaying(false)
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0faf0] to-[#e6f5e6] p-6">
            <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(46,156,46,0.15)] min-h-[600px] p-6">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 w-full"
                >

                    {/* Header */}
                    <div className="text-center">

                        <div className="
                    mx-auto 
                    flex 
                    h-20 
                    w-20 
                    items-center 
                    justify-center 
                    rounded-full 
                    bg-emerald-100
                ">
                            <Stethoscope className="h-10 w-10 text-main" />
                        </div>


                        <h1 className="
                    mt-5
                    text-3xl
                    font-bold
                    text-gray-900
                ">
                            Apply As A Doctor
                        </h1>


                        <p className="mt-2 text-sm text-gray-500">
                            Submit your professional information for verification.
                        </p>

                    </div>




                    <ImageUpload value={profileImage}
                        onChange={setProfileImage}
                        error={errors.image}
                        onClearError={() =>
                            setErrors((prev) => ({
                                ...prev,
                                image: "",
                            }))}></ImageUpload>

                    <div className="grid gap-5 md:grid-cols-2">

                        <AuthInput
                            label="Doctor Name *"
                            name="name"
                            placeholder="Dr. John Doe"
                            icon={MdPerson}
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <AuthInput
                            label="Specialization *"
                            name="specialization"
                            placeholder="Cardiologist"
                            icon={MdMedicalServices}
                            value={formData.specialization}
                            onChange={handleChange}
                            error={errors.specialization}
                        />


                        <AuthInput
                            label="Degree *"
                            name="degree"
                            placeholder="MBBS, FCPS"
                            icon={MdSchool}
                            value={formData.degree}
                            onChange={handleChange}
                            error={errors.degree}
                        />


                        <AuthInput
                            label="Experience *"
                            name="experience"
                            placeholder="5 Years"
                            icon={MdMedicalServices}
                            value={formData.experience}
                            onChange={handleChange}
                            error={errors.experience}
                        />


                        <AuthInput
                            label="Consultation Fee *"
                            name="fees"
                            placeholder="500"
                            icon={MdAttachMoney}
                            value={formData.fees}
                            onChange={handleChange}
                            error={errors.fees}
                            type="number"
                        />


                        <AuthInput
                            label="License Number *"
                            name="licenseNumber"
                            placeholder="BMDC-12345"
                            icon={FaCertificate}
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            error={errors.licenseNumber}
                        />



                        <AuthInput
                            label="Available Days *"
                            name="availableDays"
                            placeholder="Saturday, Monday, Wednesday"
                            icon={MdCalendarMonth}
                            value={formData.availableDays}
                            onChange={handleChange}
                            error={errors.availableDays}
                        />

                        <AuthInput
                            label="Available Time *"
                            name="availableTime"
                            placeholder="6 PM - 10 PM"
                            icon={MdAccessTime}
                            value={formData.availableTime}
                            onChange={handleChange}
                            error={errors.availableTime}
                        />


                        <AuthInput
                            label="Chamber Name *"
                            name="chamber"
                            placeholder="City Hospital"
                            icon={FaHospital}
                            value={formData.chamber}
                            onChange={handleChange}
                            error={errors.chamber}
                        />

                        <AuthInput
                            label="Room Number *"
                            name="roomNo"
                            placeholder="203"
                            icon={FaHospital}
                            value={formData.roomNo}
                            onChange={handleChange}
                            error={errors.roomNo}
                        />



                    </div>


                    <AuthInput
                        label="Chamber Address *"
                        name="address"
                        placeholder="Agrabad, Chittagong"
                        icon={MdOutlineLocationOn}
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                    />




                    {/* Bio */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Professional Bio *
                        </label>

                        <textarea
                            name="bio"
                            rows={4}
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    bio: e.target.value,
                                }))
                            }
                            placeholder="Tell patients about your experience..."
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-main focus:ring-2 focus:ring-emerald-100"
                        />
                        {errors.bio && <p className="mt-1 text-sm text-red-500">
                            {errors.bio}
                        </p>}
                    </div>


                    {
                        errors.ApplyingError && <p className="text-center text-sm text-red-600">
                            {errors.ApplyingError}
                        </p>
                    }

                    {/* Submit */}
                    <button
                        type="submit"
                        className="
                    h-12
                    w-full
                    rounded-xl
                    bg-emerald-600
                    font-semibold
                    text-white
                    transition
                    hover:bg-emerald-700
                    active:scale-[.98]
                    cursor-pointer
                "
                    >
                        {isApplying ? <span className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Applying...
                        </span> : ' Submit Application'}
                    </button>



                    <Link
                        href="/"
                        className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    text-emerald-600
                    hover:text-emerald-700
                "
                    >
                        <ArrowLeft size={16} />
                        Back Home
                    </Link>


                </form>
            </div>
        </div >
    );
}