import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createAllAttendance, deleteAttendance, getAllAttendance, getAllGroups, getAllGroupsShiftByDt, getAllShift, getAllStaff, getAttendanceById, updateAttendance } from "./attendance.request";
import { AttendanceInitDTO, GETGROUPSHIFTDTO } from "./types";

export const initialState: AttendanceInitDTO = {
  loading_getAttendance: false,
  success_getAttendance: false,
  error_getAttendance: false,
  loading_getAttendanceById: false,
  success_getAttendanceById: false,
  error_getAttendanceById: false,
  loading_createAttendance: false,
  success_createAttendance: false,
  error_createAttendance: false,
  loading_updateAttendance: false,
  success_updateAttendance: false,
  error_updateAttendance: false,
  loading_deleteAttendance: false,
  success_deleteAttendance: false,
  error_deleteAttendance: false,
  loading_getGroup: false,
  success_getGroup: false,
  error_getGroup: false,
  loading_getShift: false,
  success_getShift: false,
  error_getShift: false,
  loading_getStaff: false,
  success_getStaff: false,
  error_getStaff: false,
  loading_getGroupShift: false,
  success_getGroupShift: false,
  error_getGroupShift: false,

  allStaffList: [],
  attendanceList: [],
  attendanceDetails: [],
  allGroupShifts: []

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
export const fetchAllShift = createAsyncThunk('master/fetchAllShift', async () => {
  return getAllShift()
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
})
export const fetchAllStaff = createAsyncThunk('master/fetchAllStaff', async (id: number) => {
  return getAllStaff(id)
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
})
export const fetchAllAttendance = createAsyncThunk('master/fetchAllAttendance', async (body: any) => {
  return getAllAttendance(body)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      throw error?.message
    });
})
export const fetchAllAttendanceById = createAsyncThunk('master/fetchAllAttendanceById', async (id: number) => {
  return getAttendanceById(id)
    .then((response) => {
      return response?.data?.attendance;
    })
    .catch((error) => {
      throw error?.message
    });
})
export const fetchCreateAttendance = createAsyncThunk('master/fetchCreateAttendance', async (body: any) => {
  return createAllAttendance(body)
    .then((response) => {
      return response?.data?.data
    })
    .catch((error) => {
      throw error?.message
    })
},
)
export const fetchUpdateAttendance = createAsyncThunk('master/fetchUpdateAttendance', async (body: any) => {
  return updateAttendance(body)
    .then((response) => {
      return response?.data?.data
    })
    .catch((error) => {
      throw error?.message
    })
},
)
export const fetchDeleteAttendance = createAsyncThunk('master/fetchDeleteAttendance', async (id: number) => {
  return deleteAttendance(id)
    .then((response) => {
      return response?.data?.data
    })
    .catch((error) => {
      throw error?.message
    })
},
)
export const fetchAllGroupShift = createAsyncThunk('attendance/fetchAllGroupShift', async (value: GETGROUPSHIFTDTO) => {
  return getAllGroupsShiftByDt(value)
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
})

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {

    builder.addCase(fetchAllStaff.pending, (state) => {
      state.loading_getStaff = true
      state.success_getStaff = false
      state.error_getStaff = false
    })
    builder.addCase(fetchAllStaff.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading_getStaff = false
      state.success_getStaff = true
      state.error_getStaff = false
      state.allStaffList = action.payload;
    },
    )
    builder.addCase(fetchAllStaff.rejected, (state) => {
      state.loading_getStaff = false
      state.success_getStaff = false
      state.error_getStaff = true
    })

    builder.addCase(fetchAllAttendance.pending, state => {
      state.loading_getAttendance = true;
      state.success_getAttendance = false;
      state.error_getAttendance = false;
    });
    builder.addCase(fetchAllAttendance.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading_getAttendance = false;
      state.error_getAttendance = false;
      state.success_getAttendance = true;
      state.attendanceList = action.payload;
    });
    builder.addCase(fetchAllAttendance.rejected, (state, action: AnyAction) => {
      state.loading_getAttendance = false;
      state.error_getAttendance = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_getAttendance = false;
    })

    builder.addCase(fetchAllAttendanceById.pending, state => {
      state.loading_getAttendanceById = true;
      state.success_getAttendanceById = false;
      state.error_getAttendanceById = false;
    });
    builder.addCase(fetchAllAttendanceById.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading_getAttendanceById = false;
      state.error_getAttendanceById = false;
      state.success_getAttendanceById = true;
      state.attendanceDetails = action.payload;
    });
    builder.addCase(fetchAllAttendanceById.rejected, (state, action: AnyAction) => {
      state.loading_getAttendanceById = false;
      state.error_getAttendanceById = true;
      state.success_getAttendanceById = false;
    })

    builder.addCase(fetchCreateAttendance.pending, (state) => {
      state.loading_createAttendance = true
      state.success_createAttendance = false
      state.error_createAttendance = false
    })
    builder.addCase(fetchCreateAttendance.fulfilled, (state) => {
      state.loading_createAttendance = false
      state.success_createAttendance = true
      state.error_createAttendance = false
    })
    builder.addCase(
      fetchCreateAttendance.rejected,
      (state, action: AnyAction) => {
        state.loading_createAttendance = false
        state.error_createAttendance =
          action?.error?.message || strings['SLICE.ERROR']
        state.success_createAttendance = false
      },
    )

    builder.addCase(fetchUpdateAttendance.pending, (state) => {
      state.loading_updateAttendance = true
      state.success_updateAttendance = false
      state.error_updateAttendance = false
    })
    builder.addCase(fetchUpdateAttendance.fulfilled, (state) => {
      state.loading_updateAttendance = false
      state.success_updateAttendance = true
      state.error_updateAttendance = false
    })
    builder.addCase(
      fetchUpdateAttendance.rejected,
      (state, action: AnyAction) => {
        state.loading_updateAttendance = false
        state.error_updateAttendance =
          action?.error?.message || strings['SLICE.ERROR']
        state.success_updateAttendance = false
      },
    )

    builder.addCase(fetchDeleteAttendance.pending, (state) => {
      state.loading_deleteAttendance = true
      state.success_deleteAttendance = false
      state.error_deleteAttendance = false
    })
    builder.addCase(fetchDeleteAttendance.fulfilled, (state) => {
      state.loading_deleteAttendance = false
      state.success_deleteAttendance = true
      state.error_deleteAttendance = false
    })
    builder.addCase(
      fetchDeleteAttendance.rejected,
      (state, action: AnyAction) => {
        state.loading_deleteAttendance = false
        state.error_deleteAttendance =
          action?.error?.message || strings['SLICE.ERROR']
        state.success_deleteAttendance = false
      })

    builder.addCase(fetchAllGroupShift.pending, (state) => {
      state.loading_getGroupShift = true
      state.success_getGroupShift = false
      state.error_getGroupShift = false
    })
    builder.addCase(fetchAllGroupShift.fulfilled, (state, action: PayloadAction) => {
      state.loading_getGroupShift = false
      state.success_getGroupShift = true
      state.error_getGroupShift = false
      state.allGroupShifts = action.payload;
    })
    builder.addCase(fetchAllGroupShift.rejected, (state) => {
      state.loading_getGroupShift = false
      state.success_getGroupShift = false
      state.error_getGroupShift = true
    })
  },
})

export default attendanceSlice.reducer;
export const { reset } = attendanceSlice.actions;