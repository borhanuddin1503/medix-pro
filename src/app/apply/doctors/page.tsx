"use client";

import { useEffect, useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import { MdMedicalServices, MdSchool, MdAttachMoney, MdOutlineLocationOn, MdAccessTime, MdPerson, MdCalendarMonth } from "react-icons/md";
import { FaCertificate, FaHospital } from "react-icons/fa";
import { Stethoscope, UploadCloud, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/auth/ImageUpload";
import { IDoctorApplyForm } from "@/types/doctor-types/doctorTypes";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { sendOtpUtility } from "@/lib/sendOtp";
import { getUser, IWhoMeUser } from "@/app/utils/getUser";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";

export default function DoctorApplyForm() {

    const [formData, setFormData] = useState<IDoctorApplyForm>({
        specialization: "",
        degree: "",
        experience: "",
        fees: "",
        licenseNumber: "",
        availableTime: "",
        bio: "",
        name: "",
        availableDays: "",
        chamber: {
            name: "",
            address: "",
            roomNo: "",
        },
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
    });

    const [profileImage, setProfileImage] = useState<string>('');
    const [isApplying, setIsApplaying] = useState<boolean>(false);
    const [user, setUser] = useState<IWhoMeUser | null>(null);
    const router = useRouter();


    useEffect(() => {
        const userInfo = async () => {
            const user2 = await getUser()
            console.log('user 2', user2)
            setUser(user2)
        };

        userInfo();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case "chamberName":
                setFormData((prev) => ({
                    ...prev,
                    chamber: {
                        ...prev.chamber,
                        name: value,
                    },
                }));
                break;

            case "address":
                setFormData((prev) => ({
                    ...prev,
                    chamber: {
                        ...prev.chamber,
                        address: value,
                    },
                }));
                break;

            case "roomNo":
                setFormData((prev) => ({
                    ...prev,
                    chamber: {
                        ...prev.chamber,
                        roomNo: value,
                    },
                }));
                break;

            default:
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
        }
    };
    const pathname = usePathname();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = { ...errors };
        newErrors.ApplyingError = '';

        for (const key in formData) {
            if (key === "chamber") continue;

            const field = key as Exclude<keyof typeof formData, "chamber">;

            if (!formData[field].trim()) {
                newErrors[field] = `${field} is required.`;
            } else {
                newErrors[field] = "";
            }
        }

        if (!formData.chamber.name.trim()) {
            newErrors.chamber = "Chamber name is required.";
        } else {
            newErrors.chamber = "";
        }

        if (!formData.chamber.address.trim()) {
            newErrors.address = "Address is required.";
        } else {
            newErrors.address = "";
        }

        if (!formData.chamber.roomNo.trim()) {
            newErrors.roomNo = "Room number is required.";
        } else {
            newErrors.roomNo = "";
        }

        if (!profileImage) {
            newErrors.image = 'Image is required';
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


            const { status, data: result } = await fetchWithAuth(
                "/api/doctors/apply",
                {
                    method: "POST",
                    body: {
                        ...formData,
                        profileImage,
                        availableDays,
                    },
                }
            );



            switch (status) {
                case 200:
                case 201:
                    toast.success(
                        `🎉 Application submitted successfully.\nApplicant ID: ${result.applicantId} `
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

                        const sendotpResult = await sendOtpUtility(user?.email);
                        if (sendotpResult.success) {
                            router.push(
                                `/verify-email?email=${user?.email}& redirect=${encodeURIComponent(pathname)} `
                            );
                        }
                    } else {
                        toast.error(result.message ?? "Access denied.");

                        router.push("/forbidden");
                    }
                    break;

                case 400:
                    toast.error(result.message ?? "Invalid request.");
                    break;

                case 409:
                    newErrors.ApplyingError = "You have already submitted an application.";

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
            newErrors.ApplyingError = 'Something went wrong';
            toast.error("Internal Server Error , try again later");
        } finally {
            setIsApplaying(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0faf0] to-[#e6f5e6] dark:from-gray-950 dark:via-gray-800 dark:to-gray-900 p-10">
            <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white dark:border dark:border-gray-700 dark:bg-gray-900 shadow-[0_20px_60px_rgba(46,156,46,0.15)] dark:shadow-black/30 min-h-[600px] p-6">

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
                        dark:bg-emerald-900/40
                    ">
                            <Stethoscope className="h-10 w-10 text-main dark:text-emerald-400" />
                        </div>

                        <h1 className="
                        mt-5
                        text-3xl
                        font-bold
                        text-gray-900
                        dark:text-white
                    ">
                            Apply As A Doctor
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Submit your professional information for verification.
                        </p>

                    </div>

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
                            name="chamberName"
                            placeholder="City Hospital"
                            icon={FaHospital}
                            value={formData.chamber.name}
                            onChange={handleChange}
                            error={errors.chamber}
                        />

                        <AuthInput
                            label="Room Number *"
                            name="roomNo"
                            placeholder="203"
                            icon={FaHospital}
                            value={formData.chamber.roomNo}
                            onChange={handleChange}
                            error={errors.roomNo}
                        />

                    </div>

                    <AuthInput
                        label="Chamber Address *"
                        name="address"
                        placeholder="Agrabad, Chittagong"
                        icon={MdOutlineLocationOn}
                        value={formData.chamber.address}
                        onChange={handleChange}
                        error={errors.address}
                    />

                    {/* Bio */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                            className="w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-4 py-3 outline-none transition focus:border-main focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-900/40"
                        />

                        {errors.bio && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {errors.bio}
                            </p>
                        )}
                    </div>

                    {
                        errors.ApplyingError && (
                            <p className="text-center text-sm text-red-600 dark:text-red-400">
                                {errors.ApplyingError}
                            </p>
                        )
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
                        dark:bg-emerald-600
                        dark:hover:bg-emerald-500
                        active:scale-[.98]
                        cursor-pointer
                    "
                    >
                        {isApplying ? (
                            <span className="flex items-center justify-center gap-2">
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Applying...
                            </span>
                        ) : (
                            ' Submit Application'
                        )}
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
                        dark:text-emerald-400
                        dark:hover:text-emerald-300
                    "
                    >
                        <ArrowLeft size={16} />
                        Back Home
                    </Link>

                </form>
            </div>
        </div>
    );

}
