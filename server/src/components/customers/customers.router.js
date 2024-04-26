import express from "express";

class CustomersRouter {
  constructor(customersController) {
    this.customersController = customersController;
  }

  getRouter() {
    const router = express.Router();

    router.route("/list").get(this.customersController.getCustomers);
    router.route("/add").post(this.customersController.addCustomers);
    router.route("/update").put(this.customersController.updateCustomers);

    return router;
  }
}

export default CustomersRouter;
