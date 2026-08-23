"use client";

import Link from "next/link";
import {
    AlertTriangle,
    ArrowLeft,
    Home,
    RefreshCw,
} from "lucide-react";

interface ErrorPageProps {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}

export default function ErrorPage({
    error,
    reset,
}: ErrorPageProps) {
    return (
        <main className="relative flex min-h-[calc(100vh-53px)] items-center justify-center overflow-hidden bg-background px-4 md:min-h-[calc(100vh-82px)]">
            {/* Background Blur */}
            <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-main/15 blur-3xl" />

            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-main/15 blur-3xl" />

            <div className="relative w-full max-w-xl rounded-3xl border border-main/10 bg-background p-8 text-center shadow-xl shadow-main/5 backdrop-blur dark:border-main/50">
                {/* Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-main/10 text-main">
                    <AlertTriangle size={46} />
                </div>

                {/* Error Code */}
                <p className="mt-8 text-6xl font-extrabold tracking-tight text-main">
                    500
                </p>

                {/* Title */}
                <h1 className="mt-4 text-3xl font-bold text-foreground">
                    Something Went Wrong
                </h1>

                {/* Description */}
                <p className="mt-4 text-base leading-7 text-foreground/60">
                    Something unexpected happened while
                    processing your request. Please try again
                    or return to the homepage.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    {/* Try Again */}
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-main px-6 py-3 font-medium text-white transition hover:opacity-90"
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </button>

                    {/* Home */}
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-main/20 bg-main/5 px-6 py-3 font-medium text-foreground transition hover:bg-main/10"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    {/* Go Back */}
                    <button
                        type="button"
                        onClick={() =>
                            window.history.back()
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-main/20 bg-main/5 px-6 py-3 font-medium text-foreground transition hover:bg-main/10"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                {/* Footer */}
                <p className="mt-8 text-sm text-foreground/40">
                    If the problem continues, please try
                    again later.
                </p>
            </div>
        </main>
    );
}