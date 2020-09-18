const express = require("express");

const { restrict } = require("../middleware/user-role-middleware");
const instructorModel = require("./instructors-model");
const usersModel = require("../users-auth/users-model");
const router = express.Router();

router.get(
  "/instructors/clients",
  restrict("instructor"),
  async (req, res, next) => {
    try {
      res.json(await usersModel.findClients());
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/instructors/classes",
  restrict("instructors"),
  async (req, res, next) => {
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

      const newClass = await instructorModel.addClass({
        name,
        type,
        intensity,
        max_clients,
        day,
        start_time,
        duration,
        location,
      });

      return res.status(201).json({ newClass });
    } catch (err) {
      next(err);
    }
  }
);

router.put();

router.delete();

module.exports = router;
