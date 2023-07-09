const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  if (req.body.url && req.body.title) {
    const blog = new Blog(req.body);
    await blog.save();

    return res.status(201).json(blog);
  }
  return res.status(400).send({ error: "bad request" });
});

blogsRouter.delete("/:id", async (req, res) => {
  const blogs = await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  if (!body) return res.status(400).json({ error: "Payload cannot be empty" });

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updated = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updated);
});

module.exports = blogsRouter;
