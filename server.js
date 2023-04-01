const dotenv = require("dotenv")
const cors = require("cors")
const express = require("express")
const {router} = require("./routers/register.router.js")
const {teachersRouter} = require("./routers/teachers.router.js")

dotenv.config()
const port = process.env.PORT || 9000

let app = express()
app.use(express.json())
app.use(cors())

app.use("/api",router)
app.use("/api",teachersRouter)


app.listen(port, ()=>{
    console.log(`Server is running on ${port} port`);
})