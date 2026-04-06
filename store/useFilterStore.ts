import { create } from "zustand";

interface FilterState {
  search: string;
  language: string;
  setSearch: (search: string) => void;
  setLanguage: (language: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  language: "",
  setSearch: (search) => set({ search }),
  setLanguage: (language) => set({ language }),
  clearFilters: () => set({ search: "", language: "" }),
}));
