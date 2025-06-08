const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const allowRole = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is allowed
    console.log(roles, req.body.role, "role");
    if (!roles.includes(req.body.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { handleValidation, allowRole };
