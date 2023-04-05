const uuid = require("uuid");
const { readFile, writeFile } = require("../fs_api/fs.js");

let news = readFile("news.json");

function getNews(req, res) {
  return res.send(news);
}

function getOneNews(req, res) {
  let { id } = req.params;
  let foundedNews = news.find((n) => n.id === id);
  return res.send(foundedNews);
}

function createNews(req, res) {
  let { title, text } = req.body;
  // console.log(res.body);
  news.push({
    id: uuid.v4(),
    time: [
      new Date().getDate(),
      "/",
      new Date().getMonth() + 1,
      "/",
      new Date().getFullYear(),
      " ",
      new Date().getHours() + 5,
      ":",
      new Date().getMinutes(),
    ].join(""),
    title,
    text,
  });

  writeFile("news.json", news);
  return res.send("News Created Successfully!");
}

function deleteNews(req, res) {
  let { id } = req.params;

  news.forEach((n, i) => {
    if (n.id === id) news.splice(i, 1);
  });

  writeFile("news.json", news);
  res.send("News Deleted!");
}

module.exports = { getNews, getOneNews, createNews, deleteNews };
