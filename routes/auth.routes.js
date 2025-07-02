const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const validRoles = ['Inspection HOD', 'Inspector', 'Commercial', 'Auditor', 'Admin'];
const authController = require("../controllers/auth.controller");
// const authenticate = require("../middlewares/authenticate");
// const authorize = require("../middlewares/authorize");
// const authController = require("../controllers/auth.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
// Login validation middleware
const loginValidation = [
  check("email").isEmail().withMessage("Valid email required"),
  check("password").notEmpty().withMessage("Password is required"),
//   check("role").isIn(validRoles).withMessage("Role must be one of: " + validRoles.join(', ')),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
// Register validation (already exists)
const registerValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email required"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
   check("mobile_no")
  .isLength({ min: 10, max: 12 })
  .withMessage("Mobile number must be between 10 to 12 digits long"),
//   check("role").isIn(["user", "admin"]).withMessage("Role must be user or admin"),
  check("role").isIn(validRoles).withMessage("Role must be one of: " + validRoles.join(', ')),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
// Routes
router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
// router.get("/dashboard", authenticate,  check("role").isIn(validRoles).withMessage("Role must be one of: " + validRoles.join(', ')), authController.dashboard);
router.get(
  "/dashboard",
  authenticate,
  authorize(...validRoles), // Only these roles can access dashboard
  authController.dashboard
);
module.exports = router;
