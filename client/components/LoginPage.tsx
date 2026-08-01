"use client";

import { Bot, Sparkles } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060816] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute right-[-80px] top-20 h-80 w-80 rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[170px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent,rgba(0,0,0,.65))]" />
    </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              AI Powered PDF Assistant
            </div>

            <h1 className="text-6xl font-black leading-tight">
              Chat with
              <br />
              your PDFs
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                instantly.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
              Upload documents, search semantically, and get intelligent
              answers powered by local AI models.
            </p>

            <div className="mt-10 flex gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                ⚡ Local AI
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                📄 PDF RAG
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                🔒 Private
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-violet-500/30 blur-2xl" />

            <div className="relative rounded-[32px] border border-white/10 bg-white/10 p-10 backdrop-blur-3xl">

              <div className="mb-8 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_60px_rgba(59,130,246,.45)]">
                  <Bot size={44} />
                </div>
              </div>

              <h2 className="text-center text-3xl font-bold">
                Welcome Back
              </h2>

              <p className="mt-3 text-center text-slate-400">
                Sign in to continue chatting with your knowledge base.
              </p>

              <div className="mt-10 flex flex-col gap-4">

                <SignInButton mode="modal">
                  <button className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,.45)]">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="h-14 w-full rounded-2xl border border-white/15 bg-white/5 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/10">
                    Create Account
                  </button>
                </SignUpButton>

              </div>

              <div className="mt-8 text-center text-sm text-slate-500">
                Secure authentication powered by Clerk
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}