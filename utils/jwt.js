const jwt = require("jsonwebtoken")

const sign = (payload) => jwt.sign(payload, process.env.secret_key,{expiresIn:"1d"});

const verify = (payload) => jwt.verify(payload, process.env.secret_key);

module.exports = { sign, verify };
