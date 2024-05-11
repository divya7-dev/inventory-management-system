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
  VENDORS_ADD,
  VENDORS_LIST,
  VENDORS_UPDATE,
  VENDORS_DELETE,
} from "../../components/helper/urls";
import { addActionToData } from "../../components/helper/utils";

const Vendors = () => {
  const [show, setShow] = useState<boolean>(false);
  const [fields, setFields] = useState<ObjectData>({});
  const [submitData, setSubmitData] = useState<ObjectData>({});
  const [isEdit, setEdit] = useState<boolean>(false);
  const [vendors, setVendors] = useState<ObjectData>({
    width: ["50px", "150px", "150px", "100px", "150px", "80px"],
    headers: ["S. No", "Name", "Email", "Contact Number", "Address", "Actions"],
    data: [],
  });

  useEffect(() => {
    refreshPage();
    setFields(fieldsData.vendors);
  }, []);

  const getVendors = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: VENDORS_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          const dataWithAction = addActionToData(response.data.data);
          setVendors({ ...vendors, data: dataWithAction });
        } else {
          console.log("error");
        }
      },
    });
  };

  const postVendors = (data: ObjectData) => {
    postAPI({
      baseUrl: BASE_URL,
      endpoint: VENDORS_ADD,
      params: {},
      data: data,
      callback: (response) => {
        if (response.status == 200) {
          getVendors();
        } else {
          console.log("error");
        }
      },
    });
  };

  const putVendors = (data: ObjectData) => {
    putAPI({
      baseUrl: BASE_URL,
      endpoint: VENDORS_UPDATE,
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

  const deleteVendors = (id: number) => {
    deleteAPI({
      baseUrl: BASE_URL,
      endpoint: `${VENDORS_DELETE}/${id}`,
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
      putVendors(data);
    } else {
      postVendors(data);
    }
  };

  const handleEdit = (data: ObjectData) => {
    setEdit(true);
    setShow(true);
    setSubmitData(data);
  };

  const handleDelete = (id: number) => {
    deleteVendors(id);
  };

  const refreshPage = () => {
    getVendors();
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="text-[#050505] text-[20px] font-['Figtree-Bold']">
          Vendors
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
            Add Vendor
          </button>
          {((isEdit && Object.keys(submitData)?.length > 0) || !isEdit) && (
            <Modal
              header={isEdit ? "Edit Vendor" : "Add Vendor"}
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
            tableData={vendors}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Vendors;
