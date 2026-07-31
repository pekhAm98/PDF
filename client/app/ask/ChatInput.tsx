"use client";

import { Mic, Paperclip, SendHorizonal } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="group animate-cyan-glow mx-auto flex w-full max-w-7xl items-end gap-3 rounded-2xl border border-cyan-400/40 bg-white/5 p-3 backdrop-blur-xl transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] focus-within:border-cyan-300 focus-within:shadow-[0_0_55px_rgba(34,211,238,0.45)] ">
      <button
        className="rounded-xl p-3 text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
        type="button"
      >
        <Paperclip className="h-5 w-5" />
      </button>

      <textarea
  rows={1}
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
        <SendHorizonal className="h-5 w-5" />
      </button>
    </div>
  );
}