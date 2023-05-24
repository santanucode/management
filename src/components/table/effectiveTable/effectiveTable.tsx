import React from 'react'
import { Box, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import MaterialReactTable from 'material-react-table'
import { Delete } from '@mui/icons-material'
import { Convert3DCube, Edit2 } from 'iconsax-react'
import './effectiveTable.scss'
import { ACTION_LABEL, NO_RESULTS_TEXT, ROWS_PER_TEXT } from './tableString'

const EffectiveTable = (props: any) => {
  const {
    data,
    handleEditReviseAction,
    handleEditAction,
    handleChangeStatus,
    handleDeleteAction,
    handleChangeRevision,
    column,
    isStatus,
    isDelete,
    isUpdate,
    isRevision,
    options,
    isEdit,
    isPagination,
    isReviseUpdate,
    handleSelectBtn
  } = props

  const date = new Date()

  const handleChangeEdit = (row: any) => {
    console.log("eidt row",row)
    handleEditAction(row.original)
  }

  const handleReviseEdit = (row: any) => {

    console.log("row.original",row.original)
    handleEditReviseAction(row.original)
    // handleSelectBtn('edit')
  }

  const handleStatusChange = (row: any) => {
    handleChangeStatus(row.original)
  }
  const handleRevisionChange = (row: any) => {
    handleChangeRevision(row.original)
    // handleSelectBtn('add')
  }
  const handleChangeDelete = (row: any) => {
    handleDeleteAction(row.original)
  }

  // function dateDiffInDays(a: any, b: any) {
  //   const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  //   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  //   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  //   const diffDay = Math.floor((utc2 - utc1) / _MS_PER_DAY);
  //   return true ? diffDay >= 0 : false
  // }

  return (
    <div>
      <MaterialReactTable
        localization={{
          actions: ACTION_LABEL,
          noResultsFound: NO_RESULTS_TEXT,
          noRecordsToDisplay: NO_RESULTS_TEXT,
          rowsPerPage: ROWS_PER_TEXT,
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '4px',
            border: '1px solid #f7f8f9',
            overflow: 'Hidden',
          },
        }}
        positionActionsColumn={'last'}
        positionToolbarDropZone={'none'}
        columns={column}
        data={data}
        enableColumnOrdering={false}
        enableEditing={isEdit === true ? true : false}
        enableHiding={false}
        enableDensityToggle={false}
        initialState={
          isPagination
            ? { pagination: { pageSize: 5, pageIndex: 0 } }
            : undefined
        }
        renderRowActions={({ row }: any) => (
          <Box className="d-flex">
            {isUpdate === true ? (
              <Tooltip
                key={row.original.id}
                arrow
                placement="right"
                title="Edit"
              >
                <IconButton onClick={() => handleChangeEdit(row)}>
                  <Edit2 />
                </IconButton>
              </Tooltip>
            ) : null}

            {isReviseUpdate === true ? (
              <Tooltip
                key={row.original.id}
                arrow
                placement="right"
                title="Edit"
              >
                <IconButton onClick={() => handleReviseEdit(row)}>
                  <Edit2 />
                </IconButton>
              </Tooltip>
            ) : null}


            {isDelete === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="Delete"
              >
                <IconButton
                  color="error"
                  onClick={() => handleChangeDelete(row)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            ) : null}
            {isStatus === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="Status"
              >
                <Switch
                  checked={row.original.is_active === 1 ? true : false}
                  onChange={() => handleStatusChange(row)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Tooltip>
            ) : null}
            {isRevision === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="Revision"
              >
                <IconButton onClick={() => handleRevisionChange(row)}>
                  <Convert3DCube />
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        )}
        renderDetailPanel={
          options
            ? () => (
                <Box
                  sx={{
                    display: 'grid',
                    margin: 'auto',
                    gridTemplateColumns: '1fr 1fr',
                    width: '100%',
                    background: 'red',
                  }}
                ></Box>
              )
            : undefined
        }
      />
    </div>
  )
}
export default EffectiveTable
