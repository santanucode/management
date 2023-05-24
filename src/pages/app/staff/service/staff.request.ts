import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEEDT } from "./types"

export const getAllGroups = () => {
    return axios({
        method: "GET",
        url: '/master/groups'
    })
}

export const getAllBanks = () => {
    return axios({
        method: "GET",
        url: '/master/banks'
    })
}

export const getAllStaff = () => {
    return axios({
        method: "GET",
        url: '/staff'
    })
}
export const createStaff = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/staff',
        data: { staff: body }
    })
}
export const updateStaff = (body: UPDATEEDT) => {
    return axios({
        method: "PATCH",
        url: `/staff/${body.id}`,
        data: { staff: body.value }
    })
}
export const statusChangeStaff = (body: UPDATEEDT) => {

    return axios({
        method: "PATCH",
        url: `/staff/${body.id}`,
        data: { staff: body.value }
    })
}