const db = require("../configs/postgre");

/* global values:writable */

const getUsers = (req, res) => {
  const { query } = req;
  let sql = "select id, email, phone_number from users order by id ASC";
  values = [];
  if (query.limit === undefined) {
    sql;
  } else if (query.limit.length > 0) {
    values.push(query.limit);
    sql += " limit $1";
    console.log(sql);
  }

  db.query(sql, values, (err, result) => {
    function containsOnlyNumbers(values) {
      return /^\d+$/.test(values);
    }
    if (values.length > 0 && !containsOnlyNumbers(values)) {
      res.status(400).json({
        msg: "Only Use Number For Limit Params",
      });
      return;
    }
    if (err) {
      console.log(err.message);
      res.status(500).json({
        msg: "Internal Server Error",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  });
};

const getUserDetails = (path) => {
  return new Promise((resolve, reject) => {
    let sql = `select u.id, u.email, u.phone_number, p.profile_picture, p.address, p.display_name, p.first_name, p.last_name, p.birth_date, g.gender from users u
    join user_profile p on u.id = p.user_id
    join profile_gender g on p.gender_id = g.id where u.id = $1`;
    values = [path.userId];

    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getMetaUsers = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `select count(*) as total_data from users`;

    db.query(sql, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      const totalData = result.rows[0].total_data;
      const limit = parseInt(query.limit) || 3;
      const page = parseInt(query.page) || 1;
      const totalPage = Math.ceil(totalData / limit);
      let next = ``;
      let prev = ``;
      if (page === 1) {
        prev = null;
      } else prev += `http://localhost:8080/users?limit=${limit}&page=${page - 1}`;
      if (page === totalPage) {
        next = null;
      } else next += `http://localhost:8080/users?limit=${limit}&page=${page + 1}`;

      const meta = {
        totalData,
        next,
        prev,
        totalPage,
      };
      resolve(meta);
    });
  });
};

const insertUsers = (req, res) => {
  const { body } = req;
  const values = [body.email, body.password, body.phone_number, body.role_id];
  db.query("insert into users (email, password, phone_number, role_id) values ($1, $2, $3, $4) RETURNING *", values, (err, result) => {
    if (err) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
      return;
    }
    res.status(201).json({
      data: result.rows,
      msg: "New User Created",
    });
  });
};

const patchUsers = (req, res) => {
  const { body } = req;
  const values = [body.id, body.password];
  db.query("update users set password = ($2) where id = ($1) RETURNING *", values, (err, result) => {
    if (err) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
      return;
    }
    res.status(202).json({
      data: result.rows,
      msg: "Password Changed",
    });
  });
};

const deleteUsers = (req, res) => {
  const { body } = req;
  const values = [body.id];
  db.query("delete from users where id = ($1) RETURNING *", values, (err, result) => {
    if (err) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
      return;
    }
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: `There Is No ID No.${values[0]}`,
      });
      return;
    }
    res.status(202).json({
      data: result.rows,
      msg: `User No.${values[0]} Succesfully Deleted`,
    });
  });
};

module.exports = {
  getUsers,
  getUserDetails,
  getMetaUsers,
  insertUsers,
  patchUsers,
  deleteUsers,
};
