import { axios } from "api/setup.intersepter"
import { CREATEMATERIALDT, UPDATEMATERIALDT } from "./types";

export const getAllMaterials = () => {
    return axios({
        method: "GET",
        url: '/master/material'
    })
}
export const createMaterial = (body: CREATEMATERIALDT) => {
    return axios({
        method: "POST",
        url: '/master/material',
        data: { material: body }
    })
}
export const updateMaterial = (body: UPDATEMATERIALDT) => {
    return axios({
        method: "PATCH",
        url: `/master/material/${body.id}`,
        data: { material: body.material }
    })
}
export const statusChangeMaterial = (body: UPDATEMATERIALDT) => {
    console.log(body)
    return axios({
        method: "PATCH",
        url: `/master/material/${body.id}`,
        data: { material: body.material }
    })
}