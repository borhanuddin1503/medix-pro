'use client'
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import React from 'react'
import StripePaymentForm from './StripePaymentForm';
import PaymentSkeleton from './PaymentSkeleton';
import { useTheme } from 'next-themes';



// stripe promise
const stripePromise = loadStripe("pk_test_51S0NMW2LkMdNDQQe7WFz62qJvLMZ1yGI02XuCHC8GIdzeQbQCBIIAXghQOiFI4qrDJdRG8p7IzIn8GYwqy58lop500bwV5bN0N");

type Props = {
    clientSecret: string | null;
    isLoading: boolean;
    amount: number;
    onSuccess: () => Promise<void>;
}

export default function PaymentSection({
    clientSecret,
    isLoading,
    amount,
    onSuccess,
}: Props) {
    const { theme } = useTheme();

    if (isLoading) {
        return <PaymentSkeleton />;
    }

    if (!clientSecret) {
        return null;
    }

    const appearance: Appearance = {
        theme: theme === 'dark' ? 'night' : 'stripe',
    };


    return (
        <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
        >
            <StripePaymentForm amount={amount} onSuccess={onSuccess} />
        </Elements>
    );
}
