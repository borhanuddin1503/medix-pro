import Image from "next/image";
import Link from "next/link";
import {
    Baby,
    Brain,
    CalendarCheck,
    Droplet,
    HeartPulse,
    Star,
    Stethoscope,
    BadgeCheck,
    Clock,
    MapPin,
} from "lucide-react";

import type { IDoctor } from "../../types/doctor-types/doctorTypes";

const SPECIALIZATION_ICON: Record<string, typeof Stethoscope> = {
    Cardiologist: HeartPulse,
    Neurologist: Brain,
    Dermatologist: Droplet,
    Pediatrician: Baby,
};

export default function DoctorListRow({ doctor }: { doctor: IDoctor }) {
    const SpecIcon = SPECIALIZATION_ICON[doctor.specialization] ?? Stethoscope;

    return (
        <div className="group flex items-start gap-4 rounded-2xl border border-main/10 bg-background p-4 shadow-sm transition hover:border-main/30 hover:shadow-lg">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-main/10">
                <Image
                    src={doctor.profileImage}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="min-w-0 flex-1">
                {/* Name + Verified */}
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-lg font-bold">
                        {doctor.name}
                    </h3>

                    <BadgeCheck
                        size={15}
                        className="text-green-600"
                    />

                    <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <Star size={12} fill="currentColor" />
                        4.9
                    </div>
                </div>

                {/* Specialization */}
                <p className="mt-1 flex items-center gap-1 text-sm text-main">
                    <SpecIcon size={14} />
                    {doctor.specialization}
                </p>

                {/* Quick Info */}
                <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-main/10 px-3 py-1 text-xs">
                        {doctor.experience} Years
                    </span>

                    <span className="rounded-full bg-main/10 px-3 py-1 text-xs text-main">
                        ৳ {doctor.fees}
                    </span>
                </div>

                {/* Address & Time */}
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Clock size={13} />
                        <span className="truncate">
                            {doctor.availableTime}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={13} />
                        <span className="truncate">
                            {doctor.chamber?.address}
                        </span>
                    </div>
                </div>
            </div>

            <Link
                href={`/doctors/book/${doctor._id}`}
                className="
        ml-auto
        shrink-0
        flex
        items-center
        gap-2
        rounded-xl
        bg-main
        px-5
        py-3
        text-sm
        font-semibold
        text-white
    "
            >
                <CalendarCheck size={16} />
                Book Appoinment
            </Link>
        </div>
    );
}