const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

// Middleware to verify account types
// const { restrict } = require("../middleware/user-role-middleware");
const { loggedIn } = require("../middleware/logged-in-middleware");
const usersModel = require("./users-model");
const router = express.Router();

//Returns a list of classes
router.get("/classes", loggedIn(), async (req, res, next) => {
  try {
    res.json(await usersModel.findClasses());
  } catch (err) {
    next(err);
  }
});

// Returns details of a class by id
router.get("/classes/:classId", loggedIn(), async (req, res, next) => {
  try {
    res.json(await usersModel.findClassById(req.params.classId));
  } catch (err) {
    next(err);
  }
});

// Returns a list of instructors
router.get("/instructors", loggedIn(), async (req, res, next) => {
  try {
    res.json(await usersModel.findInstructors());
  } catch (err) {
    next(err);
  }
});

// Do I need a router.get() for returning instructor details

//Create new user
router.post("/register", async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const role = req.body.role.toLowerCase();

    if (!name || !username || !password) {
      return res
        .status(409)
        .json({ message: "Incomplete information for registration" });
    }

    if (role === "instructor") {
      const user = await usersModel.findByInstructors({ username }).first();
      if (user) {
        return res.status(409).json({ message: "Username must be unique" });
      }

      const newUser = await usersModel.addInstructor({
        name: name.toLowerCase(),
        username: username.toLowerCase(),
        password: await bcryptjs.hash(password, 2),
      });

      return res.status(201).json(newUser);
    } else if (role === "client") {
      const user = await usersModel.findByClients({ username }).first();

      if (user) {
        return res.status(409).json({ message: "Username must be unique" });
      }

      const newUser = await usersModel.addClient({
        name: name.toLowerCase(),
        username: username.toLowerCase(),
        password: await bcryptjs.hash(password, 2),
      });

      return res.status(201).json(newUser);
    } else {
      return res
        .status(400)
        .json({ message: "Please pick instructor or client" });
    }
  } catch (err) {
    next(err);
  }
});

//Login router
router.post("/login", async (req, res, next) => {
  try {
    const username = req.body.username.toLowerCase();
    const role = req.body.role.toLowerCase();
    const password = req.body.password;

    if (role === "instructor") {
      const user = await usersModel.findByInstructors({ username }).first();

      if (user && (await bcryptjs.compare(password, user.password))) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${username}`, token });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    } else if (role === "client") {
      const user = await usersModel.findByClients({ username }).first();

      if (user && (await bcryptjs.compare(password, user.password))) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${username}`, token });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

//Logout router Still broken
router.get("/logout", loggedIn(), async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
