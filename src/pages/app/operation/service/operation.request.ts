import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEDT } from "./types";

export const getAllOperation = () => {
    return axios({
        method: "GET",
        url: '/master/operation'
    })
}
export const createOperation = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/master/operation',
        data: { operation: body }
    })
}
export const updateOperation = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/operation/${body.id}`,
        data: { operation: body.operation }
    })
}

export const statusOperation = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/operation/${body.id}`,
        data: { operation: body.operation }
    })
}



export const getAllOperaionCategory = () => {
    return axios({
        method: "GET",
        url: '/master/OperationCatagory'
    })
}
