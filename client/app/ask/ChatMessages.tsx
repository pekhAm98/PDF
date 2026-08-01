import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

import type { ChatMessage as ChatMessageType } from "@/store/slices/chatSlice";

export default function ChatMessages({ messages }: { messages: ChatMessageType[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-4 lg:px-5">
      <div className="flex w-full flex-col gap-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} role={message.role} content={message.content} sources={message.sources ? message.sources : []} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
