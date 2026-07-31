import { FileText, MoreVertical } from "lucide-react";

export default function DocumentHeader() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
          <FileText className="h-5 w-5 text-cyan-300" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">
            Operating Systems.pdf
          </h2>

          <p className="text-sm text-slate-400">
            128 pages • 4.6 MB
          </p>
        </div>
      </div>

      <button className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
        <MoreVertical className="h-5 w-5" />
      </button>
    </header>
  );
}