import {
  getInvoices,
  addInvoices,
  updateInvoices,
  deleteInvoices,
} from "../../database.js";

class InvoicesService {
  getInvoices = async () => {
    try {
      let data = await getInvoices();

      return {
        status: "success",
        message: "Retrieved the invoices list successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  };

  addInvoices = async (customerData) => {
    try {
      await addInvoices(customerData);

      return {
        status: "success",
        message: "Added the invoice successfully",
      };
    } catch (error) {
      console.error("Error adding invoices:", error);
      throw error;
    }
  };

  updateInvoices = async (customerData) => {
    try {
      await updateInvoices(customerData);

      return {
        status: "success",
        message: "Updated the invoice successfully",
      };
    } catch (error) {
      console.error("Error updating invoices:", error);
      throw error;
    }
  };

  deleteInvoices = async (customerId) => {
    try {
      await deleteInvoices(customerId);

      return {
        status: "success",
        message: "Deleted the invoice successfully",
      };
    } catch (error) {
      console.error("Error deleting invoices:", error);
      throw error;
    }
  };
}

export default InvoicesService;
