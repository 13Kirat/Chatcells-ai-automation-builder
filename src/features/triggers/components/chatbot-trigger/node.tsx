import { NodeProps } from "@xyflow/react";
import { MessageSquareIcon } from "lucide-react";
import { memo } from "react";
import { BaseTriggerNode } from "@/features/triggers/components/base-trigger-node";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { CHATBOT_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/chatbot-trigger";
import { fetchChatbotTriggerRealtimeToken } from "./actions";

export const ChatbotTriggerNode = memo((props: NodeProps) => {
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: CHATBOT_TRIGGER_CHANNEL_NAME,
        topic: 'status',
        refreshToken: fetchChatbotTriggerRealtimeToken,
    });

    return (
        <BaseTriggerNode
            {...props}
            icon={MessageSquareIcon}
            name="Chatbot Message"
            description="Triggered by a chatbot message"
            status={nodeStatus}
        />
    )
});

ChatbotTriggerNode.displayName = 'ChatbotTriggerNode';
