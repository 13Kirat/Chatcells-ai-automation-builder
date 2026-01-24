import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { NodeType } from "@/generated/prisma/enums";
import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { stripeTriggerExecutor } from "@/features/triggers/components/stripe-trigger/executor";
import { geminiExecutor } from "../components/gemini/executor";
import { chatbotTriggerExecutor } from "@/features/triggers/components/chatbot-trigger/executor";
import { anthropicExecutor } from "../components/anthropic/executor";
import { openaiExecutor } from "../components/openai/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
	[NodeType.INITIAL]: manualTriggerExecutor,
	[NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
	[NodeType.HTTP_REQUEST]: httpRequestExecutor,
	[NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
	[NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
	[NodeType.CHATBOT]: chatbotTriggerExecutor,
	[NodeType.GEMINI]: geminiExecutor,
	[NodeType.ANTHROPIC]: anthropicExecutor,
	[NodeType.OPENAI]: openaiExecutor,
	[NodeType.DISCORD]: manualTriggerExecutor,
	[NodeType.SLACK]: manualTriggerExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
	const executor = executorRegistry[type];
	if (!executor) {
		throw new Error(`No executor found for type: ${type}`);
	}

	return executor;
};
