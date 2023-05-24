import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllWage, createWage, updateWage, updateStatusWage } from "./wage.request";
import { CREATEDT, INITSTDT, UPDATEDT } from "./types";
import strings from "translation";

export const initialState: INITSTDT = {
    loading_getWage: false,
    success_getWage: false,
    error_getWage: false,
    loading_createWage: false,
    success_createWage: false,
    error_createWage: false,
    loading_updateWage: false,
    success_updateWage: false,
    error_updateWage: false,
    loading_statusWage: false,
    success_statusWage: false,
    error_statusWage: false,
    wageList: []
}

export const fetchAllWage = createAsyncThunk('wage/fetchAllWage', async () => {
    return getAllWage()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})
export const fetchCreateWage = createAsyncThunk('wage/fetchCreateWage', async (body: CREATEDT) => {
    return createWage(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})

export const fetchUpdateWage = createAsyncThunk('wage/fetchUpdateWage', async (body: UPDATEDT) => {
    return updateWage(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
           throw error?.message;
        });
})
export const fetchUpdateStatusWage = createAsyncThunk('wage/fetchUpdateStatusWage', async (body: UPDATEDT) => {
    return updateStatusWage(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
           throw error?.message;
        });
})

export const wageSlice = createSlice({
    name: 'wage',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(fetchAllWage.pending, state => {
            state.loading_getWage = true;
            state.success_getWage = false;
            state.error_getWage = false;
        });
        builder.addCase(fetchAllWage.fulfilled, (state, action: AnyAction) => {
            state.loading_getWage = false;
            state.error_getWage = false;
            state.success_getWage = true;
            state.wageList = action.payload;
        });
        builder.addCase(fetchAllWage.rejected, (state, action: AnyAction) => {
            state.loading_getWage = false;
            state.error_getWage = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getWage = false;
        })

        builder.addCase(fetchCreateWage.pending, state => {
            state.loading_createWage = true;
            state.success_createWage = false;
            state.error_createWage = false;
        });
        builder.addCase(fetchCreateWage.fulfilled, (state) => {
            state.loading_createWage = false;
            state.success_createWage = true;
            state.error_createWage = false;
        });
        builder.addCase(fetchCreateWage.rejected, (state, action: AnyAction) => {
            state.loading_createWage = false;
            state.error_createWage = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createWage = false;
        })

        builder.addCase(fetchUpdateWage.pending, state => {
            state.loading_updateWage = true;
            state.success_updateWage = false;
            state.error_updateWage = false;
        });
        builder.addCase(fetchUpdateWage.fulfilled, (state) => {
            state.loading_updateWage = false;
            state.success_updateWage = true;
            state.error_updateWage = false;
        });
        builder.addCase(fetchUpdateWage.rejected, (state, action: AnyAction) => {
            state.loading_updateWage = false;
            state.error_updateWage = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateWage = false;
        })
        builder.addCase(fetchUpdateStatusWage.pending, state => {
            state.loading_statusWage = true;
            state.success_statusWage = false;
            state.error_statusWage = false;

        });
        builder.addCase(fetchUpdateStatusWage.fulfilled, (state) => {
            state.loading_statusWage = false;
            state.success_statusWage = true;
            state.error_statusWage = false;
        });
        builder.addCase(fetchUpdateStatusWage.rejected, (state, action: AnyAction) => {
            state.loading_statusWage = false;
            state.success_statusWage = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.error_statusWage = false;
        })
    }
})
export default wageSlice.reducer;
export const { reset } = wageSlice.actions;