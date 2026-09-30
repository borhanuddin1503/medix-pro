"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarCheck,
    Star,
} from "lucide-react";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import {
    Autoplay,
    Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useEffect, useState } from "react";



interface IDoctor {
    _id: string;
    name: string;
    specialization: string;
    profileImage?: string;
    experience?: number;
    rating?: number;
    totalPatients?: number;
}



interface DoctorsResponse {
    success: boolean;
    message: string;
    data?: {doctors: IDoctor[]};
}



export default function FeaturedDoctors() {

    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors?limit=20`
                );


                if (!response.ok) {
                    throw new Error("Failed to fetch doctors");
                }


                const result: DoctorsResponse =
                    await response.json();


                setDoctors(result.data?.doctors ?? []);

            } catch (error) {

                console.error(
                    "Failed to fetch doctors:",
                    error
                );

                setDoctors([]);

            } finally {

                setLoading(false);

            }

        };


        fetchDoctors();

    }, []);



    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />


            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-main/10 bg-main/5 px-6 py-12 shadow-2xl shadow-main/5 dark:border-main/30 sm:px-10 lg:px-16">

                    {/* Inner Blobs */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />


                    <div className="relative z-10">

                        {/* Header */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            <div>

                                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                                    Featured Doctors
                                </span>


                                <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">

                                    Meet Our
                                    <span className="text-main">
                                        {" "}Top Specialists
                                    </span>

                                </h2>


                                <p className="mt-5 max-w-xl text-base leading-8 text-foreground/60 sm:text-lg">
                                    Connect with experienced healthcare
                                    professionals who are dedicated to providing
                                    exceptional care.
                                </p>

                            </div>


                            {/* View All */}
                            <Link
                                href="/doctors"
                                className="group flex w-fit items-center gap-2 text-sm font-semibold text-main"
                            >

                                <span>
                                    View All Doctors
                                </span>

                                <ArrowRight
                                    size={17}
                                    className="transition group-hover:translate-x-1"
                                />

                            </Link>

                        </div>


                        {/* Slider */}
                        <div className="mt-12">

                            {loading ? (

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                                    {[1, 2, 3].map((item) => (

                                        <div
                                            key={item}
                                            className="overflow-hidden rounded-3xl border border-main/10 bg-background shadow-lg"
                                        >

                                            <div className="h-64 animate-pulse bg-main/10" />

                                            <div className="space-y-3 p-5">

                                                <div className="h-5 w-2/3 animate-pulse rounded bg-main/10" />

                                                <div className="h-4 w-1/2 animate-pulse rounded bg-main/10" />

                                                <div className="h-4 w-3/4 animate-pulse rounded bg-main/10" />

                                                <div className="h-11 w-full animate-pulse rounded-xl bg-main/10" />

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            ) : doctors.length > 0 ? (

                                <Swiper
                                    modules={[
                                        Autoplay,
                                        Pagination,
                                    ]}
                                    spaceBetween={24}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                        },
                                    }}
                                    className="!pb-12"
                                >

                                    {doctors.map((doctor) => (

                                        <SwiperSlide
                                            key={doctor._id}
                                        >

                                            <div className="group overflow-hidden rounded-3xl border border-main/10 bg-background shadow-lg shadow-main/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                                                {/* Image */}
                                                <div className="relative h-64 overflow-hidden bg-main/10">

                                                    {doctor.profileImage ? (

                                                        <Image
                                                            src={doctor.profileImage}
                                                            alt={doctor.name}
                                                            fill
                                                            className="object-cover object-top transition duration-500 group-hover:scale-105"
                                                        />

                                                    ) : (

                                                        <div className="flex h-full items-center justify-center text-main">
                                                            No Image
                                                        </div>

                                                    )}


                                                    {/* Verified Badge */}
                                                    <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-main shadow-md backdrop-blur-sm">

                                                        ✓ Verified Doctor

                                                    </div>

                                                </div>


                                                {/* Content */}
                                                <div className="p-5">

                                                    <div className="flex items-start justify-between gap-3">

                                                        <div>

                                                            <h3 className="text-lg font-bold text-foreground">
                                                                {doctor.name}
                                                            </h3>

                                                            <p className="mt-1 text-sm text-main">
                                                                {doctor.specialization}
                                                            </p>

                                                        </div>


                                                        {/* Rating */}
                                                        <div className="flex items-center gap-1 rounded-lg bg-main/10 px-2 py-1 text-sm font-semibold text-main">

                                                            <Star
                                                                size={14}
                                                                fill="currentColor"
                                                            />

                                                            {doctor.rating ??
                                                                0}

                                                        </div>

                                                    </div>


                                                    <p className="mt-4 text-sm text-foreground/55">

                                                        {doctor.experience
                                                            ? `${doctor.experience} Years Experience`
                                                            : "Experienced Specialist"}

                                                    </p>


                                                    <p className="mt-1 text-sm text-foreground/55">

                                                        {doctor.totalPatients
                                                            ? `${doctor.totalPatients.toLocaleString()}+ Patients`
                                                            : "Trusted by Patients"}

                                                    </p>


                                                    {/* Action */}
                                                    <Link
                                                        href={`/doctors/book/${doctor._id}`}
                                                        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-main py-3 text-sm font-semibold text-white transition hover:opacity-90"
                                                    >

                                                        <CalendarCheck
                                                            size={17}
                                                        />

                                                        View Doctor

                                                    </Link>

                                                </div>

                                            </div>

                                        </SwiperSlide>

                                    ))}

                                </Swiper>

                            ) : (

                                <div className="rounded-3xl border border-main/10 bg-background py-16 text-center">

                                    <p className="text-sm text-foreground/50">
                                        No doctors available.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}