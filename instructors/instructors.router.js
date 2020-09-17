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

router.post();

router.put();

router.delete();

module.exports = router;
