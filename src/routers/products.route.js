const { Router } = require("express");

const productsController = require("../controllers/products.controllers");

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.post("/", productsController.insertProducts);
productsRouter.patch("/", productsController.patchProducts);
productsRouter.delete("/", productsController.deleteProducts);

module.exports = productsRouter;
