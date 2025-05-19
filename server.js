import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { githubRouter } from "./routes/githubRouter.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.use("/github", githubRouter);

app.listen(PORT, () => {
  console.log(`Server started. Listening to port:${PORT}`);
});
