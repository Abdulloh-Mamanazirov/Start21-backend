const express = require("express");
const adminsRouter = express.Router();

const { Login } = require("../controller/admins.ctrl.js");

adminsRouter.post("/login", Login);

module.exports = adminsRouter