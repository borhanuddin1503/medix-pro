"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Activity, MessageCircleHeart, ShieldCheck, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Heart Patient",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    rating: 5,
    review:
      "Booking my appointment took less than two minutes. The doctor was professional, friendly, and explained everything clearly.",
    featured: true,
  },
  {
    id: 2,
    name: "John Smith",
    role: "General Checkup",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    rating: 5,
    review:
      "Excellent experience from start to finish. The platform is easy to use and appointment reminders were very helpful.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Dental Patient",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    rating: 5,
    review:
      "Highly recommend Medix Pro. I found the right specialist quickly and the consultation was excellent.",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Orthopedic Patient",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
    rating: 5,
    review:
      "Very smooth experience. Finding doctors, booking appointments, and getting notifications all worked perfectly.",
  },
  
];

const stats = [
  { value: "4.9★", label: "Average Rating" },
  { value: "12K+", label: "Happy Patients" },
  { value: "50K+", label: "Appointments Booked" },
];

function PulseLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 20 H140 L155 20 L165 4 L178 36 L188 20 L200 20 L212 12 L222 28 L232 20 H400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} size={15} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

/** Fades + slides a child up once the section scrolls into view, staggered by `delay` (ms). */
function Reveal({
  children,
  delay = 0,
  inView,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function Testimonials() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t.id !== featured.id);

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-15">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Main card — padding & background kept as-is */}
        <div className="relative  rounded-[2rem] border border-main/10 px-6 py-12 shadow-2xl shadow-main/5 sm:px-10 lg:px-16">
          {/* Inner Blobs */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />

          <div className="relative z-10">
            {/* Header */}
            <Reveal inView={inView} delay={0}>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-main">
                    <Activity size={16} className="shrink-0" />
                    Patient Testimonials
                  </span>

                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                    What Our <span className="text-main">Patients Say</span>
                  </h2>

                  <p className="mt-5 text-base leading-8 text-foreground/60 sm:text-lg">
                    Hear real experiences from patients who found trusted doctors
                    and quality healthcare through Medix Pro.
                  </p>
                </div>

                <div className="hidden h-24 w-24 items-center justify-center rounded-3xl bg-main/10 text-main lg:flex">
                  <MessageCircleHeart size={42} />
                </div>
              </div>
            </Reveal>

            {/* Signature pulse divider */}
            <Reveal inView={inView} delay={120} className="mt-10 text-main/40">
              <PulseLine className="h-8 w-full" />
            </Reveal>

            {/* Content: featured case + patient log */}
            <div className="mt-8 grid gap-6 lg:grid-cols-5 lg:items-stretch">
              {/* Featured testimonial */}
              <Reveal inView={inView} delay={240} className="lg:col-span-2">
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-main/15 bg-main/5 p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-main/10 px-3 py-1 text-xs font-semibold text-main">
                        <ShieldCheck size={14} />
                        Verified Patient
                      </span>
                      <StarRow rating={featured.rating} />
                    </div>

                    <p className="mt-6 text-lg font-medium leading-8 text-foreground/80 sm:text-xl">
                      {featured.review}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-4 border-t border-main/10 pt-6">
                    <Image
                      src={featured.image}
                      alt={featured.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover ring-2 ring-main/20"
                    />
                    <div>
                      <h4 className="font-semibold">{featured.name}</h4>
                      <p className="text-sm text-foreground/50">{featured.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Patient log — compact rows, revealed one after another */}
              <div className="flex flex-col gap-4 lg:col-span-3">
                {rest.map((item, index) => (
                  <Reveal key={item.id} inView={inView} delay={360 + index * 130}>
                    <div className="group flex items-center gap-5 rounded-2xl border border-main/10 bg-background/80 p-5 shadow-sm shadow-main/5 backdrop-blur-md transition-all duration-300 hover:border-main/30 hover:shadow-md">
                      <span className="h-10 w-1 shrink-0 rounded-full bg-main/20 transition-colors duration-300 group-hover:bg-main" />

                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="shrink-0 rounded-full object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <StarRow rating={item.rating} />
                        </div>
                        <p className="text-xs text-foreground/50">{item.role}</p>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-foreground/70">
                          {item.review}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Bottom stats */}
            <Reveal
              inView={inView}
              delay={360 + rest.length * 130 + 120}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-t border-main/10 pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <h3 className="text-2xl font-bold text-main">{stat.value}</h3>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Floating Badge */}
          <div className="absolute -right-3 top-8 hidden rounded-2xl border border-main/10 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md sm:block sm:-right-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-main" />
              <span className="text-sm font-semibold">Verified Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}