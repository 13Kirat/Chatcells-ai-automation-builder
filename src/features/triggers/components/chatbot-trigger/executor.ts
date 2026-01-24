import type { NodeExecutor } from "@/features/executions/types";
import { chatbotTriggerChannel } from "@/inngest/channels/chatbot-trigger";

type ChatbotTriggerData = {
	message: string;
};

export const chatbotTriggerExecutor: NodeExecutor<ChatbotTriggerData> = async ({
	nodeId,
	context,
	step,
	publish,
}) => {
	await publish(
		chatbotTriggerChannel().status({
			nodeId,
			status: "loading",
		})
	);

	// Pass the context (which contains the initial message) through
	const result = await step.run("chatbot-trigger", async () => context);

	await publish(
		chatbotTriggerChannel().status({
			nodeId,
			status: "success",
		})
	);

	return result;
};
