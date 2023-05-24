import { axios } from "api/setup.intersepter"
import { GETMUSTERDTO } from "./types"

export const getAllGroup = () => {
    return axios({
        method: "GET",
        url:'/master/groups'
    })
}

export const getAllMusterRoll = (data: GETMUSTERDTO) => {  
    return axios({
        method: "GET",
        url:`report/muster?month=${data.month}&year=${data.year}&group _id=${data.group_id}`
    })
}