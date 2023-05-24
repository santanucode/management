import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  IconButton,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { ISubmitResult } from "./role-function-mapping-form-dt";
import FormTextDropdown from "components/common/textDropdown/textDropdown";
import "./role-mapping-functionstyle.scss";
import {
  CANCEL,
  ROLEFUNNAMEFORM,
  ROLEFUNNAMEFORMUPDATE,
  ROLEPERMISSION,
  SELECTROLE,
} from "pages/app/roleFunctionMap/container/rolefunctionString";
import _ from "lodash";
import strings from "translation";

const RoleMappingForm = (props: any) => {
  const {
    initialValue,
    handleFormData,
    onHandleClose,
    clickedBtn,
    roleList,
    funcList,
  } = props;
  const [checkedFunction, setCheckedFunction] = useState<any>([]);
  const [storeFunctionList, setStoreFunctionList] = useState(funcList);
  const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);
  const [isActive, setActive] = useState(null);
  const [disable, setDisable] = useState(false);
  const [editDisable, setEditDisable] = useState(true);
  const [roleName, setRoleName] = useState<ISubmitResult>({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });
  let arr_id = initialValue?.routeDetails?.map((val: any) => {
    return { id: val.id };
  });

  const [functionName, setFunctionName] = useState<ISubmitResult>({
    value: initialValue ? initialValue.functionName : "",
    error: false,
    success: false,
  });
  const [selectRole, setSelectRole] = useState<any>({
    value: initialValue ? initialValue.id : [],
    error: false,
    success: false,
  });
  const [selectFunction, setSelectFunctions] = useState<any>({
    selectvalue: initialValue
      ? initialValue?.routeDetails.map((val: any) => {
          return { id: val.id };
        })
      : [],
    error: false,
    success: false,
  });
  useEffect(() => {
    const disable = _.isEqual(arr_id, selectFunction.selectvalue);
    console.log(disable, "isDisable");
    setEditDisable(disable);
  }, [selectFunction]);
  // let isValueNOTChanged =
  // selectRole.value === initialValue.id &&
  // selectFunction.value === initialValue.desc
  // let disable =
  //   roleName.error ||
  //   userEmail.error ||
  //   roleName.value === '' ||
  //   userEmail.value === '' ||
  //   (roleName.success === false && userEmail.success === false) ||
  //   isValueNOTChanged

  // let disable = selectRole.length !== 0;
  // console.log(disable, "disable");
  // console.log(selectRole.value.length, selectFunction.selectvalue);
  useEffect(() => {
    if (
      selectRole.value !== undefined &&
      selectFunction.selectvalue.length !== 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [selectFunction, selectRole]);

  useEffect(() => {
    handleRoleId(funcList[0]?.label, 0);
    setStoreFunctionList(funcList);
  }, [funcList]);
  const handleSelectRole = (value: any) => {
    setSelectRole(value);
  };
  const handleSelectFunctions = (
    currentRoleIndex: number,
    index: number,
    e: any
  ) => {
    let checkedFunctionList = storeFunctionList;
    checkedFunctionList[currentRoleIndex].functionArr[index].checked =
      storeFunctionList[currentRoleIndex].functionArr[index].checked
        ? (storeFunctionList[currentRoleIndex].functionArr[index].checked =
            false)
        : (storeFunctionList[currentRoleIndex].functionArr[index].checked =
            true);
    setStoreFunctionList(checkedFunctionList);
    const { selectvalue } = selectFunction;
    console.log(
      checkedFunctionList[currentRoleIndex].functionArr[index].checked
    );
    if (checkedFunctionList[currentRoleIndex].functionArr[index].checked) {
      setSelectFunctions({
        selectvalue: [...selectvalue, { id: e.id }],
      });
    } else {
      setSelectFunctions({
        selectvalue: selectvalue.filter((ele: any) => ele.id !== e.id),
      });
    }
  };

  const handleRoleId = (ele: any, index: number) => {
    setActive(ele);
    setCurrentRoleIndex(index);
  };

  console.log(selectFunction.selectvalue, "selectedvalue");
  const handleSubmitForm = () => {
    const data = {
      role: { id: parseInt(selectRole.value) },
      routes: selectFunction.selectvalue,
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
        title={
          clickedBtn === "add"
            ? ROLEFUNNAMEFORM
            : ROLEFUNNAMEFORMUPDATE
        }
      />

      <Box
        component="form"
        sx={{
          width: "100%",
          "& .MuiTextField-root": { mb: 2 },
          padding: "10px",
        }}
        noValidate={true}
      >
        <FormTextDropdown
          Value={selectRole.value}
          onSelect={handleSelectRole}
          placeholder={"Select Role"}
          label={"Select Role"}
          CustomErrorLine={"Select a role"}
          multiSelect={false}
          Required={true}
          disable={initialValue ? true : false}
          Options={roleList}
        />
        {selectRole.value.length !== 0 ? (
          <>
            <h6 className="my-3">{ROLEPERMISSION}</h6>
            <div className="row">
              <div className="col-md-5">
                <div className="rolepermissionList ">
                  {storeFunctionList.map((ele: any, index: number) => (
                    <p
                      key={index}
                      className={ele.label == isActive ? "roleactiveclass" : ""}
                      onClick={() => handleRoleId(ele.label, index)}
                    >
                      {ele.label}
                    </p>
                  ))}
                </div>
              </div>
              <div className="col-md-7">
                
                  {storeFunctionList[currentRoleIndex]?.functionArr.map(
                    (e: any, index: number) => {
                      const key =
                        Math.random() * Math.random() + index.toString();
                      return (
                        <div key={key}>
                          <Checkbox
                            id={key}
                            checked={e.checked}
                            onChange={(event) => {
                              // console.log("clicked", event);
                              handleSelectFunctions(currentRoleIndex, index, e);
                            }}
                          />
                          <label htmlFor={key}> {e.label}</label>
                        </div>
                      );
                    }
                )}
                
              </div>
            </div>
          </>
        ) : (
          <div className="mt-3">{SELECTROLE}</div>
        )}
      </Box>

      <CardActions className="d-flex dust justify-content-end">
        <Button size="large" variant="outlined" onClick={onHandleClose}>
          {CANCEL}
        </Button>
        <Button
          size="large"
          variant="contained"
          disabled={clickedBtn === "add" ? disable : editDisable}
          onClick={handleSubmitForm}
        >
          {clickedBtn === "add" ? strings["FORM.SAVEBTN"] : strings["FORM.UPDATEBTN"]}
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoleMappingForm;
