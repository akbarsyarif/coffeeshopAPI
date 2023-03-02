// <es6 require
const express = require("express");
// >es6 import
//  harus tambah "type": "module", di package.json
// import express from "express";

// create express application
const app = express();
const PORT = 8080;

// untuk akses DB
// path
// URL = PROTOCOL://HOST:PORT/ENDPOINT
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi
// handler callback unntuk menangani ketika request diterima
app.get("/", (req, res) => {
  // res.json({
  //   msg: `Selamat Datang di Coffee Shop`,
  // });
  res.status(200).send(`Welcome`);
});

// digunakan untuk koneksi, return server HTTP
app.listen(PORT, () => {
  console.log(`Server is running at port ${[PORT]}`);
  // console.log("welcome");
});

// untuk hot refresh tambahkan script : nodemon "namafile" di package.json
