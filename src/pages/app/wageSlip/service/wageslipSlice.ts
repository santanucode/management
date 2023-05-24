import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETWAGEPAGEDTO, WageSlipInitDTO } from "./types";
import { getAllGroup, getAllOperation, getAllWageSlip } from "./wageslip.request";
import { error } from "console";
import strings from "translation";
import { toast } from "react-toastify";

export const initialState: WageSlipInitDTO = {
    loading_getGroup: false,
    success_getGroup: false,
    error_getGroup: false,
    loading_getWageReport: false,
    success_getWageReport: false,
    error_getWageReport: false,
    loading_getOperation: false,
    success_getOperation: false,
    error_getOperation: false,
    allWageReport: []
}

export const fetchAllGroups = createAsyncThunk('master/fetchAllGroups',async () => {
    return getAllGroup()
        .then((response) => {
            console.log("response", response)
            return response?.data?.data
        })
        .catch((error) => {
            throw toast(error.response.data)
        });
})
export const fetchAllOperation = createAsyncThunk(
    "master/fetchAllOperation",
    async () => {
      return getAllOperation()
          .then((response) => {
            console.log("response",response)
          return response?.data?.data;
        })
        .catch((error) => {
          throw toast(error?.message)
        });
    });
  
export const fetchAllWageReport = createAsyncThunk('report/fetchWageSlip', async (body: GETWAGEPAGEDTO) => {
    return getAllWageSlip(body)
        .then((response) => {
            console.log("responsewage----->", response)
            return response?.data
    })
        .catch((error) => {
        throw toast(error.response.data)
    })
})

export const wageSlipSlice = createSlice({
    name: 'wageslip',
    initialState,
    reducers: {
        reset:()=>initialState,
    },
    
    extraReducers: builder => {
        builder.addCase(fetchAllWageReport.pending, state => {
            state.loading_getWageReport = true;
            state.success_getWageReport = false;
            state.error_getWageReport = false;
        });
        builder.addCase(fetchAllWageReport.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getWageReport = false;
            state.error_getWageReport = false;
            state.success_getWageReport = true;
            state.allWageReport = action.payload;
        });
        builder.addCase(fetchAllWageReport.rejected, (state, action: AnyAction) => {
            state.loading_getWageReport = false;
            state.error_getWageReport = action?.error?.message ||strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getWageReport = false;
        })
    }
})

export default wageSlipSlice.reducer;
export const { reset } = wageSlipSlice.actions;
