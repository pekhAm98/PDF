"use client";

import { ClerkProvider, Show, SignOutButton, UserButton } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import LoginPage from "@/components/LoginPage";
import ProjectHeader from "@/components/ProjectHeader";
import { store } from "@/store/store";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <ClerkProvider>
      <Show when="signed-out">
        <LoginPage />
      </Show>

      <Show when="signed-in">
        <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
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
                className="ml-2 rounded-xl bg-gradient-to-r from-red-500/50 to-rose-500/50 px-5 py-2.5 font-semibold text-white shadow-[0_0_20px_rgba(239,68,68,.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(239,68,68,.7)] active:scale-95"
              >
                Sign Out
              </button>
            </SignOutButton>
          </ProjectHeader>

          <Provider store={store}>
            <main className="min-h-0 w-full flex-1 overflow-hidden">{children}</main>
          </Provider>
        </div>
      </Show>

      <Toaster richColors position="top-right" theme="dark" closeButton />
    </ClerkProvider>
  );
}
