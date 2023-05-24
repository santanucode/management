import { axios } from "api/setup.intersepter"
import { GETGROUPSHIFTDTO } from "./types"

export const getAllAttendance = (body: any) => {
    return axios({
        method: "GET",
        url: `/attendance?year=${body.year}&month=${body.month}&day=${body.day}&shift_id=${body.shift_id}`
    })
}

export const getAttendanceById = (id: number) => {
    return axios({
        method: "GET",
        url: `/attendance/${id}`
    })
}

export const createAllAttendance = (body: any) => {
    return axios({
        method: "POST",
        url: '/attendance',
        data: { attendance: body }
    })
}
export const updateAttendance = (body: any) => {
    return axios({
        method: "PATCH",
        url: `/attendance/${body.id}`,
        data: { attendance: body.data }
    })
}

export const deleteAttendance = (id: number) => {
    return axios({
        method: "DELETE",
        url: `/attendance/${id}`
    })
}

export const getAllGroups = () => {
    return axios({
        method: "GET",
        url: '/master/groups'
    })
}
export const getAllStaff = (body: any) => {
    return axios({
        method: "POST",
        url: `/staff/byGroupId`,
        data: { staff: { groupid: body } }
    })
}

export const getAllShift = () => {
    return axios({
        method: "GET",
        url: '/master/shift'
    })
}

export const getAllGroupsShiftByDt = (value: GETGROUPSHIFTDTO) => {
    return axios({
        method: "POST",
        url: '/attendance/shift',
        data: { attendance: value }
    })
}