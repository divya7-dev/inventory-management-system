class VendorsController {
  constructor(vendorsService) {
    this.vendorsService = vendorsService;
  }

  getVendors = (_, res) => {
    this.vendorsService
      .getVendors()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  addVendors = (req, res) => {
    this.vendorsService
      .addVendors(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  updateVendors = (req, res) => {
    this.vendorsService
      .updateVendors(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  deleteVendors = (req, res) => {
    const { id } = req.params;
    this.vendorsService
      .deleteVendors(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  getVendorsDropdown = (_, res) => {
    this.vendorsService
      .getVendorsDropdown()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
}

export default VendorsController;
