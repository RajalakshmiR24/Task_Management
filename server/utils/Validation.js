const { body, validationResult } = require("express-validator");


exports.validateRegister = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


exports.validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateTask = [
  body("taskName").notEmpty().withMessage("Task name is required"),
  body("dueDate").isISO8601().withMessage("Valid due date is required"),
];