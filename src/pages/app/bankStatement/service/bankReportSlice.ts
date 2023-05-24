import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import strings from 'translation'
import { getAllBanks, getAllBankReport } from './bankReport.request'
import { BankReportInitStateDTO } from './types'
import { toast } from 'react-toastify'

export const initialState: any = {
  loading_getBank: false,
  success_getBank: false,
  error_getBank: false,
  error_getBankReport: false,
  loading_getBankReport: false,
  success_getBankReport: false,
  bankReportList: [],
}

export const fetchAllBanks = createAsyncThunk(
  'master/fetchAllBanks',
  async () => {
    return getAllBanks()
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw error.response.data
      })
  },
)

export const fetchBankReports = createAsyncThunk(
  'master/fetchBankReports',
  async (body:any) => {
    return getAllBankReport(body)
      .then((response) => {
        console.log(response,"response")
        return response?.data
      })
      .catch((error) => {
        console.log(error, "error")
        throw toast(error.response.data)
      })
  },
)

export const bankReportSlice = createSlice({
  name: 'banksreports',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBankReports.pending, (state) => {
      state.loading_getBankReport = true
      state.success_getBankReport = false
      state.error_getBankReport = false
    })
    builder.addCase(
      fetchBankReports.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getBankReport = false
        state.error_getBankReport = false
        state.success_getBankReport = true
        state.bankReportList = action.payload
      },
    )
    builder.addCase(fetchBankReports.rejected, (state, action: AnyAction) => {
      state.loading_getBankReport = false
      state.error_getBankReport =
        action?.error?.message || strings['ERROR.SOMETHINGWENTWRONG']
      state.success_getBankReport = false
    })
  },
})
export default bankReportSlice.reducer
export const { reset } = bankReportSlice.actions
