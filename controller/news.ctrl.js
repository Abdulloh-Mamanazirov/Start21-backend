const client = require("../utils/connection");

async function getNews(req, res) {
  let news = await client.query(`select * from news`);
  return res.status(200).json(news.rows);
}

async function getOneNews(req, res) {
  let { id } = req.params;
  let news = await client.query(`select * from news where id = $1`,[id]);
  if(news.rowCount === 0 ) return res.status(404).send("News was not found!")
  return res.status(200).json(news.rows);
}

async function createNews(req, res) {
  let { title, description, image } = req.body;
  // console.log(res.body);
  if (
    !title ||
    title.length === 0 ||
    !description ||
    description.length === 0 ||
    !image ||
    image.length === 0
  )return res.send("Fill all the inputs!");

  let response = await client.query(
    `insert into news(title,description,image)values($1,$2,$3)`,
    [title, description, image]
  );
  if (response.rowCount === 0)
    return res.status(400).send("Something is wrong!");

  return res.status(200).send("Created successfully!");
}

async function deleteNews(req, res) {
  const { id } = req.params;
  let news = await client.query(`select * from news where id = $1`,[id]);

  if (news.rowCount === 0) return res.send("News not found!");

  await client.query(`delete from news where id = $1`, [id]);

  return res.status(200).send("Removed!");
}

const updateNews = async (req, res) => {
  let { id } = req.params;
  let { title, description } = req.body;
  let news = await client.query(`select * from news where id = $1`,[id]);
  if (news.rowCount === 0) return res.send("News not found!");

  title = title ? title : news.rows[0].title
  description = description ? description : news.rows[0].description
  
  await client.query(
    `UPDATE news SET title = COALESCE($1, title),description = COALESCE($2, description) where id = $3`,
    [title, description, id]
  );

  return res.status(200).send("Updated successfully!")
};


module.exports = { getNews, getOneNews, createNews, deleteNews, updateNews };
