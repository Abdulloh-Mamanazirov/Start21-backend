const client = require("../utils/connection.js");
const { sign } = require("../utils/jwt.js");

async function Login(req, res) {
  const { username, password } = req.body;

  const foundedAdmin = await client.query(`select * from admin where username = $1 AND password = $2`,[username, password]);

  if (foundedAdmin.rowCount === 0) return res.status(404).send("Admin was not found!")
  
  try {
    let token = sign({ id: foundedAdmin?.rows?.[0]?.id });
    res.status(200).json({msg:"Logged in successfully!" ,token });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Login };