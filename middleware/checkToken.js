const { verify } = require("../utils/jwt");

module.exports = checkToken = async (req, res, next) => {
  let {token} = req.headers;
  if (!token) return res.send("Invalid token");

  try {
    verify(token)
  } catch (error) {
    return res.send("Invalid token")
  }
  
  next()
};