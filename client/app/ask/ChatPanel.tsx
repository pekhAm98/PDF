import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

export default function ChatPanel() {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />

      <ChatMessages />
    </div>
  );
}