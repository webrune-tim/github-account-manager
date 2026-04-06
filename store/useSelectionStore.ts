import { create } from "zustand";

interface AppState {
  selectedRepoIds: string[];
  addRepoId: (id: string) => void;
  removeRepoId: (id: string) => void;
  toggleRepoId: (id: string) => void;
  addRepoIds: (ids: string[]) => void;
  removeRepoIds: (ids: string[]) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<AppState>((set) => ({
  selectedRepoIds: [],
  addRepoId: (id) => set((state) => ({ 
    selectedRepoIds: state.selectedRepoIds.includes(id) ? state.selectedRepoIds : [...state.selectedRepoIds, id] 
  })),
  removeRepoId: (id) => set((state) => ({ 
    selectedRepoIds: state.selectedRepoIds.filter((repoId) => repoId !== id) 
  })),
  toggleRepoId: (id) => set((state) => {
    const isSelected = state.selectedRepoIds.includes(id);
    return {
      selectedRepoIds: isSelected 
        ? state.selectedRepoIds.filter((repoId) => repoId !== id)
        : [...state.selectedRepoIds, id]
    }
  }),
  addRepoIds: (ids) => set((state) => {
    const newIds = ids.filter(id => !state.selectedRepoIds.includes(id));
    return { selectedRepoIds: [...state.selectedRepoIds, ...newIds] };
  }),
  removeRepoIds: (ids) => set((state) => ({
    selectedRepoIds: state.selectedRepoIds.filter(id => !ids.includes(id))
  })),
  clearSelection: () => set({ selectedRepoIds: [] }),
}));
