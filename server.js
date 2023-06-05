const dotenv = require("dotenv")
const cors = require("cors")
const express = require("express")
const cookeiPares = require("cookie-parser");

const { router } = require("./routers/register.routes.js")
const { teachersRouter } = require("./routers/teachers.routes.js")
const { newsRouter } = require("./routers/news.routes.js")
const { coursesRouter } = require("./routers/courses.routes.js")
const adminsRouter = require("./routers/admins.routes.js");
const statsRouter = require("./routers/stats.routes.js");
const groupsRouter = require("./routers/groups.routes.js");
const studentRouter = require("./routers/students.routes.js");
const attendanceRouter = require("./routers/attendance.routes.js");

dotenv.config()
const port = process.env.PORT || 9000

let app = express()
app.use(express.json())
app.use(cors())
app.use(cookeiPares())

app.use("/api",router)
app.use("/api",coursesRouter)
app.use("/api",groupsRouter)
app.use("/api",teachersRouter)  
app.use("/api",studentRouter);  
app.use("/api",newsRouter)
app.use("/api",adminsRouter)
app.use("/api",attendanceRouter)
app.use("/api",statsRouter)


app.listen(port, ()=>{
    console.log(`Server is running on ${port} port`);
})