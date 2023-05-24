import React, { useEffect, useMemo, useState } from 'react';
import { CustomModal as Modal } from 'components/common/modal/modal';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from 'iconsax-react';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import {
  MRT_ColumnDef
} from 'material-react-table';
import { ADDNEWEPF, CAPLABEL, CURRENTPATH, EELABEL, EFFECTDATELABEL, EPSLABEL, ERLABEL, HOMEPATH, STATUSLABEL, SUCESSCREATETITLE, SUCESSCREATEXT, SUCESSSTATUSTEXT, SUCESSSTATUSTITLE, SUCESSUPDATETITLE, SUCESSUPDATEXT, TBLHEAD } from '../container/epfString';
import DataTable from 'components/table/dataTable/dataTable';
import EpfForm from 'components/form/epfForm/epfForm';
import Swal from 'sweetalert2';
import Loader from 'components/common/Loader/Loader';
import StatusChip from 'components/common/chip/chip';
import { STATUSCHANGEHEAD, STATUSCHANGEPERMISSIONNO, STATUSCHANGEPERMISSIONYES, STATUSCHANGESUBHEAD } from 'pages/app/wage/container/wageString';
import { useDispatch } from 'react-redux';
import { reset } from '../service/epfSlice';
import moment from 'moment';
import _ from 'lodash';
import { MAINROWDTO } from '../service/types';
import { EpfProps } from '../container/epfContainer';

interface SUBMITDT {
  id?: number,
  er_percent?: number
  eps_percent?: number,
  ee_percent?: number,
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


const MasterEpf = (props: EpfProps) => {
  const {
    getAllEpf,
    createEpf,
    updateEpf,
    deleteEpf,
    loading_getEpf,
    loading_createEpf,
    success_createEpf,
    error_createEpf,
    loading_updateEpf,
    success_updateEpf,
    error_updateEpf,
    loading_deleteEpf,
    success_deleteEpf,
    error_deleteEpf,
    epfList,
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
    getAllEpf();
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
    const final:any = sort_And_Return_1st_n_last_value(epfList, "effective_from")
    setRows(final)
  }, [loading_getEpf])

  useEffect(() => {
    if (success_createEpf) {
      dispatch(reset())
      setErrorMessage("")
      getAllEpf();
      setIsOpen(false);
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: "success",
      });
    } else if (error_createEpf) {
      setErrorMessage(error_createEpf)
    } else if (error_updateEpf) {
      setErrorMessage(error_updateEpf)
    } else if (success_updateEpf) {
      dispatch(reset())
      setIsOpen(false);
      getAllEpf();
      setErrorMessage("")
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: "success",
      });
    } else if (success_deleteEpf) {
      dispatch(reset())
      setIsOpen(false);
      getAllEpf();
      setErrorMessage("");
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    } else if (error_deleteEpf) {
      setErrorMessage(error_deleteEpf)
    }

  }, [success_createEpf, success_updateEpf, success_deleteEpf, error_createEpf, error_updateEpf, error_deleteEpf])

  useEffect(() => {
    const isLoading = loading_getEpf || loading_createEpf || loading_updateEpf || loading_deleteEpf;
    setLoader(isLoading);
  }, [loading_getEpf, loading_createEpf, loading_updateEpf, loading_deleteEpf]);


  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'er_percent',
        header: ERLABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'eps_percent',
        header: EPSLABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'ee_percent',
        header: EELABEL,
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
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setErrorMessage("")
    setIsOpen(false)
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }
  const handleChangeEdit = (data: SUBMITDT) => {
    setCurrentType(data)
    setClickedBtn('edit')
    setIsOpen(true)
  }

  const handleAddEpf = (value: SUBMITDT) => {
    createEpf(value)
  }

  const handleUpdateEpf = (value: SUBMITDT) => {
    const epfData = {
      id: currentType?.id,
      value: value
    }
    updateEpf(epfData)
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
    const epfDetail = JSON.parse(JSON.stringify(values));
    if (epfDetail?.is_active === 1) {
      epfDetail.is_active = false
    } else {
      epfDetail.is_active = true
    }
    const result = {
      er_percent: epfDetail.er_percent,
      eps_percent: epfDetail.eps_percent,
      ee_percent: epfDetail.ee_percent,
      effective_from: epfDetail.effective_from,
      cap_at: epfDetail.cap_at,
      is_active: epfDetail.is_active
    }
    const epfData = {
      id: epfDetail?.id,
      value: result
    }
    deleteEpf(epfData)
  }

  const selectModal = () => {
    return (
      <EpfForm
        handleFormData={clickedBtn === 'add' ? handleAddEpf : handleUpdateEpf}
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
        {role_function?.WageEPF.Create_New_Wage_EPF && <div>
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
              {ADDNEWEPF}
            </Button>
          </Stack>
        </div>}
      </div>

      <div>
        <DataTable
          data={rows?.current_date ? rows.current_date : []}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.WageEPF.Update_Wage_EPF && true}
          isStatus={role_function?.WageEPF.Update_Wage_EPF && true}
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
          isUpdate={role_function?.WageEPF.Update_Wage_EPF && true}
          isStatus={role_function?.WageEPF.Update_Wage_EPF && true}
        />
      </div>
    </>
  )
}

export default MasterEpf;
