import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETMUSTERDTO, MusterRollInitDTO } from "./types";
import { getAllGroup, getAllMusterRoll } from "./musterroll.request";
import strings from "translation";

export const initialState:MusterRollInitDTO = {
    loading_getGroup: false,
    success_getGroup: false,
    error_getGroup: false,
    loading_getMusterRoll: false,
    success_getMusterRoll: false,
    error_getMusterRoll: false,
    allMusterRoll: []
}
export const fetchAllGroups = createAsyncThunk('master/fetchAllGroups',async () => {
    return getAllGroup()
        .then((response) => {
            console.log("response", response)
            return response?.data?.data
        })
        .catch((error) => {
            throw error.response.data;
        });
})

export const fetchAllMusterRoll = createAsyncThunk('report/fetchMusterRoll', async (body: GETMUSTERDTO) => {
    return getAllMusterRoll(body)
        .then((response) => {
            console.log("responsewagemusterroll", response)
            return response?.data
    })
        .catch((error) => {
        throw error.response.data
    })
})


export const MusterRollSlice = createSlice({
    name: 'musterRoll',
    initialState,
    reducers: {
        reset:()=>initialState,
    },
    extraReducers: builder => {
        builder.addCase(fetchAllMusterRoll.pending, state => {
            state.loading_getMusterRoll = true;
            state.success_getMusterRoll = false;
            state.error_getMusterRoll = false;
        });
        builder.addCase(fetchAllMusterRoll.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getMusterRoll = false;
            state.error_getMusterRoll = false;
            state.success_getMusterRoll = true;
            state.allMusterRoll = action.payload;
        });
        builder.addCase(fetchAllMusterRoll.rejected, (state, action: AnyAction) => {
            state.loading_getMusterRoll = false;
            state.error_getMusterRoll = action?.error?.message ||strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getMusterRoll = false;
        })
    }
})

export default MusterRollSlice.reducer;
export const { reset } = MusterRollSlice.actions;