import { axios } from "api/setup.intersepter"
import { BODYDT } from "./types";

export const getAllRoles = () => {
    return axios({
        method: "GET",
        url: '/auth/roles'
    })
}
export const createRole = (body: BODYDT) => {
    return axios({
        method: "POST",
        url: '/auth/roles',
        data: { role: body.role },
    })
}
export const updateRole = (body: any) => {
    return axios({
        method: "PATCH",
        url: `/auth/roles/${body.id}`,
        data: { role: body.value },
    })
}
export const updateStatusRole = (body: any) => {
    return axios({
        method: "PATCH",
        url: `/auth/roles/${body.id}`,
        data: { role: body.role_detail },
    })
}