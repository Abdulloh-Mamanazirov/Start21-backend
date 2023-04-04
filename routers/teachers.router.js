const express = require("express");
const {
  getTeachers,
  getOneTeacher,
  addTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controller/teachers.ctrl.js");

const teachersRouter = express.Router()

// Teachers router
teachersRouter.get("/teachers", getTeachers);
teachersRouter.get("/teachers/:id", getOneTeacher);
teachersRouter.post("/addTeacher", addTeacher);
teachersRouter.delete("/teachers/:id", deleteTeacher);
teachersRouter.put("/teachers/:id", updateTeacher);

module.exports = { teachersRouter }