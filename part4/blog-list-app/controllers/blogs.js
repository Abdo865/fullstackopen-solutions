const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  if (!req.body.url && !req.body.title)
    return res.status(400).send({ error: "bad request" });

  const user = req.user;
  if (!user) return res.status(401).json({ error: "invalid token" });

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "invalid token" });

  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete.user._id.toString() !== user._id.toString())
    return res.status(404).json({ error: "user didn't post this blog" });

  user.blogs = user.blogs.filter((id) => id.toString() !== req.params.id);
  await user.save();

  await blog.findByIdAndRemove(req.params.id);
  return res.status(204).json(user);
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
