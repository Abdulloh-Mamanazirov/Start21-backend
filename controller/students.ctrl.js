const client = require("../utils/connection");

async function getStudents(req, res) {
  try {
    let {name} = req.body
    name = name ? name : ""
    let { rows } = await client.query(
      `select s.id student_id, s.name, s.phone, s.group_id, g.days, g.start_time, g.end_time, c.title course, t.name teacher from students s  join groups g on s.group_id = g.id join courses c on c.id = g.course_id join teachers t on g.teacher_id = t.id where g.isDeleted = false and c.isDeleted = false and s.name ilike $1`,[`%${name}%`]
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function getDeletedStudents(_,res){
  try {
    let {rows} = await client.query(`select * from deleted_students`)
    res.status(200).json(rows)
  } catch (error) {
    return res.status(400).send("Something went wrong!")
  }
}

async function getGroupStudents(req, res) {
  try {
    let {group_id} = req.params
    
    // let {rows:founded} = await client.query(`select date from attendance where group_id = $1`,[group_id])
    // let {rows:date} = await client.query(`select current_date`)
    // if(founded[0]?.date === date[0]?.current_date){
    //   await client.query(`update attendance set present = false`)
    // };
    let today = (new Date().toLocaleDateString());
    
    let { rows: students } = await client.query(
      `select s.id, s.name, s.phone, s.group_id, a.present, a.date 
       from students s left join attendance a on a.student_id = s.id and a.date = $1 
       where s.group_id = $2`,
      [today, group_id]
    );
    res.status(200).json(students);
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function addStudent(req, res) {
  try {
    let { name, phone, group_id } = req.body;

    if (
      !name ||
      name.length === 0 ||
      !phone ||
      phone.length === 0 ||
      !group_id ||
      group_id.length === 0) return res.send("Fill all the inputs!");

    await client.query(
      `insert into students(name, phone, group_id)values($1,$2,$3)`,
      [name, phone, group_id]
    );

    return res.status(200).send("Added successfully!");
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function updateStudent(req, res) {
  try {
    let { id } = req.params;
    let { name, phone, group_id } = req.body;
    let foundedStudent = await client.query(
      `select * from students where id = $1`,
      [id]
    );
    name = name ? name : foundedStudent.rows[0].name;
    phone = phone ? phone : foundedStudent.rows[0].phone;
    group_id = group_id ? group_id : foundedStudent.rows[0].group_id;

    if (foundedStudent.rowCount === 0)
      return res.status(404).send("Student was not found!");
    await client.query(
      `update students set name = coalesce($1,name) ,phone = coalesce($2,phone), group_id = coalesce($3, group_id) where id = $4`,
      [name, phone, group_id, id]
    );
    res.status(200).send("Updated successfully!");
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function deleteStudent(req, res) {
  try {
    let { id } = req.params;
    let foundedStudent = await client.query(
      `select * from students where id = $1`,
      [id]
    );
    if (foundedStudent.rowCount === 0)
      return res.status(404).send("Student was not found!");
    await client.query(`delete from students where id = $1`, [
      id,
    ]);
    res.status(200).send("Deleted!");
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

module.exports = { addStudent,deleteStudent,getStudents,updateStudent,getGroupStudents,getDeletedStudents };
