import React, { useEffect, useMemo, useState } from 'react'
import { CustomModal as Modal } from 'components/common/modal/modal'
import { Stack, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import DataTable from 'components/table/dataTable/dataTable'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import CommonMainButton from 'components/common/Button/commonButton'
import {
  PATHCURRENT,
  PATHHOME,
  OPERTIONSLEBEL,
  ADDOPERATION,
  TBLOPERATION,
  TBLCATEGORIES,
  TBLSTATUS,
} from '../container/opertionString'
import OperationForm from 'components/form/operationForm/operationForm'
import StatusChip from 'components/common/chip/chip'
import { useSelector } from 'react-redux'
import Loader from 'components/common/Loader/Loader'
import Swal from 'sweetalert2'
import {
  CURRENT_SUCCESS,
  CURRENT_SUCCESS_CREATED,
  CURRENT_SUCCESS_UPDATED,
} from 'pages/app/staff/container/staffString'
import { OperationProps } from '../container/operationContainer'
import { FLTRCATDT, GETDATA, TBLDT, UPDATEOPDT } from '../service/types'
import {
  STATUSCHANGEDELETED,
  STATUSCHANGEHEAD,
  STATUSCHANGEPERMISSIONNO,
  STATUSCHANGEPERMISSIONYES,
  STATUSCHANGESUBHEAD,
  STATUSDELETEDSUBHEAD,
  STATUSDELETEDSUCCESS,
} from 'pages/app/wage/container/wageString'
import { useDispatch } from 'react-redux'
import { reset } from '../service/operationSlice'

const MasterOperation = (props: OperationProps) => {
  const {
    getAllOperaionCategory,
    getAllOperation,
    operationList,
    createOperation,
    updateOperation,
    statusOperation,
    loading_getOperation,
    loading_updateOperation,
    loading_createOperation,
    loading_statusOperation,
    success_createOperation,
    error_createOperation,
    error_updateOperation,
    success_updateOperation,
    success_statusOperation,
    role_function,
    getRoleFuncn
  } = props


  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<TBLDT>()
  const [rows, setRows] = useState(operationList)
  const [errorMessage, setErrorMessage] = useState<
    boolean | string | undefined
    >()
  
  const [isLoader, setLoader] = useState<boolean | string | undefined>(false)

  console.log("role_function", role_function)
  
  useEffect(() => {
    getAllOperation()
    getAllOperaionCategory()
  }, [])

  useEffect(() => {
    getRoleFuncn()
  }, [])

  useEffect(() => {
    setRows(operationList)
  }, [loading_getOperation])

  useEffect(() => {
    const isLoading =
      loading_getOperation || loading_createOperation || loading_updateOperation || loading_statusOperation
    setLoader(isLoading)
  }, [loading_getOperation, loading_createOperation, loading_updateOperation, loading_statusOperation])

  useEffect(() => {
    if (success_createOperation) {
      dispatch(reset())
      setErrorMessage('')
      setIsOpen(false)
      getAllOperation()
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_CREATED,
        icon: 'success',
      })
    } else if (error_createOperation) {
      setErrorMessage(error_createOperation)
    } else if (error_updateOperation) {
      setErrorMessage(error_updateOperation)
    } else if (success_updateOperation) {
      dispatch(reset())
      setErrorMessage('')
      setIsOpen(false)
      getAllOperation()
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_UPDATED,
        icon: 'success',
      })
    } else if (success_statusOperation) {
      dispatch(reset())
      setErrorMessage('')
      getAllOperation()
      swalWithBootstrapButtons.fire(
        STATUSCHANGEDELETED,
        STATUSDELETEDSUBHEAD,
        STATUSDELETEDSUCCESS,
      )
    }
  }, [
    success_createOperation,
    error_createOperation,
    error_updateOperation,
    success_updateOperation,
    success_statusOperation
  ])
  const categoryLists = useSelector(
    (state: GETDATA) => state.operationCate.opertionCategory,
  )
  const mastercategory = categoryLists?.map((ele: FLTRCATDT) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    is_active: ele.is_active,
  }))
  const filterCategory = mastercategory?.filter(
    (ele: { is_active: number }) => {
      return ele.is_active === 1
    },
  )
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: 'name',
        header: TBLOPERATION,
        enableColumnOrdering: false,
      },
      {
        accessorKey: `operation_catagory.name`,
        header: TBLCATEGORIES,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'is_active',
        header: TBLSTATUS,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue()} />,
      },
    ],
    [],
  )
  const paths = [
    {
      name: PATHHOME,
      path: '',
    },
    {
      name: PATHCURRENT,
    },
  ]
  const openAddModal = () => {
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setIsOpen(false)
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }
  const handleChangeEdit = (row: UPDATEOPDT) => {
    setCurrentType(row)
    handleSelectBtn('edit')
    openAddModal()
  }
  const handleAddGroup = (value: UPDATEOPDT) => {
    createOperation(value)
  }
  const handleUpdateGroup = (value: UPDATEOPDT) => {
    const result = {
      name: value.name,
      operation_catagory_id: value.operation_catagory_id,
      is_active: currentType?.is_active === 1 ? true : false
    }
    const operationDetail = {
      id: currentType?.id,
      operation: result
    }
    updateOperation(operationDetail)
  }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },

    buttonsStyling: false,
  })

  const handleStatusChange = (data: UPDATEOPDT) => {
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

  const handleActionStatus = (values: UPDATEOPDT) => {
    let value = {
      name: values.name,
      operation_catagory_id: values.operation_catagory.id,
      is_active: values.is_active === 1 ? false : true,
    }
    const data = {
      id: values?.id,
      operation: value,
    }
    statusOperation(data)

  }
  const selectModal = () => {
    return (
      <OperationForm
        handleFormData={
          clickedBtn === 'add' ? handleAddGroup : handleUpdateGroup
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === 'edit' ? currentType : {}}
        categoriesList={filterCategory}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    )
  }
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen} boxWidth="30%">
        {selectModal()}
      </Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{OPERTIONSLEBEL}</Typography>
        </div>
        {role_function?.Operation.Create_New_Operation && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDOPERATION}
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
          isUpdate={role_function?.Operation.Update_Operation_Detail && true}
          isStatus={role_function?.Operation.Update_Operation_Detail && true}
        />
      </div>
    </>
  )
}

export default MasterOperation
