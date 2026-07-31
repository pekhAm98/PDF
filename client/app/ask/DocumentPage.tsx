type DocumentPageProps = {
  page: number;
};

const dummyText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
nibh vitae aliquet facilisis, lectus ligula tincidunt nisi, sed
pellentesque risus lacus nec ipsum.

Suspendisse potenti. Integer nec urna ac velit posuere convallis.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
cubilia curae; Donec et sapien non risus pulvinar placerat.

Curabitur dignissim, ligula sed tristique gravida, justo mauris
fermentum erat, sit amet consequat lorem elit vitae nunc.
`;

export default function DocumentPage({ page }: DocumentPageProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_0_30px_rgba(34,211,238,0.06)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Page {page}
        </span>

        <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
          {page}
        </span>
      </div>

      <div className="space-y-4 text-sm leading-8 text-slate-300">
        <p>{dummyText}</p>
        <p>{dummyText}</p>
        <p>{dummyText}</p>
      </div>
    </article>
  );
}