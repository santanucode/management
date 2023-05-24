import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { getAllGroups, getAttendanceReport } from "./attendancereport.request";
import { AttendanceReportInitDTO, GETATTENDANCEDTO } from "./types";
import { toast } from "react-toastify";

export const initialState: AttendanceReportInitDTO = {
    loading_getGroup: false,
    success_getGroup: false,
    error_getGroup: false,
    loading_getAttendanceReport: false,
    success_getAttendanceReport: false,
    error_getAttendanceReport: false,
    attendanceReportList: []
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

export const fetchAllAttendanceReport = createAsyncThunk('report/fetchAllAttendanceReport', async (body: GETATTENDANCEDTO) => {
    
    return getAttendanceReport(body)
        .then((response) => {
            console.log("responseaaa",response)
            return response?.data;
        })
        .catch((error) => {
            throw toast(error.response.data)
        });
})
export const attendanceReportSlice = createSlice({
    name: 'attendancereport',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(fetchAllAttendanceReport.pending, state => {
            state.loading_getAttendanceReport = true;
            state.success_getAttendanceReport = false;
            state.error_getAttendanceReport = false;
        });
        builder.addCase(fetchAllAttendanceReport.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading_getAttendanceReport = false;
            state.error_getAttendanceReport = false;
            state.success_getAttendanceReport = true;
            state.attendanceReportList = action.payload;
        });
        builder.addCase(fetchAllAttendanceReport.rejected, (state, action: AnyAction) => {
            state.loading_getAttendanceReport = false;
            state.error_getAttendanceReport = action?.error?.message ||strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getAttendanceReport = false;
        })
    }
})
export default attendanceReportSlice.reducer;
export const { reset } = attendanceReportSlice.actions;