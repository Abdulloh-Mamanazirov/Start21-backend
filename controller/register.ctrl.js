const uuid  = require("uuid")
const { readFile, writeFile } = require("../fs_api/fs.js")

let students = readFile("registered_students.json")

const allStudents = (req,res) =>{
    return res.send(JSON.stringify(students))
}
const oneStudent = (req,res) =>{
    const {id} = req.params
    let student = students.find(s=>s.id === id)
    return res.send(JSON.stringify(student))
}
const registerUser = (req,res) =>{
    const {name, phone, course} = req.body
    students.push({
      id: uuid.v4(),
      name,
      phone,
      course,
      date: [
        new Date().getDate(),
        "/",
        new Date().getMonth() + 1,
        "/",
        new Date().getFullYear(),
        " ",
        new Date().getHours()+5,
        ":",
        new Date().getMinutes(),
      ].join(""),
    });
    writeFile("registered_students.json", students)
    return res.send(JSON.stringify("Registereds Successfully"))
}

module.exports = {
    allStudents,
    oneStudent,
    registerUser
}