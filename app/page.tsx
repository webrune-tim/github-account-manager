import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GitHubLoginButton } from "@/components/GitHubLoginButton";
import { LucideProvider, Library } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <nav className="p-8 border-b border-zinc-900 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded">
            <LucideProvider size={24} strokeWidth={2}>
              <Library className="text-black" />
            </LucideProvider>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">VoidRepo</span>
        </div>
        <div className="text-sm font-medium text-zinc-500 hover:text-white transition-colors">
          v0.1.0-alpha
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto text-center gap-12">
        <div className="space-y-6">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tightest leading-none uppercase">
            Bulk Repo <br/>
            <span className="text-zinc-800 outline-text">Management</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-lg mx-auto font-medium">
            A high-performance dashboard for bulk-managing GitHub repositories. 
            Visibility, archiving, and deletion at scale.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <GitHubLoginButton />
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <span>Octokit Powered</span>
            <span>Vite+ Speed</span>
            <span>Auth.js Secure</span>
          </div>
        </div>
      </main>

      <footer className="p-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xs text-zinc-600 font-mono">
          &copy; 2024 VOIDZERO // VOIDREPO
        </div>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .tracking-tightest { letter-spacing: -0.05em; }
        .outline-text {
          -webkit-text-stroke: 1px #27272a;
          color: transparent;
        }
      `}} />
    </div>
  );
}
