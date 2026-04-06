import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { RepoTable } from "@/components/RepoTable";
import { FilterSystem } from "@/components/FilterSystem";
import { BulkActionBar } from "@/components/BulkActionBar";
import { Button } from "@/components/ui/button";
import { 
  LucideProvider,
  LogOut, 
  UserCircle, 
  Library,
  LayoutDashboard
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="p-6 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded">
              <LucideProvider size={20} strokeWidth={2}>
                <Library className="text-black" />
              </LucideProvider>
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase hidden sm:inline">VoidRepo</span>
          </div>
          
          <div className="h-4 w-[1px] bg-zinc-800" />
          
          <div className="flex items-center gap-2 text-zinc-400">
            <LucideProvider size={18} strokeWidth={2}>
              <LayoutDashboard />
            </LucideProvider>
            <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full">
            <LucideProvider size={16} strokeWidth={2}>
              <UserCircle className="text-zinc-500" />
            </LucideProvider>
            <span className="text-xs font-bold tracking-tight">{session.user?.name || session.user?.email}</span>
          </div>
          
          <form action={async () => {
            "use server";
            await signOut();
          }}>
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-400 transition-colors h-9 w-9 rounded-full">
              <LucideProvider size={18} strokeWidth={2}>
                <LogOut />
              </LucideProvider>
            </Button>
          </form>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h2 className="text-3xl font-black uppercase tracking-tight">Repository Control</h2>
          <p className="text-zinc-500 font-medium">Bulk management and filtering of your GitHub repositories.</p>
        </header>

        <section className="flex flex-col gap-6">
          <FilterSystem />
          <RepoTable />
        </section>
      </main>

      {/* Floating Action Bar */}
      <BulkActionBar />

      <footer className="p-8 mt-auto border-t border-zinc-900">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-700">
          <div>System: Operational</div>
          <div>&copy; 2024 VoidZero</div>
        </div>
      </footer>
    </div>
  );
}
