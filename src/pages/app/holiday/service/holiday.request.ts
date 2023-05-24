import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEDT } from "./types";


export const getAllHoliday = () => {
    return axios({
        method: "GET",
        url: '/master/holiday'
    })
}
export const createHoliday = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/master/holiday',
        data: { holiday: body }
    })
}
export const updateHoliday = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/holiday/${body.id}`,
        data: { holiday: body.value }
    })
}
export const deleteHoliday = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/holiday/${body.id}`,
        data: { holiday: body.value }
    })
}