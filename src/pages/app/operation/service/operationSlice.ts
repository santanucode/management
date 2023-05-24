import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import strings from "translation";
import {
  createOperation,
  getAllOperaionCategory,
  getAllOperation,
  updateOperation,
  statusOperation,
} from "./operation.request";
import { CREATEDT, INITSTDT, UPDATEDT } from "./types";

export const initialState: INITSTDT = {
  loading_getOptCat: false,
  success_getOptCat: false,
  error_getOptCat: false,

  loading_getOperation: false,
  success_getOperation: false,
  error_getOperation: false,

  loading_createOperation: false,
  success_createOperation: false,
  error_createOperation: false,

  loading_updateOperation: false,
  success_updateOperation: false,
  error_updateOperation: false,

  loading_statusOperation: false,
  success_statusOperation: false,
  error_statusOperation: false,

  operationList: [],
};

export const fetchOperationCate = createAsyncThunk(
  "master/fetchOperationCate",
  async () => {
    return getAllOperaionCategory()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchAllOperation = createAsyncThunk(
  "master/fetchAllOperation",
  async () => {
    return getAllOperation()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchCreateOperation = createAsyncThunk(
  "master/fetchCreateOperation",
  async (body: CREATEDT) => {
    return createOperation(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchUpdateOperation = createAsyncThunk(
  "master/fetchUpdateOperation",
  async (body: UPDATEDT) => {
    return updateOperation(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchStatusOperation = createAsyncThunk(
  "master/fetchstatusOperation",
  async (body: UPDATEDT) => {
    return statusOperation(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);
export const operationSlice = createSlice({
  name: "operation",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOperation.pending, (state) => {
      state.loading_getOperation = true;
      state.success_getOperation = false;
      state.error_getOperation = false;
    });
    builder.addCase(
      fetchAllOperation.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getOperation = false;
        state.error_getOperation = false;
        state.success_getOperation = true;
        state.operationList = action.payload;
      }
    );
    builder.addCase(fetchAllOperation.rejected, (state, action: AnyAction) => {
      state.loading_getOperation = false;
      state.error_getOperation =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_getOperation = false;
    });
    builder.addCase(fetchCreateOperation.pending, (state) => {
      state.loading_createOperation = true;
      state.success_createOperation = false;
      state.error_createOperation = false;
    });
    builder.addCase(fetchCreateOperation.fulfilled, (state) => {
      state.loading_createOperation = false;
      state.success_createOperation = true;
      state.error_createOperation = false;
    });
    builder.addCase(
      fetchCreateOperation.rejected,
      (state, action: AnyAction) => {
        state.loading_createOperation = false;
        state.error_createOperation =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWR  ONG"];
        state.success_createOperation = false;
      }
    );
    builder.addCase(fetchUpdateOperation.pending, (state) => {
      state.loading_updateOperation = true;
      state.success_updateOperation = false;
      state.error_updateOperation = false;
    });
    builder.addCase(fetchUpdateOperation.fulfilled, (state) => {
      state.loading_updateOperation = false;
      state.success_updateOperation = true;
      state.error_updateOperation = false;
    });
    builder.addCase(
      fetchUpdateOperation.rejected,
      (state, action: AnyAction) => {
        state.loading_updateOperation = false;
        state.error_updateOperation =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_updateOperation = false;
      }
    );

    builder.addCase(fetchStatusOperation.pending, (state) => {
      state.loading_statusOperation = true;
      state.success_statusOperation = false;
      state.error_statusOperation = false;
    });
    builder.addCase(fetchStatusOperation.fulfilled, (state) => {
      state.loading_statusOperation = false;
      state.success_statusOperation = true;
      state.error_statusOperation = false;
    });
    builder.addCase(
      fetchStatusOperation.rejected,
      (state, action: AnyAction) => {
        state.loading_statusOperation = false;
        state.error_statusOperation =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_statusOperation = false;
      }
    );
  },
});
export default operationSlice.reducer;
export const { reset } = operationSlice.actions;
