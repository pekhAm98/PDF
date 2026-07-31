import { FileText } from "lucide-react";

type CitationProps = {
  page: number;
};

export default function Citation({ page }: CitationProps) {
  return (
    <button
      type="button"
      className="group inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 transition-all duration-200 hover:border-cyan-300/50 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
    >
      <FileText className="h-4 w-4 transition-transform group-hover:scale-110" />

      <span>Page {page}</span>
    </button>
  );
}