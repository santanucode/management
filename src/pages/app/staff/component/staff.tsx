import React, { useEffect, useMemo, useState } from "react";
import { CustomModal as Modal } from "components/common/modal/modal";
import { Stack, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import StaffForm from "components/form/staffForm/staffForm";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import {
  BANKSTATEDT,
  CREATEDT,
  GROUPSTATEDT,
  STAFFDT,
  UPDATEEDT,
} from "../service/types";
import CommonMainButton from "components/common/Button/commonButton";
import {
  ADDSTAFF,
  CURRENT_SUCCESS,
  CURRENT_SUCCESS_CREATED,
  CURRENT_SUCCESS_UPDATED,
  STAFF,
  TBLACCNO,
  TBLBANK,
  TBLEMPCODE,
  TBLEPFNO,
  TBLESINO,
  TBLGROUP,
  TBLINSNO,
  TBLNAME,
  TBLSTATUS,
  TBLUANNO,
  TBLUDAI,
  TBLUSLNO,
} from "../container/staffString";
import StatusChip from "components/common/chip/chip";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Loader from "components/common/Loader/Loader";
import {
  STATUSCHANGEDELETED,
  STATUSCHANGEHEAD,
  STATUSCHANGEPERMISSIONNO,
  STATUSCHANGEPERMISSIONYES,
  STATUSCHANGESUBHEAD,
  STATUSDELETEDSCANCEL,
  STATUSDELETEDSCANCELERROR,
  STATUSDELETEDSCANCELSHEAD,
  STATUSDELETEDSUBHEAD,
  STATUSDELETEDSUCCESS,
} from "pages/app/wage/container/wageString";
import { StaffProps } from "../container/staffContainer";
import DataTable from "components/table/dataTable/dataTable";
import { reset } from "../service/staffSlice";
import { useDispatch } from "react-redux";

const MasterStaff = (props: StaffProps) => {
  const {
    getAllStaff,
    getAllGroups,
    getAllBanks,
    loading_getStaff,
    loading_createStaff,
    success_createStaff,
    error_createStaff,
    loading_updateStaff,
    success_updateStaff,
    error_updateStaff,
    staffList,
    createStaff,
    updateStaff,
    success_statusStaff,
    loading_statusStaff,
    statusChangeStaff,
    role_function,
    getRoleFuncn
  } = props;

  const dispatch = useDispatch();
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<STAFFDT>();
  const [rows, setRows] = useState(staffList);
  const [errorMessage, setErrorMessage] = useState<
    boolean | string | undefined
  >();
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [currentRow, setCurrentRow] = useState<CREATEDT>();
  const [isLoader, setLoader] = useState<boolean | string>(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getAllStaff();
    getAllGroups();
    getAllBanks();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])

  

  useEffect(() => {
    setRows(staffList);
  }, [loading_getStaff]);

  function dateDiffInDays(a: any, b: any) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const diffDay = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    return true ? diffDay < 0 : false;
  }
  const groupLists = useSelector(
    (state: GROUPSTATEDT) => state.groups.groupList
  );
  const bankLists = useSelector((state: BANKSTATEDT) => state.banks.banksList);
  const masterGroups = groupLists?.map((ele) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    is_active: ele.is_active,
    effective_from: new Date(ele.effective_from),
  }));

  const GenderList = [
    {
        "id": 1,
        "value": "Male",
        "label": "Male"
    },
    {
        "id": 2,
        "value":  "Female",
        "label": "Female"
    }
  ]
  

  const filterGroups = masterGroups?.filter((ele) => {
    return (
      ele.is_active === 1 && dateDiffInDays(date, new Date(ele.effective_from))
    );
  });

  const MasterBanks = bankLists?.map(
    (ele: { id: number; name: string; is_active: number | undefined }) => ({
      id: ele.id,
      value: ele.id,
      label: ele.name,
      is_active: ele.is_active,
    })
  );
  const filterBanks = MasterBanks?.filter((ele: { is_active: number }) => {
    return ele.is_active === 1;
  });

  useEffect(() => {
    if (success_createStaff) {
      dispatch(reset());
      setErrorMessage("");
      getAllStaff();
      setIsOpen(false);
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_CREATED,
        icon: "success",
      });
    } else if (error_createStaff) {
      setErrorMessage(error_createStaff);
    } else if (error_updateStaff) {
      setErrorMessage(error_updateStaff);
    } else if (success_updateStaff) {
      dispatch(reset());
      setIsOpen(false);
      setIsOpenStatus(false);
      getAllStaff();
      setErrorMessage("");
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_UPDATED,
        icon: "success",
      });
    } else if (success_statusStaff) {
      dispatch(reset());
      setIsOpen(false);
      setIsOpenStatus(false);
      getAllStaff();
      setErrorMessage("");
      swalWithBootstrapButtons.fire(
        STATUSCHANGEDELETED,
        STATUSDELETEDSUBHEAD,
        STATUSDELETEDSUCCESS
      );
    }
  }, [
    success_createStaff,
    success_updateStaff,
    error_createStaff,
    error_updateStaff,
    success_statusStaff,
  ]);

  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "name",
        header: TBLNAME,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "code",
        header: TBLEMPCODE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "union_serial_number",
        header: TBLUSLNO,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "group_id.name",
        header: TBLGROUP,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "aadhar_number",
        header: TBLUDAI,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "universal_account_number",
        header: TBLUANNO,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "bank_id.name",
        header: TBLBANK,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "bank_acc_number",
        header: TBLACCNO,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "epf_number",
        header: TBLEPFNO,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "esi_number",
        header: TBLESINO,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "insurance_number",
        header: TBLINSNO,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "father_name",
        header: "Father's Name",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "dob",
        header: "DOB",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "doj",
        header: "DOJ",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "status",
        header: TBLSTATUS,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue()} />,
      },
    ],
    []
  );
  useEffect(() => {
    getAllStaff();
  }, []);
  useEffect(() => {
    const isLoading =
      loading_getStaff ||
      loading_createStaff ||
      loading_updateStaff ||
      loading_statusStaff;
    setLoader(isLoading);
  }, [
    loading_getStaff,
    loading_createStaff,
    loading_updateStaff,
    loading_statusStaff,
  ]);
  const paths = [
    {
      name: "Home",
      path: "",
    },
    {
      name: "Staff",
    },
  ];

  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false);
  };
  const handleSelectBtn = (btn: string) => {
    setClickedBtn(btn);
  };
  const handleChangeEdit = (row: any) => {
    setCurrentType(row);
    handleSelectBtn("edit");
    openAddModal();
  };
  const handleAddStaff = (data: CREATEDT) => {
    createStaff(data);
  };

  const handleUpdateStaff = (data: any) => {
    let data_staff = {
      name: data.name,
      aadhar_number: parseInt(data.aadhar_number),
      code: data.code,
      union_serial_number: data.union_serial_number,
      universal_account_number: data.universal_account_number,
      insurance_number: data.insurance_number,
      father_name: data.father_name,
      dob: data.dob,
      doj:data.doj,
      gender:data.gender,
      epf_number: data.epf_number,
      esi_number: data.esi_number,
      bank_acc_number: data.bank_acc_number,
      bank_id: data.bank_id.toString(),
      group_id: data.group_id.toString(),
      is_active: currentType?.is_active === 1 ? true : false,
    };
    const staffData = {
      id: currentType?.id,
      value: data_staff,
    };
    updateStaff(staffData);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },

    buttonsStyling: false,
  });
  const handleStatusChange = (data: any) => {
    setCurrentRow(data);
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

  const handleActionStatus = (values: UPDATEEDT) => {
    const staffDetail = JSON.parse(JSON.stringify(values));
    if (staffDetail?.is_active === 1) {
      staffDetail.is_active = false;
    } else {
      staffDetail.is_active = true;
    }
    let newStaffData = {
      name: staffDetail.name,
      aadhar_number: parseInt(staffDetail.aadhar_number),
      code: staffDetail.code,
      union_serial_number: staffDetail.union_serial_number,
      universal_account_number: staffDetail.universal_account_number,
      insurance_number: staffDetail.insurance_number,
      father_name: staffDetail.father_name,
      gender: staffDetail.gender,
      dob: staffDetail.dob,
      doj:staffDetail.doj,
      epf_number: staffDetail.epf_number,
      esi_number: staffDetail.esi_number,
      bank_acc_number: staffDetail.bank_acc_number.toString(),
      bank_id: staffDetail.bank_id.id.toString(),
      group_id: staffDetail.group_id.id.toString(),
      is_active: staffDetail.is_active,
    };
    const staffData = {
      id: staffDetail?.id,
      value: newStaffData,
    };
    statusChangeStaff(staffData);
  };

  const selectModal = () => {
    return (
      <StaffForm
        handleFormData={
          clickedBtn === "add" ? handleAddStaff : handleUpdateStaff
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        groupLists={filterGroups}
        genderList ={GenderList}
        bankList={filterBanks}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  };
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen} boxWidth="45%">
        {selectModal()}
      </Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{STAFF}</Typography>
        </div>
        {role_function?.Staff.Create_New_Staff && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDSTAFF}
              onAddclick={() => {
                openAddModal();
                handleSelectBtn("add");
              }}
            />
          </Stack>
        </div>}
      </div>
      <div>
        <DataTable
          data={rows}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.Staff.Update_Staff_Detail &&  true}
          isStatus={role_function?.Staff.Update_Staff_Detail && true}
        />
      </div>
    </>
  );
};

export default MasterStaff;
