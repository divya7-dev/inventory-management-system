// Components
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
  CUSTOMERS_ADD,
  CUSTOMERS_LIST,
  CUSTOMERS_UPDATE,
  CUSTOMERS_DELETE,
} from "../../components/helper/urls";
import { addActionToData } from "../../components/helper/utils";

const Customers = () => {
  const [show, setShow] = useState<boolean>(false);
  const [fields, setFields] = useState<ObjectData>({});
  const [submitData, setSubmitData] = useState<ObjectData>({});
  const [isEdit, setEdit] = useState<boolean>(false);
  const [customers, setCustomers] = useState<ObjectData>({
    width: ["80px", "100px", "150px", "100px", "150px",  "80px"],
    headers: [
      "S. No",
      "Name",
      "Email",
      "Contact Number",
      "Address",
      "Actions",
    ],
    data: [],
  });

  useEffect(() => {
    refreshPage();
    setFields(fieldsData.customers);
  }, []);

  const getCustomers = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: CUSTOMERS_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          const dataWithAction = addActionToData(response.data.data);
          setCustomers({ ...customers, data: dataWithAction });
        } else {
          console.log("error");
        }
      },
    });
  };

  const postCustomers = (data: ObjectData) => {
    postAPI({
      baseUrl: BASE_URL,
      endpoint: CUSTOMERS_ADD,
      params: {},
      data: data,
      callback: (response) => {
        if (response.status == 200) {
          getCustomers();
        } else {
          console.log("error");
        }
      },
    });
  };

  const putCustomers = (data: ObjectData) => {
    putAPI({
      baseUrl: BASE_URL,
      endpoint: CUSTOMERS_UPDATE,
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

  const deleteCustomers = (id: number) => {
    deleteAPI({
      baseUrl: BASE_URL,
      endpoint: `${CUSTOMERS_DELETE}/${id}`,
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
      putCustomers(data);
    } else {
      postCustomers(data);
    }
  };

  const handleEdit = (data: ObjectData) => {
    setEdit(true);
    setShow(true);
    setSubmitData(data);
  };

  const handleDelete = (id: number) => {
    deleteCustomers(id);
  };

  const refreshPage = () => {
    getCustomers();
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="text-[#050505] text-[20px] font-['Figtree-Bold']">
          Customers
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
            Add Customer
          </button>
          {((isEdit && Object.keys(submitData)?.length > 0) || !isEdit) && (
            <Modal
              header={isEdit ? "Edit Customer" : "Add Customer"}
              show={show}
              setShow={setShow}
              fields={fields}
              onClose={handleClose}
              options={[]}
              submitData={submitData}
              setSubmitData={setSubmitData}
            />
          )}
          <Table
            tableData={customers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
