const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

function clientOnly(role) {
  const roles = "client";
  return async (req, res, next) => {
    const authError = { message: "Clients only. No Instructors" };
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "No token" });
      }
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        if (role !== roles) {
          console.log("JWT.verify if(role)", decoded);
          return res.status(403).json({ authError });
        }
        req.token = decoded;
      });

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { clientOnly };
