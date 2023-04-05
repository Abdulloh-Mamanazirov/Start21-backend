const express = require("express");
const {
  getNews,
  getOneNews,
  createNews,
  deleteNews
} = require("../controller/news.ctrl.js");

const newsRouter = express.Router();

// News router 
newsRouter.get("/news", getNews);
newsRouter.get("/news/:id", getOneNews);
newsRouter.post("/createNews", createNews);
newsRouter.delete("/news/:id", deleteNews);

module.exports = { newsRouter };
