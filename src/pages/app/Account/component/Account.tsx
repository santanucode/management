import React, { useState, useEffect } from "react";
import { InputAdornment, InputLabel, Paper, TextField } from "@mui/material";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import { User } from "iconsax-react";
import { ISubmitResult, getAlluserAPIDTO } from "../service/types";
import {
  CONFIRM_PASSWORD_MISMATCH,
  EMAILERR,
  EMAILLABEL,
  EMAILPLACEHOLDER,
  FIRSTNAMEERR,
  FIRSTNAMELABEL,
  FIRSTNAMEPLACEHOLDER,
  LASTNAMEERR,
  LASTNAMELABEL,
  LASTNAMEPLACEHOLDER,
  MIDDLENAMEERR,
  MIDDLENAMELABEL,
  MIDDLENAMEPLACEHOLDER,
} from "components/form/userForm/userstring";
import FormTextField from "components/common/textField/textField";
import Loader from "components/common/Loader/Loader";
import { AccountProps } from "../container/accountContainer";
import Swal from "sweetalert2";
import {
  CURRENT_SUCCESS,
  CURRENT_SUCCESS_UPDATED,
} from "pages/app/staff/container/staffString";
import { useDispatch } from "react-redux";
import { reset } from "../service/accountSlice";
import { CURRENTPATH, HOMEPATH, PSDERROR, PSDERRORPDM } from "../container/accountString";
import strings from "translation";

const paths = [
  {
    name: HOMEPATH,
    path: "",
  },
  {
    name: CURRENTPATH,
  },
];

