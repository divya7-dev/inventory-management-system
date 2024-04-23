import express from 'express';

class StocksRouter {
  constructor(stocksController) {
    this.stocksController = stocksController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/list').get(this.stocksController.getStocks);
    return router;
  }
}

export default StocksRouter;
