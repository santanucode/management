import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import strings from "translation";
import { getAllFunctions, getAllFunctionsById, getUserDetails, userLogin } from "./auth.request";
import { LoginDTO, LoginIntialStateDTO } from "./types";
import _ from "lodash";
import { convert_Object_format_with_all_false, convert_Object_format_with_all_true } from "api/helper/utils";



export const initialState: LoginIntialStateDTO = {
  loading: false,
  isLogin: false,
  error: false,
  userDetails: null,

  loading_getAllFunction: false,
  success_getAllFunction: false,
  error_getAllFunction: false,
  functionsList: [],
  role_function: undefined
};

export interface MainChangedName {
  name: string;
}


export const userSignin = createAsyncThunk(
  "auth/userSignin",
  async (body: LoginDTO) => {
    return userLogin(body)
      .then(async (userLoginressponse) => {
        await getUserDetails(userLoginressponse.data.auth.token)
          .then(async (userResponse) => {
            console.log("userResponse",userResponse)
            await getAllFunctions(userLoginressponse.data.auth.token)    
              .then(async (getAllFunctionsresponse) => {
                let changesData = getAllFunctionsresponse.data.data.map((ele: MainChangedName) => ele.name)
                let changesFalseData: any = convert_Object_format_with_all_false(changesData)
                // await localStorage.setItem("ALLdata", JSON.stringify(changesFalseData));
                
                  await getAllFunctionsById(userLoginressponse.data.auth.token, userResponse?.data?.user?.id)
                    .then(async (getAllFunctionsByIdres) => {

                      let changesDataOfFunction = getAllFunctionsByIdres.data.map((ele: MainChangedName) => ele.name)

                      console.log("changesDataOfFunction", changesDataOfFunction)
                      
                    let changesFunctionFalseData: any = convert_Object_format_with_all_true(getAllFunctionsByIdres.data.length>0 ? changesDataOfFunction:changesData)
                      
                    for (const key in changesFunctionFalseData) {
                      if (changesFalseData[key]) {
                        Object.assign(changesFalseData[key], changesFunctionFalseData[key]);
                      } else {
                        changesFalseData[key] = changesFunctionFalseData[key];
                      }
                    }

                    await localStorage.setItem("ALLdata", JSON.stringify(changesFalseData));
                })
            })
        })
        
        return userLoginressponse?.data?.auth;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
);

// export const fetchAllFunctions = createAsyncThunk(
//   "auth/fetchAllFunctions",
//   async () => {
//     return getAllFunctions()
//       .then((response) => {
//         console.log(">>>>>>>>>>>>===",response)
//         return response?.data?.data;
//       })
//       .catch((error) => {
//         console.log("error",error)
//         throw error?.message;
//       });
//   }
// );



export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    reset: () => initialState,
    getRole: (state) => {
      const localData = localStorage.getItem("ALLdata")
      const roleData = localData ? JSON.parse(localData): null
      return ({
      ...state, role_function: roleData
  })}
  },
  extraReducers: (builder) => {
    builder.addCase(userSignin.pending, (state) => {
      state.loading = true;
      state.isLogin = false;
      state.error = false;
    });
    builder.addCase(
      userSignin.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = false;
        state.isLogin = true;
        state.userDetails = action.payload;
      }
    );
    builder.addCase(userSignin.rejected, (state, action: AnyAction) => {
      state.loading = false;
      state.error =
        action?.error?.message || strings["ERROR.AUTH.FAILED"];
      state.isLogin = false;
    });
  },
});
export default userLoginSlice.reducer;
export const { reset, getRole } = userLoginSlice.actions;
