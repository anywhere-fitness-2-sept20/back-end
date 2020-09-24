const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

const { clientOnly } = require("../middleware/client-middleware");
const clientsModel = require("../clients/clients-model");
const router = express.Router();

// Returns a message to make sure the /clients route is active
// router.get("/clients", (req, res, next) => {
//   res.json({ message: "This is a message" });
// });

// Returns a list of all classes that a client is signed up for
router.get(
  "/clients/:clientId/classes",
  clientOnly(),
  async (req, res, next) => {
    try {
      res.json(await clientsModel.findClientsClasses(req.params.clientId));
    } catch (err) {
      next(err);
    }
  }
);

// Allows client to join classes
router.post("/clients/:clientId", clientOnly(), async (req, res, next) => {
  try {
    const clientId = parseInt(req.params.clientId, 10);

    const clientClass = clientsModel.findClientClass(
      req.body.classId,
      clientId
    );
    // console.log("Client class", clientClass);
    if (clientClass) {
      return res.status(400).json(clientClass);
    }

    await clientsModel.joinClass(req.body.classId, clientId);

    res.status(201).json({ message: "Class joined successfully" });
    next();
  } catch (err) {
    next(err);
  }
});

// Update client information
router.put("/clients/:clientId", clientOnly(), async (req, res, next) => {
  try {
    console.log(req.params.clientId, req.body.name);
    const updatedClient = await clientsModel.updateClient(
      req.body,
      req.params.clientId
    );

    return res.status(200).json({ updatedClient });
  } catch (err) {
    next(err);
  }
});

// Allows client to leave a class
router.delete(
  "/clients/:clientId/classes",
  clientOnly(),
  async (req, res, next) => {
    try {
      const clientId = req.params.clientId;
      const classId = req.body.classId;

      const validClass = clientsModel.findClientClass(classId, clientId);

      if (!validClass) {
        return res
          .status(400)
          .json({ message: "The client is not in that class" });
      }

      await clientsModel.leaveClass(clientId, classId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
