class BillsController {
  constructor(billsService) {
    this.billsService = billsService;
  }

  getBills = (_, res) => {
    this.billsService
      .getBills()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  addBills = (req, res) => {
    this.billsService
      .addBills(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  updateBills = (req, res) => {
    this.billsService
      .updateBills(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  deleteBills = (req, res) => {
    const { id } = req.params;
    this.billsService
      .deleteBills(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
}

export default BillsController;
