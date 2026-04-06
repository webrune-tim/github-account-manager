// import { useAppStore } from "@store/useAppStore";

// export function useSelection() {
//   const selectedRepoIds = useAppStore((state) => state.selectedRepoIds);
//   const addRepoId = useAppStore((state) => state.addRepoId);
//   const removeRepoId = useAppStore((state) => state.removeRepoId);
//   const clearSelection = useAppStore((state) => state.clearSelection);

//   const toggleSelection = (id: string) => {
//     if (selectedRepoIds.includes(id)) {
//       removeRepoId(id);
//     } else {
//       addRepoId(id);
//     }
//   };

//   return {
//     selectedRepoIds,
//     toggleSelection,
//     clearSelection,
//     isSelected: (id: string) => selectedRepoIds.includes(id),
//   };
// }
