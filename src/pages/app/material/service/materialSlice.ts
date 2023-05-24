import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import strings from "translation";
import {
  createMaterial,
  getAllMaterials,
  statusChangeMaterial,
  updateMaterial,
} from "./material.request";
import { CREATEMATERIALDT, INITSTATEDT, UPDATEMATERIALDT } from "./types";

export const initialState: INITSTATEDT = {
  loading_getMaterial: false,
  success_getMaterial: false,
  error_getMaterial: false,

  loading_createMaterial: false,
  success_createMaterial: false,
  error_createMaterial: false,

  loading_updateMaterial: false,
  success_updateMaterial: false,
  error_updateMaterial: false,

  loading_statusMaterial: false,
  success_statusMaterial: false,
  error_statusMaterial: false,
  materialList: [],
};

export const fetchAllMaterial = createAsyncThunk(
  "master/fetchAllMaterial",
  async () => {
    return getAllMaterials()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
);
export const fetchCreateMaterial = createAsyncThunk(
  "master/fetchCreateMaterial",
  async (body: CREATEMATERIALDT) => {
    return createMaterial(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchUpdateMaterial = createAsyncThunk(
  "master/fetchUpdateMaterial",
  async (body: UPDATEMATERIALDT) => {
    return updateMaterial(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchStatusChangeMaterial = createAsyncThunk(
  "master/fetchStatusChangeMaterial",
  async (body: UPDATEMATERIALDT) => {
    return statusChangeMaterial(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMaterial.pending, (state) => {
      state.loading_getMaterial = true;
      state.success_getMaterial = false;
      state.error_getMaterial = false;

      state.loading_statusMaterial = false;
      state.success_statusMaterial = false;
      state.error_statusMaterial = false;

      state.loading_createMaterial = false;
      state.success_createMaterial = false;
      state.error_createMaterial = false;

      state.loading_updateMaterial = false;
      state.success_updateMaterial = false;
      state.error_updateMaterial = false;
    });
    builder.addCase(
      fetchAllMaterial.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getMaterial = false;
        state.error_getMaterial = false;
        state.success_getMaterial = true;
        state.materialList = action.payload;
        state.loading_statusMaterial = false;
        state.success_statusMaterial = false;
        state.error_statusMaterial = false;
        state.loading_createMaterial = false;
        state.success_createMaterial = false;
        state.error_createMaterial = false;
        state.loading_updateMaterial = false;
        state.success_updateMaterial = false;
        state.error_updateMaterial = false;
      }
    );
    builder.addCase(fetchAllMaterial.rejected, (state, action: AnyAction) => {
      state.loading_getMaterial = false;
      state.error_getMaterial =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_getMaterial = false;
      state.loading_statusMaterial = false;
      state.success_statusMaterial = false;
      state.error_statusMaterial = false;
      state.loading_createMaterial = false;
      state.success_createMaterial = false;
      state.error_createMaterial = false;
      state.loading_updateMaterial = false;
      state.success_updateMaterial = false;
      state.error_updateMaterial = false;
    });

    builder.addCase(fetchCreateMaterial.pending, (state) => {
      state.loading_createMaterial = true;
      state.success_createMaterial = false;
      state.error_createMaterial = false;
      state.loading_updateMaterial = false;
      state.success_updateMaterial = false;
      state.error_updateMaterial = false;
      state.loading_statusMaterial = false;
      state.success_statusMaterial = false;
      state.error_statusMaterial = false;
    });
    builder.addCase(
      fetchCreateMaterial.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_createMaterial = false;
        state.success_createMaterial = true;
        state.error_createMaterial = false;
        state.loading_updateMaterial = false;
        state.success_updateMaterial = false;
        state.error_updateMaterial = false;
        state.loading_statusMaterial = false;
        state.success_statusMaterial = false;
        state.error_statusMaterial = false;
      }
    );
    builder.addCase(
      fetchCreateMaterial.rejected,
      (state, action: AnyAction) => {
        state.loading_createMaterial = false;
        state.error_createMaterial =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_createMaterial = false;
        state.loading_updateMaterial = false;
        state.success_updateMaterial = false;
        state.error_updateMaterial = false;
        state.loading_statusMaterial = false;
        state.success_statusMaterial = false;
        state.error_statusMaterial = false;
      }
    );

    builder.addCase(fetchUpdateMaterial.pending, (state) => {
      state.loading_updateMaterial = true;
      state.success_updateMaterial = false;
      state.error_updateMaterial = false;
      state.loading_createMaterial = false;
      state.success_createMaterial = false;
      state.error_createMaterial = false;
      state.loading_statusMaterial = false;
      state.success_statusMaterial = false;
      state.error_statusMaterial = false;
    });
    builder.addCase(
      fetchUpdateMaterial.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_updateMaterial = false;
        state.success_updateMaterial = true;
        state.error_updateMaterial = false;
        state.loading_createMaterial = false;
        state.success_createMaterial = false;
        state.error_createMaterial = false;
        state.loading_statusMaterial = false;
        state.success_statusMaterial = false;
        state.error_statusMaterial = false;
      }
    );
    builder.addCase(
      fetchUpdateMaterial.rejected,
      (state, action: AnyAction) => {
        state.loading_updateMaterial = false;
        state.error_updateMaterial =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_updateMaterial = false;
        state.loading_createMaterial = false;
        state.success_createMaterial = false;
        state.error_createMaterial = false;
        state.loading_statusMaterial = false;
        state.success_statusMaterial = false;
        state.error_statusMaterial = false;
      }
    );

    //////////////////////////////

    builder.addCase(fetchStatusChangeMaterial.pending, (state) => {
      state.loading_updateMaterial = false;
      state.success_updateMaterial = false;
      state.error_updateMaterial = false;
      state.loading_createMaterial = false;
      state.success_createMaterial = false;
      state.error_createMaterial = false;
      state.loading_statusMaterial = true;
      state.success_statusMaterial = false;
      state.error_statusMaterial = false;
    });
    builder.addCase(
      fetchStatusChangeMaterial.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_updateMaterial = false;
        state.success_updateMaterial = false;
        state.error_updateMaterial = false;

        state.loading_createMaterial = false;
        state.success_createMaterial = false;
        state.error_createMaterial = false;

        state.loading_statusMaterial = false;
        state.success_statusMaterial = true;
        state.error_statusMaterial = false;
      }
    );
    builder.addCase(
      fetchStatusChangeMaterial.rejected,
      (state, action: AnyAction) => {
        state.loading_updateMaterial = false;
        state.error_updateMaterial = false;
        state.success_updateMaterial = false;

        state.loading_createMaterial = false;
        state.success_createMaterial = false;
        state.error_createMaterial = false;

        state.loading_statusMaterial = false;
        state.success_statusMaterial =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.error_statusMaterial = false;
      }
    );
  },
});
export default materialSlice.reducer;
export const { reset } = materialSlice.actions;
