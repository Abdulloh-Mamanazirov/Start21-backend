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
    const {name,age,course,phone,levels} = req.body
    console.log(req.body);
    teachers.push({
        id:uuid.v4(),
        num:teachers.length+1,
        name,
        course,
        levels: !!levels ? levels : "No Information",
        phone,
        age: !!age ? age : "Not Information"
    })
    writeFile("teachers.json",teachers)

    return res.send(JSON.stringify("Added Successfully"));
}

const deleteTeacher = (req,res)=>{
    let {id} = req.params
    teachers.forEach((t,i) => {
        if(t.id === id) teachers.splice(i,1)
    });
    writeFile("teachers.json", teachers)

    res.send(JSON.stringify("Teacher Removed!"))
}

const updateTeacher = (req,res)=>{
    let {id} = req.params
    let {name, course, levels,phone,age} = req.body

    let foundedTeacher = teachers.find(t=>t.id === id)
    
    teachers.forEach((t) => {
        if(t.id === id) {
            foundedTeacher.id = foundedTeacher.id;
            foundedTeacher.name = !!name ? name : foundedTeacher.name;
            foundedTeacher.course = !!course ? course : foundedTeacher.course;
            foundedTeacher.levels = !!levels ? levels : foundedTeacher.levels;
            foundedTeacher.phone = !!phone ? phone : foundedTeacher.phone;
            foundedTeacher.age = !!age ? age : foundedTeacher.age;
        }
    });
    writeFile("teachers.json", teachers)

    res.send(JSON.stringify("Teacher Updated!"))
}

module.exports = { getTeachers, getOneTeacher, addTeacher, deleteTeacher, updateTeacher };