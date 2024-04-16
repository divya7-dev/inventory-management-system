// Components
import Layout from "../components/common/Layout";
import Table from "../components/common/Table";

// Data
import tableData from "../../data/table.json";

const Stocks = () => {
  return (
    <Layout>
      <div>Stocks</div>
      <Table tableData={tableData?.stocks} />
    </Layout>
  );
};

export default Stocks;
