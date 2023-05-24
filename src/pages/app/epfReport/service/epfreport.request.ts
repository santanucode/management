import { axios } from "api/setup.intersepter"

export const getEpfReport = (body: any) => {
    console.log(body,"body")
    return axios({
        method: "GET",
        url:`/report/epf?month=${body.month}&year=${body.year}`
    })
} 