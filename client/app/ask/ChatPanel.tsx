"use client";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

import { useAppSelector } from "../../store/hooks";

export default function ChatPanel() {
  const messages = useAppSelector(state => state.chat.messages);
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />

      <ChatMessages messages={messages} />
    </div>
  );
}