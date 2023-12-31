import express from "express";

const app = express();

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");

  res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
