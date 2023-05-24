import React, { useEffect, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { Add } from 'iconsax-react'
import { CustomModal as Modal } from 'components/common/modal/modal'
import IncentiveSlab from 'components/form/incentiveForm/incentiveform'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import DataTable from 'components/table/dataTable/dataTable'
import { MRT_ColumnDef } from 'material-react-table'
import {
  CURRENTPATH,
  EFFECTDATE,
  HIKERATE,
  HOMEPATH,
  OPERATIONNAME,
  SLABNAME,
  SLABRANGE,
  STATUSLABEL,
  TBLADDBTN,
  TBLHEAD,
} from '../container/incentiveString'
import Swal from 'sweetalert2'
import { CREATEDT, INCENTIVEDTO, MAINROWDTO, UPDATEDT } from '../service/types'
import Loader from 'components/common/Loader/Loader'
import { useSelector } from 'react-redux'
import StatusChip from 'components/common/chip/chip'
import { STATUSCHANGEDELETED, STATUSCHANGEHEAD, STATUSCHANGEPERMISSIONNO, STATUSCHANGEPERMISSIONYES, STATUSCHANGESUBHEAD, STATUSDELETEDSCANCEL, STATUSDELETEDSCANCELERROR, STATUSDELETEDSCANCELSHEAD, STATUSDELETEDSUBHEAD, STATUSDELETEDSUCCESS } from 'pages/app/wage/container/wageString'
import moment from 'moment'
import _ from 'lodash'
import { IncentiveProps } from '../container/incentiveContainer'

interface Object {
  name?: string
  id?: number
}
interface INCENTIVEDT {
  id?: number
  name?: string
  operation?: Object
  hikeRate?: number
  effect_date?: string
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
const Incentive = (props: IncentiveProps) => {
  const {
    getAllOperaionCategory,
    getAllIncentive,
    createIncentive,
    updateIncentive,
    updateStatusIncentive,
    loading_getIncentive,
    loading_createIncentive,
    success_createIncentive,
    error_createIncentive,
    loading_updateIncentive,
    success_updateIncentive,
    error_updateIncentive,
    loading_statusIncentive,
    success_statusIncentive,
    incentiveList,
    role_function,
    getRoleFuncn
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<INCENTIVEDT>()
  const [rows, setRows] = useState<MAINROWDTO>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [isOpenStatus, setIsOpenStatus] = useState(false)
  const [isLoader, setLoader] = useState(false)

  console.log(rows, "rows")

  useEffect(() => {
    getAllIncentive()
    getAllOperaionCategory()
  }, [])


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
    const final:any = sort_And_Return_1st_n_last_value(incentiveList, "effective_from")
    setRows(final)
  }, [loading_getIncentive])



  const operationLists = useSelector(
    (state: any) => state.operationCate.opertionCategory,
  )


  
  const masterOperation = operationLists?.map((ele: any) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    is_active: ele.is_active,
  }))
  const filterOperation = masterOperation?.filter((ele: any) => {
    return ele.is_active === 1
  })

 
  useEffect(() => {
    if (success_createIncentive) {
      setErrorMessage('')
      getAllIncentive()
      setIsOpen(false)
      Swal.fire({
        title: 'Success!',
        text: 'Created Successfully',
        icon: 'success',
      })
    } else if (error_createIncentive) {
      setErrorMessage(error_createIncentive)
    } else if (error_updateIncentive) {
      setErrorMessage(error_updateIncentive)
    } else if (success_updateIncentive) {
      setIsOpen(false)
      setIsOpenStatus(false)
      getAllIncentive()
      setErrorMessage('')
      Swal.fire({
        title: 'Success!',
        text: 'Updated Successfully',
        icon: 'success',
      })
    } else if (success_statusIncentive) {
      setIsOpen(false)
      setIsOpenStatus(false)
      getAllIncentive()
      setErrorMessage('')
      swalWithBootstrapButtons.fire(
        STATUSCHANGEDELETED,
        STATUSDELETEDSUBHEAD,
        STATUSDELETEDSUCCESS,
      )
    }
  }, [
    success_createIncentive,
    success_updateIncentive,
    success_statusIncentive,
    error_createIncentive,
    error_updateIncentive,
  ])

  useEffect(() => {
    const isLoading =
      loading_getIncentive ||
      loading_createIncentive ||
      loading_updateIncentive ||
      loading_statusIncentive
    setLoader(isLoading)
  }, [
    loading_getIncentive,
    loading_createIncentive,
    loading_updateIncentive,
    loading_statusIncentive,
  ])


  // console.log("rows", rows)
  
  const columns = useMemo<MRT_ColumnDef<INCENTIVEDT>[]>(
    () => [
      {
        accessorKey: 'name',
        header: SLABNAME,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'operation_catagory_id.name',
        header: OPERATIONNAME,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'percentage',
        header: HIKERATE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'slab_range',
        header: SLABRANGE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'effective_from',
        header: EFFECTDATE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'status',
        header: STATUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue<any>()} />,
      },
    ],
    [],
  )

  const openAddModal = () => {
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setErrorMessage('')
    setIsOpen(false)
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }
  const handleChangeEdit = (data: INCENTIVEDT) => {
    setCurrentType(data)
    setClickedBtn('edit')
    setIsOpen(true)
  }
  const handleAddSlab = (value: CREATEDT) => {
    createIncentive(value)
  }
  const handleUpdateSlab = (value: INCENTIVEDT) => {
    const incentiveData = value
    if (incentiveData?.is_active === 1) {
      incentiveData.is_active = true
    } else {
      incentiveData.is_active = false
    }
    const data:any = {
      id: currentType?.id,
      value: incentiveData,
    }
    updateIncentive(data)
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })

  // const handleStatusChange = (data: INCENTIVEDTO) => {
  //   swalWithBootstrapButtons
  //     .fire({
  //       title: STATUSCHANGEHEAD,
  //       text: STATUSCHANGESUBHEAD,
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: STATUSCHANGEPERMISSIONYES,
  //       cancelButtonText: STATUSCHANGEPERMISSIONNO,
  //       reverseButtons: true,
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         handleActionStatus(data)
  //       }
  //     })
  // }

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
    const slabData = JSON.parse(JSON.stringify(values))

    console.log("slabData", slabData)
    
    if (slabData?.is_active === 1) {
      slabData.is_active = false
    } else {
      slabData.is_active = true
    }
    const result = {
      name: slabData.name,
      operation_catagory_id: slabData.operation_catagory_id.id,
      percentage: slabData.percentage,
      slab_range: slabData.slab_range,
      effective_from: slabData.effective_from,
      cap_at: slabData.cap_at,
      is_active: slabData.is_active,
      
      empty_slab_range: slabData.slab_range === 0 ? true : false
    }
    const incentiveData = {
      id: slabData?.id,
      value: result,
    }   
    updateStatusIncentive(incentiveData)
  }

  const selectModal = () => {
    return (
      <IncentiveSlab
        handleFormData={clickedBtn === 'add' ? handleAddSlab : handleUpdateSlab}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === 'edit' ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        operationList={filterOperation}
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
        {role_function?.Incentive.Create_New_Incentive && <div>
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
              {TBLADDBTN}
            </Button>
          </Stack>
        </div>}
      </div>

        <DataTable
          data={rows?.current_date ? rows.current_date : []}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.Incentive.Update_Incentive_Detail && true}
          isStatus={role_function?.Incentive.Update_Incentive_Detail  && true}
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
          isUpdate={role_function?.Incentive.Update_Incentive_Detail  && true}
          isStatus={role_function?.Incentive.Update_Incentive_Detail  && true}
        />
    </>
  )
}

export default Incentive
