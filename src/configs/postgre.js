const { Pool } = require("pg");
// client
// pool
const db = new Pool({
  user: "akbar",
  password: "semi",
  host: "localhost",
  database: "coffe_shopDB",
  port: 5432,
});

// <es6
module.exports = db;
