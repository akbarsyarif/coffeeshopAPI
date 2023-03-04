const { Router } = require("express");
const welcomeRouter = require("./welcome.router");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);

module.exports = masterRouter;
