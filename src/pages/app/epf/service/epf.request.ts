import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEDT } from "./types";


export const getAllEpf = () => {
    return axios({
        method: "GET",
        url: '/master/wage/epf'
    })
}
export const createEpf = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/master/wage/epf',
        data: { epf: body }
    })
}
export const updateEpf = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/wage/epf/${body.id}`,
        data: { epf: body.value }
    })
}
export const deleteEpf = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/wage/epf/${body.id}`,
        data: { epf: body.value }
    })
}