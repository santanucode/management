import { HomeDataDTO } from "./type";
import { RoleAccess } from "../RoleAccess";
import { createSlice } from "@reduxjs/toolkit";

export const  initialState:HomeDataDTO = {
    role_function: RoleAccess
}
export const HomeSlice = createSlice({
    name: 'Homes', 
    initialState,
    reducers: {
        getRole: (state) => {
            return ({
            ...state, role_function:{RoleAccess}
        })}
    }
})


export default HomeSlice.reducer;
export const {getRole} = HomeSlice.actions