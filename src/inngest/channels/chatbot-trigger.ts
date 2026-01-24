import { channel, topic } from "@inngest/realtime";

export const CHATBOT_TRIGGER_CHANNEL_NAME = "chatbot-trigger-execution";

export const chatbotTriggerChannel = channel(
	CHATBOT_TRIGGER_CHANNEL_NAME
).addTopic(
	topic("status").type<{
		nodeId: string;
		status: "loading" | "success" | "error";
	}>()
);
