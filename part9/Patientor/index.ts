import express from "express";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");

  res.send("Pong");
});

const PORT = 3003;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
