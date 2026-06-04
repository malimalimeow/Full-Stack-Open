const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

const api = supertest(app);
describe("When there is initially some blogs and users saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    console.log("cleared");

    await Blog.insertMany(helper.initialBlogs);
    const passwordHash = await bcrypt.hash("FullStackOpen", 10);

    const user = new User({
      username: "mluukkai",
      name: "Matti Luukkainen",
      passwordHash,
    });

    await user.save();

    console.log("done");
  });

  test("user is returned", async () => {
    await api.get("/api/users").expect(200).expect("Content-Type", /json/);
  });
});

after(async () => {
  await mongoose.connection.close();
});
