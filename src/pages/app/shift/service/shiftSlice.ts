import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import strings from "translation";
import {
  createReviseShift,
  createShift,
  getAllShift,
  updateReviseShift,
  updateShift,
  updateStatusShift,
} from "./shift.request";
import { CREATESHIFTDT, ShiftInitStateDTO } from "./types";

export const initialState: ShiftInitStateDTO = {
  loading_getShift: false,
  success_getShift: false,
  error_getShift: false,
  loading_createShift: false,
  success_createShift: false,
  error_createShift: false,
  loading_updateShift: false,
  success_updateShift: false,
  error_updateShift: false,
  error_updateStatusShift: false,
  loading_updateStatusShift: false,
  success_updateStatusShift: false,
  error_createReviseShift: false,
  loading_createReviseShift: false,
  success_createReviseShift: false,
  error_updateReviseShift: false,
  loading_updateReviseShift: false,
  success_updateReviseShift: false,
  shiftList: [],
};

export const fetchAllShift = createAsyncThunk(
  "master/fetchAllShift",
  async () => {
    return getAllShift()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
);
export const fetchCreateShift = createAsyncThunk(
  "master/fetchCreateShift",
  async (body: CREATESHIFTDT) => {
    return createShift(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);
export const fetchUpdateshift = createAsyncThunk(
  "master/fetchUpdateshift",
  async (body: any) => {
    return updateShift(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        console.log(error);
        throw error?.message;
      });
  }
);
export const fetchUpdateStatusshift = createAsyncThunk(
  "master/fetchUpdateStatusshift",
  async (body: any) => {
    return updateStatusShift(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        console.log(error);
        throw error?.message;
      });
  }
);
export const fetchCreateReviseshift = createAsyncThunk(
  "master/fetchCreateReviseshift",
  async (body: any) => {
    return createReviseShift(body)
      .then((response) => {
        console.log("response?.data?.data", response?.data?.data);
        return response?.data?.data;
      })
      .catch((error) => {
        console.log("error", error?.message);
        throw error?.message;
      });
  }
);

export const fetchUpdateReviseshift = createAsyncThunk(
  "master/fetchUpdateReviseshift",
  async (body: any) => {
    return updateReviseShift(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        console.log("error", error?.message);
        throw error?.message;
      });
  }
);

export const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllShift.pending, (state) => {
      state.loading_getShift = true;
      state.success_getShift = false;
      state.error_getShift = false;
    });
    builder.addCase(
      fetchAllShift.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getShift = false;
        state.error_getShift = false;
        state.success_getShift = true;
        state.shiftList = action.payload;
      }
    );
    builder.addCase(fetchAllShift.rejected, (state, action: AnyAction) => {
      state.loading_getShift = false;
      state.error_getShift =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_getShift = false;
    });
    builder.addCase(fetchCreateShift.pending, (state) => {
      state.loading_createShift = true;
      state.success_createShift = false;
      state.error_createShift = false;
    });
    builder.addCase(
      fetchCreateShift.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_createShift = false;
        state.success_createShift = true;
        state.error_createShift = false;
      }
    );
    builder.addCase(fetchCreateShift.rejected, (state, action: AnyAction) => {
      state.loading_createShift = false;
      state.error_createShift =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_createShift = false;
    });
    builder.addCase(fetchUpdateshift.pending, (state) => {
      state.loading_updateShift = true;
      state.success_updateShift = false;
      state.error_updateShift = false;
    });
    builder.addCase(
      fetchUpdateshift.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_updateShift = false;
        state.success_updateShift = true;
        state.error_updateShift = false;
      }
    );
    builder.addCase(fetchUpdateshift.rejected, (state, action: AnyAction) => {
      state.loading_updateShift = false;
      state.error_updateShift =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_updateShift = false;
    });
    builder.addCase(fetchUpdateStatusshift.pending, (state) => {
      state.loading_updateStatusShift = true;
      state.success_updateStatusShift = false;
      state.error_updateStatusShift = false;
    });
    builder.addCase(fetchUpdateStatusshift.fulfilled, (state) => {
      state.loading_updateStatusShift = false;
      state.success_updateStatusShift = true;
      state.error_updateStatusShift = false;
    });
    builder.addCase(
      fetchUpdateStatusshift.rejected,
      (state, action: AnyAction) => {
        state.loading_updateStatusShift = false;
        state.success_updateStatusShift = false;
        state.error_updateStatusShift =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      }
    );
    builder.addCase(fetchCreateReviseshift.pending, (state) => {
      state.loading_createReviseShift = true;
      state.success_createReviseShift = false;
      state.error_createReviseShift = false;
    });
    builder.addCase(fetchCreateReviseshift.fulfilled, (state) => {
      state.loading_createReviseShift = false;
      state.success_createReviseShift = true;
      state.error_createReviseShift = false;
    });
    builder.addCase(
      fetchCreateReviseshift.rejected,
      (state, action: AnyAction) => {
        state.loading_createReviseShift = false;
        state.error_createReviseShift =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_createReviseShift = false;
      }
    );

    builder.addCase(fetchUpdateReviseshift.pending, (state) => {
      state.loading_updateReviseShift = true;
      state.success_updateReviseShift = false;
      state.error_updateReviseShift = false;
    });
    builder.addCase(fetchUpdateReviseshift.fulfilled, (state) => {
      state.loading_updateReviseShift = false;
      state.success_updateReviseShift = true;
      state.error_updateReviseShift = false;
    });
    builder.addCase(
      fetchUpdateReviseshift.rejected,
      (state, action: AnyAction) => {
        state.loading_updateReviseShift = false;
        state.error_updateReviseShift =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_updateReviseShift = false;
      }
    );
  },
});
export default shiftSlice.reducer;
export const { reset } = shiftSlice.actions;
