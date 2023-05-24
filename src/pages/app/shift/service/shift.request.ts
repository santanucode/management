import { axios } from "api/setup.intersepter";
import { CREATESHIFTDT, UPDATESHIFTDT } from "./types";

export const getAllShift = () => {
  return axios({
    method: "GET",
    url: "/master/shift",
  });
};
export const createShift = (body: CREATESHIFTDT) => {
  return axios({
    method: "POST",
    url: "/master/shift",
    data: body,
  });
};
export const createReviseShift = (body: any) => {
  return axios({
    method: "POST",
    url: `/master/shift/revise/${body.id}`,
    data: { shift: body },
  });
};

export const updateReviseShift = (body: any) => {
  console.log("body-----", body);
  return axios({
    method: "PATCH",
    url: `/master/shift/reviseUpdate/${body.id}`,
    data: { shift: body },
  });
};
export const updateShift = (body: UPDATESHIFTDT) => {
  return axios({
    method: "PATCH",
    url: `/master/shift/${body.id}`,
    data: { shift: body.shift },
  });
};

export const updateStatusShift = (body: UPDATESHIFTDT) => {
  return axios({
    method: "PATCH",
    url: `/master/shift/${body.id}`,
    data: { shift: body.shift },
  });
};
