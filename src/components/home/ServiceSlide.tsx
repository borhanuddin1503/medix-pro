"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface IService {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}

interface ServiceSlideProps {
    service: IService;
}

export default function ServiceSlide({
    service,
}: ServiceSlideProps) {
    return (
        <AnimatePresence mode="wait">

            <motion.div
                key={service.id}
                initial={{
                    opacity: 0,
                    y: 40,
                    scale: 0.96,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                exit={{
                    opacity: 0,
                    y: -40,
                    scale: 0.96,
                }}
                transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                }}
                className="relative overflow-hidden rounded-[2rem] border border-main/10 bg-main/[0.03] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:bg-main/[0.05] dark:shadow-none sm:p-6"
            >

                <div className="grid items-center gap-8 md:grid-cols-2">

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-[1.5rem]">

                        <Image
                            src={service.image}
                            alt={service.title}
                            width={800}
                            height={600}
                            className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[380px]"
                            loading="eager"
                        />

                        {/* Category */}
                        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-main shadow-lg backdrop-blur-md dark:bg-slate-900/90">
                            {service.category}
                        </div>

                    </div>


                    {/* Content */}
                    <div className="px-2 py-6 sm:px-6">

                        <div className="flex items-center gap-2 text-main">

                            <CheckCircle2 size={20} />

                            <span className="text-sm font-semibold">
                                Quality Healthcare
                            </span>

                        </div>


                        <h3 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                            {service.title}
                        </h3>


                        <p className="mt-5 max-w-md leading-8 text-foreground/60">
                            {service.description}
                        </p>


                        <button className="group mt-7 inline-flex items-center gap-2 font-semibold text-main">

                            Learn More

                            <ArrowUpRight
                                size={18}
                                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                            />

                        </button>

                    </div>

                </div>

            </motion.div>

        </AnimatePresence>
    );
}