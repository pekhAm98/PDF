// components/ask/AskLayout.tsx

import ChatInput from "./ChatInput";
import ChatPanel from "./ChatPanel";
import DocumentPanel from "./DocumentPanel";

export default function AskLayout() {
  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Main Content */}
      <div className="flex flex-1 gap-4 overflow-hidden p-4">
        {/* Document */}
        <section className="flex w-1/2 overflow-hidden rounded-2xl border border-cyan-400/15 bg-white/5 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
          <DocumentPanel />
        </section>

        {/* Chat */}
        <section className="flex w-1/2 overflow-hidden rounded-2xl border border-cyan-400/15 bg-white/5 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
          <ChatPanel />
        </section>
      </div>

      {/* Bottom Input */}
      <footer className="z-20 shrink-0 border-t border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur-xl pb-[max(1rem,env(safe-area-inset-bottom))]">
        <ChatInput />
      </footer>
    </main>
  );
}