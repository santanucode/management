import { axios } from 'api/setup.intersepter'
import { LoginDTO } from './types'

export const userLogin = (body: LoginDTO) => {
  return axios({
    method: 'POST',
    url: '/auth/token',
    data: { auth: body },
  })
}

export const getAllFunctions = (token: any) => {
  return axios({
    method: 'GET',
    url: '/auth/routes',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getUserDetails = (token: any) => {
  return axios({
    method: 'GET',
    url: '/me',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAllFunctionsById = (token: any, id: number) => {
console.log("id",id)
  return axios({
    method: 'GET',
    url: `auth/roles/RoleToRoutegetById/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
