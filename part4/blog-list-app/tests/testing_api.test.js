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

afterAll(async () => {
  await mongoose.connection.close();
});
