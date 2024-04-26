class StocksController {
  constructor(stocksService) {
    this.stocksService = stocksService;
  }

  getStocks = (_, res) => {
    this.stocksService
      .getStocks()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  addStocks = (req, res) => {
    this.stocksService
      .addStocks(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  updateStocks = (req, res) => {
    this.stocksService
      .updateStocks(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
}

export default StocksController;