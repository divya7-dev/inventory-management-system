import { ObjectData } from "./types";
import { format } from 'date-fns';

export const addActionToData = (data: ObjectData) => {
  const newData = data.map((item: ObjectData) => ({
    ...item,
    actions: "",
  }));
  return newData;
};

export const updateDateFormat = (data: ObjectData) => {
  data.forEach((item: ObjectData) => {
    if (item.hasOwnProperty("date")) {
      let formattedDate = formatDate(item.date)
      item.date = formattedDate;
    }
  });
  return data
};

export const formatDate = (utcTime: string) => {
  const date = new Date(utcTime);
  const formattedDate = format(date, "MMM dd, yyyy");
  return formattedDate
};