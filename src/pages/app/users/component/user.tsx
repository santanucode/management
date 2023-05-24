import React, { useEffect, useMemo, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { CustomModal as Modal } from "../../../../components/common/modal/modal";
import { Add } from "iconsax-react";
import UserForm from "../../../../components/form/userForm/userForm";
import { MRT_ColumnDef } from "material-react-table";
import StatusChip from "components/common/chip/chip";
import DataTable from "components/table/dataTable/dataTable";
import {
  ADDNEWUSER,
  ALLUSERS,
  EMAILLABEL,
  FIRSTNAMELABEL,
  LASTNAMELABEL,
  MIDDLENAMELABEL,
  ROLELABEL,
  STATUSLABEL,
  SUCESSCREATETITLE,
  SUCESSCREATEXT,
  SUCESSSTATUSTEXT,
  SUCESSSTATUSTITLE,
  SUCESSUPDATETITLE,
  SUCESSUPDATEXT,
} from "../container/userString";
import {
  CREATEDTO,
  PROPSDTO,
  ROLEDTO,
  SUBMITDT,
  UPDATEDTO,
  UPDATEROLEDTO,
} from "../service/types";
import Swal from "sweetalert2";
import Loader from "components/common/Loader/Loader";
import {
  STATUSCHANGEHEAD,
  STATUSCHANGEPERMISSIONNO,
  STATUSCHANGEPERMISSIONYES,
  STATUSCHANGESUBHEAD,
} from "pages/app/wage/container/wageString";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../service/userSlice";
import { UsersProps } from "../container/userContainer";

const User = (props: UsersProps) => {
  const {
    loading_getUser,
    getAllUsers,
    createUser,
    updateUser,
    updateStatusUser,
    usersList,
    loading_createUser,
    success_createUser,
    error_createUser,
    loading_updateUser,
    success_updateUser,
    error_updateUser,
    loading_statusUser,
    success_statusUser,
    getAllRoles,
    role_function,
    getRoleFuncn

  } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<SUBMITDT>();
  const [errorMessage, setErrorMessage] = useState<
    boolean | string | undefined
  >();
  const [rows, setRows] = useState(usersList);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getAllUsers();
    getAllRoles();
  }, []);


  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  useEffect(() => {
    setRows(usersList);
  }, [loading_getUser]);

  useEffect(() => {
    if (success_createUser) {
      dispatch(reset());
      setErrorMessage("");
      setIsOpen(false);
      getAllUsers();
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: "success",
      });
    } else if (error_createUser) {
      setErrorMessage(error_createUser);
    } else if (error_updateUser) {
      setErrorMessage(error_updateUser);
    } else if (success_updateUser) {
      dispatch(reset());
      setErrorMessage("");
      setIsOpen(false);
      getAllUsers();
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: "success",
      });
    } else if (success_statusUser) {
      dispatch(reset());
      setIsOpen(false);
      setErrorMessage("");
      getAllUsers();
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    }
  }, [
    success_createUser,
    success_statusUser,
    error_createUser,
    error_updateUser,
    success_updateUser,
  ]);

  useEffect(() => {
    const isLoading =
      loading_getUser ||
      loading_createUser ||
      loading_updateUser ||
      loading_statusUser;
    setLoader(isLoading);
  }, [
    loading_getUser,
    loading_createUser,
    loading_updateUser,
    loading_statusUser,
  ]);

  const rolesList = useSelector(
    (state: { roles: { roles: ROLEDTO[] } }) => state.roles.roles
  );

  const masterRoles = rolesList?.map((ele: ROLEDTO) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    is_active: ele.is_active,
  }));
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const columns = useMemo<MRT_ColumnDef<SUBMITDT>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: FIRSTNAMELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "middle_name",
        header: MIDDLENAMELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "last_name",
        header: LASTNAMELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "login_id",
        header: EMAILLABEL,
        enableColumnOrdering: false,
      },
      {
        accessorFn: (row) =>
          row.roles?.map((ele: { name: string }) => ele.name).join(", "),
        header: ROLELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "is_active",
        header: STATUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue()} />,
      },
    ],
    []
  );

  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false);
  };
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn);
  };

  const handleAddUser = (value: CREATEDTO) => {
    createUser(value);
  };

  const handleUpdateRole = (value: UPDATEROLEDTO) => {
    const data = {
      first_name: value.first_name,
      last_name: value.last_name,
      login_id: value.login_id,
      middle_name: value.middle_name,
      password: value.password,
      is_active: currentType?.is_active === 1 ? true : false,
      roles: value.roles,
    };
    const userDetail = {
      id: currentType?.id,
      value: data,
    };
    updateUser(userDetail);
  };

  const handleChangeEdit = (data: SUBMITDT) => {
    setCurrentType(data);
    setIsOpen(true);
    setClickedBtn("edit");
  };

  const handleActionStatus = (data: UPDATEDTO) => {
    const userData = JSON.parse(JSON.stringify(data));
    if (userData?.is_active === 1) {
      userData.is_active = false;
    } else {
      userData.is_active = true;
    }
    const result = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      login_id: userData.login_id,
      middle_name: userData.middle_name,
      password: userData.password,
      is_active: userData.is_active,
    };
    const datas = {
      id: userData?.id,
      value: result,
    };
    updateStatusUser(datas);
  };

  const handleChangeStatus = (data: UPDATEDTO) => {
    swalWithBootstrapButtons
      .fire({
        title: STATUSCHANGEHEAD,
        text: STATUSCHANGESUBHEAD,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: STATUSCHANGEPERMISSIONYES,
        cancelButtonText: STATUSCHANGEPERMISSIONNO,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleActionStatus(data);
        }
      });
  };
  const selectModal = () => {
    return (
      <UserForm
        handleFormData={clickedBtn === "add" ? handleAddUser : handleUpdateRole}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        allRoles={masterRoles}
      />
    );
  };
  return (
    <div>
      {isLoader && <Loader />}
      <Modal isOpen={isOpen}>{selectModal()}</Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{ALLUSERS}</Typography>
        </div>
        {role_function?.User.Create_New_User &&<div>
          <Stack spacing={2} direction="row">
            <Button
              sx={{ borderRadius: "10px" }}
              size="medium"
              variant="contained"
              startIcon={<Add size="22" color="#FFFFFF" />}
              onClick={() => {
                openAddModal();
                handleSelectBtn("add");
              }}
            >
              {ADDNEWUSER}
            </Button>
          </Stack>
        </div>}
      </div>
      <div>
        <DataTable
          data={rows}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleChangeStatus}
          column={columns}
          isUpdate={role_function?.User.UpdateUserDetail && true}
          isStatus={role_function?.User.UpdateUserDetail && true}
        />
      </div>
    </div>
  );
};

export default User;
