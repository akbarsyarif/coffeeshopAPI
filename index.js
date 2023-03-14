require("dotenv").config();
// <es6 require
const express = require("express");
const cors = require("cors");
// >es6 import
//  harus tambah "type": "module", di package.json
// import express from "express";

// create express application
const app = express();

const { serverPort } = require("./src/configs/environment");
const PORT = serverPort || 8080;

app.use(cors({}));

// parser body
app.use(express.urlencoded({ extended: false })); //form-urlencoded
app.use(express.json()); //raw json

const morgan = require("morgan");
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(express.static("public"));

const masterRouter = require("./src/routers");
app.use(masterRouter);

// digunakan untuk koneksi, return server HTTP
app.listen(PORT, () => {
  console.log(`Server is running at port ${[PORT]}`);
  // console.log("welcome");
});

// untuk hot refresh tambahkan script : nodemon "namafile" di package.json
