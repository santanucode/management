import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createEsi, deleteEsi, getAllEsi, updateEsi } from "./esi.request";
import { CREATEDT, INITSTDT, UPDATEDT } from "./types";

export const initialState: INITSTDT = {
    loading_getEsi: false,
    success_getEsi: false,
    error_getEsi: false,
    loading_createEsi: false,
    success_createEsi: false,
    error_createEsi: false,
    loading_updateEsi: false,
    success_updateEsi: false,
    error_updateEsi: false,
    loading_deleteEsi: false,
    success_deleteEsi: false,
    error_deleteEsi: false,
    esiList: []
}

export const fetchAllEsi = createAsyncThunk('master/fetchAllEsi', async () => {
    return getAllEsi()
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error.response.data;
        });
})
export const fetchCreateEsi = createAsyncThunk('master/fetchCreateEsi', async (body: CREATEDT) => {
    return createEsi(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
          throw error?.message;
        });
})

export const fetchUpdateEsi = createAsyncThunk('master/fetchUpdateEsi', async (body: UPDATEDT) => {
    return updateEsi(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
          throw error?.message;
        });
})
export const fetchDeleteEsi = createAsyncThunk('master/fetchDeleteEsi', async (body: UPDATEDT) => {
    return deleteEsi(body)
        .then((response: any) => {
            return response?.data?.data;
        })
        .catch((error: any) => {
            throw error?.message;
        });
})

export const esiSlice = createSlice({
    name: 'esi',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {

        builder.addCase(fetchAllEsi.pending, state => {
            state.loading_getEsi = true;
            state.success_getEsi = false;
            state.error_getEsi = false;

            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        });
        builder.addCase(fetchAllEsi.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getEsi = false;
            state.error_getEsi = false;
            state.success_getEsi = true;
            state.esiList = action.payload;

            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        });
        builder.addCase(fetchAllEsi.rejected, (state, action: AnyAction) => {
            state.loading_getEsi = false;
            state.error_getEsi = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getEsi = false;

            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        })

        builder.addCase(fetchCreateEsi.pending, state => {
            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_createEsi = true;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        });
        builder.addCase(fetchCreateEsi.fulfilled, (state) => {
            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_createEsi = false;
            state.success_createEsi = true;
            state.error_createEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        });
        builder.addCase(fetchCreateEsi.rejected, (state, action: AnyAction) => {
            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_createEsi = false;
            state.error_createEsi = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        })

        builder.addCase(fetchUpdateEsi.pending, state => {
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_updateEsi = true;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        });
        builder.addCase(fetchUpdateEsi.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_updateEsi = false;
            state.success_updateEsi = true;
            state.error_updateEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        });
        builder.addCase(fetchUpdateEsi.rejected, (state, action: AnyAction) => {
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_updateEsi = false;
            state.error_updateEsi = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;
        })
        builder.addCase(fetchDeleteEsi.pending, state => {
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_deleteEsi = true;
            state.success_deleteEsi = false;
            state.error_deleteEsi = false;

        });
        builder.addCase(fetchDeleteEsi.fulfilled, (state) => {
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_updateEsi = false;
            state.success_updateEsi = false;
            state.error_updateEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = true;
            state.error_deleteEsi = false;
        });
        builder.addCase(fetchDeleteEsi.rejected, (state, action: AnyAction) => {
            state.loading_createEsi = false;
            state.success_createEsi = false;
            state.error_createEsi = false;
            state.loading_updateEsi = false;
            state.error_updateEsi = false;
            state.success_updateEsi = false;
            state.loading_deleteEsi = false;
            state.success_deleteEsi = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.error_deleteEsi = false;
        })
    }
})
export default esiSlice.reducer;
export const { reset } = esiSlice.actions;