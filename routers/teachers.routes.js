const express = require("express");
const checkToken = require("../middleware/checkToken")
const {
  getTeachers,
  addTeacher,
  deleteTeacher,
  updateTeacher,
  getCourseTeacher,
} = require("../controller/teachers.ctrl.js");

const teachersRouter = express.Router()

// Teachers router
teachersRouter.post("/teachers",checkToken, getTeachers);
teachersRouter.get("/teachers/:course_id",checkToken, getCourseTeacher);
teachersRouter.post("/addTeacher",checkToken, addTeacher);
teachersRouter.delete("/teachers/:id",checkToken, deleteTeacher);
teachersRouter.put("/teachers/:id",checkToken, updateTeacher);

module.exports = { teachersRouter }