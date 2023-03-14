const { Router } = require("express");

const authMiddleware = require("../middlewares/auth.middle");
const usersController = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("/", authMiddleware.checkToken, authMiddleware.checkRole, usersController.getUsers);
usersRouter.get("/:userId", authMiddleware.checkToken, usersController.getuserDetails);
usersRouter.post("/", authMiddleware.checkToken, authMiddleware.checkRole, usersController.insertUsers);
usersRouter.patch("/", authMiddleware.checkToken, authMiddleware.checkRole, usersController.patchUsers);
usersRouter.delete("/", authMiddleware.checkToken, authMiddleware.checkRole, usersController.deleteUsers);

module.exports = usersRouter;
