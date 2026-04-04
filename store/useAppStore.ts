import { create } from "zustand";

interface AppState {
  selectedRepoIds: string[];
  addRepoId: (id: string) => void;
  removeRepoId: (id: string) => void;
  clearSelection: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedRepoIds: [],
  addRepoId: (id) => set((state) => ({ selectedRepoIds: [...state.selectedRepoIds, id] })),
  removeRepoId: (id) => set((state) => ({ 
    selectedRepoIds: state.selectedRepoIds.filter((repoId) => repoId !== id) 
  })),
  clearSelection: () => set({ selectedRepoIds: [] }),
}));
