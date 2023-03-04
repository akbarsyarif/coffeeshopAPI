const db = require("../configs/postgre");

// untuk akses DB
// path
// URL = PROTOCOL://HOST:PORT/ENDPOINT
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi
// handler callback unntuk menangani ketika request diterima
const getUsers = (req, res) => {
  db.query("select id, email, phone_number, role_id from users", (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        msg: "Internal Server Error",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  });
};

module.exports = {
  getUsers,
};
