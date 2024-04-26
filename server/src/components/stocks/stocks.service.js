import { getStocks } from "../../database.js";

class StockService {
  getStocks = async () => {
    try {
      let data = await getStocks();

      return {
        status: "success",
        message: "Retrieved the stocks list successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching stocks:", error);
      throw error;
    }
  };
}

export default StockService;
