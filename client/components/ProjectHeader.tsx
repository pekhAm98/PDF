"use client";

import { ReactNode } from "react";
import { Bell, Home, Sparkles } from "lucide-react";
import Link from "next/link";

interface ProjectHeaderProps {
  children?: ReactNode;
}

export default function ProjectHeader({ children }: ProjectHeaderProps) {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-[4.5rem] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#050816]/80 px-3 shadow-[0_8px_40px_rgba(0,0,0,.35)] backdrop-blur-3xl sm:rounded-3xl sm:px-6">

          {/* Logo + Title */}
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


          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Home */}
            <Link
              href="/"
              aria-label="Home"
              className="
                flex
                h-11
                items-center
                gap-2
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-4
                text-sm
                text-slate-300
                transition
                duration-300
                hover:border-cyan-400/30
                hover:bg-cyan-500/10
                hover:text-white
              "
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:block">
                Home
              </span>
            </Link>


            {/* Notification */}
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


            <div
              aria-hidden="true"
              className="h-8 w-px bg-white/10"
            />


            {children}

          </div>

        </div>
      </div>
    </header>
  );
}