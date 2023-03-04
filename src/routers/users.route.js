const { Router } = require("express");

const usersController = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.insertUsers);
usersRouter.patch("/", usersController.patchUsers);
usersRouter.delete("/", usersController.deleteUsers);

module.exports = usersRouter;
