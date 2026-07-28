"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    FlaskConical,
    MapPin,
    ShieldCheck,
} from "lucide-react";

const labs = [
    {
        id: "central-diagnostic-lab",
        name: "Central Diagnostic Lab",
        image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
        description:
            "Advanced laboratory testing with accurate results and modern diagnostic technology.",
        location: "Main City Center",
        tests: "100+ Tests",
    },
    {
        id: "medix-care-lab",
        name: "Medix Care Laboratory",
        image: "https://images.pexels.com/photos/4031522/pexels-photo-4031522.jpeg",
        description:
            "Reliable diagnostic services designed to support better healthcare decisions.",
        location: "North Medical Zone",
        tests: "80+ Tests",
    },
    {
        id: "advanced-pathology-center",
        name: "Advanced Pathology Center",
        image: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg",
        description:
            "Professional pathology and diagnostic services powered by modern technology.",
        location: "Healthcare District",
        tests: "120+ Tests",
    },
    {
        id: "prime-health-diagnostics",
        name: "Prime Health Diagnostics",
        image: "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg",
        description:
            "Comprehensive diagnostic testing with dependable results and patient-focused laboratory services.",
        location: "West Medical Avenue",
        tests: "90+ Tests",
    },
    {
        id: "lifeline-diagnostic-center",
        name: "Lifeline Diagnostic Center",
        image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg",
        description:
            "Modern diagnostic facilities providing efficient laboratory testing for better health outcomes.",
        location: "Central Healthcare Zone",
        tests: "150+ Tests",
    },
];

export default function LabDiagnostics() {
    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />


            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative  rounded-[2rem] border border-main/10 dark:border-main/30 px-6 py-12 shadow-2xl shadow-main/5 sm:px-10 lg:px-16">

                    {/* Inner Blobs */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />


                    <div className="relative z-10">

                        {/* Header */}
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                            <div className="max-w-2xl">

                                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                                    Lab & Diagnostics
                                </span>


                                <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">

                                    Trusted Labs for
                                    <span className="text-main">
                                        {" "}Accurate Results
                                    </span>

                                </h2>


                                <p className="mt-5 max-w-xl text-base leading-8 text-foreground/60 sm:text-lg">
                                    Find trusted diagnostic laboratories and
                                    access reliable testing services for your
                                    healthcare needs.
                                </p>

                            </div>


                            <div className="hidden h-24 w-24 items-center justify-center rounded-3xl bg-main/10 text-main lg:flex">

                                <FlaskConical size={44} />

                            </div>

                        </div>


                        {/* Labs */}
                        <div className="mt-12 grid gap-6 lg:grid-cols-3">

                            {labs.map((lab, index) => (

                                <div
                                    key={lab.id}
                                    className={`group overflow-hidden rounded-3xl border border-main/10 bg-background/80 shadow-lg shadow-main/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-main/30 hover:shadow-xl ${index === 0
                                            ? "lg:col-span-2"
                                            : ""
                                        }`}
                                >

                                    {/* Image */}
                                    <div
                                        className={`relative overflow-hidden ${index === 0
                                                ? "h-72"
                                                : "h-56"
                                            }`}
                                    >

                                        <Image
                                            src={lab.image}
                                            alt={lab.name}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />


                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />


                                        {/* Badge */}
                                        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-main shadow-lg backdrop-blur-md">

                                            {lab.tests}

                                        </div>


                                        {/* Name on Image */}
                                        <div className="absolute bottom-5 left-5 right-5">

                                            <h3 className="text-xl font-bold text-white">

                                                {lab.name}

                                            </h3>

                                        </div>

                                    </div>


                                    {/* Content */}
                                    <div className="p-5">

                                        <p className="text-sm leading-6 text-foreground/55">

                                            {lab.description}

                                        </p>


                                        <div className="mt-5 flex items-center justify-between gap-3">

                                            <div className="flex items-center gap-2 text-sm text-foreground/50">

                                                <MapPin
                                                    size={16}
                                                    className="text-main"
                                                />

                                                <span>
                                                    {lab.location}
                                                </span>

                                            </div>


                                            <Link
                                                href={`/labs/${lab.id}`}
                                                className="flex shrink-0 items-center gap-2 text-sm font-semibold text-main transition-all hover:gap-3"
                                            >

                                                <span>
                                                    View Lab
                                                </span>

                                                <ArrowRight size={16} />

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* Bottom Info */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-main/10 pt-8 text-sm text-foreground/55">

                            <div className="flex items-center gap-2">

                                <ShieldCheck
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Trusted Diagnostic Labs
                                </span>

                            </div>


                            <div className="flex items-center gap-2">

                                <FlaskConical
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Accurate Testing Services
                                </span>

                            </div>


                            <div className="flex items-center gap-2">

                                <MapPin
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Find Labs Near You
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Floating Badge */}
                    <div className="absolute -right-3 top-8 hidden rounded-2xl border border-main/10 bg-background/95 px-4 py-3 dark:border-main/30 shadow-xl backdrop-blur-md sm:block sm:-right-6">

                        <div className="flex items-center gap-2">

                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-main" />

                            <span className="text-sm font-semibold text-foreground">
                                Reliable Diagnostics
                            </span>

                        </div>

                    </div>


                    {/* Floating CTA */}
                    <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border dark:border-main/30 border-main/10 bg-background/95 px-5 py-4 shadow-xl backdrop-blur-md sm:block sm:-left-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">

                                <ArrowRight size={20} />

                            </div>


                            <div>

                                <p className="text-sm font-bold text-foreground">
                                    Find a Diagnostic Lab
                                </p>

                                <p className="text-xs text-foreground/50">
                                    Accurate testing starts here
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}