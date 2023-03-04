const db = require("../configs/postgre");

const getProducts = async (req, res) => {
  try {
    const result = await db.query("select * from products");
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
};
