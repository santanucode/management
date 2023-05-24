import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import strings from "translation";
import {
  createOperaionCategory,
  getAllOperaionCategory,
  updateOperaionCategory,
  updateOperaionStatusCategory,
} from "./operationCate.request";
import {
  CREATEOPTCATDT,
  OperationCatInitStateDTO,
  UPDATEOPTCATDT,
} from "./types";

export const initialState: OperationCatInitStateDTO = {
  error_getOptCat: false,
  loading_getOptCat: false,
  success_getOptCat: false,
  error_createOptCat: false,
  loading_createOptCat: false,
  success_createOptCat: false,
  error_updateOptCat: false,
  loading_updateOptCat: false,
  success_updateOptCat: false,
  loading_updateOptStatusCat: false,
  success_updateOptStatusCat: false,
  error_updateOptStatusCat: false,
  opertionCategory: [],
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
export const fetchCreateOperationCate = createAsyncThunk(
  "master/fetchCreateOperationCate",
  async (body: CREATEOPTCATDT) => {
    return createOperaionCategory(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);
export const fetchUpdateOperationCate = createAsyncThunk(
  "master/fetchUpdateOperationCate",
  async (body: UPDATEOPTCATDT) => {
    console.log("body",body)
    return updateOperaionCategory(body)
      .then((response) => {
        console.log("response---2",response)
        return response?.data?.data;
      })
      .catch((error) => {
        console.log("error?.message;",error?.message)
        throw error?.message;
      });
  }
);
export const fetchUpdateOperationStatusCate = createAsyncThunk(
  "master/fetchUpdateOperationStatusCate",
  async (body: UPDATEOPTCATDT) => {
    return updateOperaionStatusCategory(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);
export const operationCateSlice = createSlice({
  name: "operationCategory",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOperationCate.pending, (state) => {
      state.loading_getOptCat = true;
      state.success_getOptCat = false;
      state.error_getOptCat = false;
    });
    builder.addCase(
      fetchOperationCate.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getOptCat = false;
        state.success_getOptCat = true;
        state.error_getOptCat = false;
        state.opertionCategory = action.payload;
      }
    );
    builder.addCase(fetchOperationCate.rejected, (state, action: AnyAction) => {
      state.loading_getOptCat = false;
      state.success_getOptCat = false;
      state.error_getOptCat =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
    });
    builder.addCase(fetchCreateOperationCate.pending, (state) => {
      state.loading_createOptCat = true;
      state.success_createOptCat = false;
      state.error_createOptCat = false;
    });
    builder.addCase(
      fetchCreateOperationCate.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_createOptCat = false;
        state.success_createOptCat = true;
        state.error_createOptCat = false;
      }
    );
    builder.addCase(
      fetchCreateOperationCate.rejected,
      (state, action: AnyAction) => {
        state.loading_createOptCat = false;
        state.error_createOptCat =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_createOptCat = false;
      }
    );
    builder.addCase(fetchUpdateOperationCate.pending, (state) => {
      state.loading_updateOptCat = true;
      state.success_updateOptCat = false;
      state.error_updateOptCat = false;
    });
    builder.addCase(
      fetchUpdateOperationCate.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_updateOptCat = false;
        state.success_updateOptCat = true;
        state.error_updateOptCat = false;
      }
    );
    builder.addCase(
      fetchUpdateOperationCate.rejected,
      (state, action: AnyAction) => {
        state.loading_updateOptCat = false;
        state.error_updateOptCat =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_updateOptCat = false;
      }
    );
    builder.addCase(fetchUpdateOperationStatusCate.pending, (state) => {
      state.loading_updateOptStatusCat = true;
      state.success_updateOptStatusCat = false;
      state.error_updateOptStatusCat = false;
    });
    builder.addCase(
      fetchUpdateOperationStatusCate.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_updateOptStatusCat = false;
        state.success_updateOptStatusCat = true;
        state.error_updateOptStatusCat = false;
      }
    );
    builder.addCase(
      fetchUpdateOperationStatusCate.rejected,
      (state, action: AnyAction) => {
        state.loading_updateOptStatusCat = false;
        state.error_updateOptStatusCat =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_updateOptStatusCat = false;
      }
    );
  },
});
export default operationCateSlice.reducer;
export const { reset } = operationCateSlice.actions;
