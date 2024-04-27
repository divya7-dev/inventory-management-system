import express from "express";

class InvoicesRouter {
  constructor(invoicesController) {
    this.invoicesController = invoicesController;
  }

  getRouter() {
    const router = express.Router();

    router.route("/list").get(this.invoicesController.getInvoices);
    router.route("/add").post(this.invoicesController.addInvoices);
    router.route("/update").put(this.invoicesController.updateInvoices);
    router.route("/delete/:id").delete(this.invoicesController.deleteInvoices);

    return router;
  }
}

export default InvoicesRouter;
