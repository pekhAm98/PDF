import { Bot, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-xl">
          <Bot className="h-7 w-7 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Assistant
          </h2>

          <p className="text-sm text-slate-400">
            Ask anything about this document
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-xl">
        <Sparkles className="h-4 w-4 text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
        <span className="text-xs font-semibold tracking-wide text-emerald-300">
          Ready
        </span>
      </div>
    </header>
  );
}