const historyModel = require("../models/history.model");

const getHistory = async (req, res) => {
  const { query } = req;
  try {
    const result = await historyModel.getHistory(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: `Data Not Found, Make Sure Put The Right Email`,
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

const insertHistory = async (req, res) => {
  const { body } = req;
  try {
    const result = await historyModel.insertHistory(body);
    res.status(201).json({
      data: result.rows,
      msg: "New History Created",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const patchHistory = async (req, res) => {
  const { body } = req;
  try {
    const result = await historyModel.patchHistory(body);
    res.status(202).json({
      data: result.rows,
      msg: `History id No.${body.id} Changed Successfully`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteHistory = async (req, res) => {
  const { body } = req;
  try {
    const result = await historyModel.deleteHistory(body);
    res.status(202).json({
      data: result.rows,
      msg: `History id No.${body.id} deleted Successfully`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getHistory,
  insertHistory,
  patchHistory,
  deleteHistory,
};
