import React, { useEffect, useMemo, useState } from 'react';
import { CustomModal as Modal } from 'components/common/modal/modal';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from 'iconsax-react';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import {
  MRT_ColumnDef
} from 'material-react-table';
import { ADDNEWESI, CAPLABEL, CURRENTPATH, EFFECTDATELABEL, GROSSLABEL, HOMEPATH, STATUSLABEL, SUCESSCREATETITLE, SUCESSCREATEXT, SUCESSSTATUSTEXT, SUCESSSTATUSTITLE, SUCESSUPDATETITLE, SUCESSUPDATEXT, TBLHEAD } from '../container/esiString';
import DataTable from 'components/table/dataTable/dataTable';
import EsiForm from 'components/form/esiForm/esiForm';
import Swal from 'sweetalert2';
import Loader from 'components/common/Loader/Loader';
import StatusChip from 'components/common/chip/chip';
import {  STATUSCHANGEHEAD, STATUSCHANGEPERMISSIONNO, STATUSCHANGEPERMISSIONYES, STATUSCHANGESUBHEAD } from 'pages/app/wage/container/wageString';
import { useDispatch } from 'react-redux';
import { reset } from '../service/esiSlice';
import moment from 'moment';
import _ from 'lodash';
import { MAINROWDTO } from '../service/types';
import { EsiProps } from '../container/esiContainer';

interface SUBMITDT {
  id?: number,
  esi_percent?: number
  effective_from?: string,
  cap_at?: number,
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

const MasterEsi = (props: EsiProps) => {

  const {
    getAllEsi,
    createEsi,
    updateEsi,
    deleteEsi,
    loading_getEsi,
    loading_createEsi,
    success_createEsi,
    error_createEsi,
    loading_updateEsi,
    success_updateEsi,
    error_updateEsi,
    loading_deleteEsi,
    success_deleteEsi,
    error_deleteEsi,
    esiList,
    role_function,
    getRoleFuncn
  } = props;

  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<SUBMITDT>()
  const [rows, setRows] = useState<MAINROWDTO>();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getAllEsi();
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
    const final:any = sort_And_Return_1st_n_last_value(esiList, "effective_from")
    setRows(final)
  }, [loading_getEsi])

  useEffect(() => {
    if (success_createEsi) {
      dispatch(reset())
      setErrorMessage("")
      setIsOpen(false);
      getAllEsi();
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: "success",
      });
    } else if (error_createEsi) {
      setErrorMessage(error_createEsi)
    } else if (error_updateEsi) {
      setErrorMessage(error_updateEsi)
    } else if (success_updateEsi) {
      dispatch(reset())
      setIsOpen(false);
      setErrorMessage("")
      getAllEsi();
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: "success",
      });
    } else if (success_deleteEsi) {
      dispatch(reset())
      setIsOpen(false);
      setErrorMessage("");
      getAllEsi();
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    } else if (error_deleteEsi) {
      setErrorMessage(error_deleteEsi)
    }
  }, [success_createEsi, success_updateEsi, success_deleteEsi, error_createEsi, error_updateEsi, error_deleteEsi])

  useEffect(() => {
    const isLoading = loading_getEsi || loading_createEsi || loading_updateEsi || loading_deleteEsi;
    setLoader(isLoading);
  }, [loading_getEsi, loading_createEsi, loading_updateEsi, loading_deleteEsi]);

  const columns = useMemo<MRT_ColumnDef<SUBMITDT>[]>(
    () => [
      {
        accessorKey: 'esi_percent',
        header: GROSSLABEL,
        enableColumnOrdering: false,
      },

      {
        accessorKey: 'effective_from',
        header: EFFECTDATELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'cap_at',
        header: CAPLABEL,
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
    setIsOpen(true);
  }
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false);
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }
  const handleChangeEdit = (data: SUBMITDT) => {
    setCurrentType(data);
    setClickedBtn('edit');
    setIsOpen(true);
  }
  const handleAddEsi = (value: SUBMITDT) => {
    createEsi(value);
  }
  const handleUpdateEsi = (value: SUBMITDT) => {
    const esiData = value;
    if (esiData?.is_active === 1) {
      esiData.is_active = true
    } else {
      esiData.is_active = false
    }
    const data = {
      id: currentType?.id,
      value: esiData
    }
    updateEsi(data)
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
  const handleActionStatus = (values:any) => {
    const esiDetail = JSON.parse(JSON.stringify(values));
    if (esiDetail?.is_active === 1) {
      esiDetail.is_active = false
    } else {
      esiDetail.is_active = true
    }
    const result = {
      esi_percent: esiDetail.esi_percent,
      effective_from: esiDetail.effective_from,
      cap_at: esiDetail.cap_at,
      is_active: esiDetail.is_active
    }
    const esiData = {
      id: esiDetail?.id,
      value: result
    }
    deleteEsi(esiData)
  }

  const selectModal = () => {
    return (
      <EsiForm
        handleFormData={clickedBtn === 'add' ? handleAddEsi : handleUpdateEsi}
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
        {role_function?.WageESI.Create_New_Wage_ESI && <div>
          <Stack spacing={2} direction="row">
            <Button
              sx={{ borderRadius: '10px' }}
              size="medium"
              variant="contained"
              startIcon={<Add size="22" color="#FFFFFF" />}
              onClick={() => {
                openAddModal()
                handleSelectBtn('add')
              }}
            >
              {ADDNEWESI}
            </Button>
          </Stack>
        </div>}
      </div>
      <div>
        <DataTable
          data={rows?.current_date ? rows.current_date:[]}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.WageESI.Update_Wage_ESI_Detail && true}
          isStatus={role_function?.WageESI.Update_Wage_ESI_Detail && true}
        />

        <div className='pt-4 pb-3'> 
        <Typography variant="h6">{"Upcoming Revise"}</Typography>
          {/* <h6>Upcoming Revise</h6> */}
        </div>

        <DataTable
          data={rows?.upcoming_date ? rows.upcoming_date:[]}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.WageESI.Update_Wage_ESI_Detail &&true}
          isStatus={role_function?.WageESI.Update_Wage_ESI_Detail && true}
        />
      </div>
    </>
  )
}

export default MasterEsi;
