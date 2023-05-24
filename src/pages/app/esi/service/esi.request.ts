import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEDT } from "./types";


export const getAllEsi = () => {
    return axios({
        method: "GET",
        url: '/master/wage/esi'
    })
}
export const createEsi = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/master/wage/esi',
        data: { esi: body }
    })
}
export const updateEsi = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/wage/esi/${body.id}`,
        data: { esi: body.value }
    })
}
export const deleteEsi = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/wage/esi/${body.id}`,
        data: { esi: body.value }
    })
}