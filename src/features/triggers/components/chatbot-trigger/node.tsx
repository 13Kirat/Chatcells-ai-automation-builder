import { NodeProps } from "@xyflow/react";
import { MessageSquareIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "@/features/triggers/components/base-trigger-node";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { CHATBOT_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/chatbot-trigger";
import { fetchChatbotTriggerRealtimeToken } from "./actions";
import { ChatbotTriggerDialog } from "./chatbot-trigger-dialog";

export const ChatbotTriggerNode = memo((props: NodeProps) => {
    const [open, setOpen] = useState(false);
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: CHATBOT_TRIGGER_CHANNEL_NAME,
        topic: 'status',
        refreshToken: fetchChatbotTriggerRealtimeToken,
    });

    return (
        <>
            <ChatbotTriggerDialog
                open={open}
                onOpenChange={setOpen}
                workflowId={props.data.workflowId}
            />
            <BaseTriggerNode
                {...props}
                icon={MessageSquareIcon}
                name="Chatbot Message"
                description="Triggered by a chatbot message"
                status={nodeStatus}
                onSettings={() => setOpen(true)}
                onDoubleClick={() => setOpen(true)}
            />
        </>
    )
});

ChatbotTriggerNode.displayName = 'ChatbotTriggerNode';
