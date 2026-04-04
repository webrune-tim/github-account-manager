import { Octokit } from "octokit"
import { auth } from "@/auth"

export const getOctokit = async () => {
  const session = await auth()
  if (!session?.accessToken) {
    throw new Error("No access token found")
  }

  return new Octokit({
    auth: session.accessToken,
  })
}
