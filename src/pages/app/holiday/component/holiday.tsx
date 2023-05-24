import React, { useEffect, useMemo, useState } from 'react';
import { CustomModal as Modal } from 'components/common/modal/modal';
import { Stack, Typography } from '@mui/material';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import {
  MRT_ColumnDef
} from 'material-react-table';
import { ADDNEWHOLIDAY, CURRENTPATH, HOLIDAYDATE, HOMEPATH, NAMELABEL, STATUSLABEL, SUCESSCREATETITLE, SUCESSCREATEXT, SUCESSSTATUSTEXT, SUCESSSTATUSTITLE, SUCESSUPDATETITLE, SUCESSUPDATEXT, TBLHEAD } from '../container/holidayString';
import DataTable from 'components/table/dataTable/dataTable';
import HolidayForm from 'components/form/holidayForm/holidayForm';
import CommonMainButton from 'components/common/Button/commonButton';
import Swal from 'sweetalert2';
import Loader from 'components/common/Loader/Loader';
import StatusChip from 'components/common/chip/chip';
import { STATUSCHANGEDELETED, STATUSCHANGEHEAD, STATUSCHANGEPERMISSIONNO, STATUSCHANGEPERMISSIONYES, STATUSCHANGESUBHEAD, STATUSDELETEDSUBHEAD, STATUSDELETEDSUCCESS } from 'pages/app/wage/container/wageString';
import { reset } from '../service/holidaySlice';
import { useDispatch } from 'react-redux';
import { HolidayProps } from '../container/holidayContainer';

interface SUBMITDT {
  name?: string
  holiday_date?: string
  id?: number,
  is_active?: boolean | number
}

const paths = [
  {
    name: HOMEPATH,
    path: '',
  },
  {
    name: CURRENTPATH
  },
]

const MasterHoliday = (props: HolidayProps) => {
  const {
    getAllHoliday,
    createHoliday,
    updateHoliday,
    deleteHoliday,
    loading_getHoliday,
    loading_createHoliday,
    success_createHoliday,
    error_createHoliday,
    loading_updateHoliday,
    success_updateHoliday,
    error_updateHoliday,
    loading_deleteHoliday,
    success_deleteHoliday,
    error_deleteHoliday,
    holidayList,
    role_function,
    getRoleFuncn
  } = props;


  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<SUBMITDT>()
  const [rows, setRows] = useState(holidayList);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getAllHoliday();
  }, []);


  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)


  
  useEffect(() => {
    setRows(holidayList)
  }, [loading_getHoliday]);

  useEffect(() => {
    if (success_createHoliday) {
      dispatch(reset())
      setErrorMessage("")
      getAllHoliday();
      setIsOpen(false);
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: "success",
      });
    } else if (error_createHoliday) {
      setErrorMessage(error_createHoliday)
    } else if (error_updateHoliday) {
      setErrorMessage(error_updateHoliday)
    } else if (success_updateHoliday) {
      dispatch(reset())
      setIsOpen(false);
      getAllHoliday();
      setErrorMessage("")
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: "success",
      });
    } else if (success_deleteHoliday) {
      dispatch(reset())
      setIsOpen(false);
      getAllHoliday();
      setErrorMessage("");
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    } else if (error_deleteHoliday) {
      setErrorMessage(error_deleteHoliday)
    }

  }, [success_createHoliday, success_updateHoliday, success_deleteHoliday, error_createHoliday, error_updateHoliday, error_deleteHoliday])

  useEffect(() => {
    const isLoading = loading_getHoliday || loading_createHoliday || loading_updateHoliday || loading_deleteHoliday;
    setLoader(isLoading);
  }, [loading_getHoliday, loading_createHoliday, loading_updateHoliday, loading_deleteHoliday]);

  const columns = useMemo<MRT_ColumnDef<SUBMITDT>[]>(
    () => [
      {
        accessorKey: 'name',
        header: NAMELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'holiday_date',
        header: HOLIDAYDATE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'status',
        header: STATUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => (
          <StatusChip
            value={cell.getValue<any>()}
          />
        ),
      }
    ],
    [],
  );

  const openAddModal = () => {
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false)
  }

  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }

  const handleChangeEdit = (data: SUBMITDT) => {
    setCurrentType(data);
    setClickedBtn('edit');
    setIsOpen(true);
  }

  const handleAddHoliday = (value: any) => {
    createHoliday(value)
  }

  const handleUpdateHoliday = (value: SUBMITDT) => {
    const holidayDatas = value;
    if (holidayDatas?.is_active === 1) {
      holidayDatas.is_active = false
    } else {
      holidayDatas.is_active = true
    }
    const holidayData:any = {
      id: currentType?.id,
      value: holidayDatas
    }
    updateHoliday(holidayData)
  }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })
  const handleStatusChange = (data: any) => {
    swalWithBootstrapButtons
      .fire({
        title: STATUSCHANGEHEAD,
        text: STATUSCHANGESUBHEAD,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: STATUSCHANGEPERMISSIONYES,
        cancelButtonText: STATUSCHANGEPERMISSIONNO,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleActionStatus(data)
        }
      })
  }
  const handleActionStatus = (values: any) => {
    const holidayDetails = JSON.parse(JSON.stringify(values));
    if (holidayDetails?.is_active === 1) {
      holidayDetails.is_active = false
    } else {
      holidayDetails.is_active = true
    }
    const result = {
      name: holidayDetails.name,
      holiday_date: holidayDetails.holiday_date,
      is_active: holidayDetails.is_active
    }
    const filterData = {
      id: holidayDetails?.id,
      value: result
    }
    deleteHoliday(filterData)
  }

  const selectModal = () => {
    return (
      <HolidayForm
        handleFormData={clickedBtn === 'add' ? handleAddHoliday : handleUpdateHoliday}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === 'edit' ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    )
  }
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen}>{selectModal()}</Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{TBLHEAD}</Typography>
        </div>
        {role_function?.Holiday.Create_New_Holiday && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDNEWHOLIDAY}
              onAddclick={() => {
                openAddModal()
                handleSelectBtn('add')
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
          isUpdate={role_function?.Holiday.Update_Holiday_Detail && true}
          isStatus={role_function?.Holiday.Update_Holiday_Detail && true}
        />
      </div>
    </>
  )
}

export default MasterHoliday;
