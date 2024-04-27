import {
  getBills,
  addBills,
  updateBills,
  deleteBills,
} from "../../database.js";

class BillsService {
  getBills = async () => {
    try {
      let data = await getBills();

      return {
        status: "success",
        message: "Retrieved the bills list successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching bills:", error);
      throw error;
    }
  };

  addBills = async (customerData) => {
    try {
      await addBills(customerData);

      return {
        status: "success",
        message: "Added the bill successfully",
      };
    } catch (error) {
      console.error("Error adding bills:", error);
      throw error;
    }
  };

  updateBills = async (customerData) => {
    try {
      await updateBills(customerData);

      return {
        status: "success",
        message: "Updated the bill successfully",
      };
    } catch (error) {
      console.error("Error updating bills:", error);
      throw error;
    }
  };

  deleteBills = async (customerId) => {
    try {
      await deleteBills(customerId);

      return {
        status: "success",
        message: "Deleted the bill successfully",
      };
    } catch (error) {
      console.error("Error deleting bills:", error);
      throw error;
    }
  };
}

export default BillsService;
