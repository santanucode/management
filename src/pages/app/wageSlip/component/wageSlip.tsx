import React, { useEffect, useState } from 'react'
import { Button, InputAdornment, Paper, Typography } from '@mui/material'
import {
  FormControl,
  TextField,
  Select as SelectDropdown,
  MenuItem,
} from '@mui/material'
import moment from 'moment'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import { CURRENTPATH, HOMEPATH } from '../container/wageSlipString'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell';
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import './styles.scss'
import { Calendar } from 'iconsax-react'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { wageSlipProps } from '../container/wageslipContainer'
import Loader from 'components/common/Loader/Loader'
import { DNLDPDF } from 'pages/app/epfReport/container/epfReportString'
import { BASE_URL } from 'api/setup.intersepter'
import { ToastContainer } from 'react-toastify'

const paths = [
  {
    name: HOMEPATH,
    path: '',
  },
  {
    name: CURRENTPATH,
  },
]

const WageSlip = (props: wageSlipProps) => {
  const {
    getAllGroup,
    loading_getGroup,
    error_getGroup,
    allWageReport,
    error_getWageReport,
    getAllWageSlip,
    loading_getWageReport,
    success_getGroup,
    success_getWageReport,
    getAllOperation,
    role_function,
    getRoleFuncn
  } = props;

  
  const date = new Date()
  const [screen, setScreen] = useState(1)
  const [startDate, setStartDate] = useState(moment(date).format('YYYY-MM-DD'))
  const [selectGroup, setSelectGroup] = useState('')
  const [selectStaff, setSelectStaff] = useState('')
  const [allData, setAllData] = useState(allWageReport)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [isLoader, setLoader] = useState(false);


  console.log("allData",allData)

  const handleChangeDate = (value: any) => {
    setStartDate(value)
  }

  useEffect(() => {
    getAllGroup();
  }, []);

  useEffect(() => {
    getAllOperation();
  }, []);


  useEffect(() => {
    getRoleFuncn()
  }, [])
  console.log("role_function", role_function)
  
  useEffect(() => {
    const isLoading = loading_getWageReport;
    setLoader(isLoading);
    if (success_getWageReport) {
      setAllData(allWageReport);
      setScreen(2);
    }
  }, [loading_getWageReport, success_getWageReport]);


  const groupLists = useSelector((state: any) => state.groups.groupList);

  const OperationLists = useSelector((state: any) => state.operation.operationList);


  const masterGroups = groupLists?.map((ele: any) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    is_active: ele.is_active,
  }));

  const filterGroups = masterGroups?.filter((ele: any) => {
    return ele.is_active === 1;
  });
  
  const handleReportGenerate = () => {
    const selectYear = moment(startDate).format('YYYY')
    const selectMonth = moment(startDate).format('MM')
    const data = {
      month: selectMonth,
      year: selectYear,
      group_id: selectGroup,
    }

    getAllWageSlip(data)
    // setScreen(2)
  }
  const handleClose = () => {
    setStartDate(moment(date).format('YYYY-MM-DD'))
    setSelectGroup('')
    setSelectStaff('')
    setScreen(1)
  }
  let reportDisable = selectGroup === '' 

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#fff',
      color: '#434343',
      fontWeight: '600',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
    },
  }))
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#fff ',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />

      <div>
        {screen === 1 ? (
          <div className="generate_paper">
              <ToastContainer/>
            <div className="form_div_generate">
              <FormControl size="small" fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="MM/yyyy"
                    views={['year', 'month']}
                    label="Year and Month"
                    value={startDate}
                    onChange={handleChangeDate}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>

            <div className="form_div_generate">
              <FormControl size="small" fullWidth>
                <SelectDropdown
                  fullWidth
                  value={selectGroup}
                  onChange={(event) => setSelectGroup(event.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={
                    selectGroup !== '' ? undefined : () => 'Select Group'
                  }
                >
                  {filterGroups &&
                    filterGroups.map((ele: any) => (
                      <MenuItem key={ele.id} value={ele.value}>
                        {ele.label}
                      </MenuItem>
                    ))}
                </SelectDropdown>
              </FormControl>
            </div>
            <div className="form_btn_generate">
              <div className="">
                <Button
                  variant="contained"
                  className="report-btn"
                  disabled={reportDisable}
                  onClick={handleReportGenerate}
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <div className="header-bar">
              <div>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  Reports
                </Typography>
              </div>

              {/* <div className="header-toolbar">
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

                <FormControl size="small" className="shift-btn ">
                  <SelectDropdown
                    sx={{ minWidth: 120 }}
                    value={selectGroup}
                    onChange={(event) => setSelectGroup(event.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    renderValue={
                      selectGroup !== '' ? undefined : () => 'Select Group'
                    }
                  >
                    <MenuItem value={'ele.value'}>{'ele.label'}</MenuItem>
                  </SelectDropdown>
                </FormControl>

                
              </div> */}
                <div>
                <a target='_blank' href={`${BASE_URL}/${allData}`}>
                      <button className="CSVdownload" >
                      {DNLDPDF}
                      </button>
                  </a>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClose}
                  >
                  Close
                </button>
                </div>
            </div>
            <div className="mb-4">
              {/* <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginBottom:3 }}
              >
                Wage Slip
              </Typography> */}
              <Paper
              >
                <TableContainer>
                  <Table aria-label="customized table table-striped">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell>NAME</StyledTableCell>
                        <StyledTableCell>DUTY</StyledTableCell>
                        <StyledTableCell>OFF DAY</StyledTableCell>
                        <StyledTableCell>PFNHFH DUTY</StyledTableCell>
                        <StyledTableCell>TOTAL DUTY</StyledTableCell>
                        <StyledTableCell>BASIC WAGES</StyledTableCell>
                        <StyledTableCell>D.A @29.96%</StyledTableCell>
                        <StyledTableCell>H.R.A ALLOWANCE</StyledTableCell>
                        <StyledTableCell>CANTEEN ALLOWANCE</StyledTableCell>
                        <StyledTableCell>SHIFT ALLOWANCE</StyledTableCell>
                        <StyledTableCell>NIGHT ALLOWANCE</StyledTableCell>
                        <StyledTableCell>NHFH AMNT</StyledTableCell>
                        <StyledTableCell>EXTRABAG COST</StyledTableCell>
                        <StyledTableCell>TOTAL WAGES</StyledTableCell>
                        <StyledTableCell>E.P.F</StyledTableCell>
                        <StyledTableCell>E.S.I</StyledTableCell>
                        <StyledTableCell>I.T</StyledTableCell>
                        <StyledTableCell>W.ADV.</StyledTableCell>
                        <StyledTableCell>OTHER</StyledTableCell>
                        <StyledTableCell>TOT. DED</StyledTableCell>
                        <StyledTableCell>NET AMOUNT PAYABLE</StyledTableCell>

                      </TableRow>
                    </TableHead>
                      <TableBody className='tableBodyData'>
                        {Object.values(allData).length > 0 ? Object.values(allData)
                          // .slice(
                          //   page * rowsPerPage,
                          //   page * rowsPerPage + rowsPerPage,
                          // )
                          .map((key: any, index: number) => {
                          return (
                            <StyledTableRow key={index}>
                          <StyledTableCell align="left">
                            {key.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.presentDays}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.OffEligibleDays}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.holidayWorkCount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.paidDays}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.Basic_AmountTotal}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.DA_AmountTotal}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.HRA_AmountTotal}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.CA_AmountTotal}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.dayShiftAllowance}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.nightShiftAllowance}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.holidayAllowenceTotalAount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.TotalIncenitveAmount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.grossAmount  }
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key?.epf?.amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key?.esi?.amount}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                            {key.st}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {key.essnt}
                          </StyledTableCell><StyledTableCell align="left">
                            {key.st}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                          {key?.epf?.amount + key?.esi?.amount}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                            {key.grossAmount - (key?.epf?.amount + key?.esi?.amount)}
                          </StyledTableCell>

                        </StyledTableRow>
                          )
                        }):"No data"}
                    {/* {allData?.length ?
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      allData.map((row:any, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="left">
                            {row.aadhar}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.shift}
                          </StyledTableCell>
                          <TableCell></TableCell>
                          <StyledTableCell align="right">
                            {row.wages}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.extra_1}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.extra_2}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.extra}
                          </StyledTableCell>
                        </StyledTableRow>
                      )) : null
                    } */}
                    </TableBody>
                  </Table>
                  </TableContainer>
                  
                
                  

                </Paper>
                <TableContainer>
                
                <div className='tpagination'>
                      <TablePagination
                         sx={{width:"100%"}}
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={10}
                    count={Object.values(allData).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActions}
                  /> 
              </div>
              </TableContainer>
            </div>

            {/* <div>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Pay Slip
              </Typography>
              <Paper
                sx={{ width: '100%', height: '350px', overflow: 'scroll' }}
                >
                <TableContainer>
                  <Table aria-label="customized table table-striped">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Shift</StyledTableCell>
                        {OperationLists?.length ?
                          OperationLists.map((ele:any, index:number) => (
                            <StyledTableCell key={index}>{ele.name}</StyledTableCell>
                          )) :null}
                        <StyledTableCell>Shifting</StyledTableCell>
                        <StyledTableCell>Wages</StyledTableCell>
                        <StyledTableCell>EX1</StyledTableCell>
                        <StyledTableCell>EX2</StyledTableCell>
                        <StyledTableCell>EXTRA</StyledTableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                      {Object.values(allData).map((key:any) => {
                          return (
                            Object.values(key.attendance).map((dateObjectKey: any) => {
                              return (
                                <>
                                  {dateObjectKey.date}+"hii"
                                </>
                              )
                            })
                          )
                        })}
                     {allData.length ? allData
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((row:any, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="left">
                          
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.shift}
                        </StyledTableCell>

                        {row?.operation?.map((operation:any, index:number) => (
                          <StyledTableCell align="right" key={index}>
                            {operation.value}
                          </StyledTableCell>
                        ))}
                        <TableCell></TableCell>
                        <StyledTableCell align="right">
                          {row.wages}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.extra_1}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.extra_2}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.extra}
                        </StyledTableCell>
                      </StyledTableRow>
                    )): "Loading...."}
                        
                        
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div> */}
          </div>
        )}
      </div>
    </>
  )
}



  
export default WageSlip
