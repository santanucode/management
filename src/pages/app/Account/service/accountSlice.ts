import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { changePassword, getUserDetails, updateUser } from "./account.request";
import { CHANGEPASSWORD, UPDATEDATADTO, USERDETAILDTO } from "./types";
import { toast } from "react-toastify";

export const initialState: USERDETAILDTO = {
  error_updatePassword: false,
  loading_updatePassword: false,
  success_updatePassword: false,

  error_getUser: false,
  loading_getUser: false,
  success_getUser: false,

  error_updateUser: false,
  loading_updateUser: false,
  success_updateUser: false,

  userDetail: undefined,
};

export const fetchUserDeatils = createAsyncThunk(
  "user/fetchUserDeatils",
  async () => {
    return getUserDetails()
      .then((response) => {
        return response?.data?.user;
      })
      .catch((error) => {
        throw toast(error?.message);
      });
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "user/fetchUpdateUser",
  async (body: UPDATEDATADTO) => {
    return updateUser(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw toast(error?.message);
      });
  }
);

export const fetchChangePassword = createAsyncThunk(
  "user/fetchChangePassword",
  async (body: CHANGEPASSWORD) => {
    return changePassword(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        console.log(error, "update password error");
        throw toast(error?.message);
      });
  }
);

export const accountSlice = createSlice({
  name: "accountdetails",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDeatils.pending, (state) => {
      state.loading_getUser = true;
      state.success_getUser = false;
      state.error_getUser = false;
    });
    builder.addCase(
      fetchUserDeatils.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getUser = false;
        state.error_getUser = false;
        state.success_getUser = true;
        state.userDetail = action.payload;
      }
    );
    builder.addCase(fetchUserDeatils.rejected, (state, action: AnyAction) => {
      state.loading_getUser = false;
      state.error_getUser = action?.error?.message;
      state.success_getUser = false;
    });

    builder.addCase(fetchUpdateUser.pending, (state) => {
      state.loading_updateUser = true;
      state.success_updateUser = false;
      state.error_updateUser = false;
    });
    builder.addCase(fetchUpdateUser.fulfilled, (state) => {
      state.loading_updateUser = false;
      state.success_updateUser = true;
      state.error_updateUser = false;
    });
    builder.addCase(fetchUpdateUser.rejected, (state, action: AnyAction) => {
      state.loading_updateUser = false;
      state.error_updateUser = action?.error?.message;
      state.success_updateUser = false;
    });

    builder.addCase(fetchChangePassword.pending, (state) => {
      state.loading_updatePassword = true;
      state.success_updatePassword = false;
      state.error_updatePassword = false;
    });
    builder.addCase(fetchChangePassword.fulfilled, (state) => {
      state.loading_updatePassword = false;
      state.success_updatePassword = true;
      state.error_updatePassword = false;
    });
    builder.addCase(
      fetchChangePassword.rejected,
      (state, action: AnyAction) => {
        state.loading_updatePassword = false;
        state.error_updatePassword = action?.error?.message;
        state.success_updatePassword = false;
      }
    );
  },
});
export default accountSlice.reducer;
export const { reset } = accountSlice.actions;
