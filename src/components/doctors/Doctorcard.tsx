import Image from "next/image";
import Link from "next/link";
import {
    CalendarCheck,
    MapPin,
    Star,
    Clock,
    BadgeCheck
} from "lucide-react";

import { IDoctor } from "@/types/doctor-types/doctorTypes";


export default function DoctorCard({ doctor }: { doctor: IDoctor }) {
    return (
        <div className="group   overflow-hidden dark:border-gray-700 h-full flex flex-col rounded-3xl border border-main/10 bg-background shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

            {/* Image Section */}
            <div className="relative h-64  overflow-hidden bg-main/10">

                <Image
                    src={doctor.profileImage}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-110"
                />


                {/* Verified */}
                <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-main shadow">
                    <BadgeCheck size={15} />
                    Verified
                </div>


                {/* Rating */}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow">
                    <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                    />
                    4.9
                </div>

            </div>


            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between h-full">

                <div>
                    <h3 className="text-xl font-bold">
                        {doctor.name}
                    </h3>


                    <p className="mt-1 text-sm font-medium text-main">
                        {doctor.specialization}
                    </p>



                    {/* Info */}
                    <div className="mt-4 space-y-3 text-sm">


                        <div className="flex items-center justify-between">

                            <span className="text-foreground/60">
                                Experience
                            </span>

                            <span className="font-semibold">
                                {doctor.experience} years
                            </span>

                        </div>



                        <div className="flex items-center justify-between">

                            <span className="text-foreground/60">
                                Consultation
                            </span>

                            <span className="font-semibold text-main">
                                ৳{doctor.fees}
                            </span>

                        </div>



                        <div className="flex items-center gap-2 text-foreground/60">
                            <Clock size={16} />
                            {doctor.availableTime}
                        </div>



                        <div className="flex items-center gap-2 text-foreground/60">
                            <MapPin size={16} />
                            {doctor?.chamber?.address}
                        </div>
                    </div>
                </div>


                {/* Button */}
                <div>
                    <Link
                        href={`/doctors/book/${doctor._id}`}
                        className="
                    mt-5 flex items-center justify-center gap-2 
                    rounded-xl bg-main py-3 
                    text-sm font-semibold text-white
                    transition hover:opacity-90
                    "
                    >
                        <CalendarCheck size={17} />
                        Book Appointment
                    </Link>
                </div>


            </div>
        </div>
    );
}