import { axios } from "api/setup.intersepter";
import { CREATEDTO, UPDATEDOBJ, UPDATEDTO } from "./types";

export const getAllUsers = () => {
  return axios({
    method: "GET",
    url: "/auth/users",
  });
};
export const createUser = (body: CREATEDTO) => {
  return axios({
    method: "POST",
    url: "/auth/users",
    data: { user: body },
  });
};

export const updateUser = (body: UPDATEDOBJ) => {
  return axios({
    method: "PATCH",
    url: `/auth/users/${body.id}`,
    data: { user: body.value },
  });
};
export const updateStatusUser = (body: UPDATEDOBJ) => {
  return axios({
    method: "PATCH",
    url: `/auth/users/${body.id}`,
    data: { user: body.value },
  });
};

export const createUserRoleMap = (body: any) => {
  return axios({
    method: "PUT",
    url: `auth/users/${body.id}/role`,
    data: { roles: body.data },
  });
};

export const getAllRoles = () => {
  return axios({
    method: "GET",
    url: "/auth/roles",
  });
};
