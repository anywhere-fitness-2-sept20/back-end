const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

function instructorOnly() {
  return async (req, res, next) => {
    const authError = { message: "Instructors only. No Clients" };
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "No token" });
      }
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        if (decoded.role !== "instructor") {
          // console.log("JWT.verify if(role)", decoded);
          return res.status(403).json(authError);
        }
        req.token = decoded;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { instructorOnly };
