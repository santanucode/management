import React, { useEffect, useMemo, useState } from 'react'
import { CustomModal as Modal } from 'components/common/modal/modal'
import { Stack, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import DataTable from 'components/table/dataTable/dataTable'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import { CREATEGROUPDT, GETGROUPDT, STATUSDT } from '../service/types'
import { STATUSCHANGEHEAD, STATUSCHANGESUBHEAD, STATUSCHANGEPERMISSIONYES, STATUSCHANGEPERMISSIONNO, STATUSCHANGEDELETED, STATUSDELETEDSUBHEAD, STATUSDELETEDSUCCESS } from '../container/groupString'
import CommonMainButton from 'components/common/Button/commonButton'
import {
  ADDGROUP,
  CURRENTPATH,
  HOMEPATH,
  STATUSLABEL,
  TBLDATE,
  TBLGRP,
  TBLGRPHEAD,
} from '../container/groupString'
import GroupForm from 'components/form/groupForm/groupForm'
import Loader from 'components/common/Loader/Loader'
import Swal from 'sweetalert2'
import StatusChip from 'components/common/chip/chip'
import { reset } from '../service/groupSlice'
import { useDispatch } from 'react-redux'
import { CURRENT_SUCCESS, CURRENT_SUCCESS_CREATED, CURRENT_SUCCESS_UPDATED } from 'pages/app/staff/container/staffString'
import { GroupProps } from '../container/groupContainer'

const MasterGroup = (props: GroupProps) => {
  const {
    loading_getGroup,
    groupList,
    error_createGroup,
    success_createGroup,
    loading_createGroup,
    loading_updateGroup,
    error_updateGroup,
    success_updateGroup,
    getAllGroups,
    createGroup,
    updateGroup,
    statusChangeGroup,
    loading_statusStaff,
    success_statusStaff,
    homeList,
    role_function,
    getRoleFuncn
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<GETGROUPDT>()
  const [rows, setRows] = useState(groupList)
  const [isLoader, setLoader] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<boolean | string | undefined>()
  const dispatch = useDispatch()

  console.log(groupList, "groupList")
  
  useEffect(() => {
    getAllGroups()
  }, [])

  useEffect(() => {
    getRoleFuncn()
  }, [])

  
  useEffect(() => {
    setRows(groupList)
  }, [loading_getGroup])

  useEffect(() => {
    const isLoading =
      loading_getGroup ||
      loading_updateGroup ||
      loading_createGroup ||
      loading_statusStaff
    setLoader(isLoading)
  }, [
    loading_getGroup,
    loading_updateGroup,
    loading_createGroup,
    loading_statusStaff,
  ])

  useEffect(() => {
    if (success_createGroup) {
      dispatch(reset())
      getAllGroups()
      setIsOpen(false)
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_CREATED,
        icon: "success",
      });
    } else if (error_createGroup) {
      setErrorMessage(error_createGroup)
    } else if (error_updateGroup) {
      setErrorMessage(error_updateGroup)
    } else if (success_updateGroup) {
      dispatch(reset())
      getAllGroups()
      setIsOpen(false)
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_UPDATED,
        icon: "success",
      });
    } else if (success_statusStaff) {
      setIsOpen(false)
      swalWithBootstrapButtons.fire(
        STATUSCHANGEDELETED,
        STATUSDELETEDSUBHEAD,
        STATUSDELETEDSUCCESS,
      )
      dispatch(reset())
      getAllGroups()
    }
  }, [
    success_createGroup,
    error_createGroup,
    error_updateGroup,
    success_updateGroup,
    success_statusStaff,
  ])

  const columns = useMemo<MRT_ColumnDef<CREATEGROUPDT>[]>(
    () => [
      {
        accessorKey: 'name',
        header: TBLGRP,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'effective_from',
        header: TBLDATE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'status',
        header: STATUSLABEL,
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
      name: HOMEPATH,
      path: '',
    },
    {
      name: CURRENTPATH,
    },
  ]

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

  const handleChangeEdit = (row: GETGROUPDT) => {
    setCurrentType(row)
    handleSelectBtn('edit')
    openAddModal()
  }

  const handleAddGroup = (value: CREATEGROUPDT) => {
    createGroup(value)
  }

  const handleUpdateGroup = (value: CREATEGROUPDT) => {
    const group_details = {
      name: value.name,
      effective_from: value.effective_from,
      is_active: currentType?.is_active === 1 ? true : false,
    }

    const data = {
      id: currentType?.id,
      group: group_details,
    }
    updateGroup(data)
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })


  const handleStatusChange = (data: CREATEGROUPDT) => {
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

  const handleActionStatus = (values: STATUSDT) => {
    const groupData = JSON.parse(JSON.stringify(values))
    if (groupData?.is_active === 1) {
      groupData.is_active = false
    } else {
      groupData.is_active = true
    }
    let value = {
      name: groupData.name,
      effective_from: groupData.effective_from,
      is_active: groupData.is_active,
    }
    const data = {
      id: groupData?.id,
      group: value,
    }
    statusChangeGroup(data)
  }
  const selectModal = () => {
    return (
      <GroupForm
        handleFormData={
          clickedBtn === 'add' ? handleAddGroup : handleUpdateGroup
        }
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
      
      <Modal isOpen={isOpen} boxWidth="30%">
        {selectModal()}
      </Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{TBLGRPHEAD}</Typography>
        </div>
        {role_function?.Group.Create_New_Group && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDGROUP}
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
          isUpdate={role_function?.Group.Update_Group_Detail && true}
          isStatus={role_function?.Group.Update_Group_Detail && true}
        />
      </div>
    </>
  )
}

export default MasterGroup
