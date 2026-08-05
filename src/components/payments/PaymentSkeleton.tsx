export default function PaymentSkeleton() {
    return (
        <div className="animate-pulse rounded-3xl border border-main/10 bg-background shadow-lg shadow-main/5">
            {/* Header */}
            <div className="border-b border-main/10 p-6">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />

                    <div className="space-y-2">
                        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="space-y-5 p-6">
                {/* 1. Amount */}
                <div className="rounded-2xl bg-main/5 p-4">
                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mt-3 h-8 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* 2. Payment Element */}
                <div className="space-y-3 rounded-2xl border border-main/10 p-4">
                    <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* 3. Security Info */}
                <div className="rounded-2xl border border-main/10 p-4">
                    <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mt-2 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mt-2 h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* 4. Button */}
                <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>
        </div>
    );
}