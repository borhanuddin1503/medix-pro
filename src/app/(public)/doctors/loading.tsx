function DoctorCardSkeleton() {
    return (
        <div className="animate-pulse rounded-3xl border border-main/10 bg-background p-5 shadow-sm">
            {/* Image */}
            <div className="h-64 w-full rounded-2xl bg-main/10" />

            {/* Name */}
            <div className="mt-5 h-6 w-3/4 rounded bg-main/10" />

            {/* Specialization */}
            <div className="mt-3 h-4 w-1/2 rounded bg-main/10" />

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
                <div className="h-4 w-20 rounded bg-main/10" />
                <div className="h-4 w-10 rounded bg-main/10" />
            </div>

            {/* Info */}
            <div className="mt-5 space-y-3">
                <div className="h-4 w-full rounded bg-main/10" />
                <div className="h-4 w-5/6 rounded bg-main/10" />
                <div className="h-4 w-2/3 rounded bg-main/10" />
            </div>

            {/* Fee */}
            <div className="mt-6 h-6 w-24 rounded bg-main/10" />

            {/* Button */}
            <div className="mt-6 h-11 w-full rounded-xl bg-main/10" />
        </div>
    );
}

export default function Loading() {
    return (
        <section className="relative overflow-hidden py-10">
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />
            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-10 max-w-2xl animate-pulse">
                    <div className="h-4 w-32 rounded bg-main/10" />
                    <div className="mt-4 h-10 w-96 rounded bg-main/10" />
                    <div className="mt-5 space-y-3">
                        <div className="h-4 w-full rounded bg-main/10" />
                        <div className="h-4 w-5/6 rounded bg-main/10" />
                    </div>
                </div>

                {/* Doctor Grid */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <DoctorCardSkeleton key={index} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center gap-3 animate-pulse">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-10 w-10 rounded-xl bg-main/10"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}