import React, { useEffect, useMemo, useState } from 'react'
import { CustomModal as Modal } from 'components/common/modal/modal'
import { Stack, Typography } from '@mui/material'
import RoleForm from 'components/form/roleForm/roleForm'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import CommonMainButton from 'components/common/Button/commonButton'
import DataTable from 'components/table/dataTable/dataTable'
import {
  ADDBTNLNAME,
  CURRENTPATH,
  HOMEPATH,
  TBLDESC,
  TBLHEADER,
  TBLNAME,
  STATTUSLABEL,
  SUCESSUPDATEXT,
  SUCESSUPDATETITLE,
  SUCESSSTATUSTITLE,
  SUCESSSTATUSTEXT,
  SUCESSCREATETITLE,
  SUCESSCREATEXT,
} from '../container/roleString';
import { MRT_ColumnDef } from 'material-react-table';
import StatusChip from 'components/common/chip/chip';
import Loader from 'components/common/Loader/Loader';
import Swal from 'sweetalert2';
import { STATUSCHANGEHEAD, STATUSCHANGEPERMISSIONNO, STATUSCHANGEPERMISSIONYES, STATUSCHANGESUBHEAD, STATUSDELETEDSCANCEL, STATUSDELETEDSCANCELERROR, STATUSDELETEDSCANCELSHEAD } from 'pages/app/wage/container/wageString'
import { RolesProps } from '../container/rolesContainer'
import { useDispatch } from 'react-redux'
import { reset } from '../service/rolesSlice'

interface SUBMITDT {
  name: string
  description?: string
  id?: number
  is_active?: any
  status?: string
}

const paths = [
  {
    name: HOMEPATH,
    path: 'home',
  },
  {
    name: CURRENTPATH,
  },
]

const UserRole = (props: RolesProps) => {
  
  const {
    loading_getRole,
    loading_createRole,
    loading_updateRole,
    getAllRoles,
    createRole,
    updateRole,
    updateStatusRole,
    roles,
    error_createRole,
    success_createRole,
    error_updateRole,
    success_updateRole,
    loading_updateStatusRole,
    success_updateStatusRole,
    role_function,
    getRoleFuncn
  } = props;


  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState('');
  const [currentType, setCurrentType] = useState<SUBMITDT>();
  const [rows, setRows] = useState(roles);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getAllRoles()
  }, [])

  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)



  useEffect(() => {
    setRows(roles)
  }, [loading_getRole])

  useEffect(() => {
    if (success_createRole) {
      dispatch(reset())
      setErrorMessage('')
      setIsOpen(false)
      getAllRoles()
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: 'success',
      })
    } else if (error_createRole) {
      setErrorMessage(error_createRole)
    } else if (error_updateRole) {
      setErrorMessage(error_updateRole)
    } else if (success_updateRole) {
      dispatch(reset())
      setErrorMessage('')
      setIsOpen(false)
      getAllRoles()
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: 'success',
      })
    } else if (success_updateStatusRole) {
      dispatch(reset())
      setIsOpen(false)
      getAllRoles()
      setErrorMessage('')
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: 'success',
      })
    }
  }, [
    success_createRole,
    success_updateStatusRole,
    error_createRole,
    error_updateRole,
    success_updateRole,
  ])

  useEffect(() => {
    const isLoading =
      loading_getRole ||
      loading_createRole ||
      loading_updateRole ||
      loading_updateStatusRole
    setLoader(isLoading)
  }, [
    loading_getRole,
    loading_createRole,
    loading_updateRole,
    loading_updateStatusRole,
  ])

  const columns = useMemo<MRT_ColumnDef<SUBMITDT>[]>(
    () => [
      {
        accessorKey: 'name',
        header: TBLNAME,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'description',
        header: TBLDESC,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'status',
        header: STATTUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue<any>()} />,
      },
    ],
    [],
  )

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },

    buttonsStyling: false,
  })
  const handleActionStatus = (data: any) => {
    const roleData = JSON.parse(JSON.stringify(data))
    if (roleData?.is_active === 1) {
      roleData.is_active = false
    } else {
      roleData.is_active = true
    }
    const result = {
      name: roleData.name,
      description: roleData.description,
      is_active: roleData.is_active,
    }
    const datas = {
      id: roleData?.id,
      role_detail: result,
    }
    updateStatusRole(datas)
  }

  const handleChangeStatus = (data: SUBMITDT) => {
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

  const openAddModal = () => {
    setErrorMessage('')
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setErrorMessage('')
    setIsOpen(false)
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }

  const handleChangeEdit = (data: SUBMITDT) => {
    setClickedBtn('edit')
    setCurrentType(data)
    setIsOpen(true)
  }

  const handleAddRole = (value: any) => {
    createRole(value)
  }

  const handleUpdateRole = (value: any) => {
    const data = {
      name: value.role.name,
      description: value.role.description,
      is_active: currentType?.is_active === 1 ? true : false,
    }
    const roleData = {
      id: currentType?.id,
      value: data,
    }
    updateRole(roleData)
  }

  const selectModal = () => {
    return (
      <RoleForm
        handleFormData={clickedBtn === 'add' ? handleAddRole : handleUpdateRole}
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
          <Typography variant="h6">{TBLHEADER}</Typography>
        </div>
       {role_function?.Role?.Create_New_Role && <div>
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
          data={rows}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleChangeStatus}
          column={columns}
          isUpdate={role_function?.Role.Update_Role_Detail && true}
          isStatus={role_function?.Role.Update_Role_Detail && true}
        />
      </div>
    </>
  )
}

export default UserRole
