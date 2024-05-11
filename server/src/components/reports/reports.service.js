import { getReports } from "../../database.js";

class ReportsService {
  getReports = async () => {
    try {
      let data = await getReports();

      return {
        status: "success",
        message: "Retrieved the reports list successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  };
}

export default ReportsService;
