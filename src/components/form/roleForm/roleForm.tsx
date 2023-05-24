import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { MdClose } from "react-icons/md";
import { FormProps, ISubmitResult } from "./types.d.ts";
import FormTextField from "components/common/textField/textField";
import {
  ADDNEWLABEL,
  DESCERROR,
  DESCLABEL,
  DESCPLACEHOLDER,
  ROLEERROR,
  ROLELABEL,
  ROLEPLACEHOLDER,
  UPDATELABEL,
} from "./roleString";
import "./styles.scss";

const RoleForm = (props: FormProps) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
  } = props;

  const [roleName, setRoleName] = useState<ISubmitResult>({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });
  const [description, setDescription] = useState<ISubmitResult>({
    value: initialValue ? initialValue.description : "",
    error: false,
    success: false,
  });

  let isValueNOTChanged =
    roleName.value === initialValue.name &&
    description.value === initialValue.description;
  let disable =
    roleName.error ||
    description.error ||
    roleName.value === "" ||
    description.value === undefined ||
    (roleName.success === false &&
      description.success === false &&
      isValueNOTChanged);

  const handleChangeRoleName = (value: ISubmitResult) => {
    setErrorMessage("");
    setRoleName(value);
  };
  const handleChangeDescription = (value: ISubmitResult) => {
    setErrorMessage("");
    setDescription(value);
  };

  const handleSubmitForm = () => {
    const data = {
      role: {
        name: roleName.value,
        description: description.value,
      },
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
        title={clickedBtn === "add" ? ADDNEWLABEL : UPDATELABEL}
      />
      {errorMessage?<span className="error_msg">{errorMessage}</span>:null}
      <CardContent>
        <Box
          component="form"
          sx={{
            width: "100%",
            "& .MuiTextField-root": { mb: 2 },
          }}
          className={"formResponsiveHeight"}
          noValidate={true}
        >
          <FormTextField
            type="text"
            placeholder={ROLEPLACEHOLDER}
            label={ROLELABEL}
            Value={roleName.value}
            onChangeText={handleChangeRoleName}
            Required={true}
            CustomErrorLine={ROLEERROR}
          />
          <FormTextField
            type="text"
            placeholder={DESCPLACEHOLDER}
            label={DESCLABEL}
            Value={description.value}
            onChangeText={handleChangeDescription}
            Required={true}
            CustomErrorLine={DESCERROR}
          />
        </Box>
      </CardContent>
      <CardActions className="d-flex dust justify-content-end">
        <Button size="large" variant="outlined" onClick={onHandleClose}>
          Cancel
        </Button>
        <Button
          size="large"
          variant="contained"
          disabled={disable}
          onClick={handleSubmitForm}
        >
          {clickedBtn === "add" ? "Save" : "Update"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoleForm;
