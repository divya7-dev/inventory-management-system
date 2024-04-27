import axios from "axios";
import { ObjectData } from "./types";

export const getAPI = ({
  baseUrl,
  endpoint,
  params,
  callback,
}: {
  baseUrl: string;
  endpoint: string;
  params: ObjectData;
  callback: (response: ObjectData) => void;
}) => {
  axios({
    method: "GET",
    url: `${baseUrl}${endpoint}`,
    params: params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response: ObjectData) => {
      callback(response);
    })
    .catch((error: ObjectData) => {
      callback(error.response);
    });
};

export const postAPI = ({
  baseUrl,
  endpoint,
  params,
  data,
  callback,
}: {
  baseUrl: string;
  endpoint: string;
  params: ObjectData;
  data: ObjectData;
  callback: (response: ObjectData) => void;
}) => {
  axios({
    method: "POST",
    data: data,
    url: `${baseUrl}${endpoint}`,
    params: params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (response: ObjectData) {
      callback(response);
    })
    .catch(function (error: ObjectData) {
      callback(error.response);
    });
};

export const putAPI = ({
  baseUrl,
  endpoint,
  params,
  data,
  callback,
}: {
  baseUrl: string;
  endpoint: string;
  params: ObjectData;
  data: ObjectData;
  callback: (response: ObjectData) => void;
}) => {
  axios({
    method: "PUT",
    data: data,
    url: `${baseUrl}${endpoint}`,
    params: params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (response: ObjectData) {
      callback(response);
    })
    .catch(function (error: ObjectData) {
      callback(error.response);
    });
};

export const deleteAPI = ({
  baseUrl,
  endpoint,
  params,
  callback,
}: {
  baseUrl: string;
  endpoint: string;
  params: ObjectData;
  callback: (response: ObjectData) => void;
}) => {
  axios({
    method: "DELETE",
    url: `${baseUrl}${endpoint}`,
    params: params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (response: ObjectData) {
      callback(response);
    })
    .catch(function (error: ObjectData) {
      callback(error.response);
    });
};
