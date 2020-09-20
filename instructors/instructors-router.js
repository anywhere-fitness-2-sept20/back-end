const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

const { restrict } = require("../middleware/user-role-middleware");
const instructorsModel = require("./instructors-model");
const usersModel = require("../users-auth/users-model");
const router = express.Router();

//Get a list of clients (Instructors only)
router.get("/clients", restrict("instructor"), async (req, res, next) => {
  try {
    res.json(await usersModel.findClients());
  } catch (err) {
    next(err);
  }
});

//Get a full list of classes
router.get("/:id/classes", restrict("instructor"), async (req, res, next) => {
  try {
    res.json(await instructorsModel.findInstructorClasses(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.post("/:id/classes", restrict("instructor"), async (req, res, next) => {
  try {
    const {
      name,
      type,
      intensity,
      max_clients,
      day,
      start_time,
      duration,
      location,
    } = req.body;

    // if statements to verify the data

    const newClass = await instructorsModel.addClass({
      name,
      type,
      intensity,
      max_clients,
      day,
      start_time,
      duration,
      location,
      instructor_id: req.params.id,
    });
    return res.status(201).json({ newClass });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id/classes/:classId",
  restrict("instructor"),
  async (req, res, next) => {
    try {
      // const {
      //   name,
      //   type,
      //   intensity,
      //   max_clients,
      //   day,
      //   start_time,
      //   duration,
      //   location,
      // } = req.body;

      console.log("router", req.body);
      const updatedClass = await instructorsModel.updateClass(
        req.params.classId,
        req.body
      );

      return res.status(200).json({ updatedClass });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id/classes/:classId",
  restrict("instructor"),
  async (req, res, next) => {
    try {
      await instructorsModel.removeClass(req.params.classId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
