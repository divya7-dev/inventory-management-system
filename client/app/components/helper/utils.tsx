import { ObjectData } from "./types";

export const addActionToData = (data: ObjectData) => {
  const newData = data.map((item: ObjectData) => ({
    ...item,
    actions: "",
  }));
  return newData;
};
