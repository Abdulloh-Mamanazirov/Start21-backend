const express = require("express");
const {
  getTeachers,
  getOneTeacher,
  addTeacher,
} = require("../controller/teachers.ctrl.js");

const teachersRouter = express.Router()

// Teachers router
teachersRouter.get("/teachers", getTeachers);
teachersRouter.get("/teacher/:id", getOneTeacher);
teachersRouter.post("/addTeacher", addTeacher);

module.exports = { teachersRouter }