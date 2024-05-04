"use client";
import { useEffect, useState } from "react";

// Components
import Layout from "../components/common/Layout";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";

// Data
import fieldsData from "../../data/modal.json";
import { ObjectData } from "../components/helper/types";
import { getAPI, postAPI, putAPI, deleteAPI } from "../components/helper/api";
import {
  BASE_URL,
  STOCKS_ADD,
  STOCKS_LIST,
  STOCKS_LIST_DROPDOWN,
  STOCKS_UPDATE,
  STOCKS_DELETE,
} from "../components/helper/urls";
import { addActionToData } from "../components/helper/utils";

const Stocks = () => {
  const [show, setShow] = useState<boolean>(false);
  const [fields, setFields] = useState<ObjectData>({});
  const [submitData, setSubmitData] = useState<ObjectData>({});
  const [isEdit, setEdit] = useState<boolean>(false);
  const [stocks, setStocks] = useState<ObjectData>({
    width: ["80px", "150px", "100px", "100px", "100px", "100px", "80px"],
    headers: [
      "S. No",
      "Item Name",
      "SKU (Part Number)",
      "Opening Stocks",
      "Stocks On Hand",
      "Price",
      "Actions",
    ],
    data: [],
  });
  const [stocksDropdown, setStocksDropdown] = useState<ObjectData[]>([]);

  useEffect(() => {
    refreshPage();
    setFields(fieldsData.stocks);
  }, []);

  const getStocks = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: STOCKS_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          const dataWithAction = addActionToData(response.data.data);
          setStocks({ ...stocks, data: dataWithAction });
        } else {
          console.log("error");
        }
      },
    });
  };

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

  const putStocks = (data: ObjectData) => {
    putAPI({
      baseUrl: BASE_URL,
      endpoint: STOCKS_UPDATE,
      params: {},
      data: data,
      callback: (response) => {
        if (response.status == 200) {
          refreshPage();
        } else {
          console.log("error");
        }
      },
    });
  };

  const deleteStocks = (id: number) => {
    deleteAPI({
      baseUrl: BASE_URL,
      endpoint: `${STOCKS_DELETE}/${id}`,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          refreshPage();
        } else {
          console.log("error");
        }
      },
    });
  };

  const handleClose = (data: ObjectData) => {
    setShow(false);

    if (isEdit) {
      setEdit(false);
      putStocks(data);
    } else {
      postStocks(data);
    }
  };

  const handleEdit = (data: ObjectData) => {
    setEdit(true);
    setShow(true);
    setSubmitData(data);
  };

  const handleDelete = (id: number) => {
    deleteStocks(id);
  };

  const refreshPage = () => {
    getStocks();
    getStocksDropdown();
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
            onClick={() => {
              setShow(true);
              setEdit(false);
              setSubmitData({});
            }}
          >
            Add Stock
          </button>
          {((isEdit && Object.keys(submitData)?.length > 0) || !isEdit) && (
            <Modal
              header={isEdit ? "Edit Stock" : "Add Stock"}
              show={show}
              setShow={setShow}
              fields={fields}
              onClose={handleClose}
              options={stocksDropdown}
              submitData={submitData}
              setSubmitData={setSubmitData}
            />
          )}
          <Table
            tableData={stocks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Stocks;
