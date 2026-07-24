

export const sendOtpUtility = async (email: string | undefined | null) => {
    if (email === undefined || email === null) {
        return ({
            success: false,
            messagge: 'Email is required'
        });
    }

    const resendRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email/resend?email=${email}`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }
    );

    const resendResult = await resendRes.json();

    if (!resendRes.ok) {
        return ({
            success: false,
            messagge: resendResult?.message || 'Something went wrong'
        });
    }

    const expiresAt = Date.now() + 5 * 60 * 1000;

    localStorage.setItem(
        "email-verification-expiry",
        expiresAt.toString()
    );

    return ({
        success: true
    })
};