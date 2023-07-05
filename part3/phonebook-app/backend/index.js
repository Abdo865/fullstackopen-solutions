const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const app = express();

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
);
app.use(express.static("dist"));

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
  Person.find({}).then((people) => res.json(people));
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((foundPerson) => res.json(foundPerson));
});

app.post("/api/persons", (req, res, next) => {
  const body = req["body"];

  if (!body.name) return res.status(400).json({ error: "no name found" });
  else if (persons.find((p) => p.name === body.name)) next();
  else if (!body.number)
    return res.status(400).json({ error: "no number found" });

  const person = new Person({
    ...body,
  });
  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((resulted) => console.log(resulted))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deleted) => res.status(204).end())
    .catch((err) => next(err));
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

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError")
    return res.status(400).send({ error: "Malformed id" });
  next(err);
};

app.use(errorHandler);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Phone book is hosted on http://localhost:${PORT}`);
});
