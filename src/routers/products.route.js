const { Router } = require("express");

const productsController = require("../controllers/products.controllers");

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);

module.exports = productsRouter;
