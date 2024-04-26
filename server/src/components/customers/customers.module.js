import CustomersController from "./customers.controller.js";
import CustomersService from "./customers.service.js";
import CustomersRouter from "./customers.router.js";

const customersService = new CustomersService();
const customersController = new CustomersController(customersService);
const customersRouter = new CustomersRouter(customersController);

export default {
  service: customersService,
  controller: customersController,
  router: customersRouter.getRouter(),
};
