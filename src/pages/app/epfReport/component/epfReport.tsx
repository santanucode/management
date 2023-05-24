import React, { SetStateAction, useEffect, useState, useRef } from 'react'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import { CLOSE, CURRENTPATH, DNLDEPF, DNLDPDF, EDLIWAGE, EESHARE, EPFWAGE, EPSREMIT, EPSWAGE, ERSHARE, GENERATE, GROSSWAGE, HOMEPATH, MCP, NAMEOFEMPLOYEE, PFNO, REFUND, REPORTS, SLNO, UANNO } from '../container/epfReportString'
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
import { EpfReportProps } from '../container/epfReportContainer'
import { useDispatch } from 'react-redux'
import { reset } from '../service/epfreportslice'
import { epfReportInitDTO } from '../service/types'
import { CSVLink } from 'react-csv'
import { useReactToPrint } from 'react-to-print'
import { Modal } from 'react-bootstrap'
import PDF_Table from 'components/pdfTable/PDF_Table'
import Loader from 'components/common/Loader/Loader'
import { BASE_URL } from 'api/setup.intersepter'
import { DNLDCSV } from 'pages/app/esiReport/container/esiReportString'
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

const EpfReport = (props: EpfReportProps) => {
  const {
    getEpfReport,
    loading_getEpfReport,
    success_getEpfReport,
    epfReportList,
    role_function,
    getRoleFuncn
  } = props

  const date = new Date()
  const [startDate, setStartDate] = useState(moment(date).format('YYYY-MM-DD'))
  const [allData, setAllData] = useState(epfReportList)
  const [screen, setScreen] = useState(1)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [isLoader, setLoader] = useState(false)
  const renderPDF = useRef<any>(null)
  const [showCust, setShowCust] = useState(false)
  const dispatch = useDispatch()


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    getRoleFuncn()
   }, [])
   console.log("allData", allData)

  
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
    getEpfReport(SelectMobthData)
  }
  
  const handleClose = () => {
    dispatch(reset())
    setStartDate(moment(date).format('YYYY-MM-DD'))
    setScreen(1)
  }

  useEffect(() => {
    const isLoading = loading_getEpfReport
    setLoader(isLoading)
    if (success_getEpfReport == true) {
      setAllData(epfReportList)
      setScreen(2)
    }
  }, [success_getEpfReport, loading_getEpfReport])


  const handleCustShow = () => {
    setShowCust(true)
  }

  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <div>
        {screen === 1 ? (
          <div className="generate_paper">
            <div className="form_div_generate">
               
                  <ToastContainer/>
                
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
                {/* <CSVLink style={{ color: 'white' }} {...csvReport}>
                  <button className="CSVdownload"> {DNLDEPF} </button>
                </CSVLink> */}
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
              <TableContainer
                component={Paper}
                ref={renderPDF}
                style={{ width: '100%', height: '100%' }}
              >
                <Table aria-label="customized table table-striped">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">{SLNO}</StyledTableCell>
                      <StyledTableCell align="right">{PFNO}</StyledTableCell>
                      <StyledTableCell align="right">{UANNO}</StyledTableCell>
                      <StyledTableCell align="right">
                        {NAMEOFEMPLOYEE}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {GROSSWAGE}
                      </StyledTableCell>
                      <StyledTableCell align="right">{EPFWAGE}</StyledTableCell>
                      <StyledTableCell align="right">{EPSWAGE}</StyledTableCell>
                      <StyledTableCell align="right">
                        {EDLIWAGE}
                      </StyledTableCell>
                      <StyledTableCell align="right">{EESHARE}</StyledTableCell>
                      <StyledTableCell align="right">
                        {EPSREMIT}
                      </StyledTableCell>
                        <StyledTableCell align="right">{ERSHARE}</StyledTableCell>
                      <StyledTableCell align="right">{MCP}</StyledTableCell>
                      <StyledTableCell align="right">{REFUND}</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allData?.epfReport ?
                    allData?.epfReport
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row: any) => (
                        <StyledTableRow key={Math.random()+1}>
                          <StyledTableCell align="left">
                            {row.Sl_No}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.EPF_Number}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.UAN_Number}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.Person_Name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.Gross_Wages}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.Epf_Wages}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.Eps_Wages}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.EDLI_Wages}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.EE_Share}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.EPS_Remitted}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.ER_Share}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.MCP_Days}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.Refund}
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
                    count={allData?.epfReport.length}
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

export default EpfReport
