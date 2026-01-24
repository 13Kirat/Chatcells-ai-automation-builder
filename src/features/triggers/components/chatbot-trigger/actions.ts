'use server';

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";

import { inngest } from "@/inngest/client";
import { chatbotTriggerChannel } from "@/inngest/channels/chatbot-trigger";

export type ChatbotTriggerToken = Realtime.Token<
    typeof chatbotTriggerChannel,
    ['status']
>;

export async function fetchChatbotTriggerRealtimeToken(): Promise<ChatbotTriggerToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: chatbotTriggerChannel(),
        topics: ['status'],
    });

    return token;
};
