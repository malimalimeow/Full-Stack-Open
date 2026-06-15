const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    console.log("cleared");
    response.status(204).end();
  } catch (exception) {
    console.log("Backend reset error:", exception.message);
    response.status(500).json({ error: exception.message });
  }
});

module.exports = router;
