const { Router } = require("express");

const promoController = require("../controllers/promo.controller");

const promoRouter = Router();

promoRouter.get("/", promoController.getPromo);
promoRouter.post("/", promoController.insertPromo);
promoRouter.patch("/", promoController.patchPromo);
promoRouter.delete("/", promoController.deletePromo);

// productsRouter.patch("/", productsController.patchProducts);
// productsRouter.delete("/", productsController.deleteProducts);

module.exports = promoRouter;
