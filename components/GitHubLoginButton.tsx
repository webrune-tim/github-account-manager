"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@hugeicons/react";

export function GitHubLoginButton() {
  return (
    <Button 
      size="lg" 
      onClick={() => signIn("github", { redirectTo: "/dashboard" })}
      className="bg-white text-black hover:bg-zinc-200 font-bold rounded-full px-8 py-6 h-auto text-lg transition-all hover:scale-105 active:scale-95"
    >
      <GithubIcon size={24} className="mr-2" />
      Connect GitHub Account
    </Button>
  );
}
