const express = require("express");
const morgan = require("morgan");

const app = express();

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === +id);

  if (person) res.json(person);
  else res.status(404).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req["body"];

  if (!body.name) return res.status(400).json({ error: "no name found" });
  else if (persons.find((p) => p.name === body.name))
    return res.status(400).json({ error: "name already exists" });
  else if (!body.number)
    return res.status(400).json({ error: "no number found" });

  const id = generateId();
  const person = { id, ...body };

  res.json(person);
  persons.push(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  const x = `<p>Phonebook has info for ${
    persons.length
  } people</p><p>${new Date()}</p>`;

  res.send(x);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Phone book is hosted on http://localhost:${PORT}`);
});