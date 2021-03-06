const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

const { instructorOnly } = require("../middleware/instructor-middleware");
const instructorsModel = require("./instructors-model");
const usersModel = require("../users-auth/users-model");
const router = express.Router();

// Get a list of clients (Instructors only)
router.get("/instructors/clients", instructorOnly(), async (req, res, next) => {
  try {
    res.json(await usersModel.findClients());
  } catch (err) {
    next(err);
  }
});

// Get a list of instructor classes and clients in each class
router.get(
  "/instructors/:instructorId/classes",
  instructorOnly(),
  async (req, res, next) => {
    try {
      res.json(
        await instructorsModel.findInstructorClasses(req.params.instructorId)
      );
    } catch (err) {
      next(err);
    }
  }
);

// Creates a new fitness class
router.post(
  "/instructors/:instructorId/classes",
  instructorOnly(),
  async (req, res, next) => {
    try {
      const {
        image_url,
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
      if (
        !name ||
        !type ||
        !intensity ||
        !max_clients ||
        !day ||
        !start_time ||
        !duration ||
        !location
      ) {
        return res.status(400).json({
          message: "Cannot create a fitness class with missing information.",
        });
      }

      const newClass = await instructorsModel.addClass({
        image_url,
        name,
        type,
        intensity,
        max_clients,
        day,
        start_time,
        duration,
        location,
        instructor_id: req.params.instructorId,
      });
      return res.status(201).json({ newClass });
    } catch (err) {
      next(err);
    }
  }
);

// Updates an existing class
router.put(
  "/instructors/:instructorId/classes/:classId",
  instructorOnly(),
  async (req, res, next) => {
    try {
      // Verify the max_clients is not less than the number of clients already in the class
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

// Deletes an existing class
router.delete(
  "/instructors/:instructorId/classes/:classId",
  instructorOnly(),
  async (req, res, next) => {
    try {
      // Verify instructor trying to delete class is the class owner
      await instructorsModel.removeClass(req.params.classId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
