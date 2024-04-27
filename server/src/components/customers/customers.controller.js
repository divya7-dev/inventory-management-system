class CustomersController {
  constructor(customersService) {
    this.customersService = customersService;
  }

  getCustomers = (_, res) => {
    this.customersService
      .getCustomers()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  addCustomers = (req, res) => {
    this.customersService
      .addCustomers(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  updateCustomers = (req, res) => {
    this.customersService
      .updateCustomers(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  deleteCustomers = (req, res) => {
    const { id } = req.params;
    this.customersService
      .deleteCustomers(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
}

export default CustomersController;
