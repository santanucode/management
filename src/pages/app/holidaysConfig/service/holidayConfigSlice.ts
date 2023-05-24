import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createHolidayConfig, deleteHolidayConfig, getAllHolidayConfig, updateHolidayConfig } from "./holidayConfig.request";
import { CREATEDT, INITSTDT, UPDATEDT } from "./types";
export const initialState: INITSTDT = {
    loading_getHolidayConfig: false,
    success_getHolidayConfig: false,
    error_getHolidayConfig: false,
    loading_createHolidayConfig: false,
    success_createHolidayConfig: false,
    error_createHolidayConfig: false,
    loading_updateHolidayConfig: false,
    success_updateHolidayConfig: false,
    error_updateHolidayConfig: false,
    loading_deleteHolidayConfig: false,
    success_deleteHolidayConfig: false,
    error_deleteHolidayConfig: false,
    holidayConfigList: []
}
export const fetchAllHolidayConfig = createAsyncThunk('master/fetchAllHolidayConfig', async () => {
    return getAllHolidayConfig()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error.response.data;
        });
})
export const fetchCreateHolidayConfig = createAsyncThunk('master/fetchCreateHolidayConfig', async (body: CREATEDT) => {
    return createHolidayConfig(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
         throw error?.message;
        });
})

export const fetchUpdateHolidayConfig = createAsyncThunk('master/fetchUpdateHolidayConfig', async (body: UPDATEDT) => {
    return updateHolidayConfig(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
         throw error?.message;
        });
})
export const fetchDeleteHolidayConfig = createAsyncThunk('master/fetchDeleteHolidayConfig', async (body: UPDATEDT) => {
    return deleteHolidayConfig(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
         throw error?.message;
        });
})

export const holidayConfigSlice = createSlice({
    name: 'holidayConfig',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(fetchAllHolidayConfig.pending, state => {
            state.loading_getHolidayConfig = true;
            state.success_getHolidayConfig = false;
            state.error_getHolidayConfig = false;
        });
        builder.addCase(fetchAllHolidayConfig.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getHolidayConfig = false;
            state.error_getHolidayConfig = false;
            state.success_getHolidayConfig = true;
            state.holidayConfigList = action.payload;
        });
        builder.addCase(fetchAllHolidayConfig.rejected, (state, action: AnyAction) => {
            state.loading_getHolidayConfig = false;
            state.error_getHolidayConfig = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getHolidayConfig = false;
        })

        builder.addCase(fetchCreateHolidayConfig.pending, state => {
            state.loading_createHolidayConfig = true;
            state.success_createHolidayConfig = false;
            state.error_createHolidayConfig = false;
        });
        builder.addCase(fetchCreateHolidayConfig.fulfilled, (state) => {
            state.loading_createHolidayConfig = false;
            state.success_createHolidayConfig = true;
            state.error_createHolidayConfig = false;
        });
        builder.addCase(fetchCreateHolidayConfig.rejected, (state, action: AnyAction) => {
            state.loading_createHolidayConfig = false;
            state.error_createHolidayConfig = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createHolidayConfig = false;
        })

        builder.addCase(fetchUpdateHolidayConfig.pending, state => {
            state.loading_updateHolidayConfig = true;
            state.success_updateHolidayConfig = false;
            state.error_updateHolidayConfig = false;
        });
        builder.addCase(fetchUpdateHolidayConfig.fulfilled, (state) => {
            state.loading_updateHolidayConfig = false;
            state.success_updateHolidayConfig = true;
            state.error_updateHolidayConfig = false;
        });
        builder.addCase(fetchUpdateHolidayConfig.rejected, (state, action: AnyAction) => {
            state.loading_updateHolidayConfig = false;
            state.error_updateHolidayConfig = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateHolidayConfig = false;
        })
        builder.addCase(fetchDeleteHolidayConfig.pending, state => {
             state.loading_deleteHolidayConfig = true;
            state.success_deleteHolidayConfig = false;
            state.error_deleteHolidayConfig = false;
        });
        builder.addCase(fetchDeleteHolidayConfig.fulfilled, (state) => {
            state.loading_deleteHolidayConfig = false;
            state.success_deleteHolidayConfig = true;
            state.error_deleteHolidayConfig = false;
        });
        builder.addCase(fetchDeleteHolidayConfig.rejected, (state, action: AnyAction) => {
            state.loading_deleteHolidayConfig = false;
            state.success_deleteHolidayConfig = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.error_deleteHolidayConfig = false;
        })
    }
})
export default holidayConfigSlice.reducer;
export const { reset } = holidayConfigSlice.actions;