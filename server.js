require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const usersRouter = require("./users-auth/users-router");
const instructorsRouter = require("./instructors/instructors-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET || "Secret word",
  })
);

server.use("/api/fitness", usersRouter, instructorsRouter);
server.get("/", (req, res) => {
  res.json({ message: "Welcome to the server 2.0" });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = server;
