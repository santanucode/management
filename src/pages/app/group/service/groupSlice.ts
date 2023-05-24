import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import strings from "translation";
import { createGroup, getAllGroups, statusChangeGroup, updateGroup } from "./group.request";
import { CREATEGROUPDT, GroupInitStateDTO, UPDATEGROUPDT } from "./types";

export const initialState: GroupInitStateDTO = {
    loading_getGroup: false,
    success_getGroup: false,
    error_getGroup: false,
    loading_createGroup: false,
    success_createGroup: false,
    error_createGroup: false,
    loading_updateGroup: false,
    success_updateGroup: false,
    error_updateGroup: false,
    loading_statusStaff: false,
    success_statusStaff: false,
    error_statusStaff: false,
    groupList: [],
}

export const fetchAllGroups = createAsyncThunk('master/fetchAllGroups', async () => {
    return getAllGroups()
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error.response.data;
        });
})
export const fetchCreateGroup = createAsyncThunk('master/fetchCreateGroup', async (body: CREATEGROUPDT) => {
    return createGroup(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})
export const fetchUpdateGroup = createAsyncThunk('master/fetchUpdateGroup', async (body: UPDATEGROUPDT) => {
    return updateGroup(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})
export const fetchStatusChangeStaff = createAsyncThunk('master/fetchStatusChangeStaff', async (body: UPDATEGROUPDT) => {
    return statusChangeGroup(body)
        .then((response) => {
            return response?.data?.data;
        })
        .catch((error) => {
            throw error?.message;
        });
})

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(fetchAllGroups.pending, state => {
            state.loading_getGroup = true;
            state.success_getGroup = false;
            state.error_getGroup = false;
        });
        builder.addCase(fetchAllGroups.fulfilled, (state, action: PayloadAction) => {
            state.loading_getGroup = false;
            state.error_getGroup = false;
            state.success_getGroup = true;
            state.groupList = action.payload;
        });
        builder.addCase(fetchAllGroups.rejected, (state, action: AnyAction) => {
            state.loading_getGroup = false;
            state.error_getGroup = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_getGroup = false;
        })
        builder.addCase(fetchCreateGroup.pending, state => {
            state.loading_createGroup = true;
            state.success_createGroup = false;
            state.error_createGroup = false;
        });
        builder.addCase(fetchCreateGroup.fulfilled, (state) => {
            state.loading_createGroup = false;
            state.success_createGroup = true;
            state.error_createGroup = false;
        });
        builder.addCase(fetchCreateGroup.rejected, (state, action: AnyAction) => {
            state.loading_createGroup = false;
            state.error_createGroup = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_createGroup = false;
        })
        builder.addCase(fetchUpdateGroup.pending, state => {
            state.loading_updateGroup = true;
            state.success_updateGroup = false;
            state.error_updateGroup = false;
        });
        builder.addCase(fetchUpdateGroup.fulfilled, (state) => {
            state.loading_updateGroup = false;
            state.success_updateGroup = true;
            state.error_updateGroup = false;
        });
        builder.addCase(fetchUpdateGroup.rejected, (state, action: AnyAction) => {
            state.loading_updateGroup = false;
            state.error_updateGroup = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
            state.success_updateGroup = false;
        })
        builder.addCase(fetchStatusChangeStaff.pending, state => {
             state.loading_statusStaff = true;
            state.success_statusStaff = false;
            state.error_statusStaff = false;
        });
        builder.addCase(fetchStatusChangeStaff.fulfilled, (state) => {
            state.loading_statusStaff = false;
            state.success_statusStaff = true;
            state.error_statusStaff = false;
        });
        builder.addCase(fetchStatusChangeStaff.rejected, (state, action: AnyAction) => {
            state.loading_statusStaff = false;
            state.success_statusStaff = false;
            state.error_statusStaff = action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        })
    }
})
export default groupsSlice.reducer;
export const { reset } = groupsSlice.actions;