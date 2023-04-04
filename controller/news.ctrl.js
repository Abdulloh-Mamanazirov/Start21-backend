const uuid = require("uuid");
const { readFile, writeFile } = require("../fs_api/fs.js");

let news = readFile("news.json");

function getNews(req, res) {
  return res.send(news);
}

function getOneNews(req, res) {
  let {id} = req.params
  let foundedNews = news.find(n => n.id === id)
  return res.send(foundedNews);
}

function createNews(req,res){
    let {title,text} = res.body
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
      text
    });

    writeFile("news.json" ,news)
    return res.send("News Created!")
}

module.exports = {getNews, getOneNews, createNews}