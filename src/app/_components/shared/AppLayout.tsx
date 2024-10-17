import React from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen max-h-full flex-col items-center justify-center overflow-hidden bg-[#151843] text-[#ebf3fe]">
      {children}
    </main>
  );
}
