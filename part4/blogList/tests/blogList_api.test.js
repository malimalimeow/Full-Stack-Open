const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);
beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  await Blog.insertMany(helper.initialBlogs);
  console.log("done");
});

test.only("blogs are returned", async () => {
  await api.get("/api/blogs").expect(200).expect("Content-Type", /json/);
});

test.only("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 6);
});

after(async () => {
  await mongoose.connection.close();
});
