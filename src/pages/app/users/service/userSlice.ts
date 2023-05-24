import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { CREATEDTO, UPDATEDOBJ, UPDATEDTO, UsersInitStateDTO } from "./types";
import { createUser, createUserRoleMap, getAllRoles, getAllUsers, updateStatusUser, updateUser } from "./user.request";

export const initialState: UsersInitStateDTO = {
  loading_getUser: false,
  success_getUser: false,
  error_getUser: false,
  loading_createUser: false,
  success_createUser: false,
  error_createUser: false,
  loading_updateUser: false,
  success_updateUser: false,
  error_updateUser: false,
  loading_statusUser: false,
  success_statusUser: false,
  error_statusUser: false,
  usersList: [],

  loading_getRole: false,
  success_getRole: false,
  error_getRole: false,
}

export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async () => {
  return getAllUsers()
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw Promise.reject(error.response.data);
    });
})

export const fetchAllRoles = createAsyncThunk('master/fetchAllRoles', () => {
  return getAllRoles()
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
})

export const fetchCreateUser = createAsyncThunk('auth/fetchCreateUser', async (body: any) => {
  return createUser(body)
    .then((response) => {
      let role_data = {
        id: response.data.user.id,
        data: body.roles
      }
      createUserRoleMap(role_data)
        .then((res) => {
          return res?.data?.data;
        })
        .catch((err) => {
          throw err?.message;
        })
    })
    .catch((error) => {
      throw error?.message;
    });
})

export const fetchUpdateUser = createAsyncThunk('auth/fetchUpdateUser', async (body: UPDATEDOBJ) => {
  return updateUser(body)
    .then((response) => {
      let role_data = {
        id: response.data.user.id,
        data: body.value.roles
      }
      createUserRoleMap(role_data)
        .then((res) => {
          return res?.data?.data;
        })
        .catch((err) => {
          throw err?.message;
        })
    })
    .catch((error) => {
      throw error?.message;
    });
})

export const fetchStatusChangeUser = createAsyncThunk(
  'master/fetchStatusChangeUser',
  async (body: UPDATEDOBJ) => {
    return updateStatusUser(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  })

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading_getUser = true
      state.success_getUser = false
      state.error_getUser = false
    })
    builder.addCase(
      fetchAllUsers.fulfilled,
      (state, action: AnyAction) => {
        state.loading_getUser = false
        state.error_getUser = false
        state.success_getUser = true
        state.usersList = action.payload
      },
    )
    builder.addCase(fetchAllUsers.rejected, (state, action: AnyAction) => {
      state.loading_getUser = false
      state.error_getUser = action?.error?.message || strings['SLICE.ERROR']
      state.success_getUser = false
    })

    builder.addCase(fetchCreateUser.pending, (state) => {
      state.loading_createUser = true
      state.success_createUser = false
      state.error_createUser = false
    })
    builder.addCase(
      fetchCreateUser.fulfilled,
      (state) => {
        state.loading_createUser = false
        state.success_createUser = true
        state.error_createUser = false
      },
    )
    builder.addCase(fetchCreateUser.rejected, (state, action: AnyAction) => {
      state.loading_createUser = false
      state.error_createUser = action?.error?.message || strings['SLICE.ERROR']
      state.success_createUser = false
    })

    builder.addCase(fetchUpdateUser.pending, (state) => {
      state.loading_updateUser = true
      state.success_updateUser = false
      state.error_updateUser = false
    })
    builder.addCase(fetchUpdateUser.fulfilled, (state) => {
      state.loading_updateUser = false
      state.success_updateUser = true
      state.error_updateUser = false
    })
    builder.addCase(fetchUpdateUser.rejected, (state, action: AnyAction) => {
      state.loading_updateUser = false
      state.error_updateUser = action?.error?.message || strings['SLICE.ERROR']
      state.success_updateUser = false
    })

    builder.addCase(fetchStatusChangeUser.pending, (state) => {
      state.loading_statusUser = true
      state.success_statusUser = false
      state.error_statusUser = false
    })
    builder.addCase(
      fetchStatusChangeUser.fulfilled,
      (state) => {
        state.loading_statusUser = false
        state.success_statusUser = true
        state.error_statusUser = false
      },
    )
    builder.addCase(
      fetchStatusChangeUser.rejected,
      (state, action: AnyAction) => {
        state.loading_statusUser = false
        state.error_statusUser =
          action?.error?.message || strings['SLICE.ERROR']
        state.success_statusUser = false
      },
    )
  },
})
export default usersSlice.reducer;
export const { reset } = usersSlice.actions;