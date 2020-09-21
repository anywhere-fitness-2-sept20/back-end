const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

const { restrict } = require("../middleware/user-role-middleware");
const clientsModel = require("../clients/clients-model");
const usersModel = require("../users-auth/users-model");
const router = express.Router();

// Allows client to join classes
router.post("/client/:classId", async (res, req, next) => {
  try {
    console.log(req.body, req.params);

    // await clientsModel.joinClass(req.body.clientId, req.params.classId);

    res.status(201).json({ message: "Class joined" });
  } catch (err) {
    console.log("router");
    next(err);
  }
});

// Update client information
router.put("/clients/:clientId", async (req, res, next) => {
  try {
    const updatedClient = await clientsModel.updateClient(
      req.params.clientId,
      req.body
    );

    return res.status(200).json({ updatedClient });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
