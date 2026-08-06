export default function Loading() {
    return (
        <main className="bg-main/5 py-10 animate-pulse overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mx-auto h-8 w-56 rounded-lg bg-main/10 sm:h-10 sm:w-80" />
                    <div className="mx-auto mt-4 h-4 w-full max-w-md rounded bg-main/10 sm:h-5" />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Doctor Summary */}
                    <div className="min-w-0 rounded-3xl border border-main/10 bg-background p-6 shadow-sm">
                        <div className="mx-auto h-24 w-24 rounded-full bg-main/10 sm:h-32 sm:w-32" />

                        <div className="mx-auto mt-5 h-6 w-40 rounded bg-main/10" />
                        <div className="mx-auto mt-3 h-4 w-28 rounded bg-main/10" />
                    </div>

                    {/* Booking Form */}
                    <div className="min-w-0 rounded-3xl border border-main/10 bg-background p-6 shadow-sm lg:col-span-2">
                        <div className="h-6 w-40 rounded bg-main/10" />

                        {/* Date */}
                        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-20 w-16 shrink-0 rounded-2xl bg-main/10"
                                />
                            ))}
                        </div>

                        {/* Inputs */}
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className={`h-12 rounded-xl bg-main/10 ${item === 3 || item === 4
                                            ? "md:col-span-2"
                                            : ""
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Payment */}
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            <div className="h-32 rounded-2xl bg-main/10" />
                            <div className="h-32 rounded-2xl bg-main/10" />
                        </div>

                        {/* Button */}
                        <div className="mt-8 h-12 rounded-xl bg-main/10" />
                    </div>
                </div>
            </div>
        </main>
    );
}