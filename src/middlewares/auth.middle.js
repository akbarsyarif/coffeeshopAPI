const jwt = require("jsonwebtoken");
const { jwtPwd } = require("../configs/environment");
const { adminCheck } = require("../configs/environment");

const checkToken = (req, res, next) => {
  // ambil token dr header
  const bearerToken = req.header("authorization");

  if (!bearerToken)
    return res.status(401).json({
      msg: "You Need To Login First",
    });

  const token = bearerToken.split(" ")[1];
  // verif token
  jwt.verify(token, jwtPwd, (err, payload) => {
    // jika valid, lanjut ke controller, jika tidak, tolak akses
    if (err && err.name)
      return res.status(403).json({
        msg: err.message,
      });
    if (err)
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    //   attach payload ke object request
    req.authInfo = payload;

    next();
  });
};

const checkRole = (req, res, next) => {
  const { role_id } = req.authInfo;
  // console.log(role_id, adminCheck);
  if (role_id !== parseInt(adminCheck))
    return res.status(403).json({
      msg: "Only Admins Can Enter",
    });

  next();
};

module.exports = {
  checkToken,
  checkRole,
};

// const privateAcess = async (req, res) => {
//   const { id, profile_picture, role_id } = req.authInfo;
//   res.status(200).json({
//     payload: { id, profile_picture, role_id },
//     msg: "Success",
//   });
// };
