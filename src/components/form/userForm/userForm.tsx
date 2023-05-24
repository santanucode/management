import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { FormProps, ISubmitResult } from "./types";
import { Box } from "@mui/system";
import { MdClose } from "react-icons/md";
import FormTextField from "components/common/textField/textField";
import "../style.scss";
import {
  ADDUSERLABEL,
  CANCELBTN,
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
  PASSWORDERR,
  PASSWORDLABEL,
  PASSWORDPLACEHOLDER,
  SAVEBTN,
  UPDATEBTN,
  UPDATEDUSERLABEL,
} from "./userstring";
import FormTextDropdown from "components/common/textDropdown/textDropdown";
import { SUBMITDT } from "pages/app/users/service/types";
import { ROLEDTO } from "pages/app/users/service/types";

const UserForm = (props: FormProps) => {
  const {
    initialValue,
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
    allRoles,
  } = props;

  const [first_name, setFirst_name] = useState<ISubmitResult>({
    value: initialValue ? initialValue.first_name : "",
    error: false,
    success: false,
  });

  const [middle_name, setMiddle_name] = useState<ISubmitResult>({
    value: initialValue ? initialValue.middle_name : "",
    error: false,
    success: false,
  });

  const [last_name, setLast_name] = useState<ISubmitResult>({
    value: initialValue ? initialValue.last_name : "",
    error: false,
    success: false,
  });

  const [login_id, setLogin_id] = useState<ISubmitResult>({
    value: initialValue ? initialValue.login_id : "",
    error: false,
    success: false,
  });

  const [password, setPassword] = useState<ISubmitResult>({
    value: initialValue ? initialValue.password : "",
    error: false,
    success: false,
  });

  const [selectRoles, setSelectRoles] = useState<ISubmitResult>({
    value: initialValue
      ? initialValue.roles?.map((ele: ROLEDTO) => ele.id)
      : [],
    error: false,
    success: false,
  });

  const handleSelectRoles = (value: ISubmitResult) => {
    setErrorMessage("");
    setSelectRoles(value);
  };

  let isValueNOTChanged =
    first_name.value === initialValue.first_name &&
    middle_name.value === initialValue.middle_name &&
    last_name.value === initialValue.last_name &&
    selectRoles.value ===
      initialValue.roles?.filter((ele: ROLEDTO) => ele.id) &&
    login_id.value === initialValue.login_id;

  let addDisable =
    first_name.error ||
    middle_name.error ||
    last_name.error ||
    login_id.error ||
    password.error ||
    selectRoles.error ||
    selectRoles?.value?.length === 0 ||
    first_name.value === undefined ||
    middle_name.value === undefined ||
    last_name.value === undefined ||
    login_id.value === undefined ||
    password.value === undefined ||
    (first_name.success === false &&
      middle_name.success === false &&
      last_name.success === false &&
      password.success === false &&
      selectRoles.success === false &&
      login_id.success === false) ||
    isValueNOTChanged;

  let editDisable =
    first_name.error ||
    middle_name.error ||
    last_name.error ||
    login_id.error ||
    selectRoles.error ||

    first_name.value === undefined ||
    last_name.value === undefined ||
    login_id.value === undefined ||
    selectRoles?.value?.length === 0 ||

    
    (first_name.success === false &&
      last_name.success === false &&
      login_id.success === false) &&
      selectRoles.success === false ||
    isValueNOTChanged;

  const handleChangeFirstName = (value: ISubmitResult) => {
    setErrorMessage("");
    setFirst_name(value);
  };
  const handleChangeMiddleName = (value: ISubmitResult) => {
    setErrorMessage("");
    setMiddle_name(value);
  };
  const handleChangeLastName = (value: ISubmitResult) => {
    setErrorMessage("");
    setLast_name(value);
  };

  const handleChangeUserEmail = (value: ISubmitResult) => {
    setErrorMessage("");
    setLogin_id(value);
  };

  const handleChangeUserPassword = (value: ISubmitResult) => {
    setErrorMessage("");
    setPassword(value);
  };

  const handleSubmitForm = () => {
    const data = {
      first_name: first_name.value,
      middle_name:
        middle_name.value === undefined || null ? "" : middle_name.value,
      last_name: last_name.value,
      login_id: login_id.value,
      password: password.value === undefined ? "" : password.value,
      roles: selectRoles.value?.map((ele: number) => {
        return {
          id: ele,
        };
      }),
    };
    handleFormData(data);
  };

  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={onHandleClose}>
            <MdClose />
          </IconButton>
        }
        title={clickedBtn === "add" ? ADDUSERLABEL : UPDATEDUSERLABEL}
      />
      <span className="error_msg">{errorMessage}</span>
      <CardContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 2 },
          }}
          className={"formResponsiveHeight"}
          noValidate={true}
        >
          <FormTextField
            type="textarea"
            placeholder={FIRSTNAMEPLACEHOLDER}
            label={FIRSTNAMELABEL}
            Value={first_name.value}
            onChangeText={handleChangeFirstName}
            Required={true}
            CustomErrorLine={FIRSTNAMEERR}
          />

          <FormTextField
            type="textarea"
            placeholder={MIDDLENAMEPLACEHOLDER}
            label={MIDDLENAMELABEL}
            Value={middle_name.value}
            onChangeText={handleChangeMiddleName}
            Required={false}
            CustomErrorLine={MIDDLENAMEERR}
          />

          <FormTextField
            type="textarea"
            placeholder={LASTNAMEPLACEHOLDER}
            label={LASTNAMELABEL}
            Value={last_name.value}
            onChangeText={handleChangeLastName}
            Required={true}
            CustomErrorLine={LASTNAMEERR}
          />

          <FormTextField
            type="textarea"
            placeholder={EMAILPLACEHOLDER}
            label={EMAILLABEL}
            Value={login_id.value}
            onChangeText={handleChangeUserEmail}
            Required={true}
            CustomErrorLine={EMAILERR}
          />

          <FormTextField
            type="textarea"
            placeholder={PASSWORDPLACEHOLDER}
            label={PASSWORDLABEL}
            Value={password.value}
            onChangeText={handleChangeUserPassword}
            Required={clickedBtn === "add" ? true : false}
            CustomErrorLine={PASSWORDERR}
            hidden={clickedBtn === "edit" ? true : false}
          />

          <FormTextDropdown
            defaultValue={selectRoles.value}
            onSelect={handleSelectRoles}
            placeholder={"Select roles"}
            label={"Roles *"}
            CustomErrorLine={"Select a role"}
            multiSelect={true}
            Required={true}
            disable={false}
            Options={allRoles}
          />
        </Box>
      </CardContent>
      <CardActions className="d-flex dust justify-content-end">
        <Button size="large" variant="outlined" onClick={onHandleClose}>
          {CANCELBTN}
        </Button>
        <Button
          size="large"
          variant="contained"
          disabled={clickedBtn === "add" ? addDisable : editDisable}
          onClick={handleSubmitForm}
        >
          {clickedBtn === "add" ? SAVEBTN : UPDATEBTN}
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserForm;
