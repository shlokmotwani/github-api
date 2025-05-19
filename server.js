import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createIssue, fetchRepository, fetchUser } from "./api/github.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/github", async (req, res) => {
  const data = await fetchUser();
  const followers_count = data.followers;
  const following_count = data.following;
  const public_repos_count = data.public_repos;
  console.log({ followers_count, following_count, public_repos_count });
  res.send(data);
});

app.get("/github/:repoName", async (req, res) => {
  const data = await fetchRepository(req.params.repoName);
  const description = data.description;
  const createdAt = data.created_at;
  const visibility = data.visibility;
  console.log({ description, createdAt, visibility });
  res.send(data);
});

app.post("/github/:repoName/issues", async (req, res) => {
  const issue = {
    title: req.body.issue_title,
    body: req.body.issue_body,
  };
  const response = await createIssue(req.params.repoName, issue);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server started. Listening to port:${PORT}`);
});
