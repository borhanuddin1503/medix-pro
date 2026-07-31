import Link from "next/link";
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa6";

import {
    Mail,
    MapPin,
    Phone,
    Clock,
    HeartPulse,
} from "lucide-react";

import { navItems } from "../navbar/navItems";
import Logo from "../logo/Logo";


const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaXTwitter,
    href: "https://twitter.com",
    label: "X (Twitter)",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

const contactDetails = [
    { icon: Phone, label: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: Mail, label: "support@medixpro.com", href: "mailto:support@medixpro.com" },
    { icon: MapPin, label: "123 Wellness Ave, Health City", href: "#" },
    { icon: Clock, label: "Mon – Sat, 8:00 AM – 9:00 PM", href: undefined },
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

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-24 overflow-hidden border-t border-main/10 bg-gradient-to-b from-background to-main/5">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />

            <div className="mx-auto max-w-7xl px-4 py-16">
                {/* Main Card */}
            <div className="relative px-2">
                    {/* Inner Blobs */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />

                    <div className="relative z-10">
                        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
                            {/* Brand */}
                            <div>
                                <Link href="/" className="flex items-center gap-2.5">
                                   <Logo></Logo>
                                </Link>

                                <p className="mt-5 max-w-sm text-sm leading-7 text-foreground/60">
                                    Connecting patients with trusted doctors for fast, reliable,
                                    and quality healthcare — anytime you need it.
                                </p>

                                <div className="mt-6 flex items-center gap-3">
                                    {socialLinks.map(({ icon: Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-main/10 bg-background/70 text-foreground/60 transition-colors duration-300 hover:border-main/30 hover:bg-main hover:text-white"
                                        >
                                            <Icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links (from navItems) */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-main">
                                    Quick Links
                                </h3>

                                <ul className="mt-5 space-y-3.5">
                                    {navItems.map(({ title, href, icon: Icon }) => (
                                        <li key={href}>
                                            <Link
                                                href={href}
                                                className="group flex items-center gap-2.5 text-sm text-foreground/65 transition-colors duration-200 hover:text-main"
                                            >
                                                <Icon
                                                    size={14}
                                                    className="text-main/50 transition-colors duration-200 group-hover:text-main"
                                                />
                                                {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-main">
                                    Get In Touch
                                </h3>

                                <ul className="mt-5 space-y-4">
                                    {contactDetails.map(({ icon: Icon, label, href }) => (
                                        <li key={label} className="flex items-start gap-2.5">
                                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-main/10 text-main">
                                                <Icon size={13} />
                                            </span>
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="text-sm leading-6 text-foreground/65 transition-colors duration-200 hover:text-main"
                                                >
                                                    {label}
                                                </a>
                                            ) : (
                                                <span className="text-sm leading-6 text-foreground/65">
                                                    {label}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Pulse divider */}
                        <div className="mt-12 text-main/40">
                            <PulseLine className="h-6 w-full" />
                        </div>

                        {/* Bottom bar */}
                        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-main/10 pt-6 text-center sm:flex-row sm:text-left">
                            <p className="text-sm text-foreground/55">
                                © {year} MedixPro. All rights reserved.
                            </p>

                            <div className="flex items-center gap-6">
                                <Link
                                    href="/privacy-policy"
                                    className="text-sm text-foreground/55 transition-colors duration-200 hover:text-main"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="text-sm text-foreground/55 transition-colors duration-200 hover:text-main"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}