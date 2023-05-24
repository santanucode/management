import React, { SetStateAction, useEffect, useState } from "react";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import {
  CLOSE,
  CURRENTPATH,
  EMPLOYEE,
  GENERATEREPORT,
  HOMEPATH,
  NODATA,
  OFF,
  TTL,
  UNION,
} from "../container/attendanceReportString";
import { Button } from "@mui/material";
import {
  FormControl,
  MenuItem,
  Select as SelectDropdown,
  TextField,
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
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/common/Loader/Loader";
import { reset } from "../service/attendanceReportSlice";
import { AttendanceReportProps } from "../container/attendanceReportContainer";
import { CSVLink } from "react-csv";
import { AnyAaaaRecord } from "dns";
import { Modal } from 'react-bootstrap'
import PDF_TableAR from "components/pdfTable/PDF_TableAttendanceReport";
import { BASE_URL } from "api/setup.intersepter";
import { DNLDCSV } from "pages/app/esiReport/container/esiReportString";
import { DNLDPDF } from "pages/app/epfReport/container/epfReportString";
import { ToastContainer } from "react-toastify";

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

const AttendanceReport = (props: AttendanceReportProps) => {
  const {
    getAllGroups,
    loading_getAttendanceReport,
    loading_getGroup,
    getAttendanceReport,
    attendanceReportList,
    success_getAttendanceReport,
    getRoleFuncn,
    role_function
  } = props;

  const date = new Date();
  const [selectGroup, setSelectGroup] = useState("");
  const [startDate, setStartDate] = useState(moment(date).format("YYYY-MM-DD"));
  const [allData, setAllData] = useState(attendanceReportList);
  const [screen, setScreen] = useState(1);
  const [isLoader, setLoader] = useState(false);
  const [showCust, setShowCust] = useState(false)
  const dispatch = useDispatch();

  console.log("attendanceReportList",attendanceReportList.attendanceReport)
  console.log("allData",allData)

  useEffect(() => {
    getAllGroups();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])

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

  
  const handleCustDownload = () => {
    handleCustShow()
  }
  const handleCustShow = () => {
    setShowCust(true)
  }

  const headers = [
    { label: 'id', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'off Day', key: 'offDay' },
    { label: 'ttlDuty', key: 'ttlDuty' },
    { label: 'TOTAL AMOUNT OF WAGES PAID', key: 'Total_Amount' },
    { label: "EMPLOYEE'S CONTRIBUTION DEDUCTED", key: 'Esi_Amount' },
    { label: 'DAILY WAGES', key: 'Daily_Amount' },
  ]

  const csvReport = {
    data: allData,
    headers: headers,
    filename: 'ESI_Reports.csv',
  }


  const handleCustClose = () => setShowCust(false)

  const downloadCustPDF = (data: any) => {
    console.log('DAtatatat', data)
    return <PDF_TableAR data={data} />
  }


  const handleChangeDate = (value: SetStateAction<any>) => {
    setSelectGroup("");
    setStartDate(value);
  };

  const handleReportGenerate = () => {
    const selectYear = moment(startDate).format("YYYY");
    const selectMonth = moment(startDate).format("MM");
    let newDate = moment(startDate).toDate();

    const totalDays = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0
    ).getDate();

    let list_days: any = [];
    for (let i = 1; i <= totalDays; i++) {
      list_days.push(i);
    }
    const data = {
      group_id: selectGroup,
      month: parseInt(selectMonth),
      year: parseInt(selectYear),
    };


    getAttendanceReport(data);
  };

  const handleClose = () => {
    dispatch(reset());
    setSelectGroup("");
    setStartDate(moment(date).format("YYYY-MM-DD"));
    setScreen(1);
  };
  let reportDisable = selectGroup === "";
  useEffect(() => {
    const isLoading = loading_getGroup || loading_getAttendanceReport;
    setLoader(isLoading);
    if (
      loading_getAttendanceReport === false &&
      success_getAttendanceReport === true
    ) {
      const filterAttendance = attendanceReportList?.attendanceReport.map(
        (ele: any, index: number) => {
          return {
            id: Math.random(),
            name: ele.name,
            unionNo: ele.union_serial_number,
            attendance: ele.attendance_report?.map((att: any) => {
              return {
                data: att.date,
                status:
                  att.status === "P"
                    ? "P"
                    : att.status === "A"
                    ? "A"
                    : att.status == "S"
                    ? "S"
                    : att.status == "Paid"
                    ? "O"
                    : att.status == "Unpaid"
                    ? "-"
                    : "-",
              };
            }),
            ttlDuty: ele.attendance_report_count
              ? ele.attendance_report_count[0]?.Present
              : 0,
            offDay: ele.attendance_report_count
              ? parseInt(ele.attendance_report_count[0]?.Absent) +
                parseInt(ele.attendance_report_count[0]?.Special)
              : 0,
          };
        }
      );
      setAllData(filterAttendance);
      setScreen(2);
    }
  }, [loading_getGroup, loading_getAttendanceReport]);

  console.log(allData, "attendance All Data");

  // const headers = [
  //   { lable: "Employee Name", key: "name" },
  //   { lable: "Union Sl. No", key: "unionNo" },
  // ];
  // const returnDays: any = allData.map((ele: any, i: number) => {
  //   const header = ele.attendance.map((el: any) => {
  //     return { lable: el.data, key: el.status };
  //   });
  //   return {
  //     id: ele.id,
  //     name: ele.name,
  //     headeroffDay:ele.offDay,
      
  //   }
      
  // });

  // console.log("returnDays",returnDays)
  // console.log(headers, "headers");
  // const csvReport = {
  //   data: allData,
  //   headers: allData.map((ele:any) => {
  //     return
  //   })
  // }

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
                  value={selectGroup}
                  onChange={(event) => setSelectGroup(event.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  renderValue={
                    selectGroup !== "" ? undefined : () => "Select Group"
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
                  {GENERATEREPORT}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <div className="d-flex justify-content-between mb-2">
                <div>Reports</div>
                
                
              <div className="d-flex align-items-center">
                <div className="me-3">
                <a target='_blank' href={`${BASE_URL}/${attendanceReportList.Excel}`}>
                      <button className="CSVdownload" >
                      {DNLDCSV}
                      </button>
                  </a>
                  <a target='_blank' href={`${BASE_URL}/${attendanceReportList.Pdf}`}>
                      <button className="CSVdownload" >
                      {DNLDPDF}
                      </button>
                  </a>
                </div>
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
                      <StyledTableCell>{EMPLOYEE}</StyledTableCell>
                      <StyledTableCell align="left">{UNION}</StyledTableCell>
                      {allData?
                         allData[0]?.attendance?.map((days: any) => (
                            <StyledTableCell align="left" key={Math.random()}>
                              {moment(days.data).format("DD")}
                            </StyledTableCell>
                          ))
                        : null}
                      <StyledTableCell align="left">{TTL}</StyledTableCell>
                      <StyledTableCell align="left">{OFF}</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allData ? (
                      allData?.map((row: any) => (
                        <>
                          <StyledTableRow key={Math.random()}>
                            <StyledTableCell align="left" style={{whiteSpace: "nowrap"}}>
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.unionNo}
                            </StyledTableCell>
                            {row.attendance &&
                              row.attendance?.map(
                                (dates: any, index: number) => (
                                  <>
                                    <StyledTableCell
                                      align="left"
                                      key={Math.random()}
                                    >
                                      {dates.status}
                                    </StyledTableCell>
                                  </>
                                )
                              )}
                            <StyledTableCell align="left">
                              {row.ttlDuty}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.offDay}
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))
                    ) : (
                      <StyledTableCell
                        className="NoRecordFound"
                        align="center"
                        colSpan={4}
                      >
                        {NODATA}
                      </StyledTableCell>
                    )}
                  </TableBody>
                </Table>
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
        {/* <CSVLink style={{ color: "white" }} {...csvReport}>
        <button onClick={()=> console.log("first")}>PDF</button>
                  </CSVLink> */}
      </div>
    </>
  );
};

export default AttendanceReport;
