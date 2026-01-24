
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

interface ChatbotTriggerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowId: string;
}

export function ChatbotTriggerDialog({
  open,
  onOpenChange,
  workflowId,
}: ChatbotTriggerDialogProps) {
  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/chatbot/${workflowId}`;
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopy = (text: string, subject: string) => {
    copyToClipboard(text);
    toast.success(`${subject} copied to clipboard`);
  };

  const sampleCode = `import axios from 'axios';

const webhookUrl = '${webhookUrl}';

async function sendChatbotMessage() {
  try {
    const response = await axios.post(webhookUrl, {
      message: "Hello from the outside!",
      // You can add more data here
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Webhook triggered successfully:', response.data);
  } catch (error) {
    console.error('Error triggering webhook:', error);
  }
}

sendChatbotMessage();`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Chatbot Trigger</DialogTitle>
          <DialogDescription>
            Trigger this workflow by sending a POST request to the webhook URL.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input id="webhook-url" value={webhookUrl} readOnly />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(webhookUrl, "Webhook URL")}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Sample React Axios POST Call</Label>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 text-sm whitespace-pre-wrap">
              <code className="break-all">{sampleCode}</code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(sampleCode, "Sample code")}
              className="mt-2"
            >
              Copy Sample Code
            </Button>
          </div>
          <div className="grid gap-2">
            <Label>Accessing Data</Label>
            <p className="text-sm text-muted-foreground">
              The data sent to this webhook will be available in the{" "}
              <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded-sm">
                {"{{message}}"}
              </code>{" "}
              variable in the next nodes.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
