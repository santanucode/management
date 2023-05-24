import { axios } from "api/setup.intersepter"

export const getEsiReport = (body: any) => {
    console.log("body",body)
    return axios({
        method: "GET",
        url:`/report/esi?month=${body.month}&year=${body.year}`
    })
} 