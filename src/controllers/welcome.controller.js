const welcomePage = (req, res) => {
  res.status(200).json({
    msg: `Selamat Datang di Coffee Shop`,
  });
};

module.exports = {
  welcomePage,
};
