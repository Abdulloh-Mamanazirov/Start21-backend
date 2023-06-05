const express = require("express");
const {
  getNews,
  getOneNews,
  createNews,
  deleteNews,
  updateNews
} = require("../controller/news.ctrl.js");
const checkToken = require("../middleware/checkToken")

const newsRouter = express.Router();

// News router 
newsRouter.get("/news",checkToken, getNews);
newsRouter.get("/news/:id",checkToken, getOneNews);
newsRouter.post("/createNews",checkToken, createNews);
newsRouter.put("/news/:id",checkToken, updateNews);
newsRouter.delete("/news/:id",checkToken, deleteNews);

module.exports = { newsRouter };
