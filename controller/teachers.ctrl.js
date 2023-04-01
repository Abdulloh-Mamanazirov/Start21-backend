const uuid = require("uuid")
const {readFile,writeFile} = require("../fs_api/fs.js")

let teachers = readFile("teachers.json")

const getTeachers = (req,res)=>{
    return res.send(teachers)
}

const getOneTeacher = (req,res)=>{
    let {id} = req.params
    let teacher = teachers.find(teacher => teacher.id === id)
    return res.send(teacher)
}

const addTeacher = (req,res)=>{
    const {name,age,course,phone} = req.body
    console.log(req.body);
    teachers.push({
        id:uuid.v4(),
        num:teachers.length+1,
        name,
        course,
        phone,
        age: !!age ? age : "Not Information"
    })
    writeFile("teachers.json",teachers)

    return res.send(JSON.stringify("Added Successfully"));
}

module.exports = {getTeachers,getOneTeacher, addTeacher}