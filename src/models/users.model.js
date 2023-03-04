const db = require("../configs/postgre");

const getUsers = (req, res) => {
  db.query("select id, email, phone_number from users order by id ASC", (err, result) => {
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
  insertUsers,
  patchUsers,
  deleteUsers,
};
