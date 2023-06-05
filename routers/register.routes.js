const express = require("express");
const checkToken = require("../middleware/checkToken")

const {
  allStudents,
  oneStudent,
  registerUser,
  deleteStudent,
} = require("../controller/register.ctrl.js");

const router = express.Router();

// Students router
router.get("/registered",checkToken, allStudents);
router.get("/registered/:id",checkToken, oneStudent);
router.post("/register", registerUser);
router.delete("/registered/:id",checkToken, deleteStudent);

module.exports = { router };