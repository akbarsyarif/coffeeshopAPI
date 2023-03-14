const { Router } = require("express");

const welcomeRouter = require("./welcome.router");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const promoRouter = require("./promo.route");
const historyRouter = require("./history.route");
const authRouter = require("./auth.route");

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/promo", promoRouter);
masterRouter.use("/history", historyRouter);
masterRouter.use("/auth", authRouter);

module.exports = masterRouter;
