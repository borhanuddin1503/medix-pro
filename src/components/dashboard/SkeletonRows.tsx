
export default function SkeletonRows({ rows }: { rows: number }) {
    const pulse = "animate-[skeleton-pulse_1.4s_ease-in-out_infinite]";

    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="border-b border-main/5 dark:border-white/5">
                    <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 shrink-0 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`} />
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className={`h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                                <div className={`h-3 w-32 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-4">
                        <div className={`h-6 w-28 rounded-lg bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-3.5 w-20 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-6 w-24 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-6 w-24 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                </tr>
            ))}

        </>
    );
}