const MyAccount = (props: AccountProps) => {
  const {
    getUserDetails,
    userDetail,
    success_getUser,
    loading_getUser,
    updateUser,
    error_updateUser,
    success_updateUser,
    loading_updateUser,
    changePassword,
    error_getUser,
    error_updatePassword,
    loading_updatePassword,
    success_updatePassword,
    role_function,
    getRoleFuncn
  } = props;


  const dispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isError, setIsError] = useState(true);
  // const [errorMsgm, setErrorMsg] = useState("");

  const [first_name, setFirst_name] = useState<ISubmitResult>({
    value: userDetail?.first_name??"",
    error: false,
    success: false,
  });

  const [middle_name, setMiddle_name] = useState<ISubmitResult>({
    value: userDetail?.middle_name??"",
    error: false,
    success: false,
  });

  const [last_name, setLast_name] = useState<ISubmitResult>({
    value: userDetail?.last_name??"",
    error: false,
    success: false,
  });

  const [login_id, setLogin_id] = useState<ISubmitResult>({
    value: userDetail?.login_id??"",
    error: false,
    success: false,
  });

  const [currentPassword, setCurrentPassword] = useState<ISubmitResult>({
    value: "",
    error: false,
    success: false,
  });
  const [newPassword, setNewPassword] = useState<ISubmitResult>({
    value: "",
    error: false,
    success: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<ISubmitResult>({
    value: "",
    error: false,
    success: false,
  });

  const [userDetails, setUserDetails] = useState<any>();


  useEffect(() => {
    getUserDetails();
  }, []);


  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)
  
  const handleUpdateUser = () => {
    const data = {
      id: userDetails?.id,
      user: {
        first_name: first_name.value,
        middle_name: middle_name.value,
        last_name: last_name.value,
        login_id: login_id.value,
        is_active: true,
        password: "",
      },
    };
    updateUser(data);
  };

  const handleUpdatePassword = () => {
    if (newPassword.value === confirmPassword.value) {
      if (
        (newPassword.value.length >= 8 && newPassword.value.length <= 16) ||
        (confirmPassword.value.length >= 8 &&
          confirmPassword.value.length <= 16)
      ) {
        const data = {
          id: userDetails.id,
          password: {
            old: currentPassword.value,
            new: confirmPassword.value,
          },
        };
        changePassword(data);
      } else {
        Swal.fire({
          title: strings["STATUS.CHANGE.CANCELLED.ERROR"],
          text: PSDERROR,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: strings["STATUS.CHANGE.CANCELLED.ERROR"],
        text: PSDERRORPDM,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (userDetail) {
      setUserDetails(userDetail);
      setFirst_name({
        value: userDetail?.first_name,
        error: false,
        success: false,
      });
      setMiddle_name({
        value: userDetail?.middle_name,
        error: false,
        success: false,
      });
      setLast_name({
        value: userDetail?.last_name,
        error: false,
        success: false,
      });
      setLogin_id({
        value: userDetail?.login_id,
        error: false,
        success: false,
      });
    }
  }, [success_getUser, userDetail]);

  useEffect(() => {
    const isLoading =
      loading_getUser || loading_updateUser || loading_updatePassword;
    setLoader(isLoading);
  }, [loading_getUser, loading_updateUser, loading_updatePassword]);
  useEffect(() => {
    if (
      userDetails?.first_name !== first_name.value ||
      userDetails?.last_name !== last_name.value ||
      userDetails?.middle_name !== middle_name.value ||
      userDetails?.login_id !== login_id.value
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    userDetails,
    first_name,
    last_name,
    middle_name,
    login_id,
    newPassword,
    confirmPassword,
  ]);
  useEffect(() => {
    if (
      currentPassword.value === "" ||
      newPassword.value === "" ||
      confirmPassword.value === ""
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [newPassword, confirmPassword, currentPassword, isError]);
  useEffect(() => {
    if (success_updateUser) {
      dispatch(reset());
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_UPDATED,
        icon: "success",
      });
    } else if (error_updateUser) {
      dispatch(reset());
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong",
        icon: "error",
      });
    }
  }, [success_updateUser, error_updateUser]);
  useEffect(() => {
    if (success_updatePassword || success_updateUser) {
      dispatch(reset());
      setConfirmPassword({ value: "", error: false, success: true });
      setNewPassword({ value: "", error: false, success: true });
      setCurrentPassword({ value: "", error: false, success: true });
      Swal.fire({
        title: "Sucess",
        text: "Password Updated Successfully",
        icon: "success",
      });
    } else if (error_updatePassword) {
      dispatch(reset());
      Swal.fire({
        title: "Error",
        text: "current password not matched",
        icon: "error",
      });
    }
  }, [success_updatePassword, error_updatePassword]);

  const handleChangeFirstName = (value:any) => {
    setFirst_name(value)
  }

  const handleChangeMiddleName = (value: ISubmitResult) => {
    setMiddle_name(value);
  };
  
  const handleChangeLastName = (value: ISubmitResult) => {
    setLast_name(value);
  };

  const handleChangeloginId = (value: ISubmitResult) => {
    setLogin_id(value);
  };
  const handleChangeCurrentPassword = (value: ISubmitResult) => {
    setCurrentPassword(value);
  };
  const handleChangeNewPassword = (value: ISubmitResult) => {
    setNewPassword(value);
  };
  const handleChangeConfirmPassword = (value: ISubmitResult) => {
    setConfirmPassword(value);
  };


  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      {role_function?.User.UpdateUserDetail &&<Paper elevation={3} className="p-3 mb-3">
        <h6>Account Information</h6>
        <div className="acInformation">
          <div className="row mb-3 mt-3">
            <div className="col">
              <FormTextField
                key={Math.random() + 1}
                type="textarea"
                placeholder={FIRSTNAMEPLACEHOLDER}
                label={FIRSTNAMELABEL}
                Value={first_name.value}
                onChangeText={handleChangeFirstName}
                Required={true}
                CustomErrorLine={FIRSTNAMEERR}
              />
            </div>
            <div className="col">
              <FormTextField
                key={Math.random() + 2}
                type="textarea"
                placeholder={MIDDLENAMEPLACEHOLDER}
                label={MIDDLENAMELABEL}
                Value={middle_name.value}
                onChangeText={handleChangeMiddleName}
                Required={false}
                CustomErrorLine={MIDDLENAMEERR}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <FormTextField
                key={Math.random() + 3}
                type="textarea"
                placeholder={LASTNAMEPLACEHOLDER}
                label={LASTNAMELABEL}
                Value={last_name.value}
                onChangeText={handleChangeLastName}
                Required={true}
                CustomErrorLine={LASTNAMEERR}
              />
            </div>
            <div className="col">
              <FormTextField
                key={Math.random() + 4}
                type="textarea"
                placeholder={EMAILPLACEHOLDER}
                label={EMAILLABEL}
                Value={login_id.value}
                onChangeText={handleChangeloginId}
                Required={true}
                CustomErrorLine={EMAILERR}
              />
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleUpdateUser}
          disabled={disable}
        >
          Save Changes
        </button>
      </Paper>}

      {role_function?.User.Change_Password && <Paper elevation={3} className="p-3">
        <h6>Password Information</h6>

        <div className="acInformation">
          <div className="row">
            <div className="col-6 mb-3">
              <FormTextField
                type="textarea"
                placeholder={"Current Password"}
                label={"Current Password"}
                Value={currentPassword.value}
                onChangeText={handleChangeCurrentPassword}
                Required={true}
                CustomErrorLine={""}
              />
            </div>
            <div className="col-6"></div>
            <div className="col-6 mb-3">
              <FormTextField
                type="textarea"
                placeholder={"NewPassword"}
                label={"NewPassword"}
                Value={newPassword.value}
                onChangeText={handleChangeNewPassword}
                Required={true}
                CustomErrorLine={CONFIRM_PASSWORD_MISMATCH}
              />
            </div>
            <div className="col-6 mb-3">
              <FormTextField
                type="textarea"
                placeholder={"ConfirmPassword"}
                label={"ConfirmPassword"}
                Value={confirmPassword.value}
                onChangeText={handleChangeConfirmPassword}
                Required={true}
                CustomErrorLine={CONFIRM_PASSWORD_MISMATCH}
                isError={isError}
              />
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleUpdatePassword}
          disabled={isError ? true : false}
        >
          Change Password
        </button>
      </Paper>}
    </>
  );
};

export default MyAccount;
