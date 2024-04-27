import express from "express";

class BillsRouter {
  constructor(billsController) {
    this.billsController = billsController;
  }

  getRouter() {
    const router = express.Router();

    router.route("/list").get(this.billsController.getBills);
    router.route("/add").post(this.billsController.addBills);
    router.route("/update").put(this.billsController.updateBills);
    router.route("/delete/:id").delete(this.billsController.deleteBills);

    return router;
  }
}

export default BillsRouter;
