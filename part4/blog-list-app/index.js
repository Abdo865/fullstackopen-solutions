const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl =
  "mongodb+srv://abdo:085208@testcluster.xwksv6b.mongodb.net/bloglist?retryWrites=true&w=majority";
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => res.status(201).json(result));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
