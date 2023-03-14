const { Router } = require("express");

const productsController = require("../controllers/products.controllers");
const authMiddleware = require("../middlewares/auth.middle");
const { singleUpload } = require("../middlewares/diskUpload");

const productsRouter = Router();

productsRouter.get("/", authMiddleware.checkToken, productsController.getProducts);
productsRouter.get("/:productId", authMiddleware.checkToken, productsController.getProductsDetails);
productsRouter.post("/", authMiddleware.checkToken, authMiddleware.checkRole, singleUpload("productImage"), productsController.insertProducts);
productsRouter.patch("/:productId", authMiddleware.checkToken, authMiddleware.checkRole, singleUpload("productImage"), productsController.patchProducts);
productsRouter.patch("/images/:productId", authMiddleware.checkToken, authMiddleware.checkRole, singleUpload("productImage"), productsController.patchImageProducts);
productsRouter.delete("/", authMiddleware.checkToken, authMiddleware.checkRole, productsController.deleteProducts);

module.exports = productsRouter;
// tambah product dan user detail
