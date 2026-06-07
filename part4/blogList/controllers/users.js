const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);

    if (user) {
      response.status(200).json(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;

  try {
    if (password && password.length > 3) {
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();

      response.status(201).json(savedUser);
    } else {
      response.status(400).json({
        error: "must be at least 3 characters long ",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);

    if (user) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:id", async (request, response, next) => {
  const { username, name, password } = request.body;
  try {
    let passwordHash = "";
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      request.params.id,
      { username, name, passwordHash },
      { returnDocument: "after", runValidators: true },
    );

    if (user) {
      response.status(200).json(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
