const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);
describe("when there is initially some blogs saved", () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    console.log("cleared");

    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({
      username: "Test",
      name: "Anyone",
      passwordHash,
    });

    await user.save();

    const loginResponse = await api.post("/api/login").send({
      username: "Test",
      password: "password",
    });

    token = loginResponse.body.token;

    const blogWithUser = helper.initialBlogs.map((blog) => {
      return { ...blog, user: user._id };
    });

    await Blog.insertMany(blogWithUser);
    console.log("done");
  });

  test("blogs are returned", async () => {
    await api.get("/api/blogs").expect(200).expect("Content-Type", /json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, 6);
  });

  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const user = await api.get("/api/users");
    assert.deepStrictEqual(response.body[0]._id, undefined);
    assert.deepStrictEqual(response.body[0].id, "5a422a851b54a676234d17f7");
    assert.deepStrictEqual(response.body[0].user, user.body[0]);
  });

  describe("addition of a new blog", () => {
    test("test a request without token will be rejected ", async () => {
      const user = await api.get("/api/users");

      const newBlog = {
        title: "Blu blu bluuu",
        author: "F.I.S.H",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/fghsjsthsrthg.pdf",
        likes: 10,
        user: user.body[0].id,
      };

      const result = await api
        .post("/api/blogs")
        .set("Authorization", "")
        .send(newBlog)
        .expect(401);

      console.log(result.body);

      const blogAtEnd = await helper.blogInDb();
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length);
    });

    test("test a valid blog can be added", async () => {
      const newBlog = {
        title: "Blu blu bluuu",
        author: "F.I.S.H",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/fghsjsthsrthg.pdf",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /json/);

      const blogAtEnd = await helper.blogInDb();
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1);

      const title = blogAtEnd.map((blog) => blog.title);
      assert(title.includes("Blu blu bluuu"));
    });

    test("test a blog without property like, like will be defaulted as 0 ", async () => {
      const newBlog = {
        title: "Meooow",
        author: "C.A.T",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/cihyghohwo.pdf",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /json/);

      const blogAtEnd = await helper.blogInDb();
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1);

      const blog = blogAtEnd.find((blog) => blog.title === "Meooow");
      const like = blog.likes;
      assert.strictEqual(like, 0);
    });

    test("test a blog without property url will be rejected ", async () => {
      const newBlog = {
        title: "Meooow",
        author: "C.A.T",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogAtEnd = await helper.blogInDb();
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length);
    });

    test("test a blog without property title will be rejected ", async () => {
      const newBlog = {
        author: "C.A.T",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/notitle.pdf",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogAtEnd = await helper.blogInDb();
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe("updating of an individual blog", () => {
    test("rejects with status code 404 if id is not valid", async () => {
      const blogAtStart = await helper.blogInDb();
      const nonExistingId = await helper.nonExistingId();
      const UpdateData = { title: "only you" };

      await api.put(`/api/blogs/${nonExistingId}`).send(UpdateData).expect(404);
      const blogAtEnd = await helper.blogInDb();

      assert.deepStrictEqual(blogAtEnd, blogAtStart);
    });

    test("succeeds with update data and status code 200 if id is valid", async () => {
      const blogAtStart = await helper.blogInDb();
      const blogToUpdate = blogAtStart[0];
      const UpdateData = { likes: blogToUpdate.likes + 1 };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(UpdateData)
        .expect(200)
        .expect("Content-Type", /json/);

      const blogAtEnd = await helper.blogInDb();
      assert.deepStrictEqual(blogAtEnd[0].likes, blogAtStart[0].likes + 1);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogAtStart = await helper.blogInDb();
      const blogToDelete = blogAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogAtEnd = await helper.blogInDb();

      const ids = blogAtEnd.map((blog) => blog.id);
      assert(!ids.includes(blogToDelete.id));

      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
