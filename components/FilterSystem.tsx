"use client";

import { useFilterStore } from "@/store/useFilterStore";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search01Icon, CodeIcon } from "@hugeicons/react";

export function FilterSystem() {
  const { search, language, setSearch, setLanguage } = useFilterStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
      <div className="relative flex-1">
        <Search01Icon 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" 
        />
        <Input 
          type="text" 
          placeholder="Search repositories by name..." 
          className="pl-10 bg-zinc-900 border-zinc-800 focus-visible:ring-blue-500" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="w-full sm:w-[200px]">
        <Select value={language || "all"} onValueChange={(val) => setLanguage(val === "all" ? "" : val)}>
          <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-blue-500">
            <div className="flex items-center gap-2">
              <CodeIcon size={16} className="text-zinc-500" />
              <SelectValue placeholder="Language" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
