const client = require("../utils/connection");

const getTeachers = async (req, res) => {
  let {name} = req.body
  name = name ? name : ""
  let teachers = await client.query(`select t.id,t.name,t.image,t.phone,c.title as course from teachers t join courses c on t.course_id = c.id where t.isDeleted = false and t.name ilike $1`,[`%${name}%`]);
  return res.status(200).json(teachers.rows);
};

const getCourseTeacher = async (req, res) => {
  let { course_id } = req.params;
  let teachers = await client.query(`select * from teachers where course_id = $1`, [
    course_id,
  ]);

  if (teachers.rowCount === 0) return res.send("Teachers were not found!");

  return res.status(200).json(teachers.rows);
};

const addTeacher = async (req, res) => {
  let { name, phone, course, image } = req.body;

  if (
    !name ||
    name.length === 0 ||
    !phone ||
    phone.length === 0 ||
    !course ||
    course.length === 0
  )return res.send("Fill all the inputs!");

  image = image ? image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"

  let response = await client.query(
    `insert into teachers(name,phone,course_id,image)values($1,$2,$3,$4)`,
    [name, phone, course, image]
  );
  if (response.rowCount === 0)
    return res.status(400).send("Something went wrong!");

  return res.status(200).send("Created successfully!");
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  let teacher = await client.query(`select * from teachers where id = $1`,[id]);

  if (teacher.rowCount === 0) return res.send("Teacher was not found!");

  // await client.query(`delete from groups where teacher_id = $1`, [id]);
  // await client.query(`delete from teachers where id = $1`, [id]);

  await client.query(`update teachers set isDeleted = true where id = $1`,[id])

  return res.status(200).send("Deleted!");
};

const updateTeacher = async (req, res) => {
  let { id } = req.params;
  let { name, course, phone } = req.body;
  let teacher = await client.query(`select * from teachers where id = $1`,[id]);
  if (teacher.rowCount === 0) return res.send("Teacher was not found!");
  name = name ? name : teacher.rows[0].name
  course = course ? course : teacher.rows[0].course_id
  phone = phone ? phone : teacher.rows[0].phone
  
  await client.query(
    `UPDATE teachers SET name = COALESCE($1, name),course_id = COALESCE($2, course_id), phone = COALESCE($3, phone) where id = $4`,
    [name, course, phone,id]
  );

  return res.status(200).send("Updated successfully!")
};

module.exports = {
  getTeachers,
  getCourseTeacher,
  addTeacher,
  deleteTeacher,
  updateTeacher,
};
