import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import {
  Paper,
  Switch,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  Tooltip,
} from '@mui/material'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import {
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import { ArrowLeft, Calendar, Edit2, MessageEdit, TextBlock, Trash, Xrp } from 'iconsax-react'
import Select from 'react-select'
import {
  ADDROW,
  ADDWORKLOG,
  CLEAR,
  CURRENTPATH,
  DRAFTBTNLABEL,
  HOMEPATHLABEL,
  PAGEHEADING,
  REMOVEROW,
  SAVEBTNLABEL,
  SEARCH,
  STATUSCHANGEHEAD,
  STATUSCHANGEPERMISSIONNO,
  STATUSCHANGEPERMISSIONYES,
  STATUSCHANGESUBHEAD,
  SWALDRAFTSUCEESTEXT,
  SWALDRAFTSUCEESTITLE,
  SWALSTATUSSUCEESTITLE,
  SWALSTATUSUCEESTEXT,
  SWALSUCEETEXT,
  SWALSUCEETITLE,
  SWALUPDATESUCEESTEXT,
  SWALUPDATESUCEESTITLE,
  TBLBONUSLABEL,
  TBLGANGLABEL,
  TBLOPERATIONLABEL,
  TBLPARTIALPAYLABEL,
  UPDATEBTNLABEL,
  WORKLOGACTION,
  WORKLOGDATE,
  WORKLOGSHIFT,
  WORKLOGSTATUS,
  WORKLOGWORKINGSTATUS,
} from '../container/worklogString'
import {
  CURRENTWORKLOGDTO,
  INITWORKLOGDTO,
  MEMBERDTO,
  OPERATIODTO,
  OPERATIONDT,
  SHIFTDT,
  STAFFDT,
  WORKLOGDTO,
} from '../service/types'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import Loader from 'components/common/Loader/Loader'
import { styled } from '@mui/material/styles'
import Swal from 'sweetalert2'
import { reset } from '../service/worklogSlice'
import { DatePicker } from '@mui/x-date-pickers'
import TablePagination from '@mui/material/TablePagination'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box } from '@mui/material'
import { WorklogProps } from '../container/worklogContainer'
import { NODATAFOUND } from 'pages/app/attendance/container/attendanceString'
import StatusChip from 'components/common/chip/chip'
import './worklogstyles.scss'


import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#fff',
    color: '#434343',
    fontWeight: '600',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
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

