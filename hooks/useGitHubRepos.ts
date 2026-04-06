import { useQuery } from "@tanstack/react-query";

interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  archived: boolean;
  visibility: "public" | "private";
}

interface ReposResponse {
  data: GitHubRepo[];
  pagination: {
    page: number;
    per_page: number;
    hasMore: boolean;
  };
}

export function useGitHubRepos(page = 1, perPage = 30) {
  return useQuery<ReposResponse>({
    queryKey: ["repos", page, perPage],
    queryFn: async () => {
      const response = await fetch(`/api/repos?page=${page}&per_page=${perPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      return response.json();
    },
  });
}
