import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createStaff, getAllStaff, updateStaff, getAllGroups, getAllBanks, statusChangeStaff } from "./staff.request";
import { CREATEDT, StaffInitStateDTO, UPDATEEDT } from "./types";

export const initialState: StaffInitStateDTO = {

    loading_getGroup : false,
    success_getGroup : false,
    error_getGroup : false,

    loading_getStaff: false,
    success_getStaff: false,
    error_getStaff: false,

    loading_createStaff: false,
    success_createStaff: false,
    error_createStaff: false,

    loading_updateStaff: false,
    success_updateStaff: false,
    error_updateStaff: false,

    loading_statusStaff:false,
    success_statusStaff:false,
    error_statusStaff: false,
    staffList: [],
}

export const fetchAllGroups = createAsyncThunk('master/fetchAllGroups', async () => {
    return getAllGroups()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error.response.data;
        });
})
export const fetchAllBanks = createAsyncThunk('master/fetchAllBanks', async () => {
    return getAllBanks()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error.response.data;
        });
})


export const fetchAllStaff = createAsyncThunk('master/fetchAllStaff', async () => {
    return getAllStaff()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error.response.data;
        });
})
export const fetchCreateStaff = createAsyncThunk('master/fetchCreateStaff', async (body: CREATEDT) => {
    return createStaff(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})

export const fetchUpdateStaff = createAsyncThunk('master/fetchUpdateStaff', async (body: UPDATEEDT) => {
    return updateStaff(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})

export const fetchStatusChangeStaff = createAsyncThunk('master/fetchStatusChangeStaff', async (body: UPDATEEDT) => {
    return statusChangeStaff(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {

        builder.addCase(fetchAllGroups.pending, state => {
            state.loading_getGroup = true;
            state.success_getGroup = false;
            state.error_getGroup = false
        });
        builder.addCase(fetchAllGroups.fulfilled, (state) => {
            state.loading_getGroup = false;
            state.error_getGroup = false;
            state.success_getGroup = true;
        });
        builder.addCase(fetchAllGroups.rejected, (state, action: AnyAction) => {
            state.loading_getGroup = false;
            state.error_getGroup = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getGroup = false;
        })

        builder.addCase(fetchAllStaff.pending, state => {
            state.loading_getStaff = true;
            state.success_getStaff = false;
            state.error_getStaff = false;
        });
        builder.addCase(fetchAllStaff.fulfilled, (state, action: PayloadAction) => {
            state.loading_getStaff = false;
            state.error_getStaff = false;
            state.success_getStaff = true;
            state.staffList = action.payload;
        });
        builder.addCase(fetchAllStaff.rejected, (state, action: AnyAction) => {
            state.loading_getStaff = false;
            state.error_getStaff = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];;
            state.success_getStaff = false;
        })

        builder.addCase(fetchCreateStaff.pending, state => {
            state.loading_createStaff = true;
            state.success_createStaff = false;
            state.error_createStaff = false;
        });
        builder.addCase(fetchCreateStaff.fulfilled, (state) => {
            state.loading_createStaff = false;
            state.success_createStaff = true;
            state.error_createStaff = false;
        });
        builder.addCase(fetchCreateStaff.rejected, (state, action: AnyAction) => {
            state.loading_createStaff = false;
            state.error_createStaff = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createStaff = false;
     
        })
        builder.addCase(fetchUpdateStaff.pending, state => {
            state.loading_updateStaff = true;
            state.success_updateStaff = false;
            state.error_updateStaff = false;
        });
        builder.addCase(fetchUpdateStaff.fulfilled, (state) => {
            state.loading_updateStaff = false;
            state.success_updateStaff = true;
            state.error_updateStaff = false;
        });
        builder.addCase(fetchUpdateStaff.rejected, (state, action: AnyAction) => {
            state.loading_updateStaff = false;
            state.error_updateStaff = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateStaff = false;
        })

        builder.addCase(fetchStatusChangeStaff.pending, state => {
            state.loading_statusStaff = true;
            state.success_statusStaff = false;
            state.error_statusStaff = false;
        });
        builder.addCase(fetchStatusChangeStaff.fulfilled, (state) => {
            state.loading_statusStaff = false;
            state.success_statusStaff = true;
            state.error_statusStaff = false;
        });
        builder.addCase(fetchStatusChangeStaff.rejected, (state, action: AnyAction) => {
            state.loading_statusStaff = false;
            state.error_statusStaff = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_statusStaff = false;
        })
    }
})
export default staffSlice.reducer;
export const { reset } = staffSlice.actions;