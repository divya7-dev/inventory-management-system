import BillsController from "./bills.controller.js";
import BillsService from "./bills.service.js";
import BillsRouter from "./bills.router.js";

const billsService = new BillsService();
const billsController = new BillsController(billsService);
const billsRouter = new BillsRouter(billsController);

export default {
  service: billsService,
  controller: billsController,
  router: billsRouter.getRouter(),
};
