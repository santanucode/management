import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createIncentive, updateStatusIncentive, getAllIncentive, updateIncentive, getAllOperaionCategory } from "./incentive.request";
import { CREATEDT, INITSTDT, UPDATEDT } from "./types";

export const initialState: INITSTDT = {
    loading_getOperation: false,
    success_getOperation: false,
    error_getOperation: false,

    loading_getIncentive: false,
    success_getIncentive: false,
    error_getIncentive: false,
    loading_createIncentive: false,
    success_createIncentive: false,
    error_createIncentive: false,

    loading_updateIncentive: false,
    success_updateIncentive: false,
    error_updateIncentive: false,
    loading_statusIncentive: false,
    success_statusIncentive: false,
    error_statusIncentive: false,
    incentiveList: []
}

export const fetchOperationCate = createAsyncThunk('master/fetchOperationCate', async () => {
    return getAllOperaionCategory()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error.response.data;
        });
})

export const fetchAllIncentive = createAsyncThunk('master/fetchAllIncentive', async () => {
    return getAllIncentive()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})
export const fetchCreateIncentive = createAsyncThunk('master/fetchCreateIncentive', async (body: CREATEDT) => {
    return createIncentive(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})

export const fetchUpdateIncentive = createAsyncThunk('master/fetchUpdateIncentive', async (body: UPDATEDT) => {
    return updateIncentive(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})
export const fetchUpdateStatusIncentive = createAsyncThunk(
    'master/fetchUpdateStatusIncentive',
    async (body: UPDATEDT) => {
    return updateStatusIncentive(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})

export const incentiveSlice = createSlice({
    name: 'incentive',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {

        builder.addCase(fetchAllIncentive.pending, state => {
            state.loading_getIncentive = true;
            state.success_getIncentive = false;
            state.error_getIncentive = false;

            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        });
        builder.addCase(fetchAllIncentive.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getIncentive = false;
            state.error_getIncentive = false;
            state.success_getIncentive = true;
            state.incentiveList = action.payload;

            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        });
        builder.addCase(fetchAllIncentive.rejected, (state, action: AnyAction) => {
            state.loading_getIncentive = false;
            state.error_getIncentive = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getIncentive = false;
            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        })

        builder.addCase(fetchCreateIncentive.pending, state => {
            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_createIncentive = true;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        });
        builder.addCase(fetchCreateIncentive.fulfilled, (state) => {
            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_createIncentive = false;
            state.success_createIncentive = true;
            state.error_createIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        });
        builder.addCase(fetchCreateIncentive.rejected, (state, action: AnyAction) => {
            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_createIncentive = false;
            state.error_createIncentive = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        })

        builder.addCase(fetchUpdateIncentive.pending, state => {
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_updateIncentive = true;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        });
        builder.addCase(fetchUpdateIncentive.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_updateIncentive = false;
            state.success_updateIncentive = true;
            state.error_updateIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        });
        builder.addCase(fetchUpdateIncentive.rejected, (state, action: AnyAction) => {
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_updateIncentive = false;
            state.error_updateIncentive = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;
        })

        builder.addCase(fetchUpdateStatusIncentive.pending, state => {
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_statusIncentive = true;
            state.success_statusIncentive = false;
            state.error_statusIncentive = false;

        });
        builder.addCase(fetchUpdateStatusIncentive.fulfilled, (state) => {
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_updateIncentive = false;
            state.success_updateIncentive = false;
            state.error_updateIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = true;
            state.error_statusIncentive = false;
        });
        builder.addCase(fetchUpdateStatusIncentive.rejected, (state, action: AnyAction) => {
            state.loading_createIncentive = false;
            state.success_createIncentive = false;
            state.error_createIncentive = false;
            state.loading_updateIncentive = false;
            state.error_updateIncentive = false;
            state.success_updateIncentive = false;
            state.loading_statusIncentive = false;
            state.success_statusIncentive = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.error_statusIncentive = false;
        })
    }
})

export default incentiveSlice.reducer;
export const { reset } = incentiveSlice.actions;