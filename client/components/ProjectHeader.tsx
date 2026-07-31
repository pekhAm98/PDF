"use client";

import { ReactNode } from "react";
import { Bell, Search, Sparkles } from "lucide-react";

interface ProjectHeaderProps {
  children?: ReactNode;
}

export default function ProjectHeader({ children }: ProjectHeaderProps) {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-[4.5rem] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#050816]/80 px-3 shadow-[0_8px_40px_rgba(0,0,0,.35)] backdrop-blur-3xl sm:rounded-3xl sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/50 blur-xl" />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_25px_rgba(59,130,246,.35)]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="hidden min-w-0 sm:block">
              <h1 className="truncate text-lg font-bold text-white">
                AI Knowledge Assistant
              </h1>

              <p className="hidden text-xs text-slate-400 md:block">
                Private • Local • RAG
              </p>
            </div>
          </div>

          <div className="mx-4 hidden max-w-md flex-1 lg:block xl:mx-10">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/40">
              <Search className="h-5 w-5 text-slate-500" />

              <input
                aria-label="Search documents"
                placeholder="Search documents..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-black/20
                transition
                duration-300
                hover:border-cyan-400/30
                hover:bg-cyan-500/10
              "
            >
              <Bell className="h-5 w-5 text-slate-300" />
            </button>

            <div aria-hidden="true" className="h-8 w-px bg-white/10" />

            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
