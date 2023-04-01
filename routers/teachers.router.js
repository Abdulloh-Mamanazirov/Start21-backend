const express = require("express");
const {
  getTeachers,
  getOneTeacher,
  addTeacher,
  deleteTeacher,
} = require("../controller/teachers.ctrl.js");

const teachersRouter = express.Router()

// Teachers router
teachersRouter.get("/teachers", getTeachers);
teachersRouter.get("/teachers/:id", getOneTeacher);
teachersRouter.post("/addTeacher", addTeacher);
teachersRouter.delete("/teachers/:id", deleteTeacher);

module.exports = { teachersRouter }