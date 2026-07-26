"use client";

import {
    HeartPulse,
    Brain,
    Baby,
    Bone,
    Eye,
    Stethoscope,
    ArrowRight,
    Activity,
    ShieldCheck,
} from "lucide-react";

const departments = [
    {
        icon: HeartPulse,
        title: "Cardiology",
    },
    {
        icon: Brain,
        title: "Neurology",
    },
    {
        icon: Baby,
        title: "Pediatrics",
    },
    {
        icon: Bone,
        title: "Orthopedics",
    },
    {
        icon: Eye,
        title: "Ophthalmology",
    },
    {
        icon: Activity,
        title: "General Medicine",
    },
    {
        icon: Activity,
        title: "General ",
    },
];

export default function Departments() {
    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />


            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-main/10 bg-main/5 px-6 py-12 shadow-2xl shadow-main/5 sm:px-10 lg:px-16">

                    {/* Inner Blobs */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />


                    <div className="relative z-10">

                        {/* Header */}
                        <div className="mx-auto max-w-3xl text-center">

                            {/* Section Label */}
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                                Our Departments
                            </span>


                            {/* Heading */}
                            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">

                                Specialized Care for
                                <span className="text-main">
                                    {" "}Every Need
                                </span>

                            </h2>


                            {/* Description */}
                            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/60 sm:text-lg">
                                Explore our wide range of medical departments
                                and connect with experienced healthcare
                                professionals dedicated to your well-being.
                            </p>

                        </div>


                        {/* Departments Grid */}
                        <div className="mt-12 grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                            {departments.map((department) => {

                                const Icon = department.icon;

                                return (

                                    <div
                                        key={department.title}
                                        className="group rounded-2xl border border-main/10 bg-background/80 p-6 shadow-lg shadow-main/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-main/30 hover:shadow-xl flex flex-col items-center justify-between"
                                    >

                                        <div className="flex flex-col items-center">
                                            {/* Icon */}
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-main/10 text-main transition duration-300 group-hover:bg-main group-hover:text-white">

                                                <Icon size={26} />

                                            </div>


                                            {/* Content */}
                                            <h3 className="mt-5 text-lg font-semibold text-foreground text-center">
                                                {department.title}

                                            </h3>
                                        </div>

                                        {/* Action */}
                                        <button
                                            className="mt-5 flex items-center gap-2 text-sm font-semibold text-main transition group-hover:gap-3"
                                        >

                                            <span>
                                                View Department
                                            </span>

                                            <ArrowRight
                                                size={16}
                                            />

                                        </button>

                                    </div>

                                );

                            })}

                        </div>


                        {/* Bottom Trust Information */}
                        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-main/10 pt-8 text-sm text-foreground/55">

                            <div className="flex items-center gap-2">

                                <ShieldCheck
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Experienced Specialists
                                </span>

                            </div>


                            <div className="flex items-center gap-2">

                                <Stethoscope
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Multiple Medical Specialties
                                </span>

                            </div>


                            <div className="flex items-center gap-2">

                                <HeartPulse
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Patient-Centered Care
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}