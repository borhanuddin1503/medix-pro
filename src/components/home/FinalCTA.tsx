"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  PhoneCall,
  ShieldCheck,
  Star,
} from "lucide-react";

const avatars = [
  "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
  "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg",
  "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg",
  "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
];

const trustPoints = [
  { icon: ShieldCheck, label: "Verified Doctors" },
  { icon: Star, label: "4.9 Average Rating" },
  { icon: CalendarCheck, label: "Instant Booking" },
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

export default function FinalCTA() {
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-15">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-main/10 bg-main/5 px-6 py-12 shadow-2xl shadow-main/5 dark:border-main/30 sm:px-10 lg:px-16">
          {/* Inner Blobs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: message + actions */}
            <div>
              <Reveal inView={inView} delay={0}>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                  Your Health, Our Priority
                </span>
              </Reveal>

              <Reveal inView={inView} delay={100}>
                <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                  Book Your Appointment
                  <span className="text-main"> in Minutes</span>
                </h2>
              </Reveal>

              <Reveal inView={inView} delay={200}>
                <p className="mt-5 max-w-xl text-base leading-8 text-foreground/60 sm:text-lg">
                  Skip the waiting room. Find the right specialist, pick a time
                  that works for you, and get confirmed instantly — all in one
                  place.
                </p>
              </Reveal>

              <Reveal inView={inView} delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/doctors"
                    className="group flex items-center gap-2 rounded-xl bg-main px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-main/20 transition hover:opacity-90"
                  >
                    <CalendarCheck size={18} />
                    Book an Appointment
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center gap-2 rounded-xl border border-main/20 bg-background/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-main/40"
                  >
                    <PhoneCall size={17} />
                    Talk to an Expert
                  </Link>
                </div>
              </Reveal>

              <Reveal inView={inView} delay={400} className="mt-4 text-main/40">
                <PulseLine className="h-6 w-full max-w-sm" />
              </Reveal>

              <Reveal inView={inView} delay={500}>
                <div className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
                  {trustPoints.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-sm font-medium text-foreground/70"
                    >
                      <Icon size={16} className="text-main" />
                      {label}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: patient trust card */}
            <Reveal inView={inView} delay={250} className="lg:justify-self-end">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-main/10 bg-background p-8 shadow-xl shadow-main/10">
                <div className="flex -space-x-4">
                  {avatars.map((src, index) => (
                    <div
                      key={src}
                      className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-background"
                      style={{ zIndex: avatars.length - index }}
                    >
                      <Image
                        src={src}
                        alt="Patient"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-main text-sm font-bold text-white ring-4 ring-background">
                    12K+
                  </div>
                </div>

                <p className="mt-6 text-lg font-medium leading-8 text-foreground/80">
                  Join thousands of patients who found trusted care through
                  Medix Pro.
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-main/10 pt-5">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    4.9 out of 5
                  </span>
                </div>

                {/* Floating Badge */}
                <div className="absolute -right-3 top-6 rounded-2xl border border-main/10 bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-main" />
                    <span className="text-xs font-semibold">Booking now</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}