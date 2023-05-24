import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEDT } from "./types";


export const getAllWage = () => {
    return axios({
        method: "GET",
        url: '/master/wage/component'
    })
}
export const createWage = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/master/wage/component',
        data: { wage: body }
    })
}
export const updateWage = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/wage/component/${body.id}`,
        data: { wage: body.value }
    })
}
export const updateStatusWage = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/wage/component/${body.id}`,
        data: { wage: body.value }
    })
}