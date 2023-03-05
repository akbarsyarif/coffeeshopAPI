// const db = require("../configs/postgre");

const promoModel = require("../models/promo.model");

const getPromo = async (req, res) => {
  try {
    const { query } = req;
    const result = await promoModel.getPromo(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Promo Not Found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const insertPromo = async (req, res) => {
  try {
    const { body } = req;
    const result = await promoModel.insertPromo(body);
    res.status(201).json({
      data: result.rows,
      msg: "New Promo Created",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const patchPromo = async (req, res) => {
  try {
    const { body } = req;
    const result = await promoModel.patchPromo(body);
    res.status(202).json({
      data: result.rows,
      msg: "Promo Discount Sucessfully Changed",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deletePromo = async (req, res) => {
  try {
    const { body } = req;
    const result = await promoModel.deletePromo(body);
    res.status(202).json({
      data: result.rows,
      msg: "Promo code Succesfully Deleted",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getPromo,
  insertPromo,
  patchPromo,
  deletePromo,
};
