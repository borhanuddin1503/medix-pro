"use client";

import {
    Search,
    CalendarCheck,
    HeartPulse,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Find Your Doctor",
        description:
            "Search for a doctor by name or specialty and find the right healthcare professional for your needs.",
    },
    {
        number: "02",
        icon: CalendarCheck,
        title: "Book an Appointment",
        description:
            "Choose a convenient time and book your appointment with just a few simple clicks.",
    },
    {
        number: "03",
        icon: HeartPulse,
        title: "Get Quality Care",
        description:
            "Connect with your doctor and receive personalized care focused on your health and well-being.",
    },
];

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />


            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative rounded-[2rem] border border-main/10 px-6 py-12 shadow-2xl shadow-main/5 sm:px-10 lg:px-16">

                    {/* Inner Blobs */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />


                    <div className="relative z-10">

                        {/* Header */}
                        <div className="mx-auto max-w-3xl text-center">

                            {/* Section Label */}
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                                How It Works
                            </span>


                            {/* Heading */}
                            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">

                                Your Healthcare Journey,
                                <span className="text-main">
                                    {" "}Made Simple
                                </span>

                            </h2>


                            {/* Description */}
                            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/60 sm:text-lg">
                                From finding the right doctor to receiving
                                quality care, we make your healthcare journey
                                simple, convenient, and stress-free.
                            </p>

                        </div>


                        {/* Steps */}
                        <div className="relative mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">

                            {/* Connecting Line */}
                            <div className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden border-t border-dashed border-main/20 md:block" />


                            {steps.map((step) => {

                                const Icon = step.icon;

                                return (

                                    <div
                                        key={step.number}
                                        className="relative z-10 text-center"
                                    >

                                        {/* Step Icon */}
                                        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-main/10 bg-background shadow-xl shadow-main/5">

                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-main/10 text-main">

                                                <Icon size={26} />

                                            </div>


                                            {/* Number Badge */}
                                            <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-main text-xs font-bold text-white shadow-lg">

                                                {step.number}

                                            </span>

                                        </div>


                                        {/* Content */}
                                        <h3 className="mt-6 text-lg font-semibold text-foreground">

                                            {step.title}

                                        </h3>


                                        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-foreground/55">

                                            {step.description}

                                        </p>

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
                                    Trusted Healthcare Professionals
                                </span>

                            </div>


                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Simple & Secure Process
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Floating Badge */}
                    <div className="absolute -left-3 top-8 hidden rounded-2xl border border-main/10 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md sm:block sm:-left-6">

                        <div className="flex items-center gap-2">

                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-main" />

                            <span className="text-sm font-semibold text-foreground">
                                Simple Healthcare
                            </span>

                        </div>

                    </div>


                    {/* Floating CTA */}
                    <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-main/10 bg-background/95 px-5 py-4 shadow-xl backdrop-blur-md sm:block sm:-right-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">

                                <ArrowRight size={20} />

                            </div>


                            <div>

                                <p className="text-sm font-bold text-foreground">
                                    Your Care Starts Here
                                </p>

                                <p className="text-xs text-foreground/50">
                                    Simple steps. Better healthcare.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}