const db = require("../configs/postgre");

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

const insertUsers = usersModels.insertUsers;

const patchUsers = usersModels.patchUsers;

const deleteUsers = usersModels.deleteUsers;

module.exports = {
  getUsers,
  insertUsers,
  patchUsers,
  deleteUsers,
};
