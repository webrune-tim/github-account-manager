import { useQuery } from "@tanstack/react-query";

export function useGitHubRepos() {
  return useQuery({
    queryKey: ["repos"],
    queryFn: async () => {
      const response = await fetch("/api/repos");
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      return response.json();
    },
  });
}
