"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LucideProvider, Code2 } from "lucide-react";

export function GitHubLoginButton() {
  const handleClick = async () => {
    try {
      await signIn("github", { redirectTo: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleClick}
      className="bg-white text-black hover:bg-zinc-200 font-bold rounded-full px-8 py-6 h-auto text-lg transition-all hover:scale-105 active:scale-95"
    >
      <LucideProvider size={24} strokeWidth={2}>
        <Code2 className="mr-2" />
      </LucideProvider>
      Connect GitHub Account
    </Button>
  );
}
