
import {
    Activity,
    HeartPulse,
    Microscope,
    ShieldCheck,
    Stethoscope,
    UsersRound,
} from "lucide-react";

const Page = () => {
    return (
        <main className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />
            <div className="pointer-events-none absolute -right-40 top-[500px] hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            {/* Hero */}
            <section className="py-8 md:py-10">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                            About Medix Pro
                        </span>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
                            Better Healthcare Through{" "}
                            <span className="text-main">
                                Better Technology
                            </span>
                        </h1>

                        <p className="mt-5 text-base leading-8 text-foreground/60 md:text-lg">
                            Medix Pro is a modern healthcare management platform
                            designed to make healthcare services more
                            organized, accessible, and patient-friendly.
                        </p>
                    </div>
                </div>
            </section>

            {/* About + Image */}
            <section className="pb-16 md:pb-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
                    {/* Images */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
                                alt="Medical laboratory"
                                className="mt-10 h-64 w-full rounded-2xl object-cover shadow-md sm:h-80"
                            />

                            <img
                                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
                                alt="Modern medical laboratory"
                                className="h-64 w-full rounded-2xl object-cover shadow-md sm:h-80"
                            />
                        </div>

                        <div className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 rounded-2xl border border-foreground/10 bg-background px-6 py-4 shadow-lg sm:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main/10">
                                    <Microscope className="h-5 w-5 text-main" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        Modern Healthcare
                                    </p>

                                    <p className="text-xs text-foreground/50">
                                        Technology & Laboratory Services
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                            Who We Are
                        </span>

                        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                            Healthcare Made{" "}
                            <span className="text-main">Simpler</span>
                        </h2>

                        <p className="mt-5 leading-8 text-foreground/60">
                            Medix Pro brings doctors, patients, receptionists,
                            laboratories, and healthcare administrators
                            together through one connected platform. Our goal
                            is to reduce unnecessary complexity and create a
                            smoother healthcare experience for everyone.
                        </p>

                        <p className="mt-4 leading-8 text-foreground/60">
                            From discovering a specialist and managing
                            appointments to organizing laboratory services and
                            patient information, Medix Pro helps healthcare
                            organizations manage their everyday operations
                            more efficiently.
                        </p>

                        <div className="mt-7 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-main/10">
                                <ShieldCheck className="h-5 w-5 text-main" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Built With Care
                                </h3>

                                <p className="text-sm text-foreground/50">
                                    Designed around reliable and accessible
                                    healthcare services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-main/5 py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                            Our Purpose
                        </span>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            What Drives Medix Pro
                        </h2>

                        <p className="mt-3 leading-7 text-foreground/60">
                            We believe technology can make healthcare
                            management more efficient while keeping the
                            patient experience at the center.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Mission */}
                        <div className="rounded-2xl border border-foreground/10 bg-background p-7 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-main/10">
                                <HeartPulse className="h-6 w-6 text-main" />
                            </div>

                            <h3 className="mt-5 text-xl font-bold">
                                Our Mission
                            </h3>

                            <p className="mt-3 leading-7 text-foreground/60">
                                Our mission is to simplify healthcare
                                management by providing a connected platform
                                where healthcare teams can manage their
                                services and patients can access care more
                                conveniently.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="rounded-2xl border border-foreground/10 bg-background p-7 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-main/10">
                                <Activity className="h-6 w-6 text-main" />
                            </div>

                            <h3 className="mt-5 text-xl font-bold">
                                Our Vision
                            </h3>

                            <p className="mt-3 leading-7 text-foreground/60">
                                We envision a healthcare experience where
                                technology connects people, information, and
                                services seamlessly, helping healthcare
                                organizations deliver more organized and
                                patient-focused care.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                            What We Offer
                        </span>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            One Platform, Multiple Healthcare Needs
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<Stethoscope />}
                            title="Doctor Management"
                            description="Organize doctor profiles, specialties, and availability in one place."
                        />

                        <FeatureCard
                            icon={<UsersRound />}
                            title="Patient Care"
                            description="Keep patient information and appointment activities organized."
                        />

                        <FeatureCard
                            icon={<Microscope />}
                            title="Laboratory Services"
                            description="Connect laboratory services and reports with the healthcare workflow."
                        />

                        <FeatureCard
                            icon={<HeartPulse />}
                            title="Easy Appointments"
                            description="Make it easier for patients to discover specialists and manage appointments."
                        />
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="pb-16 md:pb-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="overflow-hidden rounded-3xl bg-main px-6 py-12 text-center text-white md:px-12">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            Healthcare That Puts People First
                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                            Medix Pro is built to bring simplicity, organization,
                            and better connectivity to modern healthcare
                            management.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard = ({
    icon,
    title,
    description,
}: FeatureCardProps) => {
    return (
        <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-main/10 text-main">
                {icon}
            </div>

            <h3 className="mt-5 font-semibold text-foreground">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-foreground/60">
                {description}
            </p>
        </div>
    );
};

export default Page;
