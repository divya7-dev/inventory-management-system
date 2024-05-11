import { ObjectData } from "../helper/types";
import Image from "next/image";
import bin from "../../../public/images/bin.png";
import edit from "../../../public/images/pen.png";
import { useState } from "react";
import DeletePopUp from "../common/DeletePopUp";

export default function Table({
  tableData,
  onEdit,
  onDelete,
}: {
  tableData: ObjectData;
  onEdit: (data: ObjectData) => void;
  onDelete: (id: number) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(-1);

  const handleDelete = (isDelete: boolean) => {
    if (isDelete) {
      onDelete(deleteId);
    }
  };

  return (
    <div className="mt-3">
      <table className="w-full ">
        <thead className="sticky top-0">
          <tr className="bg-[#F3F8ED] border border-[#F3F8ED]">
            {tableData?.headers?.map((header: string, index: number) => (
              <th
                className="text-left text-[14px] font-['Figtree-Medium'] pl-4 py-2"
                style={{ minWidth: tableData?.width[index] }}
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.data?.map((tableObj: ObjectData, parentIndex: number) => (
            <tr
              key={parentIndex}
              className="border-b border-l border-r border-[#DFE5D6]"
            >
              <td
                className="text-left text-[14px] font-['Figtree-Regular'] pl-6 py-2"
                style={{ maxWidth: tableData.width[parentIndex] }}
              >
                {parentIndex + 1}
              </td>
              {Object.keys(tableObj).map(
                (item: string, childIndex: number) =>
                  item != "id" &&
                  item != "item_id" &&
                  item != "customer_id" &&
                  item != "vendor_id" && (
                    <td
                      key={childIndex}
                      className="text-left text-[14px] font-['Figtree-Regular'] pl-4 py-2"
                      style={{ maxWidth: tableData.width[childIndex] }}
                    >
                      {tableObj[item]}
                      {item.includes("price") && " INR"}
                      {item == "percentage" && " %"}
                      {item == "actions" && (
                        <div className="flex items-center justify-start gap-2">
                          <Image
                            width={15}
                            height={15}
                            src={edit}
                            alt="edit button"
                            className="cursor-pointer"
                            onClick={() => onEdit(tableObj)}
                          />
                          <Image
                            width={15}
                            height={15}
                            src={bin}
                            alt="bin button"
                            className="cursor-pointer"
                            onClick={() => {
                              setShow(true);
                              setDeleteId(tableObj.id);
                            }}
                          />
                        </div>
                      )}
                    </td>
                  ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <DeletePopUp show={show} setShow={setShow} onDelete={handleDelete} />
    </div>
  );
}
