"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { IHospitalFeature } from "@/types/doctor-types/doctorTypes";



export default function MainHospitalhospitalFeatures({
    hospitalFeatures
}: { hospitalFeatures: IHospitalFeature }) {
    return (
        <div className="flex items-center justify-center">

            <AnimatePresence mode="wait">

                <motion.div
                    key={hospitalFeatures.id}
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: -20,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                    }}
                    className="w-full "
                >

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-3xl h-[240px] sm:h-[320px] lg:h-[500px] bg-main/10 p-4">

                        <Image
                            src={hospitalFeatures.image}
                            alt={hospitalFeatures.title}
                            fill
                            priority
                            className="h-[240px] w-full rounded-2xl object-cover object-center sm:h-[320px] lg:h-[500px]"
                        />

                        {/* Category Badge */}
                        <div className="absolute left-8 top-8 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-main shadow-lg backdrop-blur-sm dark:bg-slate-900/90">
                            {hospitalFeatures.category}
                        </div>

                    </div>


                    {/* Content */}
                    <div className="mt-6">

                        <div className="flex items-center gap-2 text-main">

                            <CheckCircle2
                                size={20}
                            />

                            <span className="text-sm font-semibold">
                                Trusted Healthcare Service
                            </span>

                        </div>


                        <h2 className="mt-3 text-3xl font-bold text-foreground">
                            {hospitalFeatures.title}
                        </h2>


                        <p className="mt-3 leading-7 text-foreground/60">
                            {hospitalFeatures.description}
                        </p>

                    </div>

                </motion.div>

            </AnimatePresence>

        </div>
    );
}