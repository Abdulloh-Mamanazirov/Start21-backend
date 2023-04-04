const express = require("express");
const {
  getNews,
  getOneNews,
} = require("../controller/news.ctrl.js");

const newsRouter = express.Router();

// News router
newsRouter.get("/news", getNews);
newsRouter.get("/news/:id", getOneNews);
// newsRouter.post("/addTeacher", addTeacher);
// newsRouter.delete("/teachers/:id", deleteTeacher);

module.exports = { newsRouter };
