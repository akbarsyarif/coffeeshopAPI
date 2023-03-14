const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // verif ke db where email and pwd ===
    const sql = `select u.id, u.password, up.profile_picture, u.role_id from users u
    join user_profile up on u.id = up.user_id
    where u.email = $1`;

    db.query(sql, [body.email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createNewUser = (body) => {
  return new Promise((resolve, reject) => {
    const sql = `insert into users (email, password, phone_number)
    values ($1, $2, $3) returning id`;
    values = [body.email, body.password, body.phone_number];

    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createNewUserProfile = (newId) => {
  return new Promise((resolve, reject) => {
    const sql = `insert into user_profile (user_id)
    values ($1)`;

    db.query(sql, [newId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getOldPassword = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "select u.password from users u where id = $1";

    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const EditPassInDb = (userId, newPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "update users set password = $2 where id = $1";

    db.query(sql, [userId, newPassword], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  createNewUser,
  createNewUserProfile,
  getOldPassword,
  EditPassInDb,
};
