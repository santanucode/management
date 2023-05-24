import React, { useEffect, useState, useMemo } from "react";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import { Button, Stack, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import { MRT_ColumnDef } from "material-react-table";
import { CustomModal as Modal } from "components/common/modal/modal";
import RoleMappingForm from "components/form/role-function-mapping-form/role-function-mapping-form";
import DataTable from "components/table/dataTable/dataTable";
import { RoleFunctionMapProps } from "../container/roleFunctionMapContainer";
import { ROLEDTO, TBLDTO, functionsListDTO } from "../service/types";
import {
  ADDROLEFUNCTIONMAP,
  ERRORHEADER,
  ROLEFUNCTIONMAP,
  ROLEHEADER,
  SUCCESSHEADER,
} from "../container/rolefunctionString";
import Loader from "components/common/Loader/Loader";
import { useDispatch } from "react-redux";
import { reset } from "../service/roleFunctionMapSlice";
import Swal from "sweetalert2";
import strings from "translation";

interface RFMDT {
  name: string;
  id: number;
  routeDetails: { id: number; name: string }[];
}
const paths = [
  {
    name: strings["HEADER.HOMEPATH"],
    path: "",
  },
  {
    name: ROLEHEADER,
  },
];

interface FunctionObj {
  id: number;
  value: string;
  label: string;
  checked: boolean;
}

interface ObjectWithFunctionArr {
  id: number;
  value: string;
  label: string;
  functionArr: FunctionObj[];
}

interface ResultObj {
  label: string;
  functionArr: FunctionObj[];
}
const RoleFunctionMapping = (props: RoleFunctionMapProps) => {
  const {
    loading_getRole,
    success_getRole,
    loading_getAllFunction,
    success_getAllFunction,
    functionsList,
    roles,
    rolefunctionslist,
    getAllRoles,
    getAllFunctions,
    getAllRoleFunctionMap,
    createRoleFunctionMap,
    loading_getAllRoleFunctionMap,
    success_getAllRoleFunctionMap,
    loading_createRoleFunctionMap,
    success_createRoleFunctionMap,
    error_createRoleFunctionMap,
    role_function,
    getRoleFuncn
  } = props;

  console.log("functionsList",functionsList)
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<RFMDT>();
  const [rows, setRows] = useState<TBLDTO[]>(rolefunctionslist);
  const [allFunctions, setAllFunctions] = useState<ObjectWithFunctionArr[]>([]);
  const [allRoles, setAllRoles] = useState([]);
  const [finalFunObj, setFinalFunObj] = useState<ResultObj[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [allUncheck, setAllUncheck] = useState(false);


  
  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)


  useEffect(() => {
    getAllRoles();
    getAllFunctions();
    getAllRoleFunctionMap();
  }, [success_createRoleFunctionMap, error_createRoleFunctionMap]);
  
  const handleAddUserRole = (value: RFMDT) => {
    createRoleFunctionMap(value);
    setAllUncheck(true);
  };
  useEffect(() => {
    setRows(rolefunctionslist);
  }, [rolefunctionslist, success_createRoleFunctionMap]);

  useEffect(() => {
    if (functionsList.length > 0) {
      const masterFunctions = functionsList.map((ele: ROLEDTO) => {
        const checked = currentType?.routeDetails.filter(
          (elem: { id: number }) => elem.id === ele.id
        ).length;
        return {
          label: ele.name.split(".")[0],
          functionArr: [
            {
              id: ele.id,
              label: ele.name.split(".")[1],
              checked: checked && !allUncheck ? true : false,
            },
          ],
        };
      });
      setAllFunctions(masterFunctions);
      console.log(masterFunctions, "masterFunctions");
    }
  }, [functionsList, currentType, clickedBtn, allUncheck]);


  useEffect(() => {
    const result: ResultObj[] = Array.from(
      allFunctions
        .reduce((r, o) => {
          const record = r.get(o.label) || {};
          r.set(o.label, {
            label: o.label,
            functionArr: [
              ...(record.functionArr || []),
              ...o.functionArr.filter((o) => Object.keys(o).length != 0),
            ],
          });
          return r;
        }, new Map())
        .values()
    );
    console.log("result",result)
    setFinalFunObj(result);
  }, [functionsList, allFunctions, currentType]);
  useEffect(() => {
    if (success_createRoleFunctionMap) {
      dispatch(reset());
      setIsOpen(false);
      Swal.fire({
        title: strings["ADD.SUCEESS.TITLE"],
        text: SUCCESSHEADER,
        icon: "success",
      });
    } else if (error_createRoleFunctionMap) {
      dispatch(reset());
      setIsOpen(false);
      Swal.fire({
        title: "Error",
        text: ERRORHEADER,
        icon: "error",
      });
    }
  });
  useEffect(() => {
    if (roles.length > 0) {
      const masterRoles = roles.map((ele: ROLEDTO) => ({
        id: ele.id,
        value: ele.id,
        label: ele.name,
      }));
      setAllRoles(masterRoles);
    }
  }, [success_getRole]);

  const columns = useMemo<MRT_ColumnDef<TBLDTO>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Role",
        enableColumnOrdering: false,
      },
      {
        accessorFn: (row) =>
          row.routeDetails
            ?.map((ele) => ele.name.split(".")[1])
            .join(", ")
            .slice(0, 20) + " ...",
        id: "routeDetails",
        header: "Functions",
        enableColumnOrdering: false,
      },
    ],
    []
  );
  // const handleAddUserRole = (value: RFMDT) => {
  //   createRoleFunctionMap(value);
  //   setAllUncheck(true);
  // };
  const handleUpdateUserRole = (value: RFMDT) => {
    createRoleFunctionMap(value);
    setAllUncheck(false);
  };

  useEffect(() => {
    const isLoading =
      loading_createRoleFunctionMap ||
      loading_getAllFunction ||
      loading_getRole ||
      loading_getAllRoleFunctionMap;
    setLoader(isLoading);
  }, [
    loading_createRoleFunctionMap,
    loading_getAllFunction,
    loading_getRole,
    loading_getAllRoleFunctionMap,
  ]);
  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn);
  };

  const handleChangeEdit = (data: any) => {
    setCurrentType(data);
    setIsOpen(true);
    setClickedBtn("edit");
  };
  useEffect(() => {
    if (clickedBtn === "add") {
      setAllUncheck(true);
    } else {
      setAllUncheck(false);
    }
  }, [clickedBtn]);
  const selectModal = () => {
    return (
      <RoleMappingForm
        handleFormData={
          clickedBtn === "add" ? handleAddUserRole : handleUpdateUserRole
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : ""}
        roleList={allRoles}
        funcList={finalFunObj}
      />
    );
  };
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen} boxWidth="60%">
        {selectModal()}
      </Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{ROLEFUNCTIONMAP}</Typography>
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <Button
              sx={{ borderRadius: "10px" }}
              size="large"
              variant="contained"
              startIcon={<Add size="22" color="#FFFFFF" />}
              onClick={() => {
                openAddModal();
                handleSelectBtn("add");
              }}
            >
              {ADDROLEFUNCTIONMAP}
            </Button>
          </Stack>
        </div>
      </div>
      <div>
        <DataTable
          data={rows}
          handleEditAction={handleChangeEdit}
          column={columns}
          isUpdate={true}
          isStatus={false}
        />
      </div>
    </>
  );
};

export default RoleFunctionMapping;
