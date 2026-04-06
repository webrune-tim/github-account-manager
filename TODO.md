# ⚠️ Disclaimer

This tool has the power to permanently delete data. Use with caution. The developers are not responsible for any accidental loss of code.

---

## ✅ TODO.md

```markdown
# VoidRepo Development Roadmap

## Phase 1: Foundation 🏗️

- [x] Initialize project using `vp create create-next-app`.
- [x] Configure `tailwind.config.ts` for strict Dark Mode aesthetic.
- [x] Set up **Auth.js** with GitHub Provider (Scopes: `repo`, `delete_repo`).
- [x] Initialize **Octokit** client in `lib/octokit.ts`.

## Phase 1.5: Testing Infrastructure 🧪

- [x] Install and configure **Vitest** with JSDOM support.
- [x] Create unit tests for `useSelectionStore`.
- [x] Create integration tests for `useGitHubRepos`.

## Phase 2: Core Data Flow 🌊

- [x] Create API Route `app/api/repos/route.ts` to fetch paginated user repos.
- [x] Implement **TanStack Query** hook `useGitHubRepos` with Vitest coverage.
- [x] Build **Zustand Store** `useSelectionStore` to track `selectedRepoIds`.
- [x] Implement "Select All" logic with pagination awareness.

## Phase 3: The Dashboard (UI) 🖥️

- [x] Build `RepoTable` component using Shadcn UI.
- [x] Add status badges (Public/Private/Fork/Archived).
- [x] Create **FilterSystem** (Search bar + Language dropdown) with Zustand state.
- [x] Design the **BulkActionBar** – a floating dock that appears when repos are selected.
- [x] REPLACE HugeIcons with Lucide icons

## Phase 4: Action Implementation ⚡

- [ ] Create API Route `app/api/bulk/route.ts` to handle batch requests.
- [ ] **Action: Change Visibility** (Patch requests).
- [ ] **Action: Archive Repos** (Patch requests).
- [ ] **Action: Bulk Delete** (Delete requests).
- [ ] Implement a "Progress Overlay" to show status of batch operations (e.g., "Deleting 4/20...").

## Phase 5: Safety & Polish ✨

- [ ] Add `ConfirmDestruction` Modal (requires user to type "permanently delete").
- [ ] Implement Toast notifications for success/error handling.
- [ ] Optimize build performance using `vp build`.
- [ ] Add "Export List" feature (Save selected repo metadata as JSON/CSV).

## Phase 6: Future Account Merger (Tool 1 Preview) 🔗

- [ ] Research "Transfer Repository" API constraints.
- [ ] Design multi-account auth handshake UI.
```
