const db = require("../configs/postgre");

const getHistory = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `select h.id, u.email, p.product_name, p.price from history h
    join users u on h.user_id = u.id
    join products p on h.product_id = p.id `;
    if (query.find) {
      sql += `where u.email like '${query.find}'`;
    } else {
      sql += `order by id ASC`;
    }

    db.query(sql, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const insertHistory = (data) => {
  return new Promise((resolve, reject) => {
    let sql = "insert into history (user_id, product_id) values ($1, $2) RETURNING *";
    const values = [data.user_id, data.product_id];
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const patchHistory = (data) => {
  return new Promise((resolve, reject) => {
    let sql = "update history set user_id = $2,  product_id = $3 where id = $1 RETURNING *";
    const values = [data.id, data.user_id, data.product_id];
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getHistory,
  insertHistory,
  patchHistory,
};
