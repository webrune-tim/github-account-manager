import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { RepoTable } from "@/components/RepoTable";
import { FilterSystem } from "@/components/FilterSystem";
import { BulkActionBar } from "@/components/BulkActionBar";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">VoidRepo Dashboard</h1>
        <p className="text-zinc-400">Manage repositories for {session.user?.name || session.user?.email}</p>
      </header>

      <main className="flex flex-col gap-6">
        <FilterSystem />
        <RepoTable />
      </main>

      <BulkActionBar />
    </div>
  );
}
