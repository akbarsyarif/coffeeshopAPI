const db = require("../configs/postgre");

const getPromo = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `select promo.id, promo.promo_code, promo.discount, products.product_name, promo.expiry_date from promo
    join products on promo.product_id = products.id `;

    if (query.search && query.discount === "most") {
      sql += `where promo_code LIKE UPPER('%${query.search}%') order by discount DESC`;
    } else if (query.search) {
      sql += `where promo_code LIKE UPPER('%${query.search}%')`;
    } else if (query.discount === "most") {
      sql += "order by discount DESC";
    } else {
      sql += "order by id ASC";
    }

    const limit = parseInt(query.limit) || 3;
    const page = parseInt(query.page) || 1;
    const offset = (page - 1) * limit;

    sql += ` limit $1 offset $2`;
    const values = [limit, offset];

    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getMetaPromo = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `select count(*) as total_data from promo`;

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
      } else prev += `http://localhost:8080/promo?limit=${limit}&page=${page - 1}`;
      if (page === totalPage) {
        next = null;
      } else next += `http://localhost:8080/promo?limit=${limit}&page=${page + 1}`;

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
  getMetaPromo,
  insertPromo,
  patchPromo,
  deletePromo,
};
