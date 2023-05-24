import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button } from '@mui/material'
import Select from 'react-select'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import { HOMEPATH } from 'pages/app/bank/container/bankString'
import TablePagination from '@mui/material/TablePagination'
import { Calendar, Edit2 } from 'iconsax-react'

import './style.scss'
import { useNavigate } from 'react-router-dom'

import {
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'

const paths = [
  {
    name: HOMEPATH,
    path: '',
  },
  {
    name: 'Attendance List',
  },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#20c997',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f3f3f3',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

// function createData(
//   date: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { date, calories, fat, carbs, protein }
// }

const fakedata = [
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP A' },
      { id: 2, name: 'GROUP B' },
    ],
    shift: 'shift1',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP F' },
      { id: 2, name: 'GROUP G' },
    ],
    shift: 'shift2',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP C' },
      { id: 2, name: 'GROUP D' },
    ],
    shift: 'shift3',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP A' },
      { id: 2, name: 'GROUP B' },
    ],
    shift: 'shift1',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP F' },
      { id: 2, name: 'GROUP G' },
    ],
    shift: 'shift2',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP C' },
      { id: 2, name: 'GROUP D' },
    ],
    shift: 'shift3',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP A' },
      { id: 2, name: 'GROUP B' },
    ],
    shift: 'shift1',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP F' },
      { id: 2, name: 'GROUP G' },
    ],
    shift: 'shift2',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
  {
    date: '15-03-2023',
    groups: [
      { id: 1, name: 'GROUP C' },
      { id: 2, name: 'GROUP D' },
    ],
    shift: 'shift3',
    present: 90,
    absent: 12,
    special_absent: 5,
  },
]

const ListAttendance = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [tasks, setTasks] = useState<any>({
    present_list: [],
    absent_list: [],
    special_absent: [],
    dragged: {},
  })

  const date = new Date()
  const [selectShifts, setSelectShifts] = useState<any>({
    value: null,
    error: false,
    success: false,
  })
  const [selectGroupList, setSelectGroupList] = useState<any>({
    value: null,
    error: false,
    success: false,
  })
  const handleChangeGroups = (data: any) => {
    setTasks({
      present_list: [],
      absent_list: [],
      special_absent: [],
      dragged: {},
    })
    setSelectGroupList(data)
  }

  const shiftList = useSelector((state: any) => state.shift.shiftList)

  const masterShifts = shiftList?.map((ele: any) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    amount: ele.amount,
    is_active: ele.is_active,
  }))

  const masterShift = masterShifts?.filter((ele: any) => {
    return ele.is_active === 1
  })
  const handleChangeShift = (data: any) => {
    setTasks({
      present_list: [],
      absent_list: [],
      special_absent: [],
      dragged: {},
    })
    setSelectShifts(data)
  }

  const [startDate, setStartDate] = useState(moment(date).format('YYYY-MM-DD'))

  const handleChangeDate = (event: any) => {
    setTasks({
      present_list: [],
      absent_list: [],
      special_absent: [],
      dragged: {},
    })
    setStartDate(event.target.value)
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

  const navigate = useNavigate()
  const addattendance = () => {
    navigate('/attendance')
  }
  const EditMain = () => {
    alert('hii')
  }
  return (
    <>
      <Breadcrumb pathList={paths} />

      <div className="header-bar">
        <div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Attendance List
          </Typography>
        </div>

        <div className="header-toolbar">
          <TextField
            size="small"
            className="date-input"
            id="outlined"
            type={'date'}
            defaultValue={startDate}
            onChange={handleChangeDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Calendar size="15" color="black" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" className="shift-btn">
            <Select
              className="basic-single"
              classNamePrefix="Select shift"
              isSearchable={true}
              name="color"
              options={masterShift}
              onChange={handleChangeShift}
            />
          </FormControl>

          {/* <Button
                variant="contained"
                className="attendance-btn"
                onClick={handleSaveAttendance}
              >
                {clickedBtn === 'add' ? ADDBTN : UPDATEBTN}
              </Button> */}
        </div>
      </div>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="left">Groups</StyledTableCell>
                <StyledTableCell align="left">Shift</StyledTableCell>
                <StyledTableCell align="left">Present</StyledTableCell>
                <StyledTableCell align="left">Absent</StyledTableCell>
                <StyledTableCell align="left">Special Absent</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? fakedata.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : fakedata
              ).map((row) => (
                <StyledTableRow key={row.date}>
                  <StyledTableCell component="th" scope="row">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.groups.map((ele: any) => ele.name).join(', ')}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.shift}</StyledTableCell>
                  <StyledTableCell align="left">{row.present}</StyledTableCell>
                  <StyledTableCell align="left">{row.absent}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.special_absent}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <span onClick={EditMain}>
                      <Edit2 size="22" color="#565e64" variant="Outline"/>
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={fakedata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  )
}

export default ListAttendance
