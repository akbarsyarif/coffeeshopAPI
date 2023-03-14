const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middle");

const authRouter = Router();

// login = post request
authRouter.post("/", authController.login);
authRouter.post("/register", authController.register);
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);

authRouter.get("/private", authMiddleware.checkToken, authMiddleware.checkRole, authController.privateAcess);

module.exports = authRouter;
