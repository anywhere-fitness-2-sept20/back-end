const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware to verify account types
const { restrict } = require("../middleware/user-role-middleware");
const usersModel = require("./users-model");
const router = express.Router();

//List of users to make sure the api works
router.get("/clients", restrict("instructor"), async (req, res, next) => {
  try {
    console.log(req.headers);
    res.json(await usersModel.findClients());
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

      console.log("instructor if", name, username, password, role);
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

      console.log("client if", name, username, password, role);
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
      console.log(user);

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

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
