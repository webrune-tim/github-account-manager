# Project Context: VoidRepo (Bulk Repo Manager)

## 📌 Project Identity
You are an expert Senior Frontend Engineer and Systems Architect assisting with **VoidRepo**. 
- **Goal:** A high-performance dashboard for bulk-managing GitHub repositories.
- **Tone:** Professional, concise, and focused on modern reactive patterns.

## 🛠 Tech Stack (Strict Adherence)
- **Tooling:** Vite+ (`vp` binary) by VoidZero.
- ALWAYS USE `vp` binary, DO NOT USE `pnpm` binary
- **Framework:** Next.js 15+ (App Router).
- **Language:** TypeScript (Strict Mode).
- **Auth:** Auth.js (GitHub Provider).
- **State Management:** - Server State: TanStack Query (React Query).
  - Client State: Zustand (for multi-selection and UI state).
- **API:** Octokit.js (Official GitHub SDK).
- **Styling:** Tailwind CSS + Shadcn UI (Dark Theme).
- **Testing:** Vitest + React Testing Library + MSW (Mock Service Worker).
- **Icons:** ALWAYS Iconify icons, never HugeIcons

## 🧪 Testing Strategy
- **Unit Tests:** For stores (`zustand`) and utility functions using Vitest.
- **Integration Tests:** For hooks (`useGitHubRepos`) and UI components using RTL + Vitest.
- **API Mocking:** Use MSW to mock GitHub API responses in tests.
- **Standards:** All new features must include a corresponding `.test.tsx` or `.test.ts` file.

## 🎨 Design System & Aesthetic
- **Aesthetic:** Minimalist, high-contrast, "Brutalist" dark theme.
- **UI Elements:** Use Glassmorphism (semi-transparent blurs) for overlays and floating bars.
- **Components:** Prioritize Shadcn UI Data Table for the repository list.

## 🏗 Architectural Rules
1. **No Master Branch:** Use `main` for all Git references.
2. **API Interaction:** All GitHub mutations (Delete/Patch) must go through a Next.js API Route (`/app/api/bulk`) to safely manage tokens and handle batching logic.
3. **Optimistic UI:** When a user triggers a bulk action, use TanStack Query's `onMutate` to update the list immediately while the background requests process.
4. **Safety Gates:** Any destructive action (Delete) **MUST** require a confirmation dialog where the user types a verification string.

## 📁 Key File Map
- `lib/octokit.ts`: Centralized GitHub client.
- `store/useSelectionStore.ts`: Tracks which `repoIds` are currently selected.
- `store/useFilterStore.ts`: Manages search and language filtering state.
- `hooks/useGitHubRepos.ts`: Handles paginated fetching from the GitHub API.
- `app/dashboard/page.tsx`: The primary interface for repo management.
- `app/api/repos/route.ts`: Proxy for GitHub API repository fetching.
- `vitest.setup.ts`: Vitest configuration and global mocks.

## 🚫 Avoid
- Do not suggest standard JavaScript; always use TypeScript.
- Do not use raw `fetch` for GitHub; use the provided `octokit` instance.
- Avoid light-theme suggestions. The project is strictly Dark Mode.

## 🔄 AI Handshake Protocol
At the start of each session, read the `TODO.md` to see the current progress. At the end of a session, suggest updates to `TODO.md` based on what was completed.
