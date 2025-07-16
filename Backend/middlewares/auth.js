const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456";

async function authenticateToken(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token, "token");

    if (!token) {
      return res.status(400).json({
        message: "Token not found",
      });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: "Invalid Auth Token",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.log(err, "err");
    res.status(500).json({
      err: err.message || "SOmething went wrong",
    });
  }
}

module.exports = { authenticateToken };
