import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createHoliday, deleteHoliday, getAllHoliday, updateHoliday } from "./holiday.request";
import { CREATEDT, INITSTDT, UPDATEDT } from "./types";

export const initialState: INITSTDT = {
    loading_getHoliday: false,
    success_getHoliday: false,
    error_getHoliday: false,
    loading_createHoliday: false,
    success_createHoliday: false,
    error_createHoliday: false,
    loading_updateHoliday: false,
    success_updateHoliday: false,
    error_updateHoliday: false,
    loading_deleteHoliday: false,
    success_deleteHoliday: false,
    error_deleteHoliday: false,
    holidayList: []
}

export const fetchAllHoliday = createAsyncThunk('master/fetchAllHoliday', async () => {
    return getAllHoliday()
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error?.message;
        });
})
export const fetchCreateHoliday = createAsyncThunk('master/fetchCreateHoliday', async (body: CREATEDT) => {
    return createHoliday(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error?.message;
        });
})

export const fetchUpdateHoliday = createAsyncThunk('master/fetchUpdateHoliday', async (body: UPDATEDT) => {
    return updateHoliday(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error?.message;
        });
})
export const fetchDeleteHoliday = createAsyncThunk('master/fetchDeleteHoliday', async (body: UPDATEDT) => {
    return deleteHoliday(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error?.message;
        });
})

export const holidaySlice = createSlice({
    name: 'holiday',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {

        builder.addCase(fetchAllHoliday.pending, state => {
            state.loading_getHoliday = true;
            state.success_getHoliday = false;
            state.error_getHoliday = false;

            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        });
        builder.addCase(fetchAllHoliday.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getHoliday = false;
            state.error_getHoliday = false;
            state.success_getHoliday = true;
            state.holidayList = action.payload;

            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        });
        builder.addCase(fetchAllHoliday.rejected, (state, action: AnyAction) => {
            state.loading_getHoliday = false;
            state.error_getHoliday = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getHoliday = false;

            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        })

        builder.addCase(fetchCreateHoliday.pending, state => {
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_createHoliday = true;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        });
        builder.addCase(fetchCreateHoliday.fulfilled, (state) => {
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_createHoliday = false;
            state.success_createHoliday = true;
            state.error_createHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        });
        builder.addCase(fetchCreateHoliday.rejected, (state, action: AnyAction) => {
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_createHoliday = false;
            state.error_createHoliday = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        })

        builder.addCase(fetchUpdateHoliday.pending, state => {
            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = true;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        });
        builder.addCase(fetchUpdateHoliday.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.success_updateHoliday = true;
            state.error_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        });
        builder.addCase(fetchUpdateHoliday.rejected, (state, action: AnyAction) => {
            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.error_updateHoliday = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;
        })
        builder.addCase(fetchDeleteHoliday.pending, state => {
            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_deleteHoliday = true;
            state.success_deleteHoliday = false;
            state.error_deleteHoliday = false;

        });
        builder.addCase(fetchDeleteHoliday.fulfilled, (state) => {
            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.success_updateHoliday = false;
            state.error_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = true;
            state.error_deleteHoliday = false;
        });
        builder.addCase(fetchDeleteHoliday.rejected, (state, action: AnyAction) => {
            state.loading_createHoliday = false;
            state.success_createHoliday = false;
            state.error_createHoliday = false;
            state.loading_updateHoliday = false;
            state.error_updateHoliday = false;
            state.success_updateHoliday = false;
            state.loading_deleteHoliday = false;
            state.success_deleteHoliday = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.error_deleteHoliday = false;
        })
    }
})
export default holidaySlice.reducer;
export const { reset } = holidaySlice.actions;