const Worklog = (props: WorklogProps) => {
  const {
    getShiftByDate,
    getAllStaffByShift,
    getAllOperation,
    getAllShift,

    loading_getAllShift,
    success_getAllShift,

    loading_getShift,
    success_getShift,

    loading_getStaff,
    success_getStaff,

    loading_getOperation,
    success_getOperation,

    getWorklogs,
    loading_getWorklog,
    success_getWorklog,

    createAllWorklog,
    loading_createtWorklog,
    success_createtWorklog,
    error_createtWorklog,

    createDraftAllWorklog,
    loading_createtDraftWorklog,
    success_createtDraftWorklog,
    error_createtDraftWorklog,
    updateAllWorklog,
    loading_updatetWorklog,
    success_updatetWorklog,
    error_updatetWorklog,
    updateStatusWorklog,
    loading_updatetStatusWorklog,
    success_updatetStatusWorklog,
    allShiftList,
    shiftList,
    staffList,
    operationList,
    worklogList,
    role_function,
    getRoleFuncn
  } = props

  const paths = [
    {
      name: HOMEPATHLABEL,
      path: '',
    },
    {
      name: CURRENTPATH,
    },
  ]
  const date = new Date()
  const [isLoader, setLoader] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('add')
  const [allOperation, setAllOperation] = useState([])
  const [workLogs, setWorklogs] = useState<any[]>([])
  const [currentType, setCurrentType] = useState<CURRENTWORKLOGDTO | null>()
  const [rows, setRows] = useState(worklogList)
  const [shiftOption, setShiftOption] = useState([])
  const [startDate, setStartDate] = useState('')
  const [allShift, setAllShift] = useState([])
  const [allStaffs, setAllStaffs] = useState([])
  const [errorMessage, setErrorMessage] = useState<boolean | string | undefined>()
  const [selectShifts, setSelectShifts] = useState<any>()
  const [screen, setScreen] = useState(1)
  const [selectYear, setSelectYear] = useState<any>(
    moment(date).format('YYYY-MM-DD'),
  )
  const [selectMonth, setSelectMonth] = useState<any>(
    moment(date).format('YYYY-MM-DD'),
  )
  const [selectDay, setSelectDay] = useState<any>(
    moment(date).format('YYYY-MM-DD'),
  )
  const [sarchShift, setSearchShift] = useState<any>()
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const addRowTable = () => {
    const data = {
      gang_member: [],
      operation: allOperation,
      bonus: '0',
      partial_pay: '0',
      gang_number: ' ',
    }
    setWorklogs([...workLogs, data])
  }
  const removeRowTable = (ele: any) => {
    const removeData = [...workLogs]
    removeData.splice(ele, 1)
    setWorklogs(removeData)
  }
  const handleClickAddScreen = () => {
    setScreen(2)
  }


  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)


  console.log("row------->",rows)
  
  console.log("allOperation", allOperation)

  const handleClickBackscreen = () => {
    setWorklogs([
      {
        gang_member: [],
        operation: allOperation,
        bonus: '0',
        partial_pay: '0',
        gang_number: ' ',
      },
    ])
    setSelectShifts("")
    setErrorMessage("")
    setCurrentType(null)
    setStartDate('')
    setClickedBtn('add')
    setScreen(1)
  }
  
  useEffect(() => {
    if (success_createtWorklog) {
      setErrorMessage('')
      dispatch(reset())
      Swal.fire({
        title: SWALSUCEETITLE,
        text: SWALSUCEETEXT,
        icon: 'success',
      })
      fetchData()
      handleClickBackscreen()
    } else if (error_createtWorklog) {
      setErrorMessage(error_createtWorklog)
    } else if (success_updatetWorklog) {
      setErrorMessage('')
      dispatch(reset())
      Swal.fire({
        title: SWALUPDATESUCEESTITLE,
        text: SWALUPDATESUCEESTEXT,
        icon: 'success',
      })
      fetchData()
      handleClickBackscreen()
    } else if (error_updatetWorklog) {
      setErrorMessage(error_updatetWorklog)
    } else if (success_createtDraftWorklog) {
      setErrorMessage('')
      dispatch(reset())
      Swal.fire({
        title: SWALDRAFTSUCEESTITLE,
        text: SWALDRAFTSUCEESTEXT,
        icon: 'success',
      })
      fetchData()
      handleClickBackscreen()
    } else if (error_createtDraftWorklog) {
      setErrorMessage(error_createtDraftWorklog)
    } else if (success_updatetStatusWorklog) {
      setErrorMessage('')
      dispatch(reset())
      Swal.fire({
        title: SWALSTATUSSUCEESTITLE,
        text: SWALSTATUSUCEESTEXT,
        icon: 'success',
      })
      fetchData()
    }
  }, [
    success_createtDraftWorklog,
    error_createtDraftWorklog,
    success_createtWorklog,
    error_createtWorklog,
    success_updatetWorklog,
    success_updatetStatusWorklog,
    error_updatetWorklog,
  ])


  console.log("allShift", allShift)
  console.log("shiftOption")
  useEffect(() => {
    if (operationList.length) {
      setWorklogs([
        {
          gang_member: [],
          operation: allOperation,
          bonus: '0',
          partial_pay: '0',
          gang_number: ' ',
        },
      ])
    }
  }, [allOperation, operationList])


  useEffect(() => {
    const isLoading =
      loading_getAllShift ||
      loading_getWorklog ||
      loading_createtWorklog ||
      loading_createtDraftWorklog ||
      loading_updatetWorklog ||
      loading_updatetStatusWorklog ||
      loading_getStaff ||
      loading_getOperation ||
      loading_getShift
    setLoader(isLoading)
  }, [
    loading_getAllShift,
    loading_getWorklog,
    loading_createtWorklog,
    loading_createtDraftWorklog,
    loading_updatetWorklog,
    loading_updatetStatusWorklog,
    loading_getOperation,
    loading_getStaff,
    loading_getShift,
  ])
  useEffect(() => {
    let filterData = {
      year: selectYear !== null ? moment(selectYear).format('YYYY') : null,
      month: selectMonth !== null ? moment(selectMonth).format('MM') : null,
      day: selectDay !== null ? moment(selectDay).format('DD') : null,
      shift_id:
        sarchShift === undefined
          ? null
          : sarchShift === ''
            ? null
            : sarchShift.value,
      limit: rowsPerPage,
      page: page,
    }
    getWorklogs(filterData)
  }, [rowsPerPage, page])

  const fetchData = () => {
    let filterData = {
      year: selectYear !== null ? moment(selectYear).format('YYYY') : null,
      month: selectMonth !== null ? moment(selectMonth).format('MM') : null,
      day: selectDay !== null ? moment(selectDay).format('DD') : null,
      shift_id:
        sarchShift === undefined
          ? null
          : sarchShift === ''
            ? null
            : sarchShift.value,
      limit: rowsPerPage,
      page: page + 1,
    }
    getWorklogs(filterData)
  }

  const handleFilter = () => {
    let filterData = {
      year: selectYear !== null ? moment(selectYear).format('YYYY') : null,
      month: selectMonth !== null ? moment(selectMonth).format('MM') : null,
      day: selectDay !== null ? moment(selectDay).format('DD') : null,
      shift_id:
        sarchShift === undefined
          ? null
          : sarchShift === ''
            ? null
            : sarchShift.value,
      limit: rowsPerPage,
      page: page,
    }
    getWorklogs(filterData)
  }
  const handleClearFilter = () => {
    setSelectYear(date)
    setSelectMonth(date)
    setSelectDay(date)
    setSearchShift('')
    let clearData = {
      year: moment(date).format('YYYY'),
      month: moment(date).format('MM'),
      day: moment(date).format('DD'),
      shift_id: null,
      limit: rowsPerPage,
      page: page,
    }
    getWorklogs(clearData)
  }
  const handleChangeYear = (event: any) => {
    setSelectYear(event)
  }
  const handleChangeMonth = (event: any) => {
    setSelectMonth(event)
  }
  const handleChangeDates = (event: any) => {
    setSelectDay(event)
  }
  const handleSearchShift = (value: any) => {
    setSearchShift(value)
  }
  useEffect(() => {
    if (success_getWorklog) {
      let resultWorklogData = worklogList.map((ele: any) => {
        return {
          id: ele.id,
          is_active: ele.is_active,
          date: ele.date,
          shift: ele.shift,
          status: ele.status,
          worklog_gangs: ele.work_log_uuid,
        }
      })
      setRows(resultWorklogData)
    }
  }, [success_getWorklog])

  useEffect(() => {
    if (success_getAllShift) {
      let result = allShiftList?.map((ele: { id: number; name: string }) => {
        return {
          id: ele.id,
          value: ele.id,
          label: ele.name,
        }
      })
      setShiftOption(result)
    }
  }, [success_getAllShift])

  
  // React.useEffect(() => {
  //   document.addEventListener("keydown", function (event: any) {
  //     if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
  //       var form = event.target.tr;
  //       var index = Array.prototype.indexOf.call(form, event.target);
  //       form.elements[index + 2].focus();
  //       event.preventDefault();
  //     }
  //   });
  // }, []);

  

  useEffect(() => {
    getAllOperation()
    getAllShift()
  }, [])
  useEffect(() => {
    if (success_getOperation && clickedBtn === 'add') {
      if (operationList.length) {
        let filterOpertion = operationList.map((ele: OPERATIONDT) => {
          return {
            id: ele.id,
            label: ele.name,
            value: 0,
          }
        })
        setAllOperation(filterOpertion)
      }
    }
  }, [success_getOperation, operationList])
  
  useEffect(() => {
    if (startDate !== '') {
      let queryData = { date: startDate }
      getShiftByDate(queryData)
    }
  }, [startDate])

  useEffect(() => {
    if (success_getShift && clickedBtn === 'add') {
      if (shiftList.length > 0) {
        let filterShift = shiftList.map((ele: { shift: SHIFTDT }) => {
          return {
            id: ele.shift?.id,
            value: ele.shift?.id,
            label: ele.shift?.name,
          }
        })
        setAllShift(filterShift)
      }
    }
  }, [success_getShift])

  useEffect(() => {
    if (selectShifts !== undefined) {
      let queryStaff = {
        date: startDate,
        shift_id: selectShifts.value,
      }
      getAllStaffByShift(queryStaff)
    }
  }, [selectShifts])
  useEffect(() => {
    if (success_getStaff) {
      if (staffList.length > 0) {
        const filterStaff = staffList[0].report_present.map((ele: STAFFDT) => {
          return {
            value: ele.staff_USN,
            label: ele.staff_USN,
          }
        })
        setAllStaffs(filterStaff)
      }
    }
  }, [success_getStaff])


  const handleChangeShift = (data: SetStateAction<any>) => {
    setSelectShifts(data)
  }
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value)
  }
  const handleSelectMembers = (
    data: any,
    id: number,
    event: any,
    currRow: any,
  ) => {
    if (event.action === 'select-option') {
      let filterAllStaffs = allStaffs.filter(
        (x: any) => !data.filter((y: any) => y.value === x.value).length,
      )
      setAllStaffs(filterAllStaffs)
    } else {
      let trigggerData = event.removedValue
      let newArray: any = [...allStaffs, trigggerData]
      setAllStaffs(newArray)
    }
    const addResultStaff = workLogs.map((item: any, index: number) => {
      if (index + 1 === id) {
        return { ...item, gang_member: data }
      } else {
        return item
      }
    })
    setWorklogs(addResultStaff)
  }
  
  const handleChangeOperation = (
    worklogIndex: number,
    objId: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let updateOperations: any = workLogs
    let foundObj: any = workLogs.find((ele: any, ind: number) => {
      return ind === worklogIndex
    })
    const UpdatedOperation = foundObj.operation.map(
      (ele: any, index: number) => {
        return ele.id === objId ? { ...ele, value: event.target.value } : ele
      },
    )
    foundObj.operation = UpdatedOperation
    setWorklogs(
      updateOperations.map((ele: any, ind: number) => {
        return ind === worklogIndex ? { ...foundObj } : ele
      }),
    )
  }
  const handleChangeBags = (
    event: { target: { value: string } },
    index: number,
  ) => {
    let updateBags = workLogs.map((ele: WORKLOGDTO, index2: number) =>
      index2 === index ? { ...ele, bonus: event.target.value } : ele,
    )
    setWorklogs(updateBags)
  }
  const handleChangePay = (
    event: { target: { value: string } },
    index: number,
  ) => {
    let updatePartialPay = workLogs.map((ele: WORKLOGDTO, index2: number) =>
      index2 === index ? { ...ele, partial_pay: event.target.value } : ele,
    )
    setWorklogs(updatePartialPay)
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
  const handleChangeEdit = (value: any) => {
    let resultData = value.worklog_gangs.map((ele: any) => {
      return {
        id: value.id,
        shift_id: value.shift.id,
        gang_member: ele.work_log_gang.map(
          (emp: { union_serial_number: string }) => {
            return {
              value: emp.union_serial_number,
              label: emp.union_serial_number,
            }
          },
        ),
        partial_pay: String(ele.partial_pay_amount),
        bonus: ele.bonus_bag,
        gang_number: ele.gang_uuid,
        operation: ele.work_log_gang[0]?.work_log_details.map(
          (opt: { operation_id: number; name: string; bag_count: number }) => {
            return {
              id: opt.operation_id,
              label: opt.name,
              value: opt.bag_count,
            }
          },
        ),
      }
    })
    const newOperationList = _.cloneDeep(allOperation)
    let filterWorklogsData = resultData.map((elem: INITWORKLOGDTO) => {
      // const exists = elem.operation
      // let newFilterOperation = newOperationList.filter(e => !exists.includes(e));
      return {
        id: elem.id,
        shift_id: elem.shift_id,
        gang_member: elem.gang_member,
        partial_pay: String(elem.partial_pay),
        bonus: elem.bonus,
        gang_number: elem.gang_number,
        operation: newOperationList.map((a: OPERATIODTO) => {
          const exists = elem.operation.find(
            (b: { id: number }) => a.id == b.id,
          )
          return exists ? ((a.value = exists.value), a) : a
        }),
      }
    })

    console.log("filterWorklogsData",filterWorklogsData )

    setWorklogs(filterWorklogsData)
    setCurrentType(value)
    setStartDate(moment(value.date).format('YYYY-MM-DD'))
    setSelectShifts({
      id: value?.shift.id,
      value: value?.shift.id,
      label: value?.shift.name,
    })
    setClickedBtn('edit')
    setScreen(2)
  }
  const handleSaveWorklog = () => {
    const filterGangs = workLogs.filter(
      (ele: { gang_member: MEMBERDTO[] }) => ele.gang_member.length > 0,
    )
    const filterData = filterGangs.map((ele: any) => {
      const filterOpertions = ele.operation?.filter((item: any) => {
        return item.value !== null
      })
      return { ...ele, operation: filterOpertions }
    })
    const filterGangData = filterData.map((ele: any) => {
      let datas = ele.gang_member.map((elem: any) => elem.label)
      return { ...ele, gang_member: datas }
    })
    const filterCreateData = filterGangData.map((e: any, index: number) => {
      return {
        bonus_bag: e.bonus === null ? 0 : parseFloat(e.bonus),
        gang_member: e.gang_member,
        operation: e.operation?.map((ele: { id: number; value: number }) => {
          return {
            id: ele.id,
            value: ele.value.toString(),
          }
        }),
        partial_pay_amount: parseFloat(e.partial_pay),
      }
    })
    if (clickedBtn === 'add') {
      const createFormData = {
        status: 'Published',
        shift_id: selectShifts.value,
        date: startDate,
        worklog: filterCreateData,
      }
      createAllWorklog(createFormData)
    } else if (clickedBtn === 'edit') {
      const updateFormData = {
        id: currentType?.id,
        status: 'Published',
        shift_id: 1,
        date: currentType?.date,
        worklog: filterCreateData,
      }
      updateAllWorklog(updateFormData)
    }
  }
  const handleDraftSaveWorklog = () => {
    const filterGangMembers = workLogs.filter(
      (ele: { gang_member: MEMBERDTO[] }) => ele.gang_member.length > 0,
    )
    const filterDraftData = filterGangMembers.map((ele: any) => {
      const filterDraftOpertions = ele.operation?.filter((item: any) => {
        return item.value !== null
      })
      return { ...ele, operation: filterDraftOpertions }
    })
    const filterDraftGangData = filterDraftData.map((ele: any) => {
      let datas = ele.gang_member.map((elem: any) => elem.label)
      return { ...ele, gang_member: datas }
    })
    const filterDraftCreateData = filterDraftGangData.map(
      (e: any, index: number) => {
        return {
          bonus_bag: e.bonus === null ? 0 : parseFloat(e.bonus),
          gang_member: e.gang_member,
          operation: e.operation?.map((ele: { id: number; value: number }) => {
            return {
              id: ele.id,
              value: ele.value,
            }
          }),
          partial_pay_amount: parseInt(e.partial_pay),
          gang_number: index + 1,
        }
      },
    )
    const createDraftFormData = {
      status: 'Draft',
      shift_id: selectShifts.value,
      date: startDate,
      worklog: filterDraftCreateData,
    }
    createDraftAllWorklog(createDraftFormData)
  }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })
  const handleActionStatus = (id: number) => {
    updateStatusWorklog(id)
  }
  const handleStatusChange = (id: number) => {
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
          handleActionStatus(id)
        }
      })
  }

  const inputRefs = useRef<any>([]);

 

  const handleKeyDown = (e:any, index:number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInputRef = inputRefs.current[index + 1];
      if (nextInputRef) {
        nextInputRef.focus();
      }
    }
  };

  return (
    <div>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />

      {screen === 1 ? (
        <div>
          <div id="messageBody" className="header-toolbar row mb-4 ">
            <div className='col-lg-10 col-md-8  col-sm-8 col-xs-12'>
              <FormControl size="small">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="date_style"
                    inputFormat="yyyy"
                    views={['year']}
                    label="Year"
                    value={selectYear}
                    onChange={handleChangeYear}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl size="small">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="date_style"
                    inputFormat="MM"
                    label="Month"
                    views={['month']}
                    value={selectMonth}
                    onChange={handleChangeMonth}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl size="small">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="date_style"
                    inputFormat="dd"
                    views={['day']}
                    label="Date"
                    value={selectDay}
                    onChange={handleChangeDates}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl size="small" className="shift-btn  me-3">
                <Select
                  className="basic-single"
                  classNamePrefix="Select shift"
                  defaultValue={'Shift '}
                  isSearchable={true}
                  name="color"
                  options={shiftOption}
                  onChange={handleSearchShift}
                  value={sarchShift}
                  placeholder="Select shift"
                />
              </FormControl>

              <button className="btn btn-success me-2" onClick={handleFilter}>
                {SEARCH}
              </button>
              <button
                className="btn btn-secondary me-2"
                onClick={handleClearFilter}
              >
                {CLEAR}
              </button>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-4 col-xs-12 text-end'>
              {role_function?.Worklog.Create_New_Worklog && <Button
                variant="contained"
                className="attendance-btn"
                onClick={handleClickAddScreen}
              >
                {ADDWORKLOG}
              </Button>}
            </div>
          </div>

          <div>
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{WORKLOGDATE}</StyledTableCell>
                      <StyledTableCell align="left">
                        {WORKLOGSHIFT}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {WORKLOGWORKINGSTATUS}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {WORKLOGSTATUS}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {WORKLOGACTION}
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    {rows.length > 0 ? (
                      
                      rows.map((row: any) => {
                        return (
                          <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                              {row.date}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.shift.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.status}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <StatusChip value={row.is_active} />
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleChangeEdit(row)}
                              >
                                <Edit2
                                  size="22"
                                  color="#565e64"
                                  variant="Outline"
                                />
                              </span>

                              {role_function?.Worklog.Update_Worklog_Detail && <span style={{ cursor: 'pointer' }}>
                                <Tooltip arrow placement="right" title="Status">
                                  <Switch
                                    checked={row.is_active === 1 ? true : false}
                                    onChange={() => handleStatusChange(row.id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                  />
                                </Tooltip>
                              </span>}
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          {NODATAFOUND}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  className="pagination-table-bg"
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          </div>
        </div>
      ) : (
        workLogs && (
          <div>
            <div className="header-bar">
              <div>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  {PAGEHEADING}
                </Typography>
                </div>
                
                <span className="error_msg">
                  <ToastContainer/>
                </span>

                
              <div className="header-toolbar">
                <TextField
                  size="small"
                  className="date-input"
                  id="outlined"
                  type={'date'}
                  defaultValue={startDate}
                  onChange={handleChangeDate}
                  disabled={clickedBtn === 'edit' ? true : false}
                />
                <FormControl size="small" className="shift-btn">
                  <Select
                    className="basic-single"
                    classNamePrefix="Select shift"
                    isSearchable={true}
                    name="color"
                    options={allShift}
                    onChange={handleChangeShift}
                    value={selectShifts}
                    isDisabled={clickedBtn === 'edit' ? true : false}
                  />
                </FormControl>

                <div>
                  <Button
                    variant="contained"
                    className="attendance-btn"
                    onClick={handleSaveWorklog}
                  >
                    {clickedBtn === 'add' ? SAVEBTNLABEL : UPDATEBTNLABEL}
                  </Button>
                  <Button
                    hidden={clickedBtn === 'edit' ? true : false}
                    variant="contained"
                    className="attendance-btn"
                    onClick={handleDraftSaveWorklog}
                  >
                    {DRAFTBTNLABEL}
                    {/* <TextBlock size="25" color="#fff" /> */}
                  </Button>
                </div>

                <div>
                  <Button className="back-btn" onClick={handleClickBackscreen}>
                    <ArrowLeft size="22" color="#484848" variant="Outline" />
                  </Button>
                </div>
              </div>
            </div>

            <Paper
              sx={{ marginBottom: 3}}
            >
              <div className="table-responsive overflow-visible">
                <table className="table table-striped bg-red worklog_table">
                  <thead>
                    <tr>
                      <th style={{ verticalAlign: 'top', background: '#fff' }}>
                        {TBLGANGLABEL}
                      </th>
                      <th style={{ width: '30%', background: '#fff' }}>
                        {TBLOPERATIONLABEL}
                        <td className="mainOperation">
                          {allOperation.length ? allOperation.map((op: any, objIndex: number) => {
                            return (
                              <span className="operationName" key={objIndex}>
                                {op.label}
                              </span>
                            )
                          }):null}
                        </td>
                      </th>

                      <th style={{ verticalAlign: 'top', background: '#fff' }}>
                        {TBLBONUSLABEL}
                      </th>
                      <th style={{ verticalAlign: 'top', background: '#fff' }}>
                        {TBLPARTIALPAYLABEL}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workLogs?.length ? workLogs?.map((obj: any, index: number) => {

                      console.log("allStaffs",allStaffs?.length && allStaffs[0] ?allStaffs:[])
                      
                      const key = index
                      return (
                        <tr key={key}>
                          <td className="gangmember-select">
                            <Select
                              isClearable={false}
                              isMulti
                              closeMenuOnSelect={false}
                              name="label"
                              options={allStaffs?.length && allStaffs[0] ?allStaffs:[]}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(data: any, event) =>
                                handleSelectMembers(data, index + 1, event, obj)
                              }
                              value={obj.gang_member}
                            />
                          </td>
                          <td className="operation-value">
                            
                            {obj?.operation?.length ? obj?.operation.map(
                              (op: any, objIndex: number) => {
                                return (
                                  <input
                                    className="operationField"
                                    key={op.id + objIndex + index}
                                    placeholder={op.label}
                                    min={0}
                                    type="number"
                                    id={`operation_${obj.id}_${op.id}`}
                                    value={String(op.value)}
                                    onChange={(event) => {
                                      handleChangeOperation(index, op.id, event)
                                    }}
                                    ref={(el) => (inputRefs.current[objIndex] = el)}
                                    onKeyDown={(m) => handleKeyDown(m, objIndex)}
                                  />
                                )
                              },
                            ): null}
                          </td>
                          <td className="bonus-bag">
                            <input
                              min={0}
                              type="number"
                              className="operationField"
                              onChange={(event) =>
                                handleChangeBags(event, index)
                              }
                              value={obj.bonus}
                              ref={(el) => (inputRefs.current[obj?.operation?.length] = el)}
                              onKeyDown={(m) => handleKeyDown(m, obj?.operation?.length)}
                            />
                          </td>
                          <td className="partial-pay">
                            <input
                              min={0}
                              type="number"
                              className="operationField"
                              onChange={(data) => {
                                handleChangePay(data, index)
                              }}
                              value={obj.partial_pay}
                              ref={(el) => (inputRefs.current[obj?.operation?.length+1] = el)}
                              onKeyDown={(m) => handleKeyDown(m, obj?.operation?.length+1)}
                            />
                          </td>
                          <td>
                          <button className="btn me-3" onClick={()=>removeRowTable(index)}>
                          <Trash
                            size="22"
                            color="red"
                            variant='Outline'
                            />
                          </button>
                          </td>
                        </tr>
                      )
                    }) : null}
                  </tbody>
                </table>
              </div>
            </Paper>
            
            <button className="btn btn-success" onClick={addRowTable}>
              {ADDROW}
            </button>
          </div>
        )
      )}
    </div>
  )
}
// onClick={()=>(deleteTableRows(index))}
export default Worklog
