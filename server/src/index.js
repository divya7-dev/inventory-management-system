import app from "./app.js";
import bodyParser from "body-parser";
import stocksModule from "./components/stocks/stocks.module.js";

app.listen(4000, () => {
  console.log("Server listening...");
});

app.use(bodyParser.json());
app.use("/stocks", stocksModule.router);
