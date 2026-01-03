import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
    return useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            // const { data } = await authClient.customer.state();
            // return data;
            return null;
        },
    });
};

export const useHasActiveSubscription = () => {
    const { data: customerState, isLoading, ...rest } = useSubscription();

    const hasActiveSubscription = 
        // customerState?.activeSubscriptions &&
        // customerState.activeSubscriptions.length > 0;
        true; // Default to true or false depending on what you want (uncommented parts seemed to want to restrict access)
        // But since we are removing polar, we probably want to allow access or disable the check.
        // Assuming we want to disable the subscription check, returning true might be safer to avoid blocking UI, 
        // OR false if we want to hide "Pro" features.
        // Given the request to "comment polar thing i dont use it", I'll set it to false so it doesn't show "Pro" stuff 
        // BUT wait, if I set it to false, the sidebar "Upgrade to Pro" button was conditionally shown if !hasActiveSubscription.
        // The user effectively wants to remove the integration. 
        // Let's set it to false so it acts like a free user, but since the sidebar button is commented out too, it won't matter much.
        // However, if other parts of the app check this, returning false is the safe "default" state (no subscription).

    return {
        hasActiveSubscription: false, // Force no subscription
        subscription: null,
        isLoading: false,
        ...rest,
    };
};