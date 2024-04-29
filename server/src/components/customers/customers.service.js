import {
  getCustomers,
  addCustomers,
  updateCustomers,
  deleteCustomers,
  getCustomersDropdown,
} from "../../database.js";

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

  deleteCustomers = async (customerId) => {
    try {
      await deleteCustomers(customerId);

      return {
        status: "success",
        message: "Deleted the customer successfully",
      };
    } catch (error) {
      console.error("Error deleting customers:", error);
      throw error;
    }
  };

  getCustomersDropdown = async () => {
    try {
      let data = await getCustomersDropdown();

      return {
        status: "success",
        message: "Retrieved the customers for dropdown successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  };
}

export default CustomersService;
