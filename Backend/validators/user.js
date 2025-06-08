const { body } = require("express-validator");
const validateCreateUser = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("age").isInt({ min: 0 }).withMessage("Age should be a positive number"),
  body("mobileNumber")
    .notEmpty()
    .withMessage("Mobile Number is Required")
    .isMobilePhone()
    .withMessage("Invalid Mobile Number"),
];

module.exports = { validateCreateUser };
