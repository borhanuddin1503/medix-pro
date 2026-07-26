"use client";

import {
    Activity,
    Ambulance,
    FlaskConical,
    HeartPulse,
    Hospital,
    Microscope,
    Pill,
    ShieldCheck,
    Stethoscope,
    Syringe,
} from "lucide-react";

const services = [
    {
        title: "Advanced Diagnostics",
        icon: Microscope,
    },
    {
        title: "Medical Laboratory",
        icon: FlaskConical,
    },
    {
        title: "Emergency Care",
        icon: Ambulance,
    },
    {
        title: "Specialized Care",
        icon: Stethoscope,
    },
    {
        title: "Patient Care",
        icon: HeartPulse,
    },
    {
        title: "Health Checkups",
        icon: Activity,
    },
    {
        title: "Pharmacy Services",
        icon: Pill,
    },
    {
        title: "Modern Facilities",
        icon: Hospital,
    },
    {
        title: "Preventive Care",
        icon: ShieldCheck,
    },
    {
        title: "Vaccination",
        icon: Syringe,
    },
];

export default function ServicesMarquee() {
    return (
        <section className="overflow-hidden border-y border-gray-200 dark:border-foreground/15 py-15 ">

            <div className="mb-6 text-center">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                    Our Services
                </p>

                <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                    Complete Healthcare Under One Roof
                </h2>

            </div>


            <div className="relative flex overflow-hidden">

                {/* Left Fade */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />


                {/* Right Fade */}
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />


                <div className="flex min-w-max animate-marquee gap-4">

                    {[...services, ...services].map((service, index) => {

                        const Icon = service.icon;

                        return (
                            <div
                                key={`${service.title}-${index}`}
                                className="flex items-center gap-3 rounded-full border border-main/10 bg-main/5 px-6 py-3 text-foreground"
                            >

                                <Icon
                                    size={20}
                                    className="text-main"
                                />

                                <span className="whitespace-nowrap text-sm font-medium">
                                    {service.title}
                                </span>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}