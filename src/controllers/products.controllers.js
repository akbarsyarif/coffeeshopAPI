// const db = require("../configs/postgre");

const productsModel = require("../models/products.model");

const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productsModel.getProducts(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product Not Found",
      });
      return;
    }
    const meta = await productsModel.getMetaProducts(query);
    res.status(200).json({
      data: result.rows,
      meta,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getProductsDetails = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.getProductsDetails(params);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Promo Not Found",
      });
      return;
    }
    const meta = await productsModel.getMetaProductDetail(params);
    res.status(200).json({
      data: result.rows,
      meta,
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
    const fileLink = `/images/${req.file.filename}`;
    const result = await productsModel.insertProducts(body, fileLink);
    res.status(201).json({
      data: result.rows,
      msg: "New Product Created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const patchProducts = async (req, res) => {
  try {
    const { params, body } = req;
    let fileLink = ``;
    if (req.file) {
      fileLink += `/images/${req.file.filename}`;
    }

    console.log(req.file);
    const result = await productsModel.patchProducts(params, body, fileLink);

    res.status(202).json({
      data: result.rows,
      msg: "Product updated",
    });
  } catch (err) {
    console.log(err);
    // console.log(req.file);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const patchImageProducts = async (req, res) => {
  const { params } = req;
  const fileLink = `/images/${req.file.filename}`;
  try {
    const result = await productsModel.updateImageProducts(fileLink, params);
    // console.log(req.file);
    res.status(200).json({
      data: result.rows,
      msg: "Update Image Succes",
    });
  } catch (err) {
    console.log(err);
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
  getProductsDetails,
  insertProducts,
  patchProducts,
  patchImageProducts,
  deleteProducts,
};
