import { axios } from "api/setup.intersepter"
import { CREATEGROUPDT, UPDATEGROUPDT } from "./types";

export const getAllGroups = () => {
    return axios({
        method: "GET",
        url: '/master/groups'
    })
}
export const createGroup = (body: CREATEGROUPDT) => {
    return axios({
        method: "POST",
        url: '/master/groups',
        data: { group: body }
    })
}
export const updateGroup = (body: UPDATEGROUPDT) => {
    return axios({
        method: "PATCH",
        url: `/master/groups/${body.id}`,
        data: { group: body.group }
    })
}
export const statusChangeGroup = (body: UPDATEGROUPDT) => {
    return axios({
        method: "PATCH",
        url: `/master/groups/${body.id}`,
        data: { group: body.group }
    })
}