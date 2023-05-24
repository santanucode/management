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
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import './styles.scss'
import { Calendar } from 'iconsax-react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { tableCellClasses } from '@mui/material/TableCell'
import { musterRollProps } from '../container/musterrollContainer'
import Loader from 'components/common/Loader/Loader'
import { BASE_URL } from 'api/setup.intersepter'
import { DNLDCSV } from 'pages/app/esiReport/container/esiReportString'
import { DNLDPDF } from 'pages/app/epfReport/container/epfReportString'
const paths = [
  {
    name: HOMEPATH,
    path: '',
  },
  {
    name: CURRENTPATH,
  },
]


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


const MustorRole = (props: musterRollProps) => {
  const {
    allMusterRoll,
    error_getGroup,
    error_getMusterRoll,
    getAllGroup,
    getAllMusterRoll,
    loading_getGroup,
    loading_getMusterRoll,
    success_getGroup,
    success_getMusterRoll,
    role_function,
    getRoleFuncn
  } = props;

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const date = new Date()
  const [screen, setScreen] = useState(1)
  const [startDate, setStartDate] = useState(moment(date).format('YYYY-MM-DD'))
  const [selectGroup, setSelectGroup] = useState('')
  const [selectStaff, setSelectStaff] = useState('')
  const [allData, setAllData] = useState<any>(allMusterRoll)
  const [isLoader, setLoader] = useState(false);
  const handleChangeDate = (value: any) => {
    setStartDate(value)
  }

  useEffect(() => {
    getAllGroup();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])
  console.log("allData", allData)



  useEffect(() => {
    const isLoading = loading_getMusterRoll;
    setLoader(isLoading);
    if (success_getMusterRoll) {
      setAllData(allMusterRoll);
      setScreen(2);
    }
  }, [loading_getMusterRoll, success_getMusterRoll]);

  console.log("allData--->",allData)

  const groupLists = useSelector((state: any) => state.groups.groupList);

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
    getAllMusterRoll(data)
    // setScreen(2)
  }
  const handleClose = () => {
    setStartDate(moment(date).format('YYYY-MM-DD'))
    setSelectGroup('')
    setSelectStaff('')
    setScreen(1)
  }
  let reportDisable = selectGroup === ''

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
    {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />

      <div>
        {screen === 1 ? (
          <div className="generate_paper">
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
                  Muster Role
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
                                            renderValue={selectGroup !== "" ? undefined : () => "Select Group"}
                                        >

                                            <MenuItem value={"ele.value"}>{"ele.label"}</MenuItem>

                                        </SelectDropdown>
                                    </FormControl>

                                    <FormControl size="small" className="shift-btn ">
                                        <SelectDropdown
                                            sx={{ minWidth: 120 }}
                                            value={selectShift}
                                            onChange={(event) => setSelectShift(event.target.value)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            renderValue={selectShift !== "" ? undefined : () => "Select Shift"}
                                        >

                                            <MenuItem value={"ele.value"}>{"ele.label"}</MenuItem>

                                        </SelectDropdown>
                                    </FormControl>


                                </div> */}
                <div>
                <a target='_blank' href={`${BASE_URL}/${allData.Excel}`}>
                      <button className="CSVdownload" >
                      {DNLDCSV}
                      </button>
                  </a>
                  <a target='_blank' href={`${BASE_URL}/${allData.Pdf}`}>
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
              <TableContainer component={Paper}>
                <Table aria-label="customized table table-striped">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">SL NO</StyledTableCell>
                      <StyledTableCell align="right">Union SRL</StyledTableCell>
                      <StyledTableCell align="right">
                        NAME OF EMPLOYEE
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        EXCESS STK+STW
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        EXCES_DTW SHIFTING
                      </StyledTableCell>
                      <StyledTableCell align="right">XTRA BAG</StyledTableCell>
                      <StyledTableCell align="right">DUTY</StyledTableCell>
                      <StyledTableCell align="right">OFFDAY</StyledTableCell>
                      <StyledTableCell align="right">
                        PF NH DUTY
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        TOTAL DUTY
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        BASIC AMOUNT
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        DA @29.96 ALLOWANCE
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        HOUSE RENT ALW
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        CANTEEN ALLOWANCE
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        SHIFT ALLOWANCE
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        NIGHT ALLOWANCE
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        NF FH AMOUNT
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        EXTRA BAG COST
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        TOTAL WAGES
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        EPF AMOUNT
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ESI AMOUNT
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        NET PAYABLE SIGN
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allData?.MusterReport.length>0 ? allData?.MusterReport
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row:any) => (
                        <StyledTableRow key={Math.random()+3}>
                          <StyledTableCell align="left">
                            {row.Sl_No}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Union_Serial_Number}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Name_of_staff}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Excess_Cat_2}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Excess_Cat_2}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Extra_Bag}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Duty}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Off_Days}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.FH_NH_Duty}
                            
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Total_Duty}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Basic_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.DA_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.HRA_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Canteen_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Shift_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Night_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.FH_NH_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Extra_Bag_Cost}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Total_Wages}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.EPF_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.ESI_Allowance_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Net_Payable}
                          </StyledTableCell>
                        </StyledTableRow>
                      )):"No Data Found"}
                  </TableBody>
                </Table>
              </TableContainer>
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
                    count={allData?.MusterReport.length}
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
          </div>
        )}
      </div>
    </>
  )
}

export default MustorRole
