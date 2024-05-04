import { ObjectData } from "../helper/types";
import Image from "next/image";
import bin from "../../../public/images/bin.png";
import edit from "../../../public/images/pen.png";

export default function Table({ tableData }: { tableData: ObjectData }) {
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
                  item != "id" && (
                    <td
                      key={childIndex}
                      className="text-left text-[14px] font-['Figtree-Regular'] pl-4 py-2"
                      style={{ maxWidth: tableData.width[childIndex] }}
                    >
                      {tableObj[item]}
                      {item == "price" && " INR"}
                      {tableData.headers[childIndex] == "Actions" && (
                        <div className="flex items-center justify-start gap-2">
                          <Image
                            width={20}
                            height={20}
                            src={bin}
                            alt="bin button"
                            className="cursor-pointer"
                          />
                          <Image
                            width={20}
                            height={20}
                            src={edit}
                            alt="edit button"
                            className="cursor-pointer"  
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
    </div>
  );
}
