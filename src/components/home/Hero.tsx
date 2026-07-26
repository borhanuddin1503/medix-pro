"use client";

import DoctorSpotlight from "./DoctorSpotlight";
export default function Hero() {
    const hospitalFeatures = [
        {
            id: "1",
            title: "Advanced Diagnostic Testing",
            description:
                "Get accurate and reliable test results with our advanced diagnostic technology and modern laboratory facilities.",
            image: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
            category: "Diagnostic Center",
        },
        {
            id: "2",
            title: "Modern Hospital Facilities",
            description:
                "Experience quality healthcare in a comfortable and well-equipped environment designed around patient care.",
            image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
            category: "Hospital Facilities",
        },
        {
            id: "3",
            title: "Advanced Medical Laboratory",
            description:
                "Our modern laboratory provides fast, accurate, and dependable testing services for better healthcare decisions.",
            image: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
            category: "Medical Laboratory",
        },
        {
            id: "4",
            title: "Specialized Medical Care",
            description:
                "Access specialized healthcare services supported by experienced professionals and modern medical equipment.",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
            category: "Specialized Care",
        },
        {
            id: "5",
            title: "Patient-Centered Healthcare",
            description:
                "We focus on providing a comfortable, caring, and personalized healthcare experience for every patient.",
            image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
            category: "Patient Care",
        },
        {
            id: "6",
            title: "Modern Medical Technology",
            description:
                "Advanced technology and reliable medical equipment help us deliver efficient and high-quality healthcare services.",
            image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
            category: "Medical Technology",
        },
    ];

    return (
        <section className="relative isolate overflow-hidden bg-background pt-16 pb-10 lg:pt-20 lg:pb-15">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-main/15 blur-3xl" />

            <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl" />


            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 px-4">

                {/* Left Side */}
                <div className="">

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-main/20 bg-main/10 px-4 py-2 text-sm font-medium text-main">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-main" />
                        Your Health, Our Priority
                    </div>


                    {/* Heading */}
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">

                        Better Healthcare.
                        <br />

                        <span className="text-main">
                            Better Life.
                        </span>

                    </h1>


                    {/* Description */}
                    <p className="mt-6 max-w-xl text-base leading-8 text-foreground/60 sm:text-lg">
                        Connect with trusted doctors, explore quality healthcare
                        services, and take control of your health — all in one
                        simple platform.
                    </p>


                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">

                        <button
                            className="rounded-xl bg-main px-6 py-3.5 font-semibold text-white transition hover:scale-105 hover:shadow-lg"
                        >
                            Find a Doctor
                        </button>


                        <button
                            className="rounded-xl border border-foreground/10 px-6 py-3.5 font-semibold text-foreground transition hover:border-main hover:text-main"
                        >
                            Explore Services
                        </button>

                    </div>


                    {/* Trust Stats */}
                    <div className="mt-12 flex flex-wrap items-center gap-8">

                        <div>
                            <h3 className="text-2xl font-bold text-foreground">
                                500+
                            </h3>

                            <p className="text-sm text-foreground/50">
                                Trusted Doctors
                            </p>
                        </div>


                        <div className="h-10 w-px bg-foreground/10" />


                        <div>
                            <h3 className="text-2xl font-bold text-foreground">
                                10k+
                            </h3>

                            <p className="text-sm text-foreground/50">
                                Happy Patients
                            </p>
                        </div>


                        <div className="h-10 w-px bg-foreground/10" />


                        <div>
                            <h3 className="text-2xl font-bold text-foreground">
                                24/7
                            </h3>

                            <p className="text-sm text-foreground/50">
                                Healthcare Support
                            </p>
                        </div>

                    </div>

                </div>


                {/* Right Side */}
                <div className="relative flex min-h-[500px] items-center justify-center">

                    <DoctorSpotlight
                        hospitalFeatures={hospitalFeatures}
                    />

                </div>

            </div>
        </section>
    );
}