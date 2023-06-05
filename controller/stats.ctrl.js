const client = require("../utils/connection");
const express = require("express");

/**
 *
 * @param {express.Response} res
 */

const getTotalNumbers = async (_, res) => {
  let stats = await client.query(`SELECT * FROM teachers t JOIN `);
};
const getStats = async (_, res) => {
  // let stats = await client.query(`SELECT * FROM stats`);
  // let teachers = await client.query(`select count(*) from teachers`);
  // let ielts = await client.query(
  //   `select * from ieltsresults where seven is not null or six is not null or sevenpoint is not null or sixpoint is not null or eight is not null or eightpoint is not null or five is not null or fivepoint is not null`
  // );
  // let intensive = await client.query(`select * from intensiveresults`);
  try {
	let { rows } = await client.query(`
	    SELECT COUNT(*) AS total
	    FROM students
	    UNION ALL
	    SELECT COUNT(*) AS total_deleted
	    FROM deleted_students
	    UNION ALL
	    SELECT COUNT(*) AS total_teachers
	    FROM teachers WHERE isDeleted = false
	    UNION ALL
	    SELECT COUNT(*) AS total_courses
	    FROM courses WHERE isDeleted = false
	    `);
	  return res.status(200).json(rows);
} catch (error) {
	return res.status(400).send("Something went wrong!")
}
};

module.exports = { getStats };
