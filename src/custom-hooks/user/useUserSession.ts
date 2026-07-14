import { authClient } from "@/lib/authClient"


export function useUserSession() {

    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession()

    return (
        {
            session,
            isPending,
            error,
            refetch
        }
    )
}