class InvoicesController {
  constructor(invoicesService) {
    this.invoicesService = invoicesService;
  }

  getInvoices = (_, res) => {
    this.invoicesService
      .getInvoices()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  addInvoices = (req, res) => {
    this.invoicesService
      .addInvoices(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  updateInvoices = (req, res) => {
    this.invoicesService
      .updateInvoices(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  deleteInvoices = (req, res) => {
    const { id } = req.params;
    this.invoicesService
      .deleteInvoices(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
}

export default InvoicesController;
