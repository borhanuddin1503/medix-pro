
export default function Loading() {
    return (
        <main className="bg-main/5 py-10 animate-pulse">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mx-auto h-8 w-72 rounded-lg bg-main/10" />
                    <div className="mx-auto mt-4 h-4 w-[28rem] max-w-full rounded bg-main/10" />
                    <div className="mx-auto mt-2 h-4 w-80 max-w-full rounded bg-main/10" />
                </div>

                <div className="grid gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-main/10 bg-background p-4 shadow-sm dark:border-gray-700 sm:p-5"
                        >
                            {/* Top */}
                            <div className="flex items-start gap-3">
                                <div className="h-14 w-14 rounded-xl bg-main/10 sm:h-16 sm:w-16" />

                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            <div className="h-5 w-44 rounded bg-main/10" />
                                            <div className="h-4 w-28 rounded bg-main/10" />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="h-6 w-24 rounded-full bg-main/10" />
                                            <div className="h-5 w-20 rounded-full bg-main/10" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-4">
                                        <div className="h-4 w-32 rounded bg-main/10" />
                                        <div className="h-4 w-28 rounded bg-main/10" />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-4 flex items-center justify-between border-t border-main/10 pt-3 dark:border-gray-700">
                                <div className="h-5 w-24 rounded bg-main/10" />
                                <div className="h-8 w-28 rounded-full bg-main/10" />
                            </div>

                            {/* Reason */}
                            <div className="mt-3 space-y-2">
                                <div className="h-4 w-20 rounded bg-main/10" />
                                <div className="h-4 w-full rounded bg-main/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}