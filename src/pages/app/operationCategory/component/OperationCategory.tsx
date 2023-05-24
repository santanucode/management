import React, { useEffect, useMemo, useState } from "react";
import { CustomModal as Modal } from "components/common/modal/modal";
import { Stack, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import DataTable from "components/table/dataTable/dataTable";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import {
  CREATEOPTCATDT,
  OPERATIONCATEDT,
  UPDATEOPTCATDT,
} from "../service/types";
import CommonMainButton from "components/common/Button/commonButton";
import {
  ADDCATEGORY,
  TBLDATE,
  TBLCATEGORY,
  CATEGORY,
  TBLNODATA,
  PATHCURRENT,
  PATHHOME,
  TBLDATTUM,
  STATUSCHANGEHEAD,
  STATUSCHANGESUBHEAD,
  STATUSCHANGEPERMISSIONYES,
} from "../container/categoryString";
import OperaionCatForm from "components/form/operationCategoryForm/operationCategoryForm";
import Loader from "components/common/Loader/Loader";
import Swal from "sweetalert2";
import StatusChip from "components/common/chip/chip";
import {
  STATUSCHANGEDELETED,
  STATUSCHANGEPERMISSIONNO,
  STATUSDELETEDSUBHEAD,
  STATUSDELETEDSUCCESS,
} from "pages/app/wage/container/wageString";
import {
  CURRENT_SUCCESS,
  CURRENT_SUCCESS_CREATED,
  CURRENT_SUCCESS_UPDATED,
} from "pages/app/staff/container/staffString";
import { reset } from "../service/operationCateSlice";
import { useDispatch } from "react-redux";
import "../container/categoryString";
import { OperationCateProps } from "../container/operationCateContainer";
const OperationCategory = (props: OperationCateProps) => {
  const {
    getAllOperaionCategory,
    loading_getOptCat,
    error_createOptCat,
    loading_createOptCat,
    success_createOptCat,
    loading_updateOptCat,
    error_updateOptCat,
    success_updateOptCat,
    opertionCategory,
    createOperaionCategory,
    updateOperaionCategory,
    updateOperaionStatusCategory,
    loading_updateOptStatusCat,
    success_updateOptStatusCat,
    role_function,
    getRoleFuncn
  } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<OPERATIONCATEDT>();
  const [rows, setRows] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | boolean>();
  const [isLoader, setLoader] = useState<string | boolean>(false);

  useEffect(() => {
    getAllOperaionCategory();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])

  
  useEffect(() => {
    setRows(opertionCategory);
  }, [loading_getOptCat]);

  useEffect(() => {
    const isLoading =
      loading_getOptCat ||
      loading_updateOptCat ||
      loading_createOptCat ||
      loading_updateOptStatusCat;
    setLoader(isLoading);
  }, [
    loading_getOptCat,
    loading_updateOptCat,
    loading_createOptCat,
    loading_updateOptStatusCat,
  ]);

  useEffect(() => {
    if (success_createOptCat) {
      dispatch(reset());
      setErrorMessage("");
      setIsOpen(false);
      getAllOperaionCategory();
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_CREATED,
        icon: "success",
      });
    } else if (error_createOptCat) {
      setErrorMessage(error_createOptCat);
    } else if (error_updateOptCat) {
      setErrorMessage(error_updateOptCat);
    } else if (success_updateOptCat) {
      dispatch(reset());
      getAllOperaionCategory();
      setErrorMessage("");
      setIsOpen(false);
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_UPDATED,
        icon: "success",
      });
    } else if (success_updateOptStatusCat) {
      swalWithBootstrapButtons.fire(
        STATUSCHANGEDELETED,
        STATUSDELETEDSUBHEAD,
        STATUSDELETEDSUCCESS
      );
      dispatch(reset());
      getAllOperaionCategory();
    }
  }, [
    success_createOptCat,
    error_createOptCat,
    error_updateOptCat,
    success_updateOptCat,
    success_updateOptStatusCat,
  ]);

  const columns = useMemo<MRT_ColumnDef<OPERATIONCATEDT>[]>(
    () => [
      {
        accessorKey: "name",
        header: TBLCATEGORY,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "datum",
        header: TBLDATTUM,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "effective_from",
        header: TBLDATE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "is_active",
        header: "Status",
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue<any>()} />,
      },
    ],
    []
  );

  const paths = [
    {
      name: PATHHOME,
      path: "",
    },
    {
      name: PATHCURRENT,
    },
  ];

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

  const handleChangeEdit = (row: OPERATIONCATEDT) => {
    setCurrentType(row);
    handleSelectBtn("edit");
    openAddModal();
  };

  const handleAddOptCate = (value: CREATEOPTCATDT) => {
    createOperaionCategory(value);
  };
  const handleUpdateOptCate = (value: any) => {
    const optCat_details = {
      name: value?.name,
      datum: value?.datum,
      is_active: currentType?.is_active === 1 ? true : false,
      effective_from: value?.effective_from,
    };
    const data = {
      id: currentType?.id,
      category: optCat_details,
    };
    updateOperaionCategory(data);
  };


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const handleChangeStatus = (data: UPDATEOPTCATDT) => {
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
  const handleActionStatus = (values: UPDATEOPTCATDT) => {
    const categoryData = JSON.parse(JSON.stringify(values));
    console.log(categoryData);
    let value = {
      name: categoryData.name,
      datum: categoryData.datum,
      is_active: categoryData.is_active === 1 ? false : true,
      effective_from: categoryData.effective_from,
    };
    const data = {
      id: categoryData?.id,
      category: value,
    };
    updateOperaionStatusCategory(data);
  };

  const selectModal = () => {
    return (
      <OperaionCatForm
        handleFormData={
          clickedBtn === "add" ? handleAddOptCate : handleUpdateOptCate
        }
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
      <Modal isOpen={isOpen} boxWidth="30%">
        {selectModal()}
      </Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{CATEGORY}</Typography>
        </div>
        {role_function?.OperationCatagory.Create_New_Operation_Catagory && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDCATEGORY}
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
          handleChangeStatus={handleChangeStatus}
          column={columns}
          isUpdate={role_function?.OperationCatagory.Update_Operation_Catagory_Detail && true}
          isStatus={role_function?.OperationCatagory.Update_Operation_Catagory_Detail && true}
        />
      </div>
    </>
  );
};

export default OperationCategory;
