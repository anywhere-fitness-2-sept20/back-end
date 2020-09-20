const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";

function restrict(role) {
  const roles = ["client", "instructor"];
  return async (req, res, next) => {
    const authError = { message: "Instructors only. No Clients" };
    try {
      // console.log("Auth Middleware", req.headers.authorization);
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "No token" });
      }
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        if (role && roles.indexOf(decoded.role) < roles.indexOf(role)) {
          console.log("JWT.verify if(role)", decoded);
          return res.status(403).json({ message: "You shall not pass" });
        }
        req.token = decoded;
      });

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { restrict };
