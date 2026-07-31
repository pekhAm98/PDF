import ChatMessage from "./ChatMessage";

export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <ChatMessage
          role="assistant"
          content="👋 Hello! I'm your AI document assistant. Ask me anything about this document, and I'll answer using its contents."
        />

        <ChatMessage
          role="user"
          content="Can you summarize the first chapter?"
        />

        <ChatMessage
          role="assistant"
          content="The first chapter introduces the fundamental concepts of operating systems, explains their purpose, and discusses how they manage hardware resources while providing services to applications."
          sources={[1, 2]}
        />
      </div>
    </div>
  );
}