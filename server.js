// require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
// May need cookie parser installed
// server.use(cookieParser())

const usersRouter = require("./users-auth/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET,
  })
);

server.use("/api/fitness", usersRouter);
server.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = server;
