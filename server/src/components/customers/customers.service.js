import { getCustomers, addCustomers, updateCustomers } from "../../database.js";

class CustomersService {
  getCustomers = async () => {
    try {
      let data = await getCustomers();

      return {
        status: "success",
        message: "Retrieved the customers list successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  };

  addCustomers = async (customerData) => {
    try {
      await addCustomers(customerData);

      return {
        status: "success",
        message: "Added the customer successfully",
      };
    } catch (error) {
      console.error("Error adding customers:", error);
      throw error;
    }
  };

  updateCustomers = async (customerData) => {
    try {
      await updateCustomers(customerData);

      return {
        status: "success",
        message: "Updated the customer successfully",
      };
    } catch (error) {
      console.error("Error updating customers:", error);
      throw error;
    }
  };
}

export default CustomersService;
