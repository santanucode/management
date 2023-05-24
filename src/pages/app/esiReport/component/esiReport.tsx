import React, { SetStateAction, useEffect, useState } from 'react'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
// import { CURRENTPATH, HOMEPATH } from '../container/epfReportString';
import { Button } from '@mui/material'
import { FormControl, TextField } from '@mui/material'
import moment from 'moment'
import './styles.scss'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import TablePagination from '@mui/material/TablePagination'
// import { EpfReportProps } from '../container/epfReportContainer';
import { useDispatch } from 'react-redux'
import { reset } from '../service/esireportslice'
import { EsiReportProps } from '../container/esiReportContainer'
import {
  CLOSE,
  CURRENTPATH,
  DAILYWAGES,
  DEDUCTED,
  DNLDCSV,
  DNLDPDF,
  GENERATE,
  HOMEPATH,
  INSURANCENO,
  NAME,
  REPORTS,
  SLNO,
  TOTALAMOUNT,
  WAGEPAID,
} from '../container/esiReportString'
import { CSVLink } from 'react-csv'
import Loader from 'components/common/Loader/Loader'
// import { reset } from '../service/epfreportslice';
// import { epfReportInitDTO } from '../service/types';
import TableFooter from '@mui/material/TableFooter'
import { Modal } from 'react-bootstrap'
import PDF_Table from 'components/pdfTable/PDF_Table'
import PDF_TableEsi from 'components/pdfTable/PDF_TableEsi'
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

const epfHeaders = [
  'SL NO',
  'PF NO',
  'Group',
  'UAN NO',
  'NAME OF EMPLOYEE',
  'GROSS WAGES',
  'EPF WAGES',
  'EPS WAGES',
  'EDLI WAGES',
  'EE SHARE',
  'EPS REMITED',
  'ER SHARE',
  'MCP DAYS',
  'REFUND',
]

const EsiReport = (props: EsiReportProps) => {
  const {
    getEsiReport,
    loading_getEsiReport,
    success_getEsiReport,
    esiReportList,
    getRoleFuncn,
    role_function
  } = props

  const date = new Date()
  const [startDate, setStartDate] = useState(moment(date).format('YYYY-MM-DD'))
  const [allData, setAllData] = useState(esiReportList)
  const [screen, setScreen] = useState(1)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [isLoader, setLoader] = useState(false)
  const [showCust, setShowCust] = useState(false)
  const dispatch = useDispatch()
  const handleCustClose = () => setShowCust(false)

  const handleCustDownload = () => {
    handleCustShow()
  }
  const handleCustShow = () => {
    setShowCust(true)
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  useEffect(() => {
    getRoleFuncn()
  }, [])
  console.log("role_function", role_function)
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDate = (value: SetStateAction<any>) => {
    setStartDate(value)
  }
  const selectYear = moment(startDate).format('YYYY')
  const selectMonth = moment(startDate).format('MM')
  const SelectMobthData = {
    month: selectMonth,
    year: selectYear,
  }

  const handleReportGenerate = () => {
    getEsiReport(SelectMobthData)
  }
  const downloadCustPDF = (data: any ) => {
    return <PDF_TableEsi data={data} SelectMobthData={SelectMobthData} />
  }

  const handleClose = () => {
    dispatch(reset())
    setStartDate(moment(date).format('YYYY-MM-DD'))
    setScreen(1)
  }

  useEffect(() => {
    const isLoading = loading_getEsiReport
    setLoader(isLoading)
    if (success_getEsiReport == true) {
      setAllData(esiReportList)
      setScreen(2)
    }
  }, [success_getEsiReport, loading_getEsiReport])

  const headers = [
    { label: 'SL NO', key: 'Sl_No' },
    { label: 'INSURANCE NO', key: 'Insurance_Number' },
    { label: 'NAME OF INSURED PERSON', key: 'Insurance_Person' },
    { label: 'NO. OF DAYS WAGES PAID', key: 'wages_Paid_Day' },
    { label: 'TOTAL AMOUNT OF WAGES PAID', key: 'Total_Amount' },
    { label: "EMPLOYEE'S CONTRIBUTION DEDUCTED", key: 'Esi_Amount' },
    { label: 'DAILY WAGES', key: 'Daily_Amount' },
  ]

  const csvReport = {
    data: allData,
    headers: headers,
    filename: 'ESI_Reports.csv',
  }

  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <div>
        {screen === 1 ? (
          <div className="generate_paper">
            
                  {/* {errorMessage} */}
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
            <div className="form_btn_generate">
              <div>
                <Button
                  variant="contained"
                  className="report-btn"
                  onClick={handleReportGenerate}
                >
                  {GENERATE}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <div className="d-flex justify-content-between mb-2">
              <div>{REPORTS}</div>
              <div>
                {/* <CSVLink {...csvReport}>
                  <button className="CSVdownload">{DNLDCSV} </button>
                </CSVLink> */}
                    {/* {DNLDPDF} */}
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
                  {CLOSE}
                </button>
              </div>
            </div>
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="customized table table-striped">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">{SLNO}</StyledTableCell>
                      <StyledTableCell align="left">
                        {INSURANCENO}
                      </StyledTableCell>
                      <StyledTableCell align="left">{NAME}</StyledTableCell>
                      <StyledTableCell align="left">{WAGEPAID}</StyledTableCell>
                      <StyledTableCell align="left">
                        {TOTALAMOUNT}
                      </StyledTableCell>
                      <StyledTableCell align="left">{DEDUCTED}</StyledTableCell>
                      <StyledTableCell align="left">
                        {DAILYWAGES}
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { allData?.esiReport ? allData?.esiReport
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row: any) => (
                        <StyledTableRow>
                          <StyledTableCell align="left">
                            {row.Sl_No}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Insurance_Number}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Insurance_Person}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.wages_Paid_Day}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Total_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Esi_Amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Daily_Amount}
                          </StyledTableCell>
                        </StyledTableRow>
                      )):null}
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
                    count={allData?.esiReport.length}
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
              
                
              <Modal
                dialogClassName="my-modal"
                show={showCust}
                onHide={handleCustClose}
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>{downloadCustPDF(allData)}</Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EsiReport
