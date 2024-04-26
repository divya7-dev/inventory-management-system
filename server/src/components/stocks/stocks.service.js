import { getStocks, addStocks } from "../../database.js";

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

  addStocks = async (stockData) => {
    try {
      await addStocks(stockData);

      return {
        status: "success",
        message: "Added the stock successfully",
      };
    } catch (error) {
      console.error("Error adding stocks:", error);
      throw error;
    }
  };
}

export default StockService;
