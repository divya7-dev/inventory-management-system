"use client";
import { useEffect, useState } from "react";

// Components
import Layout from "@/app/components/common/Layout";
import Table from "../components/common/Table";

// Data
import { ObjectData } from "../components/helper/types";
import { getAPI } from "../components/helper/api";
import { BASE_URL, REPORTS_LIST } from "../components/helper/urls";

const Reports = () => {
  const [reports, setReports] = useState<ObjectData>({
    width: [
      "50px",
      "120px",
      "110px",
      "110px",
      "110px",
      "110px",
      "100px",
      "100px",
    ],
    headers: [
      "S. No",
      "Item Name",
      "Opening Stocks",
      "Stocks On Hand",
      "Cost Price",
      "Sales Price",
      "Status",
      "%",
    ],
    data: [],
  });

  useEffect(() => {
    getReports();
  }, []);

  const getReports = () => {
    getAPI({
      baseUrl: BASE_URL,
      endpoint: REPORTS_LIST,
      params: {},
      callback: (response) => {
        if (response.status == 200) {
          setReports({ ...reports, data: response.data.data });
        } else {
          console.log("error");
        }
      },
    });
  };

  const handleEdit = (data: ObjectData) => {
    console.log(data);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="text-[#050505] text-[20px] font-['Figtree-Bold']">
          Reports
        </div>
        <div className="mt-10">
          <Table
            tableData={reports}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
