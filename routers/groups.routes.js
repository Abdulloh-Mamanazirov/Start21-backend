let express = require("express")
const {
  getGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  getTeacherGroups,
  getOneGroup,
} = require("../controller/groups.ctrl");
const checkToken = require("../middleware/checkToken")
const groupsRouter = express.Router()

groupsRouter.post("/groups", checkToken, getGroups)
groupsRouter.get("/groups/:id", checkToken, getOneGroup)
groupsRouter.get("/groups/teacher/:teacher_id", checkToken, getTeacherGroups)
groupsRouter.post("/createGroup", checkToken, addGroup)
groupsRouter.put("/groups/:id", checkToken, updateGroup)
groupsRouter.delete("/groups/:id", checkToken, deleteGroup)

module.exports = groupsRouter