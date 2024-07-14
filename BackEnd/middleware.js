const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./confing");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "either your header is invalid or it doesn't start with Bearer",
    });
  }
  const token = authHeader.spilt(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
    return res.json({ msg: "You are not authorized" });
  } catch (err) {
    return res.status(403).json({
      msg: "you are not authorised",
    });
  }
};

module.exports = {
  authMiddleware,
};
