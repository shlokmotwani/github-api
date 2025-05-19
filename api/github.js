import dotenv from "dotenv";
dotenv.config();
import { Octokit } from "@octokit/core";

const USERNAME = process.env.username;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function fetchUser() {
  const { data } = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return data;
}

export async function fetchRepository(repoName) {
  const { data } = await octokit.request(`GET /repos/${USERNAME}/${repoName}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return data;
}

export async function createIssue(repoName, issue) {
  const { data } = await octokit.request(
    `POST /repos/${USERNAME}/${repoName}/issues`,
    {
      title: issue.title,
      body: issue.body,
      labels: ["bug"],
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  return data;
}
