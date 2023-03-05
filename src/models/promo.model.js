const db = require("../configs/postgre");

const getPromo = (query) => {
  return new Promise((resolve, reject) => {
    let sql = "select * from promo ";

    if (query.search && query.discount === "most") {
      sql += `where promo_code LIKE UPPER('%${query.search}%') order by discount DESC`;
    } else if (query.search) {
      sql += `where promo_code LIKE UPPER('%${query.search}%')`;
    } else if (query.discount === "most") {
      sql += "order by discount DESC";
    } else {
      sql += "order by id ASC";
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

const insertPromo = (data) => {
  return new Promise((resolve, reject) => {
    let sql = "insert into promo (promo_code, discount, expiry_date, product_id) values ($1, $2, $3, $4) RETURNING *";
    const values = [data.promo_code, data.discount, data.expiry_date, data.product_id];
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const patchPromo = (data) => {
  return new Promise((resolve, reject) => {
    let sql = "update promo set discount = ($2) where id = ($1) RETURNING *";
    const values = [data.id, data.discount];
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};
const deletePromo = (data) => {
  return new Promise((resolve, reject) => {
    let sql = "delete from promo where promo_code = $1 RETURNING *";
    const values = [data.promo_code];
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
  getPromo,
  insertPromo,
  patchPromo,
  deletePromo,
};
