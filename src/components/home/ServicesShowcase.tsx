"use client";

import { useEffect, useState } from "react";
import ServiceSlide from "./ServiceSlide";
import { IService } from "@/types/doctor-types/doctorTypes";



interface ServicesShowcaseProps {
    services: IService[];
}

export default function ServicesShowcase({
    services,
}: ServicesShowcaseProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % services.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [services.length]);

    const currentService = services[current];

    return (
        <section className="relative overflow-hidden py-16 lg:py-20">

            <div className="mx-auto max-w-7xl px-4">

                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">

                    <span className="text-sm font-semibold uppercase tracking-widest text-main">
                        Our Services
                    </span>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Healthcare Designed Around
                        <span className="text-main">
                            {" "}You
                        </span>
                    </h2>

                    <p className="mt-4 text-foreground/60">
                        From advanced diagnostics to specialized care,
                        everything you need for better health is here.
                    </p>

                </div>


                {/* Floating Showcase */}
                <div className="relative mx-auto max-w-5xl">

                    {/* Background Glow */}
                    <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl" />

                    <ServiceSlide
                        service={currentService}
                    />

                </div>


                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">

                    {services.map((service, index) => (
                        <button
                            key={service.id}
                            onClick={() => setCurrent(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                current === index
                                    ? "w-8 bg-main"
                                    : "w-2 bg-foreground/20"
                            }`}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}