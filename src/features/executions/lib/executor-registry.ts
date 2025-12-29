import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { NodeType } from "@/generated/prisma/enums";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
	[NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
	// @ts-ignore
	[NodeType.HTTP_REQUEST]: httpRequestExecutor,
	[NodeType.INITIAL]: manualTriggerExecutor,
	[NodeType.GOOGLE_FORM_TRIGGER]: manualTriggerExecutor,
	[NodeType.STRIPE_TRIGGER]: manualTriggerExecutor,
	[NodeType.ANTHROPIC]: manualTriggerExecutor,
	[NodeType.GEMINI]: manualTriggerExecutor,
	[NodeType.OPENAI]: manualTriggerExecutor,
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
