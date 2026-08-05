"use client";

import { useState } from "react";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { CreditCard, Loader2, Lock } from "lucide-react";

interface StripePaymentFormProps {
    amount: number;
    onSuccess: (id: string) => Promise<void>;
}

export default function StripePaymentForm({
    amount,
    onSuccess,
}: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        setError("");
        setIsLoading(true);

        const { paymentIntent
            , error } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
            });

        console.log("Payment confirmation data:", paymentIntent);

        if (error) {
            setError(error.message || "Payment failed.");
            setIsLoading(false);
            return;
        }

        // id , status , amount , currency  


        await onSuccess(paymentIntent.id);

        setIsLoading(false);
    };

    return (
        <div className="rounded-3xl border border-main/10 bg-background shadow-lg">


            <div className="space-y-5 p-6">

                <div className="rounded-xl bg-main/5 p-4">
                    <p className="text-sm text-gray-500">
                        Consultation Fee
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-main">
                        ৳ {amount}
                    </h2>
                </div>

                <div className="rounded-xl border p-4">
                    <PaymentElement />
                </div>

                {error && (
                    <p className="text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}

                <button
                    type="button"
                    onClick={handlePayment}
                    disabled={!stripe || isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-main py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Processing Payment...
                        </>
                    ) : (
                        <>
                            <Lock size={18} />
                            Pay ৳ {amount} & Confirm Appointment
                        </>
                    )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Lock size={14} />
                    SSL Encrypted • PCI DSS Secure
                </div>
            </div>
        </div>
    );
}