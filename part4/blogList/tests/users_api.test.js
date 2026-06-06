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

  test("user is returned with a correct format", async () => {
    const response = await api.get("/api/users");
    assert.deepStrictEqual(response.body[0]._id, undefined);
    assert.deepStrictEqual(response.body[0].password, undefined);
  });

  test("user is unique", async () => {
    const userAtStart = await helper.userInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "FullStackOpen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect({ error: "expected `username` to be unique" });

    const userAtEnd = await helper.userInDb();
    assert.strictEqual(userAtEnd.length, userAtStart.length);
  });
});

describe("create a new user", () => {
  test("test valid user can be created", async () => {
    const userAtStart = await helper.userInDb();

    const newUser = {
      username: "Poo",
      name: "cat",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /json/);

    const userAtEnd = await helper.userInDb();
    assert.strictEqual(userAtEnd.length, userAtStart.length + 1);

    const username = userAtEnd.map((user) => user.username);
    assert(username.includes("Poo"));
  });

  test("test a user without username will not be created", async () => {
    const userAtStart = await helper.userInDb();

    const newUser = {
      name: "cat",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const userAtEnd = await helper.userInDb();
    assert.strictEqual(userAtEnd.length, userAtStart.length);
  });

  test("test a user with invalid username will not be created", async () => {
    const userAtStart = await helper.userInDb();

    const newUser = {
      username: "a",
      name: "aa",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(400).expect({
      error:
        "User validation failed: username: Path `username` (`a`, length 1) is shorter than the minimum allowed length (3).",
    });

    const userAtEnd = await helper.userInDb();
    assert.strictEqual(userAtEnd.length, userAtStart.length);
  });

  test("test a user without password will not be created", async () => {
    const userAtStart = await helper.userInDb();

    const newUser = {
      username: "Poo",
      name: "cat",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const userAtEnd = await helper.userInDb();
    assert.strictEqual(userAtEnd.length, userAtStart.length);
  });

  test("test a user with invalid password will not be created", async () => {
    const userAtStart = await helper.userInDb();

    const newUser = {
      username: "aaa",
      name: "aa",
      password: "a",
    };

    await api.post("/api/users").send(newUser).expect(400).expect({
      error: "must be at least 3 characters long ",
    });

    const userAtEnd = await helper.userInDb();
    assert.strictEqual(userAtEnd.length, userAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
