import { NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const per_page = parseInt(searchParams.get("per_page") || "30", 10);

    const octokit = await getOctokit();
    const { data, headers } = await octokit.rest.repos.listForAuthenticatedUser({
      page,
      per_page,
      sort: "updated",
      direction: "desc",
    });

    // Extract pagination info from headers if needed
    // Link header contains next, prev, last, first links
    const linkHeader = headers.link;

    return NextResponse.json({
      data,
      pagination: {
        page,
        per_page,
        hasMore: !!linkHeader?.includes('rel="next"'),
      },
    });
  } catch (error: any) {
    if (error.message === "No access token found") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Failed to fetch repositories:", error);
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
  }
}
