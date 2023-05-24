import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createRole, getAllRoles, updateRole, updateStatusRole } from "./roles.request";
import { RoleInitStateDTO } from "./types";

export const initialState: RoleInitStateDTO = {
    loading_getRole: false,
    success_getRole: false,
    error_getRole: false,
    loading_createRole: false,
    success_createRole: false,
    error_createRole: false,
    loading_updateRole: false,
    success_updateRole: false,
    error_updateRole: false,
    loading_updateStatusRole: false,
    success_updateStatusRole: false,
    error_updateStatusRole: false,
    roles: []
}

export const fetchAllRoles = createAsyncThunk('master/fetchAllRoles', () => {
    return getAllRoles()
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error.response.data;
        });
})
export const fetchCreateRole = createAsyncThunk('master/createRole', async (body: any) => {
    return createRole(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error?.message;
        });
})

export const fetchUpdateRole = createAsyncThunk(
    'master/updateRole',
    async (body: any) => {
        return updateRole(body)
            .then((response: any) => {
                return response?.data?.data;
            })
            .catch((error: any) => {
                throw error?.message;
            });
    })
export const fetchUpdateStatusRole = createAsyncThunk('master/fetchUpdateStatusRole', async (body: any) => {
    return updateStatusRole(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error?.message;
        });
})

export const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {

        builder.addCase(fetchAllRoles.pending, state => {
            state.loading_getRole = true;
            state.success_getRole = false;
            state.error_getRole = false;
        });
        builder.addCase(fetchAllRoles.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getRole = false;
            state.error_getRole = false;
            state.success_getRole = true;
            state.roles = action.payload;
        });
        builder.addCase(fetchAllRoles.rejected, (state, action: AnyAction) => {
            state.loading_getRole = false;
            state.error_getRole = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getRole = false;
        })
        builder.addCase(fetchCreateRole.pending, state => {
            state.loading_createRole = true;
            state.success_createRole = false;
            state.error_createRole = false;
        });
        builder.addCase(fetchCreateRole.fulfilled, (state) => {
            state.loading_createRole = false;
            state.success_createRole = true;
            state.error_createRole = false;
        });
        builder.addCase(fetchCreateRole.rejected, (state, action: AnyAction) => {
            state.loading_createRole = false;
            state.error_createRole = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createRole = false;
        })
        builder.addCase(fetchUpdateRole.pending, state => {
            state.loading_updateRole = true;
            state.success_updateRole = false;
            state.error_updateRole = false;
        });
        builder.addCase(fetchUpdateRole.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_updateRole = false;
            state.success_updateRole = true;
            state.error_updateRole = false;
        });
        builder.addCase(fetchUpdateRole.rejected, (state, action: AnyAction) => {
            state.loading_updateRole = false;
            state.error_updateRole = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateRole = false;
        })

        builder.addCase(fetchUpdateStatusRole.pending, state => {
            state.loading_updateStatusRole = true;
            state.success_updateStatusRole = false;
            state.error_updateStatusRole = false;
        });
        builder.addCase(fetchUpdateStatusRole.fulfilled, (state) => {
            state.loading_updateStatusRole = false;
            state.success_updateStatusRole = true;
            state.error_updateStatusRole = false;
        });
        builder.addCase(fetchUpdateStatusRole.rejected, (state, action: AnyAction) => {
            state.loading_updateStatusRole = false;
            state.error_updateStatusRole = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateStatusRole = false;
        })
    }
})
export default roleSlice.reducer;
export const { reset } = roleSlice.actions;