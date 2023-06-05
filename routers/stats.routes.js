let express = require("express")
const { getStats } = require("../controller/stats.ctrl")
const checkToken = require("../middleware/checkToken")

let statsRouter = express.Router()

statsRouter.get("/stats", checkToken, getStats)

module.exports = statsRouter