const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = (req, res) => {
  const { name, email, password, role, mobile_no, } = req.body;

  // Check if role is Admin and already exists
  if (role === "Admin") {
    User.checkIfRoleExists("Admin", (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (result.length > 0) {
        return res.status(400).json({ message: "Admin already registered" });
      } else {
        createUser();
      }
    });
  } else {
    createUser();
  }

  function createUser() {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ err });

      User.createUser({ name, email, password: hash, role ,mobile_no}, (err, result) => {
        if (err) return res.status(500).json({ err });
        res.status(201).json({ message: `${role} registered successfully` });
      });
    });
  }
};
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      // ✅ Include role in JWT for authorization
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  });
};
exports.dashboard = (req, res) => {
  res.status(200).json({
    message: `Welcome to dashboard, ${req.user.role}`,
    user: req.user
  });
};
