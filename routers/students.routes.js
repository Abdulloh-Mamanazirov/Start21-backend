let express = require("express");
const {addStudent,deleteStudent,getStudents,updateStudent, getGroupStudents, getDeletedStudents
} = require("../controller/students.ctrl");
const checkToken = require("../middleware/checkToken");
const studentRouter = express.Router();

studentRouter.post("/students", checkToken, getStudents);
studentRouter.get("/deleted-students", checkToken, getDeletedStudents);
studentRouter.get("/students/:group_id", checkToken, getGroupStudents);
studentRouter.post("/addStudent", checkToken, addStudent);
studentRouter.put("/students/:id", checkToken, updateStudent);
studentRouter.delete("/students/:id", checkToken, deleteStudent);

module.exports = studentRouter;
