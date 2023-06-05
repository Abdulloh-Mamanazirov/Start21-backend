const client = require("../utils/connection");

async function getGroups(req, res) {
  try {
    let {course} = req.body
    course = course ? course : ""
    let { rows } = await client.query(
      `SELECT g.id group_id, g.days, g.start_time, g.end_time, t.name teacher, t.phone, t.image, c.title, COUNT(s.group_id) AS number_of_students
          FROM groups g
          LEFT JOIN students s ON g.id = s.group_id
          JOIN teachers t ON g.teacher_id = t.id
          JOIN courses c ON g.course_id = c.id
          WHERE t.isDeleted = false AND g.isDeleted = false AND c.isDeleted = false AND c.title ilike $1
          GROUP BY g.id,g.days,g.start_time,g.end_time, t.name, t.phone, t.image, c.title
          ORDER BY c.title ASC`,[`%${course}%`]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!");
  }
}

async function getOneGroup(req, res) {
  try {
    let { id } = req.params;
    let { rows } = await client.query(
      `SELECT g.id group_id, g.days, g.start_time, g.end_time, t.name teacher, t.phone, t.image, c.title
      FROM groups g
      JOIN teachers t ON g.teacher_id = t.id
      JOIN courses c ON g.course_id = c.id
      WHERE t.isDeleted = false AND g.isDeleted = false AND c.isDeleted = false AND g.id = $1`,[id]
    );
    res.status(200).json(rows)
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!");
  }
}

async function getTeacherGroups(req, res) {
  try {
    let { teacher_id } = req.params;

    let { rows } = await client.query(
      `select * from groups where isDeleted = false and teacher_id = $1`,
      [teacher_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!");
  }
}

async function addGroup(req, res) {
  try {
    let { course, days, teacher, start, end } = req.body;

    if (
      !course ||
      course.length === 0 ||
      !days ||
      days.length === 0 ||
      !teacher ||
      teacher.length === 0 ||
      !start ||
      start.length === 0 ||
      !end ||
      end.length === 0
    )
      return res.send("Fill all the inputs!");

    await client.query(
      `insert into groups(days ,start_time, end_time, course_id, teacher_id)values($1,$2,$3,$4,$5)`,
      [days, start, end, course, teacher]
    );

    return res.status(200).send("Created successfully!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!");
  }
}

async function updateGroup(req, res) {
  try {
    let { id } = req.params;
    let { course, days, teacher, start, end } = req.body;
    let foundedGroup = await client.query(
      `select * from groups where id = $1`,
      [id]
    );
    course = course ? course : foundedGroup.rows[0].course_id;
    teacher = teacher ? teacher : foundedGroup.rows[0].teacher_id;
    days = days ? days : foundedGroup.rows[0].days;
    start = start ? start : foundedGroup.rows[0].start_time;
    end = end ? end : foundedGroup.rows[0].end_time;

    if (foundedGroup.rowCount === 0)
      return res.status(404).send("Group was not found!");
    await client.query(
      `update groups set days = coalesce($1,days) ,start_time = coalesce($2,start_time), end_time = coalesce($3, end_time), course_id = coalesce($4,course_id), teacher_id = coalesce($5, teacher_id) where id = $6`,
      [days, start, end, course, teacher, id]
    );
    res.status(200).send("Updated successfully!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!");
  }
}

async function deleteGroup(req, res) {
  try {
    let { id } = req.params;
    let foundedGroup = await client.query(
      `select * from groups where id = $1`,
      [id]
    );
    if (foundedGroup.rowCount === 0)
      return res.status(404).send("Group was not found!");
      await client.query(`delete from attendance a using students s where s.group_id = $1 and a.group_id = $2`,[id,id])
    await client.query(`update groups set isDeleted = true where id = $1`, [
      id,
    ]);
    res.status(200).send("Deleted!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!");
  }
}

module.exports = {
  getGroups,
  getOneGroup,
  getTeacherGroups,
  addGroup,
  updateGroup,
  deleteGroup,
};
