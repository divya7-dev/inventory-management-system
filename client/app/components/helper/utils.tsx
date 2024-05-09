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
      const formattedDate = formatDate(item.date)
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

export const updateKey = ({data, oldkey, newkey}: {data: ObjectData, oldkey: string, newkey: string}) => {
  data.forEach((item: ObjectData) => {
    if (item.hasOwnProperty(oldkey)) {
      item[newkey] = item[oldkey];
    }
  });
  return data
}