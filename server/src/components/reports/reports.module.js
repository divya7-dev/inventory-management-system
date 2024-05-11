import ReportsController from "./reports.controller.js";
import ReportsService from "./reports.service.js";
import ReportsRouter from "./reports.router.js";

const reportsService = new ReportsService();
const reportsController = new ReportsController(reportsService);
const reportsRouter = new ReportsRouter(reportsController);

export default {
  service: reportsService,
  controller: reportsController,
  router: reportsRouter.getRouter(),
};
