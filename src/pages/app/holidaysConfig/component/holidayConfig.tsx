import React, { useEffect, useMemo, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import CommonMainButton from 'components/common/Button/commonButton';
import DataTable from 'components/table/dataTable/dataTable';
import "./style.scss"
import {
  ADDBTNLNAME,
  CURRENTPATH,
  CONFIGHEADER,
  HOMEPATH,
  EFFECTIVEHEADER,
  STATUSLABEL,
  SUCESSCREATETITLE,
  SUCESSCREATEXT,
  SUCESSSTATUSTEXT,
  SUCESSSTATUSTITLE,
  SUCESSUPDATETITLE,
  SUCESSUPDATEXT,
  TBLHEADER
} from '../container/holidayconfigString';
import {
  MRT_ColumnDef
} from 'material-react-table';
import { CustomModal as Modal } from 'components/common/modal/modal';
import HolidayConfigForm from 'components/form/holidayConfigForm/holidayConfigForm';
import Swal from 'sweetalert2';
import StatusChip from 'components/common/chip/chip';
import Loader from 'components/common/Loader/Loader';
import { STATUSCHANGEDELETED, STATUSCHANGEHEAD, STATUSCHANGEPERMISSIONNO, STATUSCHANGEPERMISSIONYES, STATUSCHANGESUBHEAD, STATUSDELETEDSUBHEAD, STATUSDELETEDSUCCESS } from 'pages/app/wage/container/wageString';
import { useDispatch } from 'react-redux';
import { reset } from '../service/holidayConfigSlice';
import { HolidayConfigProps } from '../container/holidayConfigContainer';
import { CREATEDT, MAINROWDTO, TBLDT, UPDATEDT, UPDATEDTO } from '../service/types';
import moment from 'moment';
import _ from 'lodash';
import HolidayConfigData from './HolidayConfigData';

interface SUBMITDT {
  id?: number,
  off_day: boolean,
  off_eligible: boolean,
  day_working: boolean,
  day_absent: boolean,
  extra_amount: number,
  is_active?: boolean | number
}

const paths = [
  {
    name: HOMEPATH,
    path: '',
  },
  {
    name: CURRENTPATH,
  },
]

const HolidayConfig = (props: HolidayConfigProps) => {
  const {
    getAllHolidayConfig,
    createHolidayConfig,
    updateHolidayConfig,
    deleteHolidayConfig,
    loading_getHolidayConfig,
    loading_createHolidayConfig,
    success_createHolidayConfig,
    error_createHolidayConfig,
    loading_updateHolidayConfig,
    success_updateHolidayConfig,
    error_updateHolidayConfig,
    loading_deleteHolidayConfig,
    success_deleteHolidayConfig,
    success_getHolidayConfig,
    holidayConfigList,
    role_function,
    getRoleFuncn
  } = props;
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isViewOpen, setViewIsOpen] = useState(false)

  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<SUBMITDT>()
  const [rows, setRows] = useState<MAINROWDTO>()
  const [errorMessage, setErrorMessage] = useState<boolean | string | undefined>();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getAllHolidayConfig();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)


  function sort_And_Return_1st_n_last_value(arr: any, key: string) {
    const sortVal = _.sortBy(arr, ((ele) => moment(moment(ele[key]).format('YYYYMMDD'))));

    let output = _.groupBy(sortVal, function (n) {
      return n.effective_from <= moment().format() ? 'current_date' : 'upcoming_date';
      });
    return output
  }

  useEffect(() => {
    const final:any = sort_And_Return_1st_n_last_value(holidayConfigList, "effective_from")
      setRows(final)
  }, [success_getHolidayConfig]);

  console.log("rows", rows)
  
  useEffect(() => {
    if (success_createHolidayConfig) {
      dispatch(reset())
      setErrorMessage("")
      getAllHolidayConfig();
      setIsOpen(false);
      setViewIsOpen(false)
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: "success",
      });
    } else if (error_createHolidayConfig) {
      setErrorMessage(error_createHolidayConfig)
    } else if (error_updateHolidayConfig) {
      setErrorMessage(error_updateHolidayConfig)
    } else if (success_updateHolidayConfig) {
      dispatch(reset())
      setIsOpen(false);
      setViewIsOpen(false)
      getAllHolidayConfig();
      setErrorMessage("")
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: "success",
      });
    } else if (success_deleteHolidayConfig) {
      dispatch(reset())
      setIsOpen(false);
      setViewIsOpen(false)
      getAllHolidayConfig();
      setErrorMessage("");
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    }

  }, [success_createHolidayConfig, success_updateHolidayConfig, success_deleteHolidayConfig, error_createHolidayConfig, error_updateHolidayConfig])
  useEffect(() => {
    const isLoading = loading_getHolidayConfig || loading_createHolidayConfig || loading_updateHolidayConfig || loading_deleteHolidayConfig;
    setLoader(isLoading);
  }, [loading_getHolidayConfig, loading_createHolidayConfig, loading_updateHolidayConfig, loading_deleteHolidayConfig]);
  const columns = useMemo<MRT_ColumnDef<TBLDT>[]>(
    () => [
      {
        accessorKey: 'config_name',
        header: CONFIGHEADER,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'effective_from',
        header: EFFECTIVEHEADER,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'is_active',
        header: STATUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => (
          <StatusChip
            value={cell.getValue()}
          />
        ),
      }
    ],
    [],
  )
  const openAddModal = () => {
    setErrorMessage("");
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false)
    setViewIsOpen(false)
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }
  const handleChangeEdit = (data: SUBMITDT) => {
    setCurrentType(data);
    setClickedBtn('edit');
    setIsOpen(true);
  }

  const handleActionView = (data: SUBMITDT) => {
    console.log("data",data)
    setCurrentType(data);
    setClickedBtn('edit');
    // alert("hit")
    setViewIsOpen(true);
  }

  const handleAddHolidayConfig = (value: CREATEDT) => {
    createHolidayConfig(value)
  }
  const handleUpdateHolidayConfig = (data: UPDATEDTO) => {
    Object.assign(data, { is_active: currentType?.is_active === 1 ? true : false });
    const holidayConfigData = {
      id: currentType?.id,
      value: data
    }
    updateHolidayConfig(holidayConfigData)
  }

