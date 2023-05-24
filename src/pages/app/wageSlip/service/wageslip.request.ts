import { axios } from "api/setup.intersepter"
import { GETWAGEPAGEDTO } from "./types"

export const getAllGroup = () => {
    return axios({
        method: "GET",
        url:'/master/groups'
    })
}

export const getAllOperation = () => {
    return axios({
        method: "GET",
        url: '/master/operation'
    })
}
export const getAllWageSlip = (data: GETWAGEPAGEDTO) => {  
    return axios({
        method: "GET",
        url:`report/salary?month=${data.month}&year=${data.year}&group_id=${data.group_id}`
    })
}

