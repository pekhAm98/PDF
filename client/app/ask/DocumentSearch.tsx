import { Search } from "lucide-react";

export default function DocumentSearch() {
  return (
    <div className="border-b border-white/10 p-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

        <input
          type="text"
          placeholder="Search document..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-400/40 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>
    </div>
  );
}