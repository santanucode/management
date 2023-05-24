import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { esiReportInitDTO } from './types'
import { getEsiReport } from './esireport.request'
import { toast } from 'react-toastify'

export const initialState: esiReportInitDTO = {
  loading_getEsiReport: false,
  success_getEsiReport: false,
  error_getEsiReport: false,
  esiReportList: [],
}

export const fetchAllEsiReport = createAsyncThunk(
  'report/fetchAllEsiReport',
  async (body:any) => {
    return getEsiReport(body)
      .then((response) => {
        console.log('response esi', response)
        return response.data
      })
      .catch((error) => {
        throw toast(error.response.data)
      })
  },
)

export const esiReportSlice = createSlice({
  name: 'esireport',
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllEsiReport.pending, (state) => {
      state.loading_getEsiReport = true
      state.success_getEsiReport = false
      state.error_getEsiReport = false
    })
    builder.addCase(
      fetchAllEsiReport.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getEsiReport = false
        state.success_getEsiReport = true
        state.error_getEsiReport = false
        state.esiReportList = action.payload
      },
    )
    builder.addCase(fetchAllEsiReport.rejected, (state, action: AnyAction) => {
      state.loading_getEsiReport = false
      state.success_getEsiReport = action.error.message || 'eroor'
      state.error_getEsiReport = true
    })
  },
})

export default esiReportSlice.reducer
export const { reset } = esiReportSlice.actions
