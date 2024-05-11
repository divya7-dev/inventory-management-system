class ReportsController {
  constructor(reportsService) {
    this.reportsService = reportsService;
  }

  getReports = (_, res) => {
    this.reportsService
      .getReports()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
}

export default ReportsController;
