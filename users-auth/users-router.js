const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

// Middleware to verify account types
const { restrict } = require("../middleware/user-role-middleware");
const usersModel = require("./users-model");
const router = express.Router();
// Needs an endpoint to update the users info

//Returns a list of classes
router.get("/classes", async (req, res, next) => {
  try {
    res.json(await usersModel.findClasses());
  } catch (err) {
    next(err);
  }
});

router.get("/classes/:classId", async (req, res, next) => {
  try {
    res.json(await usersModel.findClassById(req.params.classId));
  } catch (err) {
    next(err);
  }
});

// Returns a list of instructors
router.get("/instructors", async (req, res, next) => {
  try {
    res.json(await usersModel.findInstructors());
  } catch (err) {
    next(err);
  }
});

//Create new user
router.post("/register", async (req, res, next) => {
  try {
    const { name, username, password, role } = req.body;

    if (role == "instructor") {
      const user = await usersModel.findByInstructors({ username }).first();
      if (user) {
        return res.status(409).json({ message: "Username must be unique" });
      }

      const newUser = await usersModel.addInstructor({
        name,
        username,
        password: await bcryptjs.hash(password, 2),
      });

      return res.status(201).json(newUser);
    } else if (role == "client") {
      const user = await usersModel.findByClients({ username }).first();
      if (user) {
        return res.status(409).json({ message: "Username must be unique" });
      }

      const newUser = await usersModel.addClient({
        name,
        username,
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
    const { username, password, role } = req.body;

    if (role === "instructor") {
      const user = await usersModel.findByInstructors({ username }).first();
      // console.log("Login user object", user);

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

//Logout router
router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
      next();
    });
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
