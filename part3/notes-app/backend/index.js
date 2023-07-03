const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const url = `mongodb+srv://abdo:085208@testcluster.xwksv6b.mongodb.net/noteApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const app = express();

// let notes = [
//   {
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === +id);

  if (note) res.json(note);
  else res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== +id);

  res.status(204).end();
});

const generateId = () => {
  let maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  let body = req.body;
  if (!body.content) return res.status(400).json({ error: "content missing" });
  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
  };
  notes.push(note);
  res.json(note);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
