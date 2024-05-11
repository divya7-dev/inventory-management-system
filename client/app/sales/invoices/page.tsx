"use client";
import { useEffect, useState } from "react";

// Components
import Layout from "@/app/components/common/Layout";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";

// Data
import fieldsData from "../../../data/modal.json";
import { ObjectData } from "../../components/helper/types";
import {
  getAPI,
  postAPI,
  putAPI,
  deleteAPI,
} from "../../components/helper/api";
import {
  BASE_URL,
  INVOICES_ADD,
  INVOICES_LIST,
  INVOICES_UPDATE,
  INVOICES_DELETE,
  CUSTOMERS_LIST_DROPDOWN,
  STOCKS_LIST_DROPDOWN,
} from "../../components/helper/urls";
import {
  addActionToData,
  updateDateFormat,
} from "../../components/helper/utils";

const Invoices = () => {
  const [show, setShow] = useState<boolean>(false);
  const [fields, setFields] = useState<ObjectData>({});
  const [submitData, setSubmitData] = useState<ObjectData>({});
  const [isEdit, setEdit] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<ObjectData>({
    width: ["50px", "100px", "100px", "150px", "100px", "100px", "80px"],
    headers: [
      "S. No",
      "Date",
      "Invoice Number",
      "Customer Name",
      "Item Name",
      "Items Count",
      "Sales Price",
      "Actions",
    ],
    data: [],
  });
  const [invoicesDropdown, setInvoicesDropdown] = useState<ObjectData>({});
  const [customersDropdown, setCustomersDropdown] = useState<ObjectData>({});
  const [stocksDropdown, setStocksDropdown] = useState<ObjectData>({});

  useEffect(() => {
    refreshPage();
    setFields(fieldsData.invoices);
  }, []);

  useEffect(() => {
    mergeDropDownData();
  }, [customersDropdown, stocksDropdown]);

  const getInvoices = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: INVOICES_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          const dateFormated = updateDateFormat(response.data.data);
          const dataWithAction = addActionToData(dateFormated);
          setInvoices({ ...invoices, data: dataWithAction });
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
          const stocksDropDownWithKey: ObjectData = {
            item_id: response.data.data,
          };
          setStocksDropdown(stocksDropDownWithKey);
        } else {
          console.log("error");
        }
      },
    });
  };

  const getCustomersDropdown = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: CUSTOMERS_LIST_DROPDOWN,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          const customersDropDownWithKey: ObjectData = {
            customer_id: response.data.data,
          };
          setCustomersDropdown(customersDropDownWithKey);
        } else {
          console.log("error");
        }
      },
    });
  };

  const getInvoicesDropdown = () => {
    getStocksDropdown();
    getCustomersDropdown();
  };

  const mergeDropDownData = () => {
    const dropDownOptions: ObjectData = {
      ...stocksDropdown,
      ...customersDropdown,
    };
    setInvoicesDropdown(dropDownOptions);
    console.log("invoice dropDownOptions: ", dropDownOptions);
  };

  const postInvoices = (data: ObjectData) => {
    postAPI({
      baseUrl: BASE_URL,
      endpoint: INVOICES_ADD,
      params: {},
      data: data,
      callback: (response) => {
        if (response.status == 200) {
          getInvoices();
          getInvoicesDropdown();
        } else {
          console.log("error");
        }
      },
    });
  };

  const putInvoices = (data: ObjectData) => {
    putAPI({
      baseUrl: BASE_URL,
      endpoint: INVOICES_UPDATE,
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

  const deleteInvoices = (id: number) => {
    deleteAPI({
      baseUrl: BASE_URL,
      endpoint: `${INVOICES_DELETE}/${id}`,
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
      putInvoices(data);
    } else {
      postInvoices(data);
    }
  };

  const handleEdit = (data: ObjectData) => {
    setEdit(true);
    setShow(true);
    setSubmitData(data);
  };

  const handleDelete = (id: number) => {
    deleteInvoices(id);
  };

  const refreshPage = () => {
    getInvoices();
    getInvoicesDropdown();
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="text-[#050505] text-[20px] font-['Figtree-Bold']">
          Invoices
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
            Add Invoice
          </button>
          {((isEdit && Object.keys(submitData)?.length > 0) || !isEdit) && (
            <Modal
              header={isEdit ? "Edit Invoice" : "Add Invoice"}
              show={show}
              setShow={setShow}
              fields={fields}
              onClose={handleClose}
              options={invoicesDropdown}
              submitData={submitData}
              setSubmitData={setSubmitData}
            />
          )}
          <Table
            tableData={invoices}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;
