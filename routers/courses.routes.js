const express = require("express");
const {getCourses, addCourse, updateCourse, deleteCourse, getAllCourses
} = require("../controller/courses.ctrl.js");
const checkToken = require("../middleware/checkToken");

const coursesRouter = express.Router();

// News router
coursesRouter.get("/courses", checkToken, getCourses);
coursesRouter.post("/allCourses", checkToken, getAllCourses);
coursesRouter.post("/createCourse", checkToken, addCourse);
coursesRouter.put("/courses/:id", checkToken, updateCourse);
coursesRouter.delete("/courses/:id", checkToken, deleteCourse);

module.exports = { coursesRouter };