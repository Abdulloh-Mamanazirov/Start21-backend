const TelegramBot = require("node-telegram-bot-api");
const client = require("../utils/connection")

const bot = new TelegramBot(
  process.env.BOT_TOKEN ?? "6347153154:AAHLYaBjXJH_tku7UC07p16Utpr9UbniVhU",
  {
    polling: true,
  }
);

const allStudents = async (_,res) =>{
    let students = await client.query( `select * from registered` )
    return res.status(200).json(students.rows)
}
const oneStudent = async (req,res) =>{
    const {id} = req.params
    let student = await client.query( `select * from registered where id = $1`,[id] )

    if(student.rowCount === 0) return res.send("Student was not found!")
    
    return res.status(200).json(student.rows)
}

const registerUser = async (req,res) =>{
    const {name, phone, course} = req.body
    
    if(!name || name.length === 0 || !phone || phone.length === 0 || !course || course.length === 0) return res.send("Fill all the inputs!")

    console.log(name, phone, course);
    bot.sendMessage(1844389500, `
    Registered user details: \n 
    <b>● Name: </b>${name} 
    <b>● Phone number: </b>${phone} 
    <b>● Registered course: </b>${course}
    <b>● Registered date: </b>${new Date().toLocaleDateString()}
    <b>● Registered time: </b>${new Date().toLocaleTimeString()}`
    , {parse_mode:"HTML"})
    
    let response = await client.query(
      `insert into registered (name,phone,course)values($1,$2,$3)`,[name,phone,course]
    );
    if(response.rowCount === 0) return res.status(400).send("Something is wrong!");

    return res.status(200).send("Registered successfully!")
}

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  let student = await client.query(`select * from registered where id = $1`,[id])

  if (student.rowCount === 0) return res.send("Student was not found!");

  await client.query(`delete from registered where id = $1`,[id])
  
  return res.status(200).send("Removed!");
};

module.exports = {
    allStudents,
    oneStudent,
    registerUser,
    deleteStudent
}