import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getEpfReport } from "./epfreport.request"
import { epfReportInitDTO } from "./types"
import { toast } from "react-toastify"

export const initialState:epfReportInitDTO = {
    loading_getEpfReport :false,
    success_getEpfReport : false,
    error_getEpfReport: false,
    epfReportList : []
}

export const fetchAllEpfReport = createAsyncThunk('report/fetchAllEpfReport',
    async (body: any) => {
    return getEpfReport(body)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw toast(error.response.data);
    })
})

export const epfReportSlice = createSlice({
    name: 'epfreport',
    initialState,
    reducers: {
        reset:()=> initialState,
    },

    extraReducers: builder => {
        builder.addCase(fetchAllEpfReport.pending, state => {
            state.loading_getEpfReport = true;
            state.success_getEpfReport = false;
            state.error_getEpfReport = false;
        });
        builder.addCase(fetchAllEpfReport.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getEpfReport = false;
            state.success_getEpfReport = true;
            state.error_getEpfReport = false;
            state.epfReportList = action.payload
        });
        builder.addCase(fetchAllEpfReport.rejected, (state, action:AnyAction) => {
            state.loading_getEpfReport = false;
            state.success_getEpfReport = action.error.message || "eroor";
            state.error_getEpfReport = true;
        })
    }
})

export default epfReportSlice.reducer;
export const { reset } = epfReportSlice.actions;