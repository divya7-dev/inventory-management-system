"use client";
import { useState } from "react";

// Components
import Layout from "../components/common/Layout";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";

// Data
import tableData from "../../data/table.json";
import fields from "../../data/modal.json";

const Stocks = () => {
  const [show, setShow] = useState<boolean>(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Layout>
      <div>Stocks</div>
      <Table tableData={tableData?.stocks} />
      <Modal show={show} fields={fields} handleClose={handleClose} />
    </Layout>
  );
};

export default Stocks;
