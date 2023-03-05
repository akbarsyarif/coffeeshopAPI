// const db = require("../configs/postgre");

const productsModel = require("../models/products.model");

const getProducts = async (req, res) => {
  try {
    const result = await productsModel.getProducts();
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const insertProducts = async (req, res) => {
  try {
    const { body } = req;
    const result = await productsModel.insertProducts(body);
    res.status(201).json({
      data: result.rows,
      msg: "New Product Created",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const patchProducts = async (req, res) => {
  try {
    const { body } = req;
    const result = await productsModel.patchProducts(body);
    res.status(202).json({
      data: result.rows,
      msg: "Product updated",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { body } = req;
    const result = await productsModel.deleteProducts(body);
    if (result.rows.length === 0) {
      res.status(400).json({
        msg: "Make Sure You Type The Exact Name",
      });
    } else
      res.status(202).json({
        data: result.rows,
        msg: "Product deleted",
      });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
  insertProducts,
  patchProducts,
  deleteProducts,
};
