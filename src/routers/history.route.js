const { Router } = require("express");

const historyController = require("../controllers/history.controller");

const historyRouter = Router();

historyRouter.get("/", historyController.getHistory);
historyRouter.post("/", historyController.insertHistory);
historyRouter.patch("/", historyController.patchHistory);
// productsRouter.post("/", productsController.insertProducts);
// productsRouter.patch("/", productsController.patchProducts);
// productsRouter.delete("/", productsController.deleteProducts);

module.exports = historyRouter;
