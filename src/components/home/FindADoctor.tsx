"use client";

import {
    Search,
    MapPin,
    Stethoscope,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DropdownSpecialization from "./DropdownSpecialization";

const specialties = [
    "All Specialties",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Dentist",
];

export default function FindDoctor() {
    const [name, setName] = useState<string>('');
    const [selectedSpecialization, setSelectedSpecialization] =
        useState("All Specialties");

    const router = useRouter()
    const handleSearch = () => {
        const params = new URLSearchParams();

        if (name.trim()) {
            params.append("search", name.trim());
        }

        if (
            selectedSpecialization &&
            selectedSpecialization !== "All Specialties"
        ) {
            params.append(
                "specialization",
                selectedSpecialization
            );
        }

        const queryString = params.toString();

        router.push(
            queryString
                ? `/doctors?${queryString}`
                : "/doctors"
        );
    };

    console.log(name, selectedSpecialization)

    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-main/15 blur-3xl hidden md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl hidden md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl hidden md:block" />


            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative  rounded-[2rem] border dark:border-main/30 border-main/10 bg-main/5 px-6 py-12 shadow-2xl shadow-main/5 sm:px-10 lg:px-16">

                    {/* Inner Blob */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-3xl text-center">

                        {/* Section Label */}
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                            Find Your Doctor
                        </span>


                        {/* Heading */}
                        <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">

                            Find the Right Doctor for
                            <span className="text-main">
                                {" "}Your Health
                            </span>

                        </h2>


                        {/* Description */}
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/60 sm:text-lg">
                            Search and connect with experienced healthcare
                            professionals who are ready to provide the care
                            you need.
                        </p>


                        {/* Search Box */}
                        <div className="mx-auto mt-8 rounded-2xl border border-main/10 bg-background/90 p-3 shadow-xl backdrop-blur-md">

                            <div className="flex flex-col gap-3 lg:flex-row">

                                {/* Search Input */}
                                <div className="flex flex-1 items-center gap-3 rounded-xl border border-foreground/10 bg-background px-4">

                                    <Search
                                        size={20}
                                        className="shrink-0 text-main"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search doctor by name..."
                                        className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                </div>


                                {/* Specialty */}
                                <DropdownSpecialization specialties={specialties} selectedSpecialization={selectedSpecialization} setSelectedSpecialization={setSelectedSpecialization}></DropdownSpecialization>



                                {/* Search Button */}
                                <button
                                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-main px-6 font-semibold text-white transition duration-300 hover:opacity-90 lg:px-8"
                                    onClick={handleSearch}
                                >

                                    <Search size={18} />

                                    <span>
                                        Search Doctor
                                    </span>

                                </button>

                            </div>

                        </div>


                        {/* Quick Features */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-foreground/55">

                            <div className="flex items-center gap-2">
                                <ShieldCheck
                                    size={17}
                                    className="text-main"
                                />

                                <span>
                                    Verified Doctors
                                </span>
                            </div>


                            <div className="flex items-center gap-2">
                                <MapPin
                                    size={17}
                                    className="text-main"
                                />

                                <span>
                                    Find Near You
                                </span>
                            </div>


                            <div className="flex items-center gap-2">
                                <Stethoscope
                                    size={17}
                                    className="text-main"
                                />

                                <span>
                                    Multiple Specialties
                                </span>
                            </div>

                        </div>

                    </div>


                    {/* Floating Badge */}
                    <div className="absolute -left-3 top-8 hidden dark:border-main/30 rounded-2xl border border-main/10 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md sm:block sm:-left-6">

                        <div className="flex items-center gap-2">

                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-main" />

                            <span className="text-sm font-semibold text-foreground">
                                Expert Care Available
                            </span>

                        </div>

                    </div>


                    {/* Floating CTA */}
                    <div className="absolute -bottom-5 -right-4 hidden dark:border-main/30 rounded-2xl border border-main/10 bg-background/95 px-5 py-4 shadow-xl backdrop-blur-md sm:block sm:-right-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">
                                <ArrowRight size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-foreground">
                                    Start Your Search
                                </p>

                                <p className="text-xs text-foreground/50">
                                    Quality care is closer than you think
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}