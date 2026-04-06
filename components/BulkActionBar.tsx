"use client";

import { useSelectionStore } from "@/store/useSelectionStore";
import { Button } from "@/components/ui/button";
import { 
  LucideProvider,
  Archive, 
  Trash2, 
  Eye, 
  X 
} from "lucide-react";

export function BulkActionBar() {
  const { selectedRepoIds, clearSelection } = useSelectionStore();

  if (selectedRepoIds.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 pr-4 border-r border-zinc-800">
        <span className="text-sm font-bold bg-blue-500 text-white min-w-[24px] h-6 px-1 flex items-center justify-center rounded-full">
          {selectedRepoIds.length}
        </span>
        <span className="text-sm text-zinc-400 font-medium">Selected</span>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full gap-2"
          onClick={() => console.log("Bulk visibility change", selectedRepoIds)}
        >
          <LucideProvider size={16} strokeWidth={2}>
            <Eye />
          </LucideProvider>
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Visibility</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full gap-2"
          onClick={() => console.log("Bulk archive", selectedRepoIds)}
        >
          <LucideProvider size={16} strokeWidth={2}>
            <Archive />
          </LucideProvider>
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Archive</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-full gap-2"
          onClick={() => console.log("Bulk delete", selectedRepoIds)}
        >
          <LucideProvider size={16} strokeWidth={2}>
            <Trash2 />
          </LucideProvider>
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Delete</span>
        </Button>
      </div>

      <div className="pl-4 border-l border-zinc-800">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-zinc-500 hover:text-white rounded-full"
          onClick={clearSelection}
        >
          <span className="sr-only">Clear selection</span>
          <LucideProvider size={18} strokeWidth={2}>
            <X />
          </LucideProvider>
        </Button>
      </div>
    </div>
  );
}
