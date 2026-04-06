import { renderHook, waitFor } from "@testing-library/react";
import { useGitHubRepos } from "./useGitHubRepos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGitHubRepos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch repositories successfully", async () => {
    const mockResponse = {
      data: [{ id: 1, name: "test-repo" }],
      pagination: { page: 1, per_page: 30, hasMore: false },
    };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const { result } = renderHook(() => useGitHubRepos(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith("/api/repos?page=1&per_page=30");
  });

  it("should handle fetch error", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response);

    const { result } = renderHook(() => useGitHubRepos(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe("Failed to fetch repositories");
  });
});
