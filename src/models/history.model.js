const db = require("../configs/postgre");

const getHistory = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `select u.email, up.address, h.notes, p.product_name, s.size, pr.promo_code, py.method as payment_method, st.name as transaction_status, hps.qty, hps.sub_total 
    from history_products_sizes hps
    join history h on h.id = hps.history_id 
    join products p on p.id =hps.product_id 
    join sizes s on s.id = hps.size_id 
    join users u on u.id = h.user_id
    join user_profile up on up.user_id = u.id 
    join payments py on py.id = h.payment_id 
    join promo pr on pr.id = h.promo_id 
    join status st on st.id = h.status_id  `;
    if (query.find) {
      sql += `where u.email like '${query.find}'`;
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

const deleteHistory = (data) => {
  return new Promise((resolve, reject) => {
    let sql = "delete from history where id = $1 RETURNING *";
    const values = [data.id];
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
  deleteHistory,
};
