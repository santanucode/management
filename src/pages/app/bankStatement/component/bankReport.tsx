import React, { SetStateAction, useEffect, useState } from "react";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import { CURRENTPATH, HOMEPATH } from "../container/bankReportString";
import { Button } from "@mui/material";
import {
  FormControl,
  TextField,
  Select as SelectDropdown,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import "./styles.scss";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import TablePagination from "@mui/material/TablePagination";
import { useSelector } from "react-redux";
import { BankReportProps } from "../container/bankReportContainer";
import { reset } from "../service/bankReportSlice";
import Loader from "components/common/Loader/Loader";
import { CSVLink } from "react-csv";
import { Modal } from 'react-bootstrap'
import PDF_TableBank from "components/pdfTable/PDF_TableBank";
import { CLOSE, DNLDEPF, DNLDPDF, GENERATE, REPORTS } from "pages/app/epfReport/container/epfReportString";
import { BASE_URL } from "api/setup.intersepter";
import { DNLDCSV } from "pages/app/esiReport/container/esiReportString";
import { ToastContainer } from "react-toastify";
// import { CustomModal } from 'components/common/modal/modal';
// import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
// import BankReportPdf from './bankReportPdf';

const paths = [
  {
    name: HOMEPATH,
    path: "",
  },
  {
    name: CURRENTPATH,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: "#434343",
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff ",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BankReport = (props: BankReportProps) => {
  const {
    getAllBanks,
    getAllBankReport,
    error_getBankReport,
    loading_getBankReport,
    success_getBankReport,
    bankReportList,
    role_function,
    getRoleFuncn

  } = props;
  const date = new Date();
  const [startDate, setStartDate] = useState(moment(date).format("YYYY-MM-DD"));
  const [allData, setAllData] = useState(bankReportList);
  const [screen, setScreen] = useState(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectBank, setSelectBank] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showCust, setShowCust] = useState(false)
  const [isLoader, setLoader] = useState(false);

  const openDownloadModal = () => {
    setOpenModal(true);
  };

  const closeDownloadModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getAllBanks();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])
  console.log("role_function", role_function)


  const bankLists = useSelector((state: any) => state.banks.banksList);
  const MasterBanks = bankLists?.map((ele: any) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    is_active: ele.is_active,
  }));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCustClose = () => setShowCust(false)

  const handleChangeDate = (value: SetStateAction<any>) => {
    setSelectBank("");
    setStartDate(value);
  };

  const selectYear = moment(startDate).format("YYYY");
  const selectMonth = moment(startDate).format("MM");
  const SelectMobthData = {
    month: selectMonth,
    year: selectYear,
    bank_id: selectBank,
  };

  const handleReportGenerate = () => {  
    getAllBankReport(SelectMobthData);
  };

  console.log(selectBank);
  const handleClose = () => {
    setSelectBank("");
    setStartDate(moment(date).format("YYYY-MM-DD"));
    setScreen(1);
  };
  const downloadCustPDF = (data: any) => {
    console.log('DAtatatat', data)
    return <PDF_TableBank data={data} SelectMobthData={SelectMobthData} />
  }
  
  const handleCustDownload = () => {
    handleCustShow()
  }
  const handleCustShow = () => {
    setShowCust(true)
  }

  const handleClickDownload = () => {
    openDownloadModal();
  };
  let reportDisable = selectBank === "";

  // const selectDownloadModal = () => {
  //     return <BankReportPdf />
  // };

  useEffect(() => {
    const isLoading = loading_getBankReport;
    setLoader(isLoading);
    if (success_getBankReport) {
      setAllData(bankReportList);
      setScreen(2);
    }
  }, [loading_getBankReport, success_getBankReport]);

  const headers = [
    { label: "SL NO", key: "Sl_No" },
    { label: "UNION NO", key: "Union_Serial_Number" },
    { label: "EMPLOYEE NAME", key: "Name" },
    { label: "BANK ACCOUNT NO", key: "Bank_Acc_Number" },
    { label: "NET AMOUNT", key: "Net_Amount" },
  ];
  const csvReport = {
    data: allData,
    headers: headers,
    filename: "Bank_Reports.csv",
  };
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      {/* <CustomModal isOpen={openModal} handleClose={closeDownloadModal}>
                {selectDownloadModal()}
            </CustomModal> */}
      <div>
        {screen === 1 ? (
          <div className="generate_paper">
           
              <ToastContainer/>
        


            <div className="form_div_generate">
              <FormControl size="small" fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="MM/yyyy"
                    views={["year", "month"]}
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
                  value={selectBank}
                  onChange={(event) => setSelectBank(event.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  renderValue={
                    selectBank !== "" ? undefined : () => "Select a Bank"
                  }
                >
                  {MasterBanks &&
                    MasterBanks.map((ele: any) => (
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
                  {GENERATE}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <div className="d-flex justify-content-between mb-2">
              <div>{REPORTS}</div>
              {/* <button onCl    ick={handleClickDownload}>
                                    Download
                                </button> */}
                <div>
                {/* <CSVLink style={{ color: "white" }} {...csvReport}>
                <button className="CSVdownload"> {DNLDEPF} </button>
                </CSVLink>
                <button className="CSVdownload" onClick={handleCustDownload}>
                  {DNLDPDF}
                </button> */}
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
              {/* <TableContainer component={Paper}>
                                    <Table aria-label="customized table table-striped">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left">SL NO</StyledTableCell>
                                                <StyledTableCell align="right">UNION NO</StyledTableCell>
                                                <StyledTableCell align="right">EMPLOYEE NAME</StyledTableCell>
                                                <StyledTableCell align="right">BANK ACCOUNT NO</StyledTableCell>
                                                <StyledTableCell align="right">NET AMOUNT</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allData
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell align="left">{row.id}</StyledTableCell>
                                                        <StyledTableCell align="left">{row.union_no}</StyledTableCell>
                                                        <StyledTableCell align="right">{row.name}</StyledTableCell>
                                                        <StyledTableCell align="right">{row.bank_acc}</StyledTableCell>
                                                        <StyledTableCell align="right">{row.amount}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> */}
              <TableContainer component={Paper}>
                <Table aria-label="customized table table-striped">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">SL NO</StyledTableCell>
                      <StyledTableCell align="left">UNION NO</StyledTableCell>
                      <StyledTableCell align="left">
                        BANK NAME
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        BANK ACCOUNT NO
                      </StyledTableCell>
                      <StyledTableCell align="left">NET AMOUNT</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allData?.bankReport ? allData?.bankReport
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any) => (
                        <StyledTableRow key={Math.random()+2}>
                          <StyledTableCell align="left">
                            {row.Sl_No}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Union_Serial_Number}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Bank_Acc_Number}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Net_Amount}
                          </StyledTableCell>
                        </StyledTableRow>
                      )):"No Data"}
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
                    count={allData?.bankReport.length}
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
  );
};

export default BankReport;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
