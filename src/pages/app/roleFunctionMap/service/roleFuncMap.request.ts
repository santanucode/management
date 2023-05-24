import { axios } from "api/setup.intersepter";

export const getAllRoles = () => {
  return axios({
    method: "GET",
    url: "/auth/roles",
  });
};

export const getAllFunctions = () => {
  return axios({
    method: "GET",
    url: "/auth/routes",
  });
};

export const getAllRoleFunctionMap = () => {
  return axios({
    method: "GET",
    url: `/auth/roles/role_route`,
  });
};

export const createRoleFunctionMap = (body: any) => {
  return axios({
    method: "PUT",
    url: `auth/roles/routes`,
    data: { role_route_map: [body] },
  });
};

// export const getRoleFunctionByRoleId = (body: any) => {
//   return axios({
//     method: "PUT",
//     url: `auth/roles/RoleToRoutegetById/${1}`,
//     data: { role_route_map: [body] },
//   });
// };
