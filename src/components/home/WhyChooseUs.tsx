"use client";

import Image from "next/image";
import {
    Activity,
    BadgeCheck,
    HeartPulse,
    ShieldCheck,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Trusted Healthcare",
        description:
            "Your health and personal information are handled with care, privacy, and security.",
    },
    {
        icon: BadgeCheck,
        title: "Experienced Professionals",
        description:
            "Connect with qualified healthcare professionals who are dedicated to delivering quality care.",
    },
    {
        icon: Activity,
        title: "Advanced Technology",
        description:
            "Modern medical technology helps us provide faster, more accurate, and reliable healthcare services.",
    },
    {
        icon: HeartPulse,
        title: "Patient-Centered Care",
        description:
            "Every decision is made with one priority in mind — your health, comfort, and well-being.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-20 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />


            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-main/10 px-6 py-12 shadow-2xl shadow-main/5 dark:border-main/30 sm:px-10 lg:px-16">

                    {/* Inner Blobs */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />


                    <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

                        {/* Left Side - Visual */}
                        <div className="relative mx-auto w-full max-w-xl">

                            {/* Background Glow */}
                            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl" />


                            {/* Main Image */}
                            <div className="relative overflow-hidden rounded-[2rem] border border-main/10 bg-main/5 p-3 shadow-2xl shadow-main/5">

                                <Image
                                    src="https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg"
                                    alt="Healthcare professionals"
                                    width={700}
                                    height={700}
                                    className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[380px] lg:h-[500px]"
                                />

                            </div>


                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-6 -right-3 rounded-2xl border border-main/10 bg-background/95 p-5 shadow-xl backdrop-blur-md sm:-right-6">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-main/10 text-main">

                                        <HeartPulse size={24} />

                                    </div>


                                    <div>

                                        <p className="text-2xl font-bold text-foreground">
                                            98%
                                        </p>

                                        <p className="text-sm text-foreground/50">
                                            Patient Satisfaction
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Floating Badge */}
                            <div className="absolute -left-3 top-8 rounded-2xl border border-main/10 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-6">

                                <div className="flex items-center gap-2">

                                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-main" />

                                    <span className="text-sm font-semibold text-foreground">
                                        Care You Can Trust
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Right Side - Content */}
                        <div>

                            {/* Section Label */}
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                                Why Choose Us
                            </span>


                            {/* Heading */}
                            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">

                                Healthcare That Puts
                                <span className="text-main">
                                    {" "}You First
                                </span>

                            </h2>


                            {/* Description */}
                            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/60 sm:text-lg">

                                We combine trusted healthcare professionals,
                                modern technology, and a patient-first approach
                                to make your healthcare experience simpler,
                                safer, and better.

                            </p>


                            {/* Features */}
                            <div className="mt-8 grid grid-cols-2 gap-6">

                                {features.map((feature) => {

                                    const Icon = feature.icon;

                                    return (

                                        <div
                                            key={feature.title}
                                            className="group flex flex-col items-center md:items-start"
                                        >

                                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-main/10 text-main transition duration-300 group-hover:bg-main group-hover:text-white">

                                                <Icon size={21} />

                                            </div>


                                            <h3 className="text-center font-semibold text-foreground md:text-left">

                                                {feature.title}

                                            </h3>


                                            <p className="mt-2 text-center text-sm leading-6 text-foreground/55 md:text-left">

                                                {feature.description}

                                            </p>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    </div>

                   

                </div>

            </div>

        </section>
    );
}