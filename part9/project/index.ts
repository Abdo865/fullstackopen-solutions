import express from "express";
import { calculateBmi } from "./bmiCalculator";
import * as exercise from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => res.send("'Hello Full Stack!'"));

app.get("/bmi", (req, res) => {
  if (!req.query.weight || !req.query.height)
    return res.json({ error: "malformatted parameters" });

  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  const bmi = calculateBmi(weight, height);
  return res.json({ weight: weight, height: height, bmi: bmi });
});

app.post("/exercises", (req, res) => {
  interface Request {
    daily_exercises: Array<number>;
    target: number;
  }
  const body = req.body as Request;
  if (!body || !body.daily_exercises || !body.target)
    return res.json({ error: "parameters missing" });
  else if (!Array.isArray(body.daily_exercises))
    return res.json({ error: "malformed parameters" });

  const result = exercise.calculateExercises(body.daily_exercises, body.target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
