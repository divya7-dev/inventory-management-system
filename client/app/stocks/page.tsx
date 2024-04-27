"use client";
import { useEffect, useState } from "react";

// Components
import Layout from "../components/common/Layout";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";

// Data
import fields from "../../data/modal.json";
import { ObjectData } from "../components/helper/types";
import { getAPI } from "../components/helper/api";
import { BASE_URL, STOCKS_LIST } from "../components/helper/urls";

const Stocks = () => {
  const [show, setShow] = useState<boolean>(true);
  const [stocks, setStocks] = useState<ObjectData>({
    width: ["80px", "150px", "100px", "100px", "100px", "100px"],
    headers: [
      "S. No",
      "Item Name",
      "SKU (Part Number)",
      "Opening Stocks",
      "Stocks On Hand",
      "Price",
    ],
    data: [],
  });

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: STOCKS_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          setStocks({ ...stocks, data: response.data.data });
        } else {
          console.log("error");
        }
      },
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Layout>
      <div>Stocks</div>
      <Table tableData={stocks} />
      <Modal show={show} fields={fields} handleClose={handleClose} />
    </Layout>
  );
};

export default Stocks;
