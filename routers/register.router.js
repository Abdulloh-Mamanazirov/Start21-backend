const express = require("express");
const {
  allStudents,
  oneStudent,
  registerUser,
  deleteStudent,
} = require("../controller/register.ctrl.js");

const router = express.Router();

// Students router
router.get("/all", allStudents);
router.get("/student/:id", oneStudent);
router.post("/register", registerUser);
router.delete("/student/:id", deleteStudent);

module.exports = { router };