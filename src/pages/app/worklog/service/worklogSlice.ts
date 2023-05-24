import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import strings from 'translation';
import { SHIFTBODYDTO, STAFFBODYDTO, WORKLOGINITSTATEDTO } from './types';
import {
  getAllStaffByShift,
  createAllWorklog,
  updateAllWorklog,
  getWorklogs,
  getAllOperation,
  getShiftByDate,
  getAllShift,
  createDraftAllWorklog,
  updateStatusWorklog
} from './worklog.request'
import { toast } from 'react-toastify';

export const initialState: WORKLOGINITSTATEDTO = {
  loading_getOperation: false,
  success_getOperation: false,
  error_getOperation: false,
  loading_getWorklog: false,
  success_getWorklog: false,
  error_getWorklog: false,
  loading_createtWorklog: false,
  success_createtWorklog: false,
  error_createtWorklog: false,
  loading_createtDraftWorklog: false,
  success_createtDraftWorklog: false,
  error_createtDraftWorklog: false,
  loading_updatetWorklog: false,
  success_updatetWorklog: false,
  error_updatetWorklog: false,
  loading_updatetStatusWorklog: false,
  success_updatetStatusWorklog: false,
  error_updatetStatusWorklog: false,
  loading_getAllShift: false,
  success_getAllShift: false,
  error_getAllShift: false,
  loading_getShift: false,
  success_getShift: false,
  error_getShift: false,
  loading_getStaff: false,
  success_getStaff: false,
  error_getStaff: false,
  worklogList: [],
  allShiftList: [],
  shiftList: [],
  staffList: [],
  operationList: []
}
export const fetchWorklogShift = createAsyncThunk(
  'worklog/fetchWorklogShift',
  async (body: SHIFTBODYDTO) => {
    return getShiftByDate(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast(error.response.data)
      })
  },
)
export const fetchAllShift = createAsyncThunk(
  'worklog/fetchAllShift',
  async () => {
    return getAllShift()
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast(error.response.data)
      })
  },
)
export const fetchWorklogStaff = createAsyncThunk(
  'worklog/fetchWorklogStaff',
  async (body: STAFFBODYDTO) => {
    return getAllStaffByShift(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast(error.response.data)
      })
  },
)
export const fetchAllOperation = createAsyncThunk(
  'worklog/fetchWorklogOperation',
  async () => {
    return getAllOperation()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw toast(error.response.data)
      });
  })
export const fetchWorklogs = createAsyncThunk(
  'worklog/fetchWorklogs',
  async (body: any) => {
    return getWorklogs(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast(error.response.data)
      })
  },
)
export const fetchCreateWorklog = createAsyncThunk(
  'worklog/fetchCreateWorklog',
  async (body: any) => {
    return createAllWorklog(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast.warn(error?.message)
      })
  },
)
export const fetchCreateDraftWorklog = createAsyncThunk(
  'worklog/fetchCreateDraftWorklog',
  async (body: any) => {
    return createDraftAllWorklog(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast(error?.message)
      })
  },
)
export const fetchUpdateWorklog = createAsyncThunk(
  'worklog/fetchUpdateWorklog',
  async (body: any) => {
    return updateAllWorklog(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast(error?.message)
      })
  },
)
export const fetchUpdateStatusWorklog = createAsyncThunk(
  'worklog/fetchUpdateStatusWorklog',
  async (id: number) => {
    return updateStatusWorklog(id)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw toast(error?.message)
      })
  },
)

export const worklogSlice = createSlice({
  name: 'worklog',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchWorklogShift.pending, (state) => {
      state.loading_getShift = true
      state.success_getShift = false
      state.error_getShift = false
    })
    builder.addCase(
      fetchWorklogShift.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getShift = false
        state.error_getShift = false
        state.success_getShift = true
        state.shiftList = action.payload
      },
    )
    builder.addCase(
      fetchWorklogShift.rejected, (state, action: AnyAction) => {
      state.loading_getShift = false
      state.error_getShift = action?.error?.message
      state.success_getShift = false
    })
    builder.addCase(
      fetchAllShift.pending, (state) => {
      state.loading_getAllShift = true
      state.success_getAllShift = false
      state.error_getAllShift = false
    })
    builder.addCase(
      fetchAllShift.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getAllShift = false
        state.error_getAllShift = false
        state.success_getAllShift = true
        state.allShiftList = action.payload
      },
    )
    builder.addCase(
      fetchAllShift.rejected, (state, action: AnyAction) => {
      state.loading_getAllShift = false
      state.error_getAllShift = action?.error?.message
      state.success_getAllShift = false
    })
    builder.addCase(
      fetchWorklogStaff.pending, (state) => {
      state.loading_getStaff = true
      state.success_getStaff = false
      state.error_getStaff = false
    })
    builder.addCase(
      fetchWorklogStaff.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getStaff = false
        state.error_getStaff = false
        state.success_getStaff = true
        state.staffList = action.payload
      },
    )
    builder.addCase(
      fetchWorklogStaff.rejected, (state, action: AnyAction) => {
      state.loading_getStaff = false
      state.error_getStaff = action?.error?.message
      state.success_getStaff = false
    })
    builder.addCase(
      fetchAllOperation.pending, (state) => {
      state.loading_getOperation = true
      state.success_getOperation = false
      state.error_getOperation = false
    })
    builder.addCase(
      fetchAllOperation.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getOperation = false
        state.error_getOperation = false
        state.success_getOperation = true
        state.operationList = action.payload
      },
    )
    builder.addCase(
      fetchAllOperation.rejected, (state, action: AnyAction) => {
      state.loading_getOperation = false
      state.error_getOperation = action?.error?.message
      state.success_getOperation = false
    })
    builder.addCase(
      fetchWorklogs.pending, (state) => {
      state.loading_getWorklog = true
      state.success_getWorklog = false
      state.error_getWorklog = false
    })
    builder.addCase(
      fetchWorklogs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getWorklog = false
        state.error_getWorklog = false
        state.success_getWorklog = true
        state.worklogList = action.payload
      },
    )
    builder.addCase(
      fetchWorklogs.rejected, (state, action: AnyAction) => {
      state.loading_getWorklog = false
      state.error_getWorklog = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"]
      state.success_getWorklog = false
    })
    builder.addCase(
      fetchCreateWorklog.pending, (state) => {
      state.loading_createtWorklog = true
      state.success_createtWorklog = false
      state.error_createtWorklog = false
    })
    builder.addCase(
      fetchCreateWorklog.fulfilled, (state) => {
      state.loading_createtWorklog = false
      state.success_createtWorklog = true
      state.error_createtWorklog = false
    })
    builder.addCase(
      fetchCreateWorklog.rejected, (state, action: AnyAction) => {
      state.loading_createtWorklog = false
      state.error_createtWorklog =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"]
      state.success_createtWorklog = false
    })
    builder.addCase(
      fetchCreateDraftWorklog.pending, (state) => {
      state.loading_createtDraftWorklog = true
      state.success_createtDraftWorklog = false
      state.error_createtDraftWorklog = false
    })
    builder.addCase(
      fetchCreateDraftWorklog.fulfilled, (state) => {
      state.loading_createtDraftWorklog = false
      state.success_createtDraftWorklog = true
      state.error_createtDraftWorklog = false
    })
    builder.addCase(
      fetchCreateDraftWorklog.rejected, (state, action: AnyAction) => {
      state.loading_createtDraftWorklog = false
      state.error_createtDraftWorklog =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"]
      state.success_createtDraftWorklog = false
    })
    builder.addCase(
      fetchUpdateWorklog.pending, (state) => {
      state.loading_updatetWorklog = true
      state.success_updatetWorklog = false
      state.error_updatetWorklog = false
    })
    builder.addCase(
      fetchUpdateWorklog.fulfilled, (state) => {
      state.loading_updatetWorklog = false
      state.success_updatetWorklog = true
      state.error_updatetWorklog = false
    })
    builder.addCase(
      fetchUpdateWorklog.rejected, (state, action: AnyAction) => {
      state.loading_updatetWorklog = false
      state.error_updatetWorklog =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"]
      state.success_updatetWorklog = false
    })
    builder.addCase(
      fetchUpdateStatusWorklog.pending, (state) => {
      state.loading_updatetStatusWorklog = true
      state.success_updatetStatusWorklog = false
      state.error_updatetStatusWorklog = false
    })
    builder.addCase(
      fetchUpdateStatusWorklog.fulfilled, (state) => {
      state.loading_updatetStatusWorklog = false
      state.success_updatetStatusWorklog = true
      state.error_updatetStatusWorklog = false
    })
    builder.addCase(
      fetchUpdateStatusWorklog.rejected, (state, action: AnyAction) => {
      state.loading_updatetStatusWorklog = false
      state.error_updatetStatusWorklog =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"]
      state.success_updatetStatusWorklog = false
    })
  },
})
export default worklogSlice.reducer
export const { reset } = worklogSlice.actions
