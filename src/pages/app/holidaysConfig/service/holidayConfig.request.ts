import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEDT } from "./types";


export const getAllHolidayConfig = () => {
    return axios({
        method: "GET",
        url: '/master/holiday/configuration'
    })
}
export const createHolidayConfig = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/master/holiday/configuration',
        data: { holidayConfig: body }
    })
}
export const updateHolidayConfig = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/holiday/configuration/${body.id}`,
        data: { holidayConfig: body.value }
    })
}
export const deleteHolidayConfig = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/holiday/configuration/${body.id}`,
        data: { holidayConfig: body.value }
    })
}