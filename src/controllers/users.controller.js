// const db = require("../configs/postgre");

const usersModels = require("../models/users.model");

// untuk akses DB
// path
// URL = PROTOCOL://HOST:PORT/ENDPOINT
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi
// handler callback unntuk menangani ketika request diterima
const getUsers = usersModels.getUsers;

const getuserDetails = async (req, res) => {
  try {
    const { params } = req;
    const result = await usersModels.getUserDetails(params);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "user Not Found",
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

const insertUsers = usersModels.insertUsers;

const patchUsers = usersModels.patchUsers;

const deleteUsers = usersModels.deleteUsers;

module.exports = {
  getUsers,
  getuserDetails,
  insertUsers,
  patchUsers,
  deleteUsers,
};
