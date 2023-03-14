module.exports = {
  uName: process.env.DB_UNAME,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  dataBase: process.env.DB_PG,
  dbPort: process.env.DB_PORT,
  serverPort: process.env.SERVER_PORT,
  jwtPwd: process.env.JWT_KEY,
  adminCheck: process.env.ADMIN_KEY,
};
