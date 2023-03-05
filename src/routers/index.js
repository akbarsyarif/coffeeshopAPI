const { Router } = require("express");

const welcomeRouter = require("./welcome.router");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const promoRouter = require("./promo.route");

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/promo", promoRouter);

module.exports = masterRouter;
