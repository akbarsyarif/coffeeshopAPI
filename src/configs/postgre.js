const { Pool } = require("pg");
// client
// pool

const env = require("./environment");

const db = new Pool({
  user: env.uName,
  password: env.password,
  host: env.host,
  database: env.dataBase,
  port: env.dbPort,
});

// <es6
module.exports = db;
