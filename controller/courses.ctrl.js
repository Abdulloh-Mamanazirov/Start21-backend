const client = require("../utils/connection");

async function getCourses(req, res) {
  try {
    let courses = await client.query(
      `SELECT c.id, c.title, COUNT(g.course_id) AS number_of_groups
       FROM courses c
       LEFT JOIN groups g ON c.id = g.course_id WHERE c.isDeleted = false AND g.isDeleted = false
       GROUP BY c.id, c.title`
    );
    return res.status(200).json(courses.rows);
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function getAllCourses(req, res) {
  try {
    let {title}=req.body
    title = title ? title : ""
    let {rows} = await client.query(
      `SELECT * FROM courses WHERE isDeleted = false and title ilike $1`,[`%${title}%`]
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function addCourse(req, res) {
  try {
    let { title } = req.body;

    await client.query(`insert into courses(title)values($1)`, [title]);
    res.status(200).send("Created Successfully!");
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function updateCourse(req, res) {
  try {
    let { id } = req.params;
    let { title } = req.body;
    let foundedCourse = await client.query(
      `select * from courses where id = $1`,
      [id]
    );
    if (foundedCourse.rowCount === 0)
      return res.status(404).send("Course was not found!");
    await client.query(
      `update courses set title = coalesce($1,title) where id = $2`,
      [title, id]
    );
    res.status(200).send("Updated successfully!")
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

async function deleteCourse(req, res) {
  try {
    let { id } = req.params;
    let foundedCourse = await client.query(
      `select * from courses where id = $1`,
      [id]
    );
    if (foundedCourse.rowCount === 0)
      return res.status(404).send("Course was not found!");
    await client.query(
      `update courses set isDeleted = true where id = $1`,
      [id]
    );
    res.status(200).send("Deleted!")
  } catch (error) {
    return res.status(400).send("Something went wrong!");
  }
}

module.exports = {
  getCourses,
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse
};
