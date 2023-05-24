import { axios } from "api/setup.intersepter";
import { SHIFTBODYDTO, STAFFBODYDTO } from "./types";

export const getShiftByDate = (body: SHIFTBODYDTO) => {
  return axios({
    method: "POST",
    url: `/attendance/shift`,
    data: {
      attendance: body,
    },
  });
};

export const getAllShift = () => {
  return axios({
    method: "GET",
    url: "/master/shift",
  });
};

export const getAllStaffByShift = (body: STAFFBODYDTO) => {
  return axios({
    method: "POST",
    url: `/attendance/present`,
    data: {
      attendance: body,
    },
  });
};

export const getAllOperation = () => {
  return axios({
    method: "GET",
    url: "/master/operation",
  });
};
export const getAllGroups = () => {
  return axios({
    method: "GET",
    url: "/master/groups",
  });
};

export const getWorklogs = (body: any) => {
  return axios({
    method: "GET",
    url: `/worklog??year=${body.year}&month=${body.month}&day=${body.day}&shift_id=${body.shift_id}&limit=${body.limit}&page=${body.page}`,
  });
};

export const createAllWorklog = (body: any) => {
  return axios({
    method: "POST",
    url: `/worklog`,
    data: body,
  });
};

export const createDraftAllWorklog = (body: any) => {
  return axios({
    method: "POST",
    url: `/worklog`,
    data: body,
  });
};

export const updateAllWorklog = (body: any) => {
  return axios({
    method: "PATCH",
    url: `/worklog/${body.id}`,
    data: body,
  });
};

export const updateStatusWorklog = (id: number) => {
  return axios({
    method: "GET",
    url: `/worklog/status/${id}`,
  });
};
