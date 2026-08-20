export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Doctor Header */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="flex items-start gap-5">
          <div className="h-28 w-28 shrink-0 animate-pulse rounded-2xl bg-gray-300 dark:bg-gray-700" />

          <div className="space-y-3">
            <div className="h-6 w-48 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-56 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-56 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-36 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>

      {/* About Doctor */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-[95%] animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-[80%] animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>

      {/* Chamber Information */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-56 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-36 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />

        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-36 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Account Status */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />

        <div className="flex gap-3">
          <div className="h-8 w-24 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}