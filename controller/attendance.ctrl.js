const client = require("../utils/connection");

async function getAttendance(req,res) {
    try {
        let {group_id} = req.params
        let {rows}= await client.query(`select * from attendance where group_id = $1`,[group_id])
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(400).send("Something went wrong!")
    }
}

async function updateAttendance(req,res) {
    try {
        let { student_id, group_id, date, present } = req.body;
        let today = new Date().toLocaleDateString();
        
        let {rows:student} = await client.query(`select * from attendance where student_id = $1 and date = $2`,[student_id, today])

        if(student?.length !== 0) {
            return await client.query(`update attendance set present = $1 where student_id = $2`,[present,student_id]);
        }
        
        await client.query(`insert into attendance(student_id,group_id,date,present)values( $1,$2,$3,$4)`,[student_id,group_id,date,present])
        return res.status(200).send("OK")
    } catch (error) {
        return res.status(400).send("Something went wrong!")
    }
}

module.exports = {getAttendance, updateAttendance}