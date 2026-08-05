import Image from "next/image";
import {
    CalendarDays,
    Clock,
    MapPin,
    Stethoscope,
    WalletCards,
} from "lucide-react";

import type { IDoctor } from "@/types/doctor-types/doctorTypes";


export default function DoctorSummary({
    doctor,
}: {
    doctor: IDoctor;
}) {
    return (
        <div className="overflow-hidden rounded-3xl border border-main/10 dark:border-main/30 bg-background shadow-lg shadow-main/5 lg:sticky lg:top-24">

            {/* Doctor Image */}
            <div className="relative h-56 w-full overflow-hidden bg-main/10 sm:h-64 lg:h-72">
                <Image
                    src={doctor.profileImage}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top"
                />

                <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-main shadow backdrop-blur">
                    ✓ Verified Doctor
                </div>
            </div>


            {/* Doctor Info */}
            <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">

                <div>
                    <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                        {doctor.name}
                    </h2>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-main">
                        <Stethoscope size={16} className="shrink-0" />
                        {doctor.specialization}
                    </p>

                    <p className="mt-2 text-sm text-foreground/70">
                        {Array.isArray(doctor.degree)
                            ? doctor.degree.join(", ")
                            : doctor.degree}
                    </p>
                </div>


                {/* Details */}
                <div className="space-y-3.5 text-sm text-foreground/70 sm:space-y-4">


                    {/* Experience */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main">
                            <Clock size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-foreground/50">
                                Experience
                            </p>

                            <p className="font-semibold text-foreground">
                                {doctor.experience} Years
                            </p>
                        </div>
                    </div>



                    {/* Fee */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main">
                            <WalletCards size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-foreground/50">
                                Consultation Fee
                            </p>

                            <p className="font-semibold text-foreground">
                                ৳ {doctor.fees}
                            </p>
                        </div>
                    </div>



                    {/* Chamber */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main">
                            <MapPin size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-foreground/50">
                                Chamber
                            </p>

                            <p className="font-semibold text-foreground">
                                {doctor.chamber?.name}
                            </p>

                            <p className="mt-1 break-words text-xs">
                                {doctor.chamber.address}
                            </p>

                            <p className="text-xs">
                                Room No: {doctor.chamber.roomNo}
                            </p>
                        </div>
                    </div>

                </div>

                {/* bio */}
                <div className="rounded-2xl border border-main/10 bg-main/5 p-4">
                    <h3 className="text-sm font-semibold text-foreground">
                        About Doctor
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                        {doctor.bio}
                    </p>
                </div>

                {/* Availability */}
                <div className="rounded-2xl bg-main/5 p-3.5 sm:p-4">

                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <CalendarDays
                            size={16}
                            className="shrink-0 text-main"
                        />
                        Available Days
                    </div>


                    <div className="mt-3 flex flex-wrap gap-2">
                        {doctor.availableDays.map((day) => (
                            <span
                                key={day}
                                className="rounded-full bg-background px-3 py-1 text-xs font-medium text-main shadow-sm"
                            >
                                {day}
                            </span>
                        ))}
                    </div>


                    <div className="mt-4 flex items-center gap-2 text-xs text-foreground/60">
                        <Clock size={14} className="shrink-0" />
                        {doctor.availableTime}
                    </div>

                </div>

            </div>
        </div>
    );
}