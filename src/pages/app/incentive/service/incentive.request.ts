import { axios } from "api/setup.intersepter"
import { CREATEDT, UPDATEDT } from "./types";

export const getAllOperaionCategory = () => {
    return axios({
        method: "GET",
        url: '/master/OperationCatagory'
    })
}
export const getAllIncentive = () => {
    return axios({
        method: "GET",
        url: '/master/incentive'
    })
}
export const createIncentive = (body: CREATEDT) => {
    return axios({
        method: "POST",
        url: '/master/incentive',
        data: { incentive: body }
    })
}
export const updateIncentive = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/incentive/${body.id}`,
        data: { incentive: body.value }
    })
}
export const updateStatusIncentive = (body: UPDATEDT) => {
    return axios({
        method: "PATCH",
        url: `/master/incentive/${body.id}`,
        data: { incentive: body.value }
    })
}