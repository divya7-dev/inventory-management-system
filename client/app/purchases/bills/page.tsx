"use client";
import { useEffect, useState } from "react";

// Components
import Layout from "@/app/components/common/Layout";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";

// Data
import fieldsData from "../../../data/modal.json";
import { ObjectData } from "../../components/helper/types";
import { getAPI, postAPI, putAPI, deleteAPI } from "../../components/helper/api";
import {
  BASE_URL,
  BILLS_ADD,
  BILLS_LIST,
  BILLS_UPDATE,
  BILLS_DELETE,
  VENDORS_LIST_DROPDOWN,
  STOCKS_LIST_DROPDOWN
} from "../../components/helper/urls";
import { addActionToData, updateDateFormat, updateKey } from "../../components/helper/utils";

const Bills = () => {
  const [show, setShow] = useState<boolean>(false);
  const [fields, setFields] = useState<ObjectData>({});
  const [submitData, setSubmitData] = useState<ObjectData>({});
  const [isEdit, setEdit] = useState<boolean>(false);
  const [bills, setBills] = useState<ObjectData>({
    width: ["80px", "100px", "100px", "100px", "100px", "100px", "80px"],
    headers: [
      "S. No",
      "Date",
      "Bill Number",
      "Vendor Name",
      "Item Name",
      "Items Count",
      "Actions",
    ],
    data: [],
  });
  const [billsDropdown, setBillsDropdown] = useState<ObjectData>({});
  const [vendorsDropdown, setVendorsDropdown] = useState<ObjectData>({});
  const [stocksDropdown, setStocksDropdown] = useState<ObjectData>({});

  useEffect(() => {
    refreshPage();
    setFields(fieldsData.bills);
  }, []);

  useEffect(() => {
    mergeDropDownData()
  }, [vendorsDropdown, stocksDropdown])

  const getBills = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: BILLS_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          const dateFormated = updateDateFormat(response.data.data)
          const dataWithAction = addActionToData(dateFormated);
          setBills({ ...bills, data: dataWithAction });
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
            "item_id": response.data.data
          };
          setStocksDropdown(stocksDropDownWithKey);
        } else {
          console.log("error");
        }
      },
    });
  }

  const getVendorsDropdown = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: VENDORS_LIST_DROPDOWN,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          const vendorsDropDownWithKey: ObjectData = {
            "vendor_id": response.data.data
          };
          setVendorsDropdown(vendorsDropDownWithKey);
        } else {
          console.log("error");
        }
      },
    });
  }

  const getBillsDropDown = () => {
    getStocksDropdown()
    getVendorsDropdown()
  };

  const mergeDropDownData = () => {
    const dropDownOptions: ObjectData = {...stocksDropdown, ...vendorsDropdown}
    setBillsDropdown(dropDownOptions)
    console.log("bill dropDownOptions: ", dropDownOptions)
  }

  const postBills = (data: ObjectData) => {
    postAPI({
      baseUrl: BASE_URL,
      endpoint: BILLS_ADD,
      params: {},
      data: data,
      callback: (response) => {
        if (response.status == 200) {
          getBills();
          getBillsDropDown();
        } else {
          console.log("error");
        }
      },
    });
  };

  const putBills = (data: ObjectData) => {
    putAPI({
      baseUrl: BASE_URL,
      endpoint: BILLS_UPDATE,
      params: {},
      data: data,
      callback: (response) => {
        if (response.status == 200) {
          console.log("put data bill: ", response.data.data)
          refreshPage();
        } else {
          console.log("error");
        }
      },
    });
  };

  const deleteBills = (id: number) => {
    deleteAPI({
      baseUrl: BASE_URL,
      endpoint: `${BILLS_DELETE}/${id}`,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          console.log("delete data bill: ", id, response.data.data)
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
      console.log("putdata: ", data)
      putBills(data);
    } else {
      postBills(data);
    }
  };     

  const handleEdit = (data: ObjectData) => {
    setEdit(true);
    setShow(true);
    setSubmitData(data);
  };

  const handleDelete = (id: number) => {
    deleteBills(id);
  };

  const refreshPage = () => {
    getBills();
    getBillsDropDown();
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="text-[#050505] text-[20px] font-['Figtree-Bold']">
          Bills
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
            Add Bill
          </button>
          {((isEdit && Object.keys(submitData)?.length > 0) || !isEdit) && (
            <Modal
              header={isEdit ? "Edit Bill" : "Add Bill"}
              show={show}
              setShow={setShow}
              fields={fields}
              onClose={handleClose}
              options={billsDropdown}
              submitData={submitData}
              setSubmitData={setSubmitData}
            />
          )}
          <Table
            tableData={bills}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Bills;
