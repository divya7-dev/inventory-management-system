import VendorsController from "./vendors.controller.js";
import VendorsService from "./vendors.service.js";
import VendorsRouter from "./vendors.router.js";

const vendorsService = new VendorsService();
const vendorsController = new VendorsController(vendorsService);
const vendorsRouter = new VendorsRouter(vendorsController);

export default {
  service: vendorsService,
  controller: vendorsController,
  router: vendorsRouter.getRouter(),
};
