import { axios } from "api/setup.intersepter";
import { CREATEOPTCATDT, UPDATEOPTCATDT } from "./types";

export const getAllOperaionCategory = () => {
  return axios({
    method: "GET",
    url: "/master/OperationCatagory",
  });
};
export const createOperaionCategory = (body: CREATEOPTCATDT) => {
  return axios({
    method: "POST",
    url: "/master/OperationCatagory",
    data: { OperationCatagory: body },
  });
};
export const updateOperaionCategory = (body: UPDATEOPTCATDT) => {
  console.log("body",body)
  return axios({
    method: "PATCH",
    url: `/master/OperationCatagory/${body.id}`,
    data: { OperationCatagory: body.category },
  });
};
export const updateOperaionStatusCategory = (body: UPDATEOPTCATDT) => {
  return axios({
    method: "PATCH",
    url: `/master/OperationCatagory/${body.id}`,
    data: { OperationCatagory: body.category },
  });
};
