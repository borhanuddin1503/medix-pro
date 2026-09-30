import Image from "next/image";
import {
    FlaskConical,
    MapPin,
    ShieldCheck,
} from "lucide-react";

interface ILab {
    _id: string;
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    images: string[];
    services: string[];
    openingTime?: string;
    closingTime?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface LabsResponse {
    success: boolean;
    message: string;
    data: {labs: ILab[]};
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

async function getLabs(): Promise<ILab[]> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/labs?page=1&limit=5`,
            {
                next: {
                    revalidate: 60,
                    tags: ["labs"],
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch labs");
        }

        const result: LabsResponse = await response.json();
        console.log('lab result', result)

        return result.data.labs ?? [];
    } catch (error) {
        console.error("Failed to fetch labs:", error);

        return [];
    }
}

export default async function LabDiagnostics() {
    const labs = await getLabs();

    return (
        <section className="relative overflow-hidden py-15">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />

            <div className="mx-auto max-w-7xl px-4">

                {/* Main Card */}
                <div className="relative rounded-[2rem] border border-main/10 px-6 py-12 shadow-2xl shadow-main/5 dark:border-main/30 sm:px-10 lg:px-16">

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
                                    Trusted Labs for{" "}
                                    <span className="text-main">
                                        Accurate Results
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
                        {labs.length > 0 ? (
                            <div className="mt-12 grid gap-6 lg:grid-cols-3">

                                {labs.slice(0, 5).map((lab, index) => (

                                    <div
                                        key={lab._id}
                                        className={`group overflow-hidden rounded-3xl border border-main/10 bg-background/80 shadow-lg shadow-main/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-main/30 hover:shadow-xl ${
                                            index === 0
                                                ? "lg:col-span-2"
                                                : ""
                                        }`}
                                    >

                                        {/* Image */}
                                        <div
                                            className={`relative overflow-hidden ${
                                                index === 0
                                                    ? "h-72"
                                                    : "h-56"
                                            }`}
                                        >

                                            {lab.images?.[0] ? (
                                                <Image
                                                    src={lab.images[0]}
                                                    alt={lab.name}
                                                    fill
                                                    className="object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-main/10 text-main">
                                                    <FlaskConical size={50} />
                                                </div>
                                            )}

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                            {/* Badge */}
                                            <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-main shadow-lg backdrop-blur-md">
                                                {lab.services?.length || 0}+ Tests
                                            </div>

                                            {/* Name */}
                                            <div className="absolute bottom-5 left-5 right-5">
                                                <h3 className="text-xl font-bold text-white">
                                                    {lab.name}
                                                </h3>
                                            </div>

                                        </div>

                                        {/* Content */}
                                        <div className="p-5">

                                            <p className="text-sm leading-6 text-foreground/55">
                                                {lab.description ||
                                                    "Reliable diagnostic services designed to support better healthcare decisions."}
                                            </p>

                                            <div className="mt-5 flex items-center gap-2 text-sm text-foreground/50">

                                                <MapPin
                                                    size={16}
                                                    className="shrink-0 text-main"
                                                />

                                                <span className="line-clamp-1">
                                                    {lab.address ||
                                                        "Location not available"}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>
                        ) : (
                            <div className="mt-12 rounded-3xl border border-dashed border-main/20 py-16 text-center">
                                <FlaskConical
                                    size={42}
                                    className="mx-auto text-main/60"
                                />

                                <h3 className="mt-4 text-lg font-semibold text-foreground">
                                    No diagnostic labs available
                                </h3>

                                <p className="mt-2 text-sm text-foreground/50">
                                    Please check back later for available labs.
                                </p>
                            </div>
                        )}

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
                    <div className="absolute -right-3 top-8 hidden rounded-2xl border border-main/10 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md dark:border-main/30 sm:block sm:-right-6">

                        <div className="flex items-center gap-2">

                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-main" />

                            <span className="text-sm font-semibold text-foreground">
                                Reliable Diagnostics
                            </span>

                        </div>

                    </div>

                    {/* Floating CTA */}
                    <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-main/10 bg-background/95 px-5 py-4 shadow-xl backdrop-blur-md dark:border-main/30 sm:block sm:-left-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">
                                <FlaskConical size={20} />
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