import {
  getVendors,
  addVendors,
  updateVendors,
  deleteVendors,
  getVendorsDropdown
} from "../../database.js";

class VendorsService {
  getVendors = async () => {
    try {
      let data = await getVendors();

      return {
        status: "success",
        message: "Retrieved the vendors list successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching vendors:", error);
      throw error;
    }
  };

  addVendors = async (customerData) => {
    try {
      await addVendors(customerData);

      return {
        status: "success",
        message: "Added the vendor successfully",
      };
    } catch (error) {
      console.error("Error adding vendors:", error);
      throw error;
    }
  };

  updateVendors = async (customerData) => {
    try {
      await updateVendors(customerData);

      return {
        status: "success",
        message: "Updated the vendor successfully",
      };
    } catch (error) {
      console.error("Error updating vendors:", error);
      throw error;
    }
  };

  deleteVendors = async (customerId) => {
    try {
      await deleteVendors(customerId);

      return {
        status: "success",
        message: "Deleted the vendor successfully",
      };
    } catch (error) {
      console.error("Error deleting vendors:", error);
      throw error;
    }
  };

  getVendorsDropdown = async () => {
    try {
      let data = await getVendorsDropdown();

      return {
        status: "success",
        message: "Retrieved the vendors for dropdown successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching vendors:", error);
      throw error;
    }
  };
}

export default VendorsService;
