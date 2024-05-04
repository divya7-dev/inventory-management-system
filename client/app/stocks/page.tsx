"use client";
import { useEffect, useState } from "react";

// Components
import Layout from "../components/common/Layout";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";

// Data
import fields from "../../data/modal.json";
import { ObjectData } from "../components/helper/types";
import { getAPI, postAPI } from "../components/helper/api";
import {
  BASE_URL,
  STOCKS_ADD,
  STOCKS_LIST,
  STOCKS_LIST_DROPDOWN,
} from "../components/helper/urls";

const Stocks = () => {
  const [show, setShow] = useState<boolean>(false);
  const [stocks, setStocks] = useState<ObjectData>({
    width: ["80px", "150px", "100px", "100px", "100px", "100px", "80px"],
    headers: [
      "S. No",
      "Item Name",
      "SKU (Part Number)",
      "Opening Stocks",
      "Stocks On Hand",
      "Price",
      "Actions"
    ],
    data: [],
  });
  const [stocksDropdown, setStocksDropdown] = useState<ObjectData[]>([]);

  useEffect(() => {
    getStocks();
    getStocksDropdown();
  }, []);

  const getStocks = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: STOCKS_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          let dataWithAction = addActionToData(response.data.data)
          setStocks({ ...stocks, data: dataWithAction });
        } else {
          console.log("error");
        }
      },
    });
  };

  const addActionToData = (data: ObjectData) => {
    const newData = data.map((item: any) => ({
      ...item,
      Actions: ""
    }));
    return newData
  }

  const getStocksDropdown = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: STOCKS_LIST_DROPDOWN,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          setStocksDropdown(response.data.data);
        } else {
          console.log("error");
        }
      },
    });
  };

  const postStocks = (data: ObjectData) => {
    postAPI({
      baseUrl: BASE_URL,
      endpoint: STOCKS_ADD,
      params: {},
      data: data,
      callback: (response) => {
        if (response.status == 200) {
          getStocks();
          getStocksDropdown();
        } else {
          console.log("error");
        }
      },
    });
  };

  const handleClose = (data: ObjectData) => {
    setShow(false);
    postStocks(data);
    console.log("[ADD] ", data);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="text-[#050505] text-[20px] font-['Figtree-Bold']">
          Stocks
        </div>
        <div className="mt-10">
          <button
            className="float-right bg-[#80B537] text-center text-[#ffffff] text-[14px] text-[050505] font-['Figtree-Regular'] 
            py-1.5 px-2 rounded-sm mb-4"
            onClick={() => setShow(true)}
          >
            Add Item
          </button>
          <Modal
            show={show}
            setShow={setShow}
            fields={fields}
            onClose={handleClose}
            options={stocksDropdown}
          />
          <Table tableData={stocks} />
        </div>
      </div>
    </Layout>
  );
};

export default Stocks;
