"use client";

import { Bot, User } from "lucide-react";
import Citation from "./Citation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  sources?: number[];
};

export default function ChatMessage({ role, content, sources }: ChatMessageProps) {
  const isAssistant = role === "assistant";
  const { user } = useUser();
  return (
    <div className={`flex gap-4 ${isAssistant ? "justify-start" : "justify-end"}`}>
      {isAssistant && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-xl">
          <Bot className="h-7 w-7 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
        </div>
      )}

      <div className={`max-w-[80%] rounded-2xl border px-5 py-4 backdrop-blur-xl ${isAssistant ? "border-white/10 bg-white/5" : "border-cyan-400/20 bg-cyan-500/10"}`}>
        <p className="whitespace-pre-wrap text-[15px] leading-7 text-slate-200">{content}</p>

        {isAssistant && sources && sources.length > 0 && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-emerald-400">Sources</p>

            <div className="flex flex-wrap gap-2">
              {sources.map((page) => (
                <Citation key={page} page={page} />
              ))}
            </div>
          </div>
        )}
      </div>

      {!isAssistant && (
        <Image
          src={user?.imageUrl ?? "/default-avatar.png"}
          alt="User"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border border-cyan-400/40 object-cover shadow-[0_0_25px_rgba(34,211,238,0.25)]"
        />
      )}
    </div>
  );
}
