interface Payment {
    _id: string;
    patientName: string;
    amount?: number;
    currency?: string;
    paymentMethod: "ONLINE" | "CASH";
    paid: boolean;
}

interface RecentPaymentsProps {
    payments: Payment[];
}

export default function RecentPayments({
    payments,
}: RecentPaymentsProps) {
    return (
        <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Recent Payments
                </h2>

                <button className="text-sm font-medium">
                    View all
                </button>
            </div>

            <div className="space-y-4">
                {payments.map((payment) => (
                    <div
                        key={payment._id}
                        className="flex items-center justify-between"
                    >
                        <div>
                            <p className="font-medium">
                                {payment.patientName}
                            </p>

                            <p className="text-sm text-gray-500">
                                {
                                    payment.paymentMethod
                                }
                            </p>
                        </div>

                        <strong>
                            ৳{payment.amount ?? 0}
                        </strong>
                    </div>
                ))}
            </div>
        </section>
    );
}