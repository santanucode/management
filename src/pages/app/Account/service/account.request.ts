import { axios } from "api/setup.intersepter";
import { CHANGEPASSWORD, UPDATEDATADTO } from "./types";

export const getUserDetails = () => {
  return axios({
    method: "GET",
    url: "/me",
  });
};

export const updateUser = (body: UPDATEDATADTO) => {
  console.log(body);
  return axios({
    method: "PATCH",
    url: `/auth/users/${body.id}`,
    data: { user: body.user },
  });
};

export const changePassword = (body: CHANGEPASSWORD) => {
  return axios({
    method: "PATCH",
    url: `/auth/users/${body.id}/change-password`,
    data: { password: body.password },
  });
};
