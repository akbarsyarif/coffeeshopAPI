const db = require("../configs/postgre");

const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `select products.id, products.product_name, products.price, category.category_name from products
    join category on products.category_id = category.id order by id ASC`,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
  });
};

const insertProducts = (data) => {
  return new Promise((resolve, reject) => {
    const values = [data.product_name, data.price, data.category_id];
    db.query("insert into products (product_name, price, category_id) values ($1, $2, $3) RETURNING *", values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const patchProducts = (data) => {
  return new Promise((resolve, reject) => {
    const values = [data.id, data.price];
    db.query("update products set price = ($2) where id = ($1) RETURNING *", values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const deleteProducts = (data) => {
  return new Promise((resolve, reject) => {
    const values = [data.product_name];
    db.query("delete from products where product_name = ($1) RETURNING *", values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getProducts,
  insertProducts,
  patchProducts,
  deleteProducts,
};
