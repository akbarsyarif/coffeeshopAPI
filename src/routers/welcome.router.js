const { Router } = require("express");

const welcomeController = require("../controllers/welcome.controller");

const welcomeRouter = Router();

welcomeRouter.get("/", welcomeController.welcomePage);

module.exports = welcomeRouter;
