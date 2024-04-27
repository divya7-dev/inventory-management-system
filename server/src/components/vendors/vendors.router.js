import express from "express";

class VendorsRouter {
  constructor(vendorsController) {
    this.vendorsController = vendorsController;
  }

  getRouter() {
    const router = express.Router();

    router.route("/list").get(this.vendorsController.getVendors);
    router.route("/add").post(this.vendorsController.addVendors);
    router.route("/update").put(this.vendorsController.updateVendors);
    router.route("/delete/:id").delete(this.vendorsController.deleteVendors);

    return router;
  }
}

export default VendorsRouter;
