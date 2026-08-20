export default function loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="mt-2 h-4 w-72 rounded bg-muted" />
      </div>

      {/* Doctor Header */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="flex items-start gap-5">
          <div className="h-28 w-28 shrink-0 rounded-2xl bg-muted" />

          <div className="space-y-3">
            <div className="h-6 w-48 rounded bg-muted" />
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-4 w-56 rounded bg-muted" />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-56 rounded bg-muted" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* About Doctor */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-4 h-6 w-40 rounded bg-muted" />

        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-[95%] rounded bg-muted" />
          <div className="h-4 w-[80%] rounded bg-muted" />
        </div>
      </div>

      {/* Chamber Information */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-56 rounded bg-muted" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-40 rounded bg-muted" />

        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Account Status */}
      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="mb-5 h-6 w-40 rounded bg-muted" />

        <div className="flex gap-3">
          <div className="h-8 w-24 rounded-full bg-muted" />
          <div className="h-8 w-24 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}