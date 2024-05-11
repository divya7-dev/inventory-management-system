import express from "express";

class ReportsRouter {
  constructor(reportsController) {
    this.reportsController = reportsController;
  }

  getRouter() {
    const router = express.Router();

    router.route("/list").get(this.reportsController.getReports);

    return router;
  }
}

export default ReportsRouter;
