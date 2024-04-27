import express from "express";

class StocksRouter {
  constructor(stocksController) {
    this.stocksController = stocksController;
  }

  getRouter() {
    const router = express.Router();

    router.route("/list").get(this.stocksController.getStocks);
    router.route("/add").post(this.stocksController.addStocks);
    router.route("/update").put(this.stocksController.updateStocks);
    router.route("/delete/:id").delete(this.stocksController.deleteStocks);

    return router;
  }
}

export default StocksRouter;
