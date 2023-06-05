const express = require("express");
const attendanceRouter = express.Router();

const { getAttendance, updateAttendance } = require("../controller/attendance.ctrl");
const checkToken = require("../middleware/checkToken");

attendanceRouter.get("/attendance/:group_id",checkToken,getAttendance );
attendanceRouter.post("/attendance/update",checkToken,updateAttendance );

module.exports = attendanceRouter;