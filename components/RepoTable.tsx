"use client";

import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useSelectionStore } from "@/store/useSelectionStore";
import { useFilterStore } from "@/store/useFilterStore";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  createColumnHelper 
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  archived: boolean;
  visibility: "public" | "private";
  language: string;
  updated_at: string;
}

const columnHelper = createColumnHelper<GitHubRepo>();

export function RepoTable() {
  const [page, setPage] = useState(1);
  const { search, language } = useFilterStore();
  const { data, isLoading, isError } = useGitHubRepos(page);
  const { 
    selectedRepoIds, 
    toggleRepoId, 
    addRepoIds, 
    removeRepoIds 
  } = useSelectionStore();

  const allRepos = data?.data || [];
  
  // Client-side filtering
  const filteredRepos = allRepos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = !language || (repo.language && repo.language.toLowerCase() === language.toLowerCase());
    return matchesSearch && matchesLanguage;
  });

  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            filteredRepos.length > 0 &&
            filteredRepos.every((repo) => selectedRepoIds.includes(repo.id.toString()))
          }
          onCheckedChange={(value) => {
            if (value) {
              addRepoIds(filteredRepos.map((repo) => repo.id.toString()));
            } else {
              removeRepoIds(filteredRepos.map((repo) => repo.id.toString()));
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRepoIds.includes(row.original.id.toString())}
          onCheckedChange={() => toggleRepoId(row.original.id.toString())}
          aria-label="Select row"
        />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="flex flex-col">
          <a 
            href={info.row.original.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:underline text-blue-400"
          >
            {info.getValue()}
          </a>
          <span className="text-xs text-zinc-500 truncate max-w-[300px]">
            {info.row.original.description}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("visibility", {
      header: "Visibility",
      cell: (info) => (
        <Badge variant={info.getValue() === "public" ? "outline" : "secondary"}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor("language", {
      header: "Language",
      cell: (info) => info.getValue() && (
        <Badge variant="outline" className="bg-zinc-900">
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.fork && <Badge variant="secondary">Fork</Badge>}
          {row.original.archived && <Badge variant="destructive">Archived</Badge>}
        </div>
      ),
    }),
    columnHelper.accessor("updated_at", {
      header: "Updated",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
  ];

  const table = useReactTable({
    data: filteredRepos,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-zinc-500">Loading repositories...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">Error loading repositories.</div>;
  }

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
      <Table>
        <TableHeader className="bg-zinc-900/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent border-zinc-800">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-zinc-400">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-zinc-900/50 border-zinc-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500 italic">
                No repositories found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between p-4 border-t border-zinc-800">
        <div className="text-sm text-zinc-500">
          {selectedRepoIds.length} repositories selected
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-1.5 text-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg disabled:opacity-30 transition-colors"
          >
            Previous
          </button>
          <div className="px-4 py-1.5 text-sm bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400">
            Page <span className="text-white font-medium">{page}</span>
          </div>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!data?.pagination.hasMore}
            className="px-4 py-1.5 text-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg disabled:opacity-30 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
