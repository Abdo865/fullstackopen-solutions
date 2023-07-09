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

module.exports = blogsRouter;
