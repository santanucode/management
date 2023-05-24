import { axios } from "api/setup.intersepter"

export const getAllBanks = () => {
    return axios({
        method: "GET",
        url: '/master/banks'
    })
}
// /report/bank?month=2&year=2023&bank_id=1


export const getAllBankReport = (body: any) => {

    console.log(body, "body")
    return axios({
        method: "GET",
        url: `/report/bank?month=${body.month}&year=${body.year}&bank_id=${body.bank_id}`
    })
}
