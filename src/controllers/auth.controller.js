const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authmodels = require("../models/auth.model");
const { jwtPwd } = require("../configs/environment");

const login = async (req, res) => {
  try {
    const { body } = req;
    const result = await authmodels.userVerification(body);
    // jika valid, buatkan jwt, jika tidak, error handling
    if (result.rows.length < 1)
      return res.status(401).json({
        msg: "Wrong Email or Password",
      });

    const { id, password, profile_picture, role_id } = result.rows[0];
    const isPasswordValid = await bcrypt.compare(body.password, password);
    if (!isPasswordValid)
      return res.status(401).json({
        msg: "Wrong Email or Password",
      });

    const payload = {
      id,
      profile_picture,
      role_id,
    };
    const jwtOptions = {
      expiresIn: "2h",
    };
    //   buat token
    jwt.sign(payload, jwtPwd, jwtOptions, (err, token) => {
      if (err) throw err;
      console.log(payload.role_id);
      res.status(200).json({
        msg: "Log In Success",
        token,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { body } = req;
    // console.log(body.phone_number.length);
    if (body.phone_number.length < 10 || body.phone_number.length > 12)
      return res.status(400).json({
        msg: "input valid Phone Number",
      });

    const result = await authmodels.createNewUser(body);
    res.status(201).json({
      msg: "Create Account Success",
    });

    const newId = result.rows[0].id;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await authmodels.EditPassInDb(newId, hashedPassword);

    // console.log(newId);
    await authmodels.createNewUserProfile(newId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const privateAcess = async (req, res) => {
  const { id, profile_picture, role_id } = req.authInfo;
  res.status(200).json({
    payload: { id, profile_picture, role_id },
    msg: "Success",
  });
};

const editPassword = async (req, res) => {
  // ambil user id
  const { id: userId } = req.authInfo;
  // cek password lama
  const { body } = req;
  try {
    const result = await authmodels.getOldPassword(userId);
    const oldPassword = result.rows[0].password;
    // jika tidak valid = tolak, jika valid = edit
    // if (body.oldPassword !== oldPassword)
    //   return res.status(403).json({
    //     msg: "You Input Wrong Old Password",
    //   });
    const isOldPasswordValid = await bcrypt.compare(body.oldPassword, oldPassword);
    if (!isOldPasswordValid)
      return res.status(403).json({
        msg: "Wrong Old Password",
      });
    const isNewPasswordValid = await bcrypt.compare(body.newPassword, oldPassword);
    // console.log(isNewPasswordValid);
    if (isNewPasswordValid)
      return res.status(403).json({
        msg: "New Password Cannot Be The Same With The Old One",
      });

    // enkripsi password baru
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await authmodels.EditPassInDb(userId, hashedPassword);
    res.status(202).json({
      msg: "Edit Password Success",
      // token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

// const forgotPassword = async (req, res) => {

// }

module.exports = {
  login,
  register,
  privateAcess,
  editPassword,
};
