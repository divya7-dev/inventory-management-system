import StocksController from './stocks.controller.js';
import StocksService from './stocks.service.js';
import StocksRouter from './stocks.router.js';

const stocksService = new StocksService();
const stocksController = new StocksController(stocksService);
const stocksRouter = new StocksRouter(stocksController);

export default {
  service: stocksService,
  controller: stocksController,
  router: stocksRouter.getRouter(),
};