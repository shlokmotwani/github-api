import express from "express";
import { createIssue, fetchRepository, fetchUser } from "../api/github.js";

export const githubRouter = express.Router();

githubRouter.get("/", async (req, res) => {
  const response = await fetchUser();
  const data = {
    username: response.login,
    bio: response.bio,
    url: response.html_url,
    followers_count: response.followers,
    following_count: response.following,
    public_repos_count: response.public_repos,
  };
  res.send(data);
});

githubRouter.get("/:repoName", async (req, res) => {
  const response = await fetchRepository(req.params.repoName);
  const data = {
    description: response.description,
    createdAt: response.created_at,
    visibility: response.visibility,
  };
  res.send(data);
});

githubRouter.post("/:repoName/issues", async (req, res) => {
  const issue = {
    title: req.body.issue_title,
    body: req.body.issue_body,
  };
  const response = await createIssue(req.params.repoName, issue);
  const issueURL = response.html_url;
  res.send(issueURL);
});
