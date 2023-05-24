import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Edit2, Trash } from 'iconsax-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SearchInput from 'components/common/searchInput/searchInput';
import './table.scss';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    borderBottom: 'none',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: 'none',
  },
}))

const StatusCell = ({ rowData, dataKey, ...props }: any) => {
  return (
    <TableCell {...props} className="link-group">
      <Chip
        label={rowData[dataKey] === 1 ? 'Active' : 'Inactive'}
        sx={{
          backgroundColor: rowData[dataKey] === 1 ? '#61F15557' : '#F1555557',
          color: rowData[dataKey] === 1 ? '#61F155' : '#F15555',
        }}
      />
    </TableCell>
  )
}

const ActionCell = ({
  rowData,
  dataKey,
  handleChangeActiveStatus,
  handleChangeEdit,
  handleChangeDelete,
  isUpdate,
  isStatus,
  isDelete,
  ...props
}: any) => {
  function handleActionEdit() {
    handleChangeEdit(rowData[dataKey])
  }
  const handleChangeStatus = () => {
    let status = rowData[dataKey]
    handleChangeActiveStatus(status, rowData.is_active)
  }

  const handleActionDelete = () => {
    handleChangeDelete(rowData[dataKey])
  }

  return (
    <TableCell
      {...props}
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: 'none',
        },
      }}
    >
      <div>
        {isUpdate && (
          <IconButton onClick={handleActionEdit}>
            <Tooltip title="Edit">
              <Edit2 size="22" color="#565e64" variant="Outline" />
            </Tooltip>
          </IconButton>
        )}
        {isStatus && (
          <Tooltip title="status">
            <FormControlLabel
              control={
                <Switch
                  checked={rowData.is_active === 1 ? true : false}
                  onChange={handleChangeStatus}
                />
              }
              label=""
            />
          </Tooltip>
        )}
        {isDelete && (
          <IconButton onClick={handleActionDelete}>
            <Tooltip title="Delete">
              <Trash size="20" color="rgb(123, 123, 123)" />
            </Tooltip>
          </IconButton>
        )}
      </div>
    </TableCell>
  )
}

const SearchTable = (props: any) => {
  const {
    mapableData,
    handleChangeEdit,
    data,
    searchProp,
    isUpdate,
    isStatus,
    handleChangeActiveStatus,
    handleChangeDelete,
    placeholder,
  } = props

  const [rows, setRows] = React.useState(data)
  const [searchedData, setSearchedData] = React.useState(data)
  const [searchValue, setSearchValue] = React.useState({
    value: '',
    error: false,
    success: false,
  })

  const [tempData] = React.useState(data)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  React.useEffect(() => {
    setRows(data)
  }, [data])

  React.useEffect(() => {
    setRows(data)
  }, [data])

  const buildFilter = (filter: any) => {
    let query: any = {}
    for (let keys in filter) {
      if (filter[keys].constructor === Array && filter[keys].length > 0) {
        query[keys] = filter[keys]
      }
    }
    return query
  }
  let filter: any = {}
  const query = buildFilter(filter)

  const filterBuilderData = (data: any, query: any) => {
    let searchedData: any = []
    data.forEach((item: any) => {
      for (let key in query) {
        if (
          !_.includes(searchedData, item) &&
          item[key].toLowerCase().includes(query[key][0].toLowerCase())
        ) {
          searchedData.push(item)
        }
      }
    })
    return searchedData
  }

  React.useEffect(() => {
    searchProp.forEach((e: any) => (filter[e] = [searchValue.value]))
    setSearchedData(filterBuilderData(data, buildFilter(filter)))
  }, [searchProp, searchValue])

  const handleSearch = (searchData: any) => {
    const data = searchData.value
    setSearchValue(searchData)
    if (data === '') {
      setRows(tempData)
    } else {
      setRows(filterBuilderData(rows, query))
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: '5px' }}>
        <Divider variant="middle" />
        <TableContainer>
          <Toolbar
            sx={{
              padding: '14px 12px',
            }}
          >
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            ></Typography>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '35%',
                padding: '7px 0px',
                borderRadius: '11px',
                boxShadow: 'none',
                border: '1px solid rgb(224, 224, 224)',
              }}
            >
              <SearchInput
                type="text"
                placeholder={placeholder ? placeholder : `Search...`}
                Value={searchValue.value}
                onChangeText={handleSearch}
              />
            </Paper>
          </Toolbar>

          <Table
            sx={{
              minWidth: 750,
            }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <TableHead>
              <TableRow>
                {mapableData.map((item: any, index: number) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: 700,
                      padding: '18px !important',
                      borderBottom: '1px solid #E1E2E9',
                      borderTop: '1px solid #E1E2E9',
                    }}
                  >
                    {item.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {searchedData.length > 0 ? (
                searchedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <StyledTableRow hover tabIndex={-1} key={row.id}>
                        {mapableData.map((item: any, index: number) => {
                          const value = row[item.dataKey]
                          return item.hasOwnProperty('isStatus') ? (
                            <StatusCell
                              sx={{ padding: '10px 18px !important' }}
                              dataKey="is_active"
                              rowData={row}
                              key={index}
                            />
                          ) : item.hasOwnProperty('isAction') ? (
                            <ActionCell
                              key={item.dataKey}
                              isUpdate={isUpdate}
                              isStatus={isStatus}
                              isDelete={item.isDelete}
                              dataKey="id"
                              rowData={row}
                              handleChangeActiveStatus={
                                handleChangeActiveStatus
                              }
                              handleChangeEdit={handleChangeEdit}
                              handleChangeDelete={handleChangeDelete}
                            />
                          ) : (
                            <TableCell
                              sx={{ padding: '10px 18px !important' }}
                              key={item.dataKey}
                            >
                              {typeof value !== 'number' && value}
                            </TableCell>
                          )
                        })}
                      </StyledTableRow>
                    )
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default SearchTable
