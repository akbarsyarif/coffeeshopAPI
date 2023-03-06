const { Router } = require("express");

const historyController = require("../controllers/history.controller");

const historyRouter = Router();

historyRouter.get("/", historyController.getHistory);
historyRouter.post("/", historyController.insertHistory);
historyRouter.patch("/", historyController.patchHistory);
historyRouter.delete("/", historyController.deleteHistory);

module.exports = historyRouter;