console.log("holidayConfigList",holidayConfigList)
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })
  const handleStatusChange = (data: TBLDT) => {
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
          handleActionDelete(data)
        }
      })
  }
  const handleActionDelete = (values: TBLDT) => {
    const data = {
      config_name: values.config_name,
      effective_from: values.effective_from,
      config: {
        day_config: {
          off_day: values ? values.config ? values.config.day_config.off_day : false : false,
          off_eligible: values ? values.config ? values.config.day_config.off_eligible : false : false,
          absent_day: values ? values.config ? values.config.day_config.absent_day : false : false,
        },
        wage_component: {
          shift_allowance: {
            factor: values ? values.config ? values.config.wage_component.shift_allowance.factor : 0 : 0
          },
          basic_amount: {
            factor: values ? values.config ? values.config.wage_component.basic_amount.factor : 0 : 0
          },
          da_amount: {
            factor: values ? values.config ? values.config.wage_component.da_amount.factor : 0 : 0
          },
          hra_amount: {
            factor: values ? values.config ? values.config.wage_component.hra_amount.factor : 0 : 0
          },
          ca_amount: {
            factor: values ? values.config ? values.config.wage_component.ca_amount.factor : 0 : 0
          }
        }
      },
      is_active: values?.is_active === 1 ? false : true
    }
    const holidayConfig = {
      id: values?.id,
      value: data
    }
    deleteHolidayConfig(holidayConfig)
  }


  const selectModal = () => {
    return (
      <HolidayConfigForm
        handleFormData={clickedBtn === 'add' ? handleAddHolidayConfig : handleUpdateHolidayConfig}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === 'edit' ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    )
  }

  const selectViewModal = () => {
    return (
      <HolidayConfigData
        onHandleClose={handleModalClose}
        initialValue={currentType}
      />
        
      
    )
  }
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal boxWidth={"60%"} isOpen={isOpen}>{selectModal()}</Modal>
      <Modal boxWidth={"60%"} isOpen={isViewOpen}>{selectViewModal()}</Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{TBLHEADER}</Typography>
        </div>
       {role_function?.HolidayConfig.Create_New_Holiday_Configuration && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDBTNLNAME}
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
          data={rows?.current_date ? rows.current_date : []}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          handleViewAction={handleActionView}
          column={columns}
          viewData={role_function?.HolidayConfig.Get_Holiday_Configuration_Detail_By_Id &&true}
          isUpdate={role_function?.HolidayConfig.Update_Holiday_Configuration_Detail && true}
          isStatus={role_function?.HolidayConfig.Update_Holiday_Configuration_Detail && true}
        />
        <div className='pt-4 pb-3'>
        <Typography variant="h6">{"Upcoming Revise"}</Typography>
          {/* <h6>Upcoming Revise</h6> */}
        </div>
        <DataTable
          data={rows?.upcoming_date ? rows.upcoming_date : []}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.HolidayConfig.Update_Holiday_Configuration_Detail && true}
          isStatus={true}
        />
      </div>
    </>
  )
}

export default HolidayConfig
