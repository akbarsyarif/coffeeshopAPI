const { Router } = require("express");

const promoController = require("../controllers/promo.controller");
const authMiddleware = require("../middlewares/auth.middle");

const promoRouter = Router();

promoRouter.get("/", authMiddleware.checkToken, promoController.getPromo);
promoRouter.post("/", authMiddleware.checkToken, authMiddleware.checkRole, promoController.insertPromo);
promoRouter.patch("/", authMiddleware.checkToken, authMiddleware.checkRole, promoController.patchPromo);
promoRouter.delete("/", authMiddleware.checkToken, authMiddleware.checkRole, promoController.deletePromo);

// productsRouter.patch("/", productsController.patchProducts);
// productsRouter.delete("/", productsController.deleteProducts);

module.exports = promoRouter;
