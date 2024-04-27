import InvoicesController from "./invoices.controller.js";
import InvoicesService from "./invoices.service.js";
import InvoicesRouter from "./invoices.router.js";

const invoicesService = new InvoicesService();
const invoicesController = new InvoicesController(invoicesService);
const invoicesRouter = new InvoicesRouter(invoicesController);

export default {
  service: invoicesService,
  controller: invoicesController,
  router: invoicesRouter.getRouter(),
};
