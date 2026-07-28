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



const featuredDoctors = [
    {
        _id: "dr-sarah-wilson",
        name: "Dr. Sarah Wilson",
        specialization: "Cardiologist",
        image:
            "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
        experience: "12 Years Experience",
        rating: 4.9,
        patients: "2.5k+ Patients",
    },
    {
        _id: "dr-michael-anderson",
        name: "Dr. Michael Anderson",
        specialization: "Neurologist",
        image:
            "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg",
        experience: "10 Years Experience",
        rating: 4.8,
        patients: "1.8k+ Patients",
    },
    {
        _id: "dr-emily-carter",
        name: "Dr. Emily Carter",
        specialization: "Dermatologist",
        image:
            "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg",
        experience: "8 Years Experience",
        rating: 4.9,
        patients: "2k+ Patients",
    },
    {
        _id: "dr-james-miller",
        name: "Dr. James Miller",
        specialization: "Pediatrician",
        image:
            "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
        experience: "15 Years Experience",
        rating: 5.0,
        patients: "3k+ Patients",
    },
];

export default function FeaturedDoctors() {
    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />


            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-main/10 dark:border-main/30 bg-main/5 px-6 py-12 shadow-2xl shadow-main/5 sm:px-10 lg:px-16">

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

                                {featuredDoctors.map((doctor) => (

                                    <SwiperSlide key={doctor._id}>

                                        <div className="group overflow-hidden rounded-3xl border border-main/10 bg-background shadow-lg shadow-main/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                                            {/* Image */}
                                            <div className="relative h-64 overflow-hidden bg-main/10">

                                                <Image
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    fill
                                                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                                                />


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

                                                        {doctor.rating}

                                                    </div>

                                                </div>


                                                <p className="mt-4 text-sm text-foreground/55">
                                                    {doctor.experience}
                                                </p>


                                                <p className="mt-1 text-sm text-foreground/55">
                                                    {doctor.patients}
                                                </p>


                                                {/* Action */}
                                                <Link
                                                    href={`/doctors/${doctor._id}`}
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

                        </div>

                    </div>



                </div>

            </div>

        </section>
    );
}