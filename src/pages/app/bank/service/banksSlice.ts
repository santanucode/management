import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import strings from "translation";
import {
  createBank,
  getAllBanks,
  statusChangeBank,
  updateBank,
} from "./bank.request";
import {
  BankInitStateDTO,
  BANKSDT,
  BankStatusChangeDTO,
  UpdateBankDTO,
} from "./types";

export const initialState: BankInitStateDTO = {
  loading_getBank: false,
  success_getBank: false,
  error_getBank: false,

  loading_createBank: false,
  success_createBank: false,
  error_createBank: false,

  loading_updateBank: false,
  success_updateBank: false,
  error_updateBank: false,

  loading_statusBank: false,
  success_statusBank: false,
  error_statusBank: false,

  banksList: [],
};

export const fetchAllBanks = createAsyncThunk(
  "master/fetchAllBanks",
  async () => {
    return getAllBanks()
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
);
export const fetchCreateBank = createAsyncThunk(
  "master/fetchCreateBank",
  async (body: BANKSDT) => {
    return createBank(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchUpdateBank = createAsyncThunk(
  "master/fetchUpdateBank",
  async (body: UpdateBankDTO) => {
    return updateBank(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const fetchStatusChangeBank = createAsyncThunk(
  "master/fetchStatusChangeBank",
  async (body: BankStatusChangeDTO) => {
    return statusChangeBank(body)
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        throw error?.message;
      });
  }
);

export const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // Get All Bank Slice

    builder.addCase(fetchAllBanks.pending, (state) => {
      state.loading_getBank = true;
      state.success_getBank = false;
      state.error_getBank = false;
      state.loading_createBank = false;
      state.success_createBank = false;
      state.error_createBank = false;
      state.loading_updateBank = false;
      state.success_updateBank = false;
      state.error_updateBank = false;

      state.loading_statusBank = false;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });
    builder.addCase(
      fetchAllBanks.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_getBank = false;
        state.error_getBank = false;
        state.success_getBank = true;
        state.banksList = action.payload;
        state.loading_createBank = false;
        state.success_createBank = false;
        state.error_createBank = false;
        state.loading_updateBank = false;
        state.success_updateBank = false;
        state.error_updateBank = false;

        state.loading_statusBank = false;
        state.success_statusBank = false;
        state.error_statusBank = false;
      }
    );
    builder.addCase(fetchAllBanks.rejected, (state, action: AnyAction) => {
      state.loading_getBank = false;
      state.error_getBank =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_getBank = false;
      state.loading_createBank = false;
      state.success_createBank = false;
      state.error_createBank = false;
      state.loading_updateBank = false;
      state.success_updateBank = false;
      state.error_updateBank = false;

      state.loading_statusBank = false;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });

    builder.addCase(fetchCreateBank.pending, (state) => {
      state.loading_createBank = true;
      state.success_createBank = false;
      state.error_createBank = false;
      state.loading_updateBank = false;
      state.success_updateBank = false;
      state.error_updateBank = false;

      state.loading_statusBank = false;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });
    builder.addCase(
      fetchCreateBank.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_createBank = false;
        state.success_createBank = true;
        state.error_createBank = false;
        state.loading_updateBank = false;
        state.success_updateBank = false;
        state.error_updateBank = false;

        state.loading_statusBank = false;
        state.success_statusBank = false;
        state.error_statusBank = false;
      }
    );
    builder.addCase(fetchCreateBank.rejected, (state, action: AnyAction) => {
      state.loading_createBank = false;
      state.error_createBank =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_createBank = false;
      state.loading_updateBank = false;
      state.success_updateBank = false;
      state.error_updateBank = false;

      state.loading_statusBank = false;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });

    // Update Bank Slice

    builder.addCase(fetchUpdateBank.pending, (state) => {
      state.loading_updateBank = true;
      state.success_updateBank = false;
      state.error_updateBank = false;
      state.loading_createBank = false;
      state.success_createBank = false;
      state.error_createBank = false;

      state.loading_statusBank = false;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });
    builder.addCase(fetchUpdateBank.fulfilled, (state) => {
      state.loading_updateBank = false;
      state.success_updateBank = true;
      state.error_updateBank = false;
      state.loading_createBank = false;
      state.success_createBank = false;
      state.error_createBank = false;

      state.loading_statusBank = false;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });
    builder.addCase(fetchUpdateBank.rejected, (state, action: AnyAction) => {
      state.loading_updateBank = false;
      state.error_updateBank =
        action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
      state.success_updateBank = false;
      state.loading_createBank = false;
      state.success_createBank = false;
      state.error_createBank = false;

      state.loading_statusBank = false;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });
    // Status Change Slice

    builder.addCase(fetchStatusChangeBank.pending, (state) => {
      state.loading_updateBank = false;
      state.success_updateBank = false;
      state.error_updateBank = false;
      state.loading_createBank = false;
      state.success_createBank = false;
      state.error_createBank = false;

      state.loading_statusBank = true;
      state.success_statusBank = false;
      state.error_statusBank = false;
    });
    builder.addCase(
      fetchStatusChangeBank.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_updateBank = false;
        state.success_updateBank = false;
        state.error_updateBank = false;
        state.loading_createBank = false;
        state.success_createBank = false;
        state.error_createBank = false;

        state.loading_statusBank = false;
        state.success_statusBank = true;
        state.error_statusBank = false;
      }
    );
    builder.addCase(
      fetchStatusChangeBank.rejected,
      (state, action: AnyAction) => {
        state.loading_updateBank = false;
        state.error_updateBank = false;
        state.success_updateBank = false;
        state.loading_createBank = false;
        state.success_createBank = false;
        state.error_createBank = false;

        state.loading_statusBank = false;
        state.error_statusBank =
          action?.error?.message || strings["ERROR.SOMETHINGWENTWRONG"];
        state.success_statusBank = false;
      }
    );
  },
});
export default banksSlice.reducer;
export const { reset } = banksSlice.actions;
