import React, { useEffect, useMemo, useState } from "react";
import { CustomModal as Modal } from "components/common/modal/modal";
import { Button, Stack, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import BankForm from "components/form/bankForm/bankForm";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import { MRT_ColumnDef } from "material-react-table";
import StatusChip from "components/common/chip/chip";

import {
  ADDLABEL,
  BANKLABEL,
  CURRENTPATH,
  HOMEPATH,
  IFSCLABEL,
  STATUSLABEL,
  TBLHEAD,
} from "../container/bankString";

import Loader from "components/common/Loader/Loader";
import DataTable from "components/table/dataTable/dataTable";
import Swal from "sweetalert2";
import {
  CURRENT_SUCCESS,
  CURRENT_SUCCESS_CREATED,
  CURRENT_SUCCESS_UPDATED,
} from "pages/app/staff/container/staffString";
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
import { useDispatch } from "react-redux";
import { reset } from "../service/banksSlice";
import { BanksProps } from "../container/banksContainer";
import { BankApiDTO, BankStatusChangeDTO } from "../service/types";

interface SUBMITDT {
  name?: string;
  ifsc_code?: string;
  id?: number;
  is_active: number;
  status?: string;
}
const paths = [
  {
    name: HOMEPATH,
    path: "",
  },
  {
    name: CURRENTPATH,
  },
];
const Bank = (props: BanksProps) => {
  const {
    loading_getBank,
    getAllBanks,
    createBank,
    updateBank,
    statusChangeBank,
    banksList,
    error_createBank,
    loading_createBank,
    success_createBank,

    error_updateBank,
    success_updateBank,
    loading_updateBank,

    loading_statusBank,
    success_statusBank,
    role_function,
    getRoleFuncn
  } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<SUBMITDT>();
  const [rows, setRows] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | boolean>();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getAllBanks();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])
  console.log("role_function", role_function)

  
  
  useEffect(() => {
    setRows(banksList);
  }, [banksList]);

  useEffect(() => { 
    if (success_createBank) {
      dispatch(reset());
      setErrorMessage("");
      setIsOpen(false);
      getAllBanks();
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_CREATED,
        icon: "success",
      });
    } else if (error_createBank) {
      setErrorMessage(error_createBank);
    } else if (error_updateBank) {
      setErrorMessage(error_updateBank);
    } else if (success_updateBank) {
      dispatch(reset());
      setErrorMessage("");
      setIsOpen(false);
      getAllBanks();
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_UPDATED,
        icon: "success",
      });
    } else if (success_statusBank) {
      dispatch(reset());
      setIsOpen(false);
      getAllBanks();
      setErrorMessage("");
      swalWithBootstrapButtons.fire(
        STATUSCHANGEDELETED,
        STATUSDELETEDSUBHEAD,
        STATUSDELETEDSUCCESS
      );
    }
  }, [
    success_createBank,
    success_statusBank,
    error_createBank,
    error_updateBank,
    success_updateBank,
  ]);

  useEffect(() => {
    const isLoading =
      loading_getBank ||
      loading_createBank ||
      loading_updateBank ||
      loading_statusBank;
    setLoader(isLoading);
  }, [
    loading_getBank,
    loading_createBank,
    loading_updateBank,
    loading_statusBank,
  ]);
  const columns = useMemo<MRT_ColumnDef<SUBMITDT>[]>(
    () => [
      {
        accessorKey: "name",
        header: BANKLABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "ifsc_code",
        header: IFSCLABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "status",
        header: STATUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue<any>()} />,
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
  const handleChangeEdit = (data: SUBMITDT) => {
    setClickedBtn("edit");
    setCurrentType(data);
    setIsOpen(true);
  };
  const handleAddBank = (value: SUBMITDT) => {
    setErrorMessage("");
    createBank(value);
  };
  const handleUpdateBank = (value: SUBMITDT) => {
    const data = {
      name: value.name,
      ifsc_code: value.ifsc_code,
      is_active: value.is_active === 1 ? false : true,
    };
    const bankDetail = {
      id: currentType?.id,
      value: data,
    };
    updateBank(bankDetail);
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },

    buttonsStyling: false,
  });
  const handleStatusChange = (data: BankStatusChangeDTO) => {
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
  const handleActionStatus = (values: BankStatusChangeDTO) => {
    const bankData = JSON.parse(JSON.stringify(values));
    if (bankData?.is_active === 1) {
      bankData.is_active = false;
    } else {
      bankData.is_active = true;
    }
    const result = {
      name: bankData.name,
      ifsc_code: bankData.ifsc_code,
      is_active: bankData.is_active,
    };
    const data = {
      id: bankData?.id,
      bank_detail: result,
    };
    statusChangeBank(data);
  };
  const selectModal = () => {
    return (
      <BankForm
        handleFormData={clickedBtn === "add" ? handleAddBank : handleUpdateBank}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  };
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen}>{selectModal()}</Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{TBLHEAD}</Typography>
        </div>
        {role_function?.Bank.Create_New_Bank ?<div>
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
              {ADDLABEL}
            </Button>
          </Stack>
        </div>:null}
      </div>

      <div>
        <DataTable
          data={rows}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={ role_function?.Bank.Update_Bank_Detail && true}
          isStatus={ role_function?.Bank.Update_Bank_Detail && true}
        />
      </div>
    </>
  );
};

export default Bank;
