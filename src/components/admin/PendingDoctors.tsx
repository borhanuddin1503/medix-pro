
interface PendingDoctorsProps {
    doctors: {
        _id: string;
        name?: string;
        email?: string;
    }[];
}

export default function PendingDoctors({
    doctors,
}: PendingDoctorsProps) {
    return (
        <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Pending Doctor Applications
                </h2>

                <button className="text-sm font-medium">
                    View all
                </button>
            </div>

            {doctors.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No pending applications.
                </p>
            ) : (
                <div className="space-y-4">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="flex items-center justify-between"
                        >
                            <div>
                                <p className="font-medium">
                                    {doctor.name ??
                                        "Unknown Doctor"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {doctor.email}
                                </p>
                            </div>

                            <button className="text-sm font-medium">
                                Review
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}