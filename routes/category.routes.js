const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

router.post("/create", controller.createCategory);
router.get("/list", controller.getCategories);

module.exports = router;
