const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

function loggedIn() {
  return async (req, res, next) => {
    const authError = { message: "Clients only. No Instructors" };
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(401)
          .json({ message: "User appears to be logged out" });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { loggedIn };
