"use client";

import { useState } from "react";
import axios from "axios";

import { Mic, Paperclip, SendHorizontal } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { addMessage } from "../../store/slices/chatSlice";


export default function ChatInput() {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return;
    }

    setMessage("");

    dispatch(addMessage({ role: "user", content: trimmedMessage, sources: [], id: crypto.randomUUID(), createdAt: new Date().toISOString() }));

    try {
      const response = await axios.post(`${backendUrl}/api/chat`, { message: trimmedMessage });
      dispatch(
        addMessage({
          id: crypto.randomUUID(),
          role: "assistant",
          content: typeof response.data === "string" ? response.data : JSON.stringify(response.data),
          createdAt: new Date().toISOString(),
          sources: [],
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Handle message submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="group animate-cyan-glow mx-auto flex w-full max-w-7xl items-end gap-3 rounded-2xl border border-cyan-400/40 bg-white/5 p-3 backdrop-blur-xl transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] focus-within:border-cyan-300 focus-within:shadow-[0_0_55px_rgba(34,211,238,0.45)] ">
      <button
        className="rounded-xl p-3 text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
        type="button"
      >
        <Paperclip className="h-5 w-5" />
      </button>

      <textarea
  rows={1}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }}
  placeholder="Ask anything about this document..."
  className="max-h-40 min-h-[48px] flex-1 resize-none bg-transparent px-2 py-3 text-base text-white placeholder:text-cyan-200/50 outline-none"
/>

      <button
        className="rounded-xl p-3 text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
        type="button"
      >
        <Mic className="h-5 w-5" />
      </button>

      <button
        className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300 transition-all hover:border-cyan-300/50 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] active:scale-95"
        type="submit"
      >
        <SendHorizontal className="h-5 w-5" />
      </button>
    </form>
  );
}