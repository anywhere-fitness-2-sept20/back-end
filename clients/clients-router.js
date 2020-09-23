const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

const { restrict } = require("../middleware/user-role-middleware");
const clientsModel = require("../clients/clients-model");
const router = express.Router();

// Returns a list of classes that a client is signed up for
router.get("/clients/:clientId/classes", async (req, res, next) => {
  try {
    res.json(await clientsModel.findClientsClasses(req.params.clientId));
  } catch (err) {
    next(err);
  }
});

// Allows client to join classes
router.post("/clients/:clientId", async (req, res, next) => {
  try {
    const clientId = parseInt(req.params.clientId, 10);

    const clientClass = clientsModel.findClientClass(
      req.body.classId,
      clientId
    );
    console.log(clientClass);
    if (clientClass) {
      return res
        .status(400)
        .json({ message: "Client has already joined that class" });
    }

    await clientsModel.joinClass(req.body.classId, clientId);

    res.status(201).json({ message: "Class joined successfully" });
    next();
  } catch (err) {
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

router.delete("clients/:clientId/classes/:classId", async (req, res, next) => {
  try {
    console.log("router");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
