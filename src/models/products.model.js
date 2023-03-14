const db = require("../configs/postgre");

const getProducts = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `select products.id, products.product_name, products.price, category.category_name from products
    join category on products.category_id = category.id `;

    const limit = parseInt(query.limit) || 3;
    const page = parseInt(query.page) || 1;
    const offset = (page - 1) * limit;

    const values = [limit, offset];

    if (query.search) {
      sql += `where lower(product_name) like lower('%${query.search}%')`;
    }
    sql += `order by id ASC`;

    sql += ` limit $1 offset $2`;
    // console.log(sql);
    // console.log(values);
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getMetaProducts = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `select count(*) as total_data from products`;

    if (query.search) {
      sql = `select count(product_name) as total_data
              from products
              where lower(product_name) 
              like lower('%${query.search}%')`;
    }

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
      } else prev += `http://localhost:8080/products?limit=${limit}&page=${page - 1}`;
      if (page === totalPage) {
        next = null;
      } else next += `http://localhost:8080/products?limit=${limit}&page=${page + 1}`;

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

const getMetaProductDetail = (path) => {
  return new Promise((resolve, reject) => {
    let sql = `select count(*) as total_data from products where id = $1`;

    db.query(sql, [path.productId], (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      const totalData = result.rows[0].total_data;
      const totalPage = totalData;
      let next = null;
      let prev = null;

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

const getProductsDetails = (path) => {
  return new Promise((resolve, reject) => {
    let sql = `select p.id, p.product_name, p.price, c.category_name from products p
    join category c on p.category_id = c.id
    where p.id = $1`;

    db.query(sql, [path.productId], (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const insertProducts = (data, fileLink) => {
  return new Promise((resolve, reject) => {
    const values = [data.product_name, data.price, data.category_id, fileLink];
    db.query("insert into products (product_name, price, category_id, image) values ($1, $2, $3, $4) RETURNING *", values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const patchProducts = (path, data, fileLink) => {
  return new Promise((resolve, reject) => {
    let sql = `update products set `;
    const values = [path.productId];

    let i = 1;
    for (const [key, value] of Object.entries(data)) {
      sql += `${key} = $${i + 1}, `;
      values.push(value);
      i++;
    }

    if (fileLink) {
      values.push(fileLink);
      sql += `image = $${i + 1}, `;
    }
    // console.log(values, i);
    sql = sql.slice(0, -2);
    sql += ` where id = $1 returning *`;

    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const updateImageProducts = (fileLink, path) => {
  return new Promise((resolve, reject) => {
    const sql = `update products set image = $1 where id = $2 returning *`;

    db.query(sql, [fileLink, path.productId], (err, result) => {
      if (err) return reject(err);
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
  getMetaProducts,
  getMetaProductDetail,
  getProductsDetails,
  insertProducts,
  patchProducts,
  updateImageProducts,
  deleteProducts,
};
