import { axios } from "api/setup.intersepter";
import { GETATTENDANCEDTO } from "./types";

export const getAllGroups = () => {
    return axios({
        method: "GET",
        url: '/master/groups'
    })
}
export const getAttendanceReport = (body: GETATTENDANCEDTO) => {
    return axios({
        method: "GET",
        url: `/report/attendance?group_id=${body.group_id}&month=${body.month}&year=${body.year}`
    })
}