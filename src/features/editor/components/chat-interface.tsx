'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, SendIcon, Loader2Icon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
    workflowId: string;
}

type Message = {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function ChatInterface({ workflowId }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { role: 'user', content: inputValue, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/webhooks/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workflowId, message: userMsg.content }),
            });

            if (!res.ok) throw new Error('Failed to send message');

            toast.success("Workflow triggered");
            
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Workflow execution started.",
                timestamp: new Date()
            }]);

        } catch (error) {
            toast.error("Failed to send message");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='sm' variant="outline">
                    <MessageSquareIcon className="size-4 mr-2" />
                    Chat
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle>Chat with Workflow</SheetTitle>
                    <SheetDescription>Send a message to trigger the workflow.</SheetDescription>
                </SheetHeader>
                
                <ScrollArea className="flex-1 my-4 pr-4">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={cn(
                                "flex flex-col gap-1 p-3 rounded-lg max-w-[80%]",
                                msg.role === 'user' ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                                <p className="text-sm">{msg.content}</p>
                                <span className="text-[10px] opacity-70">
                                    {msg.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="flex gap-2 mt-auto">
                    <Input 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button size="icon" onClick={handleSend} disabled={isLoading}>
                        {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : <SendIcon className="size-4" />}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
