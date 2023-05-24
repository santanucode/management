import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import strings from "translation";
import {
  getAllRoles,
  getAllFunctions,
  createRoleFunctionMap,
  getAllRoleFunctionMap,
} from "./roleFuncMap.request";
import { UserRoleMapInitStateDTO } from "./types";

export const initialState: UserRoleMapInitStateDTO = {
  loading_getAllRoleFunctionMap: false,
  success_getAllRoleFunctionMap: false,
  error_getAllRoleFunctionMap: false,

  loading_createRoleFunctionMap: false,
  success_createRoleFunctionMap: false,
  error_createRoleFunctionMap: false,

  loading_getAllFunction: false,
  success_getAllFunction: false,
  error_getAllFunction: false,

  loading_getRole: false,
  success_getRole: false,
  error_getRole: false,

  functionsList: [],
  rolefunctionslist: [],
  roles: [],
};

export const fetchAllRoles = createAsyncThunk(
  "auth/fetchAllRoles",
  async () => {
    return getAllRoles()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchAllFunctions = createAsyncThunk(
  "auth/fetchAllFunctions",
  async () => {
    return getAllFunctions()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchAllRoleFunctionsMap = createAsyncThunk(
  "auth/fetchAllRoleFunctionsMap",
  async () => {
    return getAllRoleFunctionMap()
      .then((response) => {
        // console.log("allRoleMapFunction", response);
        return response?.data;
      })
      .catch((error) => {
        console.log(error, "RMFError");
        throw error?.message;
      });
  }
);

export const fetchCreateRoleFunctionMap = createAsyncThunk(
  "auth/fetchCreateRoleFunctionMap",
  async (body: any) => {
    return createRoleFunctionMap(body)
      .then((response) => {
        console.log(response);
        return response?.data?.data;
      })
      .catch((error) => {
        console.log(error);
        throw error?.message;
      });
  }
);

export const roleFunctionMapSlice = createSlice({
  name: "rolefunctionmap",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFunctions.pending, (state) => {
      state.loading_getAllFunction = true;
      state.success_getAllFunction = false;
      state.error_getAllFunction = false;
    });
    builder.addCase(
      fetchAllFunctions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getAllFunction = false;
        state.success_getAllFunction = true;
        state.error_getAllFunction = false;
        state.functionsList = action.payload;
      }
    );
    builder.addCase(fetchAllFunctions.rejected, (state, action: AnyAction) => {
      state.loading_getAllFunction = false;
      state.success_getAllFunction = false;
      state.error_getAllFunction =
        action?.error?.message || strings["SLICE.ERROR"];
    });

    builder.addCase(fetchAllRoles.pending, (state) => {
      state.loading_getRole = true;
      state.success_getRole = false;
      state.error_getRole = false;
    });
    builder.addCase(
      fetchAllRoles.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getRole = false;
        state.success_getRole = true;
        state.error_getRole = false;
        state.roles = action.payload;
      }
    );
    builder.addCase(fetchAllRoles.rejected, (state, action: AnyAction) => {
      state.loading_getRole = false;
      state.success_getRole = false;
      state.error_getRole = action?.error?.message || strings["SLICE.ERROR"];
    });

    builder.addCase(fetchAllRoleFunctionsMap.pending, (state) => {
      state.loading_getAllRoleFunctionMap = true;
      state.success_getAllRoleFunctionMap = false;
      state.error_getAllRoleFunctionMap = false;
    });
    builder.addCase(
      fetchAllRoleFunctionsMap.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getAllRoleFunctionMap = false;
        state.success_getAllRoleFunctionMap = true;
        state.error_getAllRoleFunctionMap = false;
        state.rolefunctionslist = action.payload;
      }
    );
    builder.addCase(
      fetchAllRoleFunctionsMap.rejected,
      (state, action: AnyAction) => {
        state.loading_getAllRoleFunctionMap = false;
        state.success_getAllRoleFunctionMap = false;
        state.error_getAllRoleFunctionMap =
          action?.error?.message || strings["SLICE.ERROR"];
      }
    );

    builder.addCase(fetchCreateRoleFunctionMap.pending, (state) => {
      state.loading_createRoleFunctionMap = true;
      state.success_createRoleFunctionMap = false;
      state.error_createRoleFunctionMap = false;
    });
    builder.addCase(
      fetchCreateRoleFunctionMap.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_createRoleFunctionMap = false;
        state.success_createRoleFunctionMap = true;
        state.error_createRoleFunctionMap = false;
      }
    );
    builder.addCase(
      fetchCreateRoleFunctionMap.rejected,
      (state, action: AnyAction) => {
        state.loading_createRoleFunctionMap = false;
        state.error_createRoleFunctionMap =
          action?.error?.message || strings["SLICE.ERROR"];
        state.success_createRoleFunctionMap = false;
      }
    );
  },
});
export default roleFunctionMapSlice.reducer;
export const { reset } = roleFunctionMapSlice.actions;
