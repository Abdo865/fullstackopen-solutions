const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
  console.log("done");
});

test("correct amount of blogs are returned", async () => {
  const blogs = await helper.BlogsInDb();
  expect(blogs).toHaveLength(helper.initialBlogs.length);
});

test("id property is defined as id not _id", async () => {
  const blogs = await helper.BlogsInDb();
  expect(blogs[0].id).toBeDefined();
});

test("post request testing", async () => {
  const blog = {
    title: "What Is a Blog, & Why Should You Create One",
    author: "Caroline Forsey",
    url: "https://blog.hubspot.com/marketing/what-is-a-blog",
    likes: 30,
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.BlogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((blog) => blog.url);
  expect(contents).toContain(
    "https://blog.hubspot.com/marketing/what-is-a-blog"
  );
});

test("zero likes when no likes property defined", async () => {
  const blog = {
    title: "What Is a Blog, & Why Should You Create One",
    author: "Caroline Forsey",
    url: "https://blog.hubspot.com/marketing/what-is-a-blog",
  };

  await Blog.deleteMany({});

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.BlogsInDb();
  expect(blogsAtEnd).toHaveLength(1);

  expect(blogsAtEnd[0].likes).toBe(0);
}, 10000);

test("bad request when no title or url provided", async () => {
  const noTitleBlog = {
    author: "Caroline Forsey",
    url: "https://blog.hubspot.com/marketing/what-is-a-blog",
    likes: 30,
  };
  const noUrlBlog = {
    title: "What Is a Blog, & Why Should You Create One",
    author: "Caroline Forsey",
    likes: 30,
  };

  await api.post("/api/blogs").send(noTitleBlog).expect(400);
  await api.post("/api/blogs").send(noUrlBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
