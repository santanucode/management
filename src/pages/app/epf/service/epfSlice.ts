import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import strings from 'translation'
import { createEpf, deleteEpf, getAllEpf, updateEpf } from './epf.request'
import { CREATEDT, INITSTDT, UPDATEDT } from './types'

export const initialState: INITSTDT = {
  loading_getEpf: false,
  success_getEpf: false,
  error_getEpf: false,
  loading_createEpf: false,
  success_createEpf: false,
  error_createEpf: false,
  loading_updateEpf: false,
  success_updateEpf: false,
  error_updateEpf: false,
  loading_deleteEpf: false,
  success_deleteEpf: false,
  error_deleteEpf: false,
  epfList: [],
}

export const fetchAllEpf = createAsyncThunk('master/fetchAllEpf', async () => {
  return getAllEpf()
    .then((response) => {
      return response?.data?.data
    })
    .catch((error) => {
      throw error?.message
    })
})
export const fetchCreateEpf = createAsyncThunk(
  'master/fetchCreateEpf',
  async (body: CREATEDT) => {
    return createEpf(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw error?.message
      })
  },
)

export const fetchUpdateEpf = createAsyncThunk(
  'master/fetchUpdateEpf',
  async (body: UPDATEDT) => {
    return updateEpf(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw error?.message
      })
  },
)
export const fetchDeleteEpf = createAsyncThunk(
  'master/fetchDeleteEpf',
  async (body: UPDATEDT) => {
    return deleteEpf(body)
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        throw error?.message
      })
  },
)

export const epfSlice = createSlice({
  name: 'epf',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEpf.pending, (state) => {
      state.loading_getEpf = true
      state.success_getEpf = false
      state.error_getEpf = false
      state.loading_updateEpf = false
      state.success_updateEpf = false
      state.error_updateEpf = false
      state.loading_createEpf = false
      state.success_createEpf = false
      state.error_createEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })
    builder.addCase(
      fetchAllEpf.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getEpf = false
        state.error_getEpf = false
        state.success_getEpf = true
        state.epfList = action.payload
        state.loading_updateEpf = false
        state.success_updateEpf = false
        state.error_updateEpf = false
        state.loading_createEpf = false
        state.success_createEpf = false
        state.error_createEpf = false
        state.loading_deleteEpf = false
        state.success_deleteEpf = false
        state.error_deleteEpf = false
      },
    )
    builder.addCase(fetchAllEpf.rejected, (state, action: AnyAction) => {
      state.loading_getEpf = false
      state.error_getEpf =
        action?.error?.message || strings['ERROR.SOMETHINGWENTWRONG']
      state.success_getEpf = false

      state.loading_updateEpf = false
      state.success_updateEpf = false
      state.error_updateEpf = false
      state.loading_createEpf = false
      state.success_createEpf = false
      state.error_createEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })

    builder.addCase(fetchCreateEpf.pending, (state) => {
      state.loading_updateEpf = false
      state.success_updateEpf = false
      state.error_updateEpf = false
      state.loading_createEpf = true
      state.success_createEpf = false
      state.error_createEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })
    builder.addCase(fetchCreateEpf.fulfilled, (state) => {
      state.loading_updateEpf = false
      state.success_updateEpf = false
      state.error_updateEpf = false
      state.loading_createEpf = false
      state.success_createEpf = true
      state.error_createEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })
    builder.addCase(fetchCreateEpf.rejected, (state, action: AnyAction) => {
      state.loading_updateEpf = false
      state.success_updateEpf = false
      state.error_updateEpf = false
      state.loading_createEpf = false
      state.error_createEpf =
        action?.error?.message || strings['ERROR.SOMETHINGWENTWRONG']
      state.success_createEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })

    builder.addCase(fetchUpdateEpf.pending, (state) => {
      state.loading_createEpf = false
      state.success_createEpf = false
      state.error_createEpf = false
      state.loading_updateEpf = true
      state.success_updateEpf = false
      state.error_updateEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })
    builder.addCase(
      fetchUpdateEpf.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_createEpf = false
        state.success_createEpf = false
        state.error_createEpf = false
        state.loading_updateEpf = false
        state.success_updateEpf = true
        state.error_updateEpf = false
        state.loading_deleteEpf = false
        state.success_deleteEpf = false
        state.error_deleteEpf = false
      },
    )
    builder.addCase(fetchUpdateEpf.rejected, (state, action: AnyAction) => {
      state.loading_createEpf = false
      state.success_createEpf = false
      state.error_createEpf = false
      state.loading_updateEpf = false
      state.error_updateEpf =
        action?.error?.message || strings['ERROR.SOMETHINGWENTWRONG']
      state.success_updateEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })
    /////////////////////////
    builder.addCase(fetchDeleteEpf.pending, (state) => {
      state.loading_createEpf = false
      state.success_createEpf = false
      state.error_createEpf = false
      state.loading_updateEpf = false
      state.success_updateEpf = false
      state.error_updateEpf = false
      state.loading_deleteEpf = true
      state.success_deleteEpf = false
      state.error_deleteEpf = false
    })
    builder.addCase(
      fetchDeleteEpf.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_createEpf = false
        state.success_createEpf = false
        state.error_createEpf = false
        state.loading_updateEpf = false
        state.success_updateEpf = false
        state.error_updateEpf = false
        state.loading_deleteEpf = false
        state.success_deleteEpf = true
        state.error_deleteEpf = false
      },
    )
    builder.addCase(fetchDeleteEpf.rejected, (state, action: AnyAction) => {
      state.loading_createEpf = false
      state.success_createEpf = false
      state.error_createEpf = false
      state.loading_updateEpf = false
      state.error_updateEpf = false
      state.success_updateEpf = false
      state.loading_deleteEpf = false
      state.success_deleteEpf =
        action?.error?.message || strings['ERROR.SOMETHINGWENTWRONG']
      state.error_deleteEpf = false
    })
  },
})
export default epfSlice.reducer
export const { reset } = epfSlice.actions
