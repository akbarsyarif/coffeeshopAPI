// <es6 require
const express = require("express");
// >es6 import
//  harus tambah "type": "module", di package.json
// import express from "express";

// create express application
const app = express();
const PORT = 8080;

// digunakan untuk koneksi, return server HTTP
app.listen(PORT, () => {
  console.log(`Server is running at port ${[PORT]}`);
  // console.log("welcome");
});

// untuk hot refresh tambahkan script nodemon di package.json
