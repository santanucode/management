import React, { useEffect, useMemo, useState } from "react";
import { CustomModal as Modal } from "components/common/modal/modal";
import { Button, Stack, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import { MRT_ColumnDef } from "material-react-table";
import {
  ADDNEWSHIFT,
  CURRENTPATH,
  SHIFTAMOUNT,
  HOMEPATH,
  NAMELABEL,
  TBLHEAD,
  STATUS,
  SUCESSUPDATETITLE,
  SUCESSUPDATEXT,
  SUCESSSTATUSTITLE,
  SUCESSSTATUSTEXT,
  SUCESSCREATETITLE,
  SUCESSCREATEXT,
  SUCESSREVISETEXT,
  SUCESSREVISETITLE,
  UPCOMINGREVISE,
} from "../container/shiftString";
import ShiftForm from "components/form/shiftForm/shiftForm";
import Swal from "sweetalert2";
import Loader from "components/common/Loader/Loader";
import StatusChip from "components/common/chip/chip";
import {
  STATUSCHANGEHEAD,
  STATUSCHANGEPERMISSIONNO,
  STATUSCHANGEPERMISSIONYES,
  STATUSCHANGESUBHEAD,
} from "pages/app/wage/container/wageString";
import { reset } from "../service/shiftSlice";
import { useDispatch } from "react-redux";
import { SHIFTDT } from "components/form/shiftForm/types";
import EffectiveTable from "components/table/effectiveTable/effectiveTable";
import ReviseShiftForm from "components/form/shiftForm/reviseShiftForm";
import { ShiftProps } from "../container/shiftContainer";
import moment from "moment";
import _ from "lodash";

const paths = [
  {
    name: HOMEPATH,
    path: "",
  },
  {
    name: CURRENTPATH,
  },
];

const MasterShift = (props: ShiftProps) => {
  const {
    loading_getShift,
    success_getShift,
    error_createShift,
    loading_createShift,
    success_createShift,
    loading_updateShift,
    error_updateShift,
    success_updateShift,
    loading_updateStatusShift,
    success_updateStatusShift,
    loading_createReviseShift,
    success_createReviseShift,
    error_createReviseShift,

    error_updateReviseShift,
    loading_updateReviseShift,
    success_updateReviseShift,

    shiftList,
    role_function,
    getAllShift,
    createShift,
    updateShift,
    createReviseShift,
    updateReviseShift,
    getRoleFuncn
  } = props;

  const date = new Date();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isReviseOpen, setReviseIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<any>();
  // const [rows, setRows] = useState(shiftList)

  const [finalData, setFinalData] = useState([]);

  const [errorMessage, setErrorMessage] = useState<any>();
  const [isLoader, setLoader] = useState(false);

  function dateDiffInDays(a: any, b: any) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const diffDay = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    return diffDay;
  }

  console.log("currentType", currentType);

  useEffect(() => {
    getAllShift();
  }, []);


  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)


  
  function sort_And_Return_1st_n_last_value_of_key(arr: any[], key: string) {
    const sortVal = _.sortBy(arr, (ele) => ele[key]);
    return `${sortVal[0][key]} - ${sortVal[sortVal.length - 1][key]}`;
  }

  function sort_And_Return_1st_n_last_value_of_Date(arr: any, key: string) {
    const sortVal = _.sortBy(arr, (ele) =>
      moment(moment(ele[key]).format("YYYYMMDD"))
    );
    return `${sortVal[0][key]}`;
  }

  function sort_And_Return_1st_n_last_value(arr: any, key: string) {
    const sortVal = _.sortBy(arr, (ele) =>
      moment(moment(ele[key]).format("YYYYMMDD"))
    );

    let output = _.groupBy(sortVal, function (n) {
      return n.effective_from <= moment().format()
        ? "current_date"
        : "upcoming_date";
    });
    return output;
  }

  useEffect(() => {
    // setRows(shiftList)
    const final: any = shiftList?.map((ele) => {
      const subRows = ele?.shiftDetails?.length
        ? ele.shiftDetails.map((ele_1) => {
            return {
              id: ele_1.id,
              name: ele.name,
              amount: ele_1.amount,
              effective_from: ele_1.effective_from,
            };
          })
        : [];

      // sort_And_Return_1st_n_last_value_of_key(ele?.shiftDetails ? ele.shiftDetails : [], "amount"),
      return {
        id: ele.id,
        name: ele.name,
        is_active: ele.is_active,
        is_night: ele.is_night,
        status: ele.status,
        effective_from: sort_And_Return_1st_n_last_value_of_Date(
          ele?.shiftDetails ? ele.shiftDetails : [],
          "effective_from"
        ),
        subRows: sort_And_Return_1st_n_last_value(subRows, "effective_from"),
      };
      // return ({
      //   name: ele.name,
      //   amount:(ele?.shiftDetails ? ele.shiftDetails[1]?.amount:"--"),
      //   effective_from: (ele?.shiftDetails ? ele.shiftDetails[1]?.effective_from:"--"),
      //   subRows: subRows
      // })
    });

    console.log("finalVAlue", final);

    setFinalData(final);
    // if (shiftList) {
    //   const currentShift = shiftList.map((ele: any) => {
    //     const newFilterRow = ele.shiftDetails.map((item: any) => {
    //       return {
    //         ...item,
    //         diffDays: dateDiffInDays(date, new Date(item.effective_from)),
    //         shift_status:
    //           ele.shiftDetails.length === 1 ?
    //             dateDiffInDays(date, new Date(item.effective_from)) <= 0 ?
    //               "Current" : "Outdated"
    //               : ""
    //       }
    //     })
    //     return { ...ele, shiftDetails: newFilterRow }
    //     // const filterRow =
    //     //   ele.shiftDetails.length === 1 ?
    //     //     ele.shiftDetails.map((val: any) => {
    //     //       return dateDiffInDays(date, new Date(val.effective_from)) <= 0 ?
    //     //         { ...val, shift_status: "Current" } :
    //     //         { ...val, dateStatus: "Upcomming" }
    //     //     })
    //     //     : ele.shiftDetails.length > 1 ?
    //     //       ele.shiftDetails.map((val: any) => {
    //     //         return dateDiffInDays(date, new Date(val.effective_from)) === 0 ?
    //     //           { ...val, shift_status: "Current" } :
    //     //           dateDiffInDays(date, new Date(val.effective_from)) < 0 ?
    //     //             { ...val, shift_status: "Outdated" } :
    //     //             { ...val, shift_status: "Upcomming" }
    //     //       }) : ele
    //     // return { ...ele, shiftDetails: filterRow }
    //   })

    // }
  }, [success_getShift]);

  console.log("finalData : : : ", finalData);

  // console.log(rows, "rows")

  useEffect(() => {
    const isLoading =
      loading_getShift ||
      loading_updateShift ||
      loading_createShift ||
      loading_updateStatusShift ||
      loading_createReviseShift ||
      loading_updateReviseShift;
    setLoader(isLoading);
  }, [
    loading_getShift,
    loading_updateShift,
    loading_createShift,
    loading_updateStatusShift,
    loading_createReviseShift,
    loading_updateReviseShift,
  ]);

  useEffect(() => {
    if (success_createShift) {
      dispatch(reset());
      setErrorMessage("");
      setIsOpen(false);
      getAllShift();
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: "success",
      });
    } else if (error_createShift) {
      setErrorMessage(error_createShift);
    } else if (error_updateShift) {
      setErrorMessage(error_updateShift);
    } else if (success_updateShift) {
      dispatch(reset());
      setErrorMessage("");
      setIsOpen(false);
      getAllShift();
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: "success",
      });
    } else if (success_updateStatusShift) {
      dispatch(reset());
      setIsOpen(false);
      getAllShift();
      setErrorMessage("");
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    } else if (success_createReviseShift) {
      dispatch(reset());
      setReviseIsOpen(false);
      getAllShift();
      setErrorMessage("");
      Swal.fire({
        title: SUCESSREVISETITLE,
        text: SUCESSREVISETEXT,
        icon: "success",
      });
    } else if (error_createReviseShift) {
      setErrorMessage(error_createReviseShift);
    } else if (success_updateReviseShift) {
      dispatch(reset());
      setReviseIsOpen(false);
      getAllShift();
      setErrorMessage("");
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    } else if (error_updateReviseShift) {
      setErrorMessage(error_updateReviseShift);
    }
  }, [
    success_createShift,
    error_createShift,
    error_updateShift,
    success_updateShift,
    success_updateStatusShift,
    success_createReviseShift,
    error_createReviseShift,
    success_updateReviseShift,
    error_updateReviseShift,
  ]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        header: NAMELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorFn: (row) =>
          row.subRows.current_date
            ? row.subRows.current_date[
                row?.subRows?.current_date
                  ? row?.subRows?.current_date?.length - 1
                  : ""
              ].amount
            : "--",
        header: SHIFTAMOUNT,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "status",
        header: STATUS,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue<any>()} />,
      },
    ],
    []
  );

  // console.log("rowsscfc",rows)

  console.log(finalData, "finalData");

  const columns3 = useMemo<MRT_ColumnDef<any>[]>(
    //column definitions...
    () => [
      {
        accessorFn: (row) =>
          row.subRows.upcoming_date ? row.subRows.upcoming_date[0].name : null,
        header: "Name",
      },
      {
        accessorFn: (row) =>
          row.subRows.upcoming_date
            ? row.subRows.upcoming_date[0].effective_from
            : null,
        header: "effective_from",
      },
      {
        accessorFn: (row) =>
          row.subRows.upcoming_date
            ? row.subRows.upcoming_date[0].amount
            : null,
        header: "Amount",
      },

      // {
      //   accessorKey: 'state',
      //   enableColumnOrdering: false,
      //   header: 'State',
      // },
    ],
    []
    //end
  );

  const openAddModal = () => {
    setErrorMessage("");
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false);
  };
  const handleReviseModalClose = () => {
    setReviseIsOpen(false);
  };
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn);
  };

  const handleChangeEdit = (data: SHIFTDT) => {
    setIsOpen(true);
    setCurrentType(data);
    setClickedBtn("edit");
  };

  const handleAddShift = (value: SHIFTDT) => {
    createShift(value);
  };

  const handleUpdateShift = (value: any) => {
    console.log("coming value form form", value);
    let shift_data = {
      name: value.shift.name,
      // amount: value.shift.amount,
      is_active: currentType?.is_active === 1 ? true : false,
      is_night: value.shift.is_night,
    };
    const data = {
      id: currentType?.id,
      shift: shift_data,
    };
    updateShift(data);
  };

  // const handleReviseUpdate = (value: any) => {
  //   setClickedBtn("edit")
  //   setClickedBtn("add")
  // }

  const handleChangeRevise = (value: SHIFTDT) => {
    setCurrentType(value);
    setClickedBtn("add");
    setReviseIsOpen(true);
  };

  const handleReviseShift = (value: any) => {
    console.log("coming value form form", value);
    let shift_data = {
      id: currentType?.id,
      amount: value.amount,
      effective_from: value.effective_from,
    };
    createReviseShift(shift_data);
  };

  const handleEditRevise = (value: any) => {
    setReviseIsOpen(true);
    setClickedBtn("edit");
    setCurrentType(value);
  };

  const handleUpdateRevise = (value: any) => {
    console.log("for update", value);
    let revise_update_data = {
      id: value.id,
      amount: value.amount,
      effective_from: value.effective_from,
    };
    updateReviseShift(revise_update_data);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleChangeStatus = (value: SHIFTDT) => {
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
          handleActionStatus(value);
        }
      });
  };

  const handleActionStatus = (data: SHIFTDT) => {
    const shiftData = JSON.parse(JSON.stringify(data));
    const result = {
      name: shiftData.name,
      amount: shiftData.amount,
      is_active: shiftData.is_active === 1 ? false : true,
      is_night: shiftData.is_night === 1 ? true : false,
    };

    const statusData = {
      id: shiftData.id,
      shift: result,
    };

    console.log("shiftData", shiftData);
    updateShift(statusData);
  };

  const selectModal = () => {
    return (
      <ShiftForm
        handleFormData={
          clickedBtn === "add" ? handleAddShift : handleUpdateShift
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  };

  const selectReviseModal = () => {
    return (
      <ReviseShiftForm
        handleFormData={
          clickedBtn === "add" ? handleReviseShift : handleUpdateRevise
        }
        // handleFormData={handleReviseShift}
        onHandleClose={handleReviseModalClose}
        clickedBtn={clickedBtn}
        // initValAdd = {clickedBtn === 'add' ? currentType : {}}
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
      {}
      <Modal isOpen={isReviseOpen}>{selectReviseModal()}</Modal>

      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{TBLHEAD}</Typography>
        </div>
        {role_function?.Shift.Create_New_Shift && <div>
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
              {ADDNEWSHIFT}
            </Button>
          </Stack>
        </div>}
      </div>
      <div>
        <EffectiveTable
          data={finalData}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleChangeStatus}
          handleChangeRevision={handleChangeRevise}
          column={columns}
          isUpdate={role_function?.Shift.Update_Shift_Detail && true}
          isStatus={role_function?.Shift.Update_Shift_Detail && true}
          isRevision={role_function?.Shift.Revise_Shift_Detail &&true}
          isPagination
          isEdit={true}
          options={false}
        />

        <div className="pt-4 pb-3">
          <Typography variant="h6">{UPCOMINGREVISE}</Typography>
          {/* <h6>Upcoming Revise</h6> */}
        </div>
        <EffectiveTable
          data={finalData.filter(
            (row: any) => row.subRows.upcoming_date !== undefined
          )}
          handleEditReviseAction={handleEditRevise}
          handleSelectBtn={handleSelectBtn}
          column={columns3}
          // isRevision
          isPagination
          isEdit={true}
          isReviseUpdate={role_function?.Shift.Update_Shift_Detail &&true}
          options={false}
        />
      </div>
    </>
  );
};

export default MasterShift;
