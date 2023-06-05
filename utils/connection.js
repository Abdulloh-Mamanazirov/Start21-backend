let {Pool} = require("pg")

let client = new Pool({
  // user:"postgres",
  // host:"localhost",
  // port:5432,
  // password:"GalaxyA3",
  // database:"start21",
  user: "vmbgtuif",
  database: "vmbgtuif",
  port: 5432,
  password: "lnIB-PWBdRCF5an51SCZebTCNWmwhilm",
  host: "drona.db.elephantsql.com",
});
client.connect()

module.exports = client