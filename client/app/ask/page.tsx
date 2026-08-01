import ChatInput from "./ChatInput";
import ChatPanel from "./ChatPanel";
import DocumentPanel from "./DocumentPanel";

export default function AskPage() {
  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <section className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-white/5 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
          <DocumentPanel />
        </section>

        <section className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-white/5 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
          <ChatPanel />
        </section>
      </div>

      <footer className="z-20 shrink-0 border-t border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur-xl pb-[max(1rem,env(safe-area-inset-bottom))]">
        <ChatInput />
      </footer>
    </main>
  );
}