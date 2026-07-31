import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, Show, UserButton, SignOutButton } from "@clerk/nextjs";
import {Toaster} from "sonner";
import LoginPage from "@/components/LoginPage";
import ProjectHeader from "@/components/ProjectHeader";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My AI App",
  description: "PDF RAG Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="h-dvh bg-[#050816] text-white antialiased">
        <ClerkProvider>
          <Show when="signed-out">
            <LoginPage />
          </Show>

          <Show when="signed-in">
            <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
              {/* Full-width header */}
              <ProjectHeader>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10",
                    },
                  }}
                />
                <SignOutButton>
                  <button
                    type="button"
                    className="
ml-2
rounded-xl
bg-gradient-to-r
from-red-500/50
to-rose-500/50
px-5
py-2.5
font-semibold
text-white
shadow-[0_0_20px_rgba(239,68,68,.45)]
transition-all
duration-300
hover:scale-105
hover:shadow-[0_0_35px_rgba(239,68,68,.7)]
active:scale-95
"
                  >
                    Sign Out
                  </button>
                </SignOutButton>
              </ProjectHeader>

              {/* Full-width page content */}
              <main className="min-h-0 w-full flex-1 overflow-hidden">{children}</main>
            </div>
          </Show>
          <Toaster richColors position="top-right" theme="dark" closeButton />
        </ClerkProvider>
      </body>
    </html>
  );
}
