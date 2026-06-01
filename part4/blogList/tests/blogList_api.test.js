const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned", async () => {
  await api.get("/api/blogs").expect(200).expect("Content-Type", /json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 0);
});

after(async () => {
  await mongoose.connection.close();
});
