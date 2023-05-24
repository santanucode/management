import React, { useEffect, useRef, useState } from 'react'
import {
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { ArrowLeft, Calendar, Edit2, Trash } from 'iconsax-react'
import './style.scss'
import moment from 'moment'
import Select from 'react-select'
import AttendanceChip from 'components/common/AttedanceChip/AttendanceChip'
import { useSelector } from 'react-redux'
import {
  GROUPDETAILDT,
  GROUPDROPDOWN,
  GROUPSTATEDT,
  SHIFTDETAILDT,
  SHIFTSTATEDT,
} from '../service/types'
import Loader from 'components/common/Loader/Loader'
import { styled } from '@mui/material/styles'
import { STAFFDTO } from './typs'
import Swal from 'sweetalert2'
import { reset } from '../service/attendanceSlice'
import { useDispatch } from 'react-redux'
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb'
import {
  ADDBTN,
  CURRENTPATH,
  CURRENT_SUCCESS,
  CURRENT_SUCCESS_CREATED,
  CURRENT_SUCCESS_UPDATED,
  DELETED,
  DELETEDMESSAGE,
  DELETELABELHEAD,
  DELETELABELSUBHEAD,
  DELETEPERMISSIONNO,
  DELETEPERMISSIONYES,
  HOMEPATH,
  LABELABSENT,
  LABELPRESENT,
  LABELSPECIALABSENT,
  NODATAFOUND,
  TABLEABSENT,
  TABLEACTION,
  TABLEDATE,
  TABLEGROUP,
  TABLEPRESENT,
  TABLESHIFT,
  TABLESPABSENT,
  TBLHEAD,
  UPDATEBTN,
} from '../container/attendanceString'
import _ from 'lodash'
import { Box } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AttendanceProps as Iprops } from '../container/attendanceContainer'
import { PDFViewer } from '@react-pdf/renderer'
import PDF_Table from 'components/pdfTable/PDF_Table'

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

interface AttendanceProps extends Iprops {
  getAllAttendance: any
}

const Attendance = (props: AttendanceProps) => {
  const {
    getAllAttendance,
    createAllAttendance,
    updateAttendance,
    deleteAttendance,
    getAllGroups,
    getAllStaff,
    getAllShift,
    attendanceList,
    loading_getGroup,
    loading_getShift,
    loading_getStaff,
    loading_getAttendance,
    success_getAttendance,
    loading_createAttendance,
    error_createAttendance,
    success_createAttendance,
    loading_updateAttendance,
    error_updateAttendance,
    loading_deleteAttendance,
    success_updateAttendance,
    success_deleteAttendance,
    success_getStaff,
    getAttendanceById,
    attendanceDetails,
    loading_getAttendanceById,
    success_getAttendanceById,
    getAllGroupsShiftByDt,
    loading_getGroupShift,
    success_getGroupShift,
    allGroupShifts,
    allStaffList,
    role_function,
    getRoleFuncn
  } = props

  const paths = [
    {
      name: HOMEPATH,
      path: '',
    },
    {
      name: CURRENTPATH,
    },
  ]

  const date = new Date()
  const currentDate = JSON.stringify(date).slice(1, 11)

  const [currentType, setCurrentType] = useState<any>()
  const [isLoader, setLoader] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [selectGroupList, setSelectGroupList] = useState<any>({
    value: null,
    error: false,
    success: false,
  })

  const [selectShifts, setSelectShifts] = useState<any>()
  const [clickedBtn, setClickedBtn] = useState('')
  const [rows, setRows] = useState(attendanceList)
  const [currentId, setCurrentId] = useState(null)
  const [errorMessage, setErrorMessage] = useState<any>()
  const [screen, setScreen] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const draggableTodo = useRef<any>(null)
  const groupName = useRef(null)
  const [initStaffs, setInitStaff] = useState<any>([])
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
  const [masterGrp, setMasterGrp] = useState<GROUPDROPDOWN[]>([])
  const [masterShft, setMasterShift] = useState<SHIFTDETAILDT[]>([])

  const [tasks, setTasks] = useState<any>({
    present_list: [],
    absent_list: [],
    special_absent: [],
    dragged: {},
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (startDate !== '') {
      let value = { date: startDate }
      getAllGroupsShiftByDt(value)
    }
  }, [startDate])

  useEffect(() => {
    getAllGroups()
    getAllShift()
  }, [])


  useEffect(() => {
    getRoleFuncn()
  }, [])

  console.log("role_function", role_function)

  useEffect(() => {
    const isLoading =
      loading_createAttendance ||
      loading_getStaff ||
      loading_getGroup ||
      loading_getShift ||
      loading_updateAttendance ||
      loading_deleteAttendance ||
      loading_getAttendance ||
      loading_getAttendanceById ||
      loading_getGroupShift
    setLoader(isLoading)
  }, [
    loading_createAttendance,
    loading_getStaff,
    loading_getGroup,
    loading_getShift,
    loading_updateAttendance,
    loading_deleteAttendance,
    loading_getAttendance,
    loading_getAttendanceById,
    loading_getGroupShift,
  ])
  useEffect(() => {
    if (success_createAttendance) {
      setErrorMessage('')
      setSelectGroupList('')
      setSelectShifts('')
      dispatch(reset())
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_CREATED,
        icon: 'success',
      })
      setTasks({
        present_list: [],
        absent_list: [],
        special_absent: [],
        dragged: {},
      })
      fetchData()
      handleClickTable()
    } else if (error_createAttendance) {
      setErrorMessage(error_createAttendance)
    } else if (success_updateAttendance) {
      setErrorMessage('')
      setSelectGroupList('')
      setSelectShifts('')
      dispatch(reset())
      Swal.fire({
        title: CURRENT_SUCCESS,
        text: CURRENT_SUCCESS_UPDATED,
        icon: 'success',
      })
      setTasks({
        present_list: [],
        absent_list: [],
        special_absent: [],
        dragged: {},
      })
      fetchData()
      handleClickTable()
    } else if (error_updateAttendance) {
      setErrorMessage(error_updateAttendance)
    } else if (success_deleteAttendance) {
      setErrorMessage('')
      Swal.fire({
        title: DELETED,
        text: DELETEDMESSAGE,
        icon: 'success',
      })
      dispatch(reset())
      fetchData()
    }
  }, [
    success_createAttendance,
    error_createAttendance,
    success_updateAttendance,
    error_updateAttendance,
    success_deleteAttendance,
  ])

  function dateDiffInDays(a: any, b: any) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
    const diffDay = Math.floor((utc2 - utc1) / _MS_PER_DAY)
    return true ? diffDay < 0 : false
  }

  const groupLists = useSelector(
    (state: GROUPSTATEDT) => state.groups.groupList,
  )
  const masterGroup = groupLists?.map((ele: GROUPDETAILDT) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    is_active: ele.is_active,
    effective_from: new Date(ele.effective_from),
  }))
  const masterGroups = masterGroup?.filter((ele: any) => {
    return (
      ele.is_active === 1 && dateDiffInDays(date, new Date(ele.effective_from))
    )
  })

  const shiftList = useSelector((state: SHIFTSTATEDT) => state.shift.shiftList)
  const masterShifts = shiftList?.map((ele: SHIFTDETAILDT) => ({
    id: ele.id,
    value: ele.id,
    label: ele.name,
    amount: ele.amount,
    is_active: ele.is_active,
  }))
  const masterShift = masterShifts?.filter((ele: SHIFTDETAILDT) => {
    return ele.is_active === 1
  })

  useEffect(() => {
    if (success_getGroupShift) {
      if (allGroupShifts) {
        let groupArr: any = allGroupShifts?.map((ele: any) => {
          return ele.attendance_groups[0]?.groupId
        })
        let newGroupArr = groupArr?.join(',').split(',')
        const result = masterGroups.filter((ele: any) =>
          newGroupArr.every((id: any) => id != ele.id),
        )
        setMasterGrp(result)
        let shiftArr: any = allGroupShifts?.map((ele: any) => {
          return ele.shift?.id
        })
        const resultShift = masterShift.filter((ele: any) =>
          shiftArr.every((id: any) => id !== ele.id),
        )
        setMasterShift(resultShift)
      }
    }
  }, [success_getGroupShift])

  useEffect(() => {
    if (clickedBtn === 'add') {
      if (selectGroupList.length > 0) {
        let group_ids: any = []
        selectGroupList?.map((ele: GROUPDROPDOWN) => {
          group_ids.push(ele.id)
        })
        let groupDisable = group_ids.length !== 0
        groupDisable && getAllStaff(group_ids)
      }
    }
  }, [selectGroupList])

  const getStaffList = useSelector((state: any) => state.staff.staffList)
  const staffList = getStaffList?.map((ele: any) => {
    return {
      id: ele.union_serial_number,
      value: ele.union_serial_number,
      name: ele.union_serial_number,
      label: ele.union_serial_number,
      group_id: ele.group_id.id,
    }
  })

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
    getAllAttendance(filterData)
  }, [rowsPerPage, page])
  useEffect(() => {
    setRows(attendanceList)
  }, [success_getAttendance])
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
    getAllAttendance(filterData)
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
    getAllAttendance(filterData)
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
    getAllAttendance(clearData)
  }

  const handleClickAddScreen = () => {
    setTasks({
      present_list: [],
      absent_list: [],
      special_absent: [],
      dragged: {},
    })
    setClickedBtn('add')
    setScreen(2)
  }
  const handleClickTable = () => {
    setCurrentType(null)
    setStartDate('')
    setClickedBtn('add')
    setScreen(1)
  }
  useEffect(() => {
    if (clickedBtn === 'add') {
      if (startDate && selectGroupList.length > 0) {
        setTasks({
          present_list: staffList,
          absent_list: [],
          special_absent: [],
          dragged: {},
        })
      }
    }
  }, [startDate, selectGroupList, success_getStaff])
  useEffect(() => {
    if (success_getAttendanceById) {
      if (attendanceDetails) {
        const initialStaffs = attendanceDetails?.report?.map((ele: any) => {
          return {
            id: ele.staff_USN,
            value: ele.staff_USN,
            name: ele.staff_USN,
            label: ele.staff_USN,
            group_id: ele.group_id,
          }
        })
        setInitStaff(initialStaffs)
        const presentDatsList = attendanceDetails?.report?.filter(
          (item: any) => {
            return item.status === 'P'
          },
        )
        const absentList = attendanceDetails?.report?.filter((item: any) => {
          return item.status === 'A'
        })
        const specialList = attendanceDetails?.report?.filter((item: any) => {
          return item.status === 'S'
        })
        let present_datas = presentDatsList?.map((ele: any, index: number) => {
          return {
            id: index + 1,
            value: ele.staff_USN,
            name: ele.staff_USN,
            label: ele.staff_USN,
            group_id: ele.group_id,
          }
        })
        let absent_datas = absentList?.map((ele: any, index: number) => {
          return {
            id: index + 1,
            value: ele.staff_USN,
            name: ele.staff_USN,
            label: ele.staff_USN,
            group_id: ele.group_id,
          }
        })
        let special_datas = specialList?.map((ele: any, index: number) => {
          return {
            id: index + 1,
            value: ele.staff_USN,
            name: ele.staff_USN,
            label: ele.staff_USN,
            group_id: ele.group_id,
          }
        })
        setCurrentId(attendanceDetails.id)
        setSelectShifts({
          id: attendanceDetails?.shift?.id,
          value: attendanceDetails?.shift?.id,
          label: attendanceDetails?.shift?.name,
        })
        setStartDate(moment(attendanceDetails.date).format('YYYY-MM-DD'))
        setCurrentType({
          date: attendanceDetails.attendanceDetails,
          shift_id: {
            id: attendanceDetails.shift?.id,
            label: attendanceDetails.shift?.name,
            value: attendanceDetails.shift?.id,
          },
          present_list: present_datas,
          absent_list: absent_datas,
          special_absent: special_datas,
        })
        setTasks({
          present_list: present_datas,
          absent_list: absent_datas,
          special_absent: special_datas,
          dragged: {},
        })
        setClickedBtn('edit')
        setScreen(2)
      }
    }
  }, [success_getAttendanceById])
  const dragStart = (event: any) => {
    const { target } = event
    const id = target.id
    const parentElementId = target.parentElement.id
    setTimeout(() => {
      target.style.display = 'none'
      draggableTodo.current = target
    }, 0)
    setTasks((prevState: any) => {
      const state: any = { ...prevState }
      const fn = (name: any) => {
        groupName.current = name
        state.dragged = state[name].find((i: any) => i.id.toString() === id)
      }

      switch (parentElementId) {
        case 'todo_div':
          fn('present_list')
          return state
        case 'inProgress_div':
          fn('absent_list')
          return state
        case 'done_div':
          fn('special_absent')
          return state
        default:
          return state
      }
    })
  }
  const dragEnd = (event: any) => {
    event.preventDefault()
    draggableTodo.current.style.display = 'block'
  }
  const dragOver = (event: any) => {
    event.stopPropagation()
    event.preventDefault()
  }
  const dragDrop = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    const { currentTarget } = event
    const id = currentTarget.id

    setTasks((prevState: any) => {
      const state: any = { ...prevState }
      const fn = (name: any) => {
        const { current }: any = groupName
        const dragged: any = state.dragged
        const previousParentId = draggableTodo.current.parentElement.id
        if (previousParentId !== id) {
          state[current] = state[current].filter(
            (i: any) => i.id !== dragged.id,
          )
          state[name] = [...state[name], dragged]
        } else {
          draggableTodo.current.style.display = 'block'
        }
      }
      switch (id) {
        case 'todo_div':
          fn('present_list')
          return state
        case 'inProgress_div':
          fn('absent_list')
          return state
        case 'done_div':
          fn('special_absent')
          return state
        default:
          return state
      }
    })
  }
  const handleChangePresent = (event: any) => {
    let triggerData = {
      id: event?.value,
      name: event?.label,
      value: event.label,
      group_id: event.group_id,
    }

    let presentList = [...tasks.present_list, triggerData]
    const presentIds = presentList.map((id) => id.id)
    const filterPresentList = presentList.filter(
      ({ id }, index) => !presentIds.includes(id, index + 1),
    )
    const filterAbsentList = tasks.absent_list?.filter(
      (item: STAFFDTO) => item.id !== triggerData.id,
    )
    const filterSplAbsentList = tasks.special_absent?.filter(
      (item: STAFFDTO) => item.id !== triggerData.id,
    )
    const data = {
      present_list: filterPresentList,
      absent_list: filterAbsentList,
      special_absent: filterSplAbsentList,
      dragged: triggerData,
    }
    setTasks(data)
  }
  const handleChangeAbsent = (event: any) => {
    let triggerData = {
      id: event.value,
      name: event.label,
      value: event.label,
      group_id: event.group_id,
    }
    let absentList = [...tasks.absent_list, triggerData]
    const absentIds = absentList.map((id) => id.id)
    const filterPresentList = tasks.present_list.filter(
      (item: any) => item.name !== triggerData.name,
    )
    const filterAbsentList = absentList.filter(
      ({ name }, index) => !absentIds.includes(name, index + 1),
    )
    const filterSplAbsentList = tasks.special_absent.filter(
      (item: any) => item.name !== triggerData.name,
    )

    const data = {
      present_list: filterPresentList,
      absent_list: filterAbsentList,
      special_absent: filterSplAbsentList,
      dragged: triggerData,
    }
    setTasks(data)
  }
  const handleChangeSplAbsent = (event: any) => {
    let triggerData = {
      id: event.value,
      name: event.label,
      value: event.label,
      group_id: event.group_id,
    }
    let splAbsentList = [...tasks.special_absent, triggerData]
    const splAbsentIds = splAbsentList.map((id) => id.id)
    const filterPresentList = tasks.present_list.filter(
      (item: any) => item.name !== triggerData.name,
    )
    const filterAbsentList = tasks.absent_list?.filter(
      (item: STAFFDTO) => item.id !== triggerData.id,
    )
    const filterSplAbsentList = splAbsentList.filter(
      ({ name }, index) => !splAbsentIds.includes(name, index + 1),
    )

    const data = {
      present_list: filterPresentList,
      absent_list: filterAbsentList,
      special_absent: filterSplAbsentList,
      dragged: triggerData,
    }
    setTasks(data)
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
  const handleChangeDate = (event: any) => {
    setTasks({
      present_list: [],
      absent_list: [],
      special_absent: [],
      dragged: {},
    })
    setStartDate(event.target.value)
  }
  const handleChangeGroups = (data: any) => {
    setTasks({
      present_list: [],
      absent_list: [],
      special_absent: [],
      dragged: {},
    })
    setSelectGroupList(data)
  }
  const handleChangeShift = (data: any) => {
    setSelectShifts(data)
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
  const handleChangeEdit = (id: any) => {
    getAttendanceById(id)
  }

  const handleSaveAttendance = () => {
    const presentlist = tasks.present_list.map(
      (e: { value: string; group_id: string }) => {
        return {
          USN: e.value,
          group_id: e.group_id,
        }
      },
    )
    const absentlist = tasks.absent_list.map(
      (e: { value: string; group_id: string }) => {
        return {
          USN: e.value,
          group_id: e.group_id,
        }
      },
    )
    const specialAbsentlist = tasks.special_absent.map(
      (e: { value: string; group_id: string }) => {
        return {
          USN: e.value,
          group_id: e.group_id,
        }
      },
    )
    const submit_attendance = {
      shift_id: selectShifts.value,
      date: startDate,
      present: presentlist,
      absent: absentlist,
      special_absent: specialAbsentlist,
    }
    if (clickedBtn === 'add') {
      createAllAttendance(submit_attendance)
    } else {
      const presents_list = currentType?.present_list?.map((e: any) => e.value)
      const absents_list = currentType?.absent_list?.map((e: any) => e.value)
      const specialAbsents_list = currentType?.special_absent?.map(
        (e: any) => e.name,
      )
      var oldPresentData = presents_list
      var newPresentData = submit_attendance?.present?.map(
        (ele: any) => ele.USN,
      )
      var oldAbsentData = absents_list
      var newAbsentData = submit_attendance.absent?.map((ele: any) => ele.USN)

      var oldSplData = specialAbsents_list
      var newSplData = submit_attendance.special_absent?.map(
        (ele: any) => ele.USN,
      )
      const preData = _.differenceWith(
        newPresentData,
        oldPresentData,
        _.isEqual,
      )
      const absData = _.differenceWith(newAbsentData, oldAbsentData, _.isEqual)
      const splData = _.differenceWith(newSplData, oldSplData, _.isEqual)
      const update_body = {
        id: currentId,
        data: {
          shift_id: currentType.shift_id.id,
          date: startDate,
          present: preData,
          absent: absData,
          special_absent: splData,
        },
      }
      updateAttendance(update_body)
    }
  }
  const handleActionDelete = (id: number) => {
    deleteAttendance(id)
  }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })
  const handleChangeDelete = (id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: DELETELABELHEAD,
        text: DELETELABELSUBHEAD,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: DELETEPERMISSIONYES,
        cancelButtonText: DELETEPERMISSIONNO,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleActionDelete(id)
        }
      })
  }

  return (
    <>
      {isLoader && <Loader />}
      <div className="tasks">
        <Breadcrumb pathList={paths} />

        {screen === 1 ? (
          <div>
            <div className="header-toolbar row mb-4">
              <div className='col-lg-10 col-md-8 col-sm-8 col-xs-12'>
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
                      views={['month']}
                      label="Month"
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
                <FormControl
                  size="small"
                  className="shift-btn me-2"
                  style={{ width: '161px' }}
                >
                  <Select
                    className="basic-single"
                    classNamePrefix="Select shift"
                    defaultValue={'Shift '}
                    isSearchable={true}
                    name="color"
                    options={masterShift}
                    onChange={handleSearchShift}
                    value={sarchShift}
                    placeholder={'Select shift'}
                  />
                </FormControl>
                <button onClick={handleFilter} className="btn btn-success me-2">
                  Search
                </button>
                <button
                  onClick={handleClearFilter}
                  className="btn btn-secondary me-2"
                >
                  Clear
                </button>
              </div>
              <div className='col-lg-2 col-md-4 col-sm-4 col-xs-12 text-end'>
                {role_function?.Attendance.Create_New_Attendance && <Button
                  variant="contained"
                  className="attendance-btn"
                  onClick={handleClickAddScreen}
                >
                  {'ADD ATTENDANCE'}
                </Button>}
              </div>
            </div>

            <div>
              <Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>{TABLEDATE}</StyledTableCell>
                        <StyledTableCell align="left">
                          {TABLEGROUP}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {TABLESHIFT}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {TABLEPRESENT}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {TABLEABSENT}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {TABLESPABSENT}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {TABLEACTION}
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows?.data?.length > 0 ? (
                        rows?.data.map((item: any, i: number) => {
                          return (
                            <>
                              <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                  {item.date}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {item.attendance_calcreport[0]?.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {item.shift?.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {item.attendance_calcreport[0].Present}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {item.attendance_calcreport[0].Absent}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {item.attendance_calcreport[0].Special}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {role_function?.Attendance.Update_Attendance_Detail &&<span
                                    onClick={() => handleChangeEdit(item.id)}
                                    style={{
                                      cursor: 'pointer',
                                      marginRight: '10px',
                                    }}
                                  >
                                    <Edit2
                                      size="22"
                                      color="#565e64"
                                      variant="Outline"
                                    />
                                  </span>}
                                  {role_function?.Attendance.Delete_Attendance_Detail &&<span
                                    onClick={() => handleChangeDelete(item.id)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <Trash
                                      size="22"
                                      color="#ee2128"
                                      variant="Outline"
                                    />
                                  </span>}
                                </StyledTableCell>
                              </StyledTableRow>
                            </>
                          )
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            {NODATAFOUND}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination
                    className="pagination-table-bg"
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={rows?.data?.length > 0 ? rows?.data?.length : 0}
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
          <div className="tasks_container">
            <div className="header-bar">
              <div>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  {TBLHEAD}
                </Typography>
              </div>

              <div className="header-toolbar">
                <TextField
                  disabled={clickedBtn === 'edit' ? true : false}
                  size="small"
                  className="date-input"
                  id="outlined"
                  type="date"
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
                <FormControl
                  size="small"
                  className="shift-btn"
                  style={{
                    display: clickedBtn === 'edit' ? 'none' : 'block',
                  }}
                >
                  <Select
                    isDisabled={clickedBtn === 'edit' ? true : false}
                    defaultValue={selectGroupList.value}
                    isMulti
                    name="colors"
                    options={masterGrp}
                    className="basic-multi-select"
                    classNamePrefix="Select groups"
                    onChange={handleChangeGroups}
                  />
                </FormControl>

                <FormControl size="small" className="shift-btn">
                  <Select
                    className="basic-single"
                    classNamePrefix="Select shift"
                    isSearchable={true}
                    name="color"
                    options={masterShft}
                    onChange={handleChangeShift}
                    isDisabled={clickedBtn === 'edit' ? true : false}
                    value={selectShifts}
                  />
                </FormControl>
                <div>
                  <Button
                    variant="contained"
                    className="attendance-btn"
                    onClick={handleSaveAttendance}
                  >
                    {clickedBtn === 'add' ? ADDBTN : UPDATEBTN}
                  </Button>
                </div>

                <div>
                  <Button className="back-btn" onClick={handleClickTable}>
                    <ArrowLeft size="22" color="#484848" variant="Outline" />
                  </Button>
                </div>
              </div>
            </div>

            <span className="error_msg">{errorMessage}</span>
            <div className="tasks-cont_body">
              <div
                className="p-2 mb-3"
                style={{
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6">{LABELPRESENT}</Typography>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={null}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  options={clickedBtn === 'add' ? staffList : initStaffs}
                  onChange={handleChangePresent}
                />

                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    boxShadow: 'none',
                  }}
                  data-testid="dustbin"
                  component="ul"
                >
                  <div
                    id="todo_div"
                    className="tasks-body_child"
                    onDragOver={dragOver}
                    onDropCapture={dragDrop}
                  >
                    <div className="tasks-child_status">2</div>
                    {tasks?.present_list?.map((todo: any) => {
                      return (
                        <div
                          key={todo.id}
                          className="tasks-bd_content m-1"
                          draggable={true}
                          onDragStart={dragStart}
                          onDragEnd={dragEnd}
                          id={todo.id}
                        >
                          <AttendanceChip
                            style={{ background: '#519C66', color: '#fff' }}
                            id={todo.id}
                            label={todo.name}
                          />
                        </div>
                      )
                    })}
                  </div>
                </Paper>
              </div>

              <div
                className="p-2 mb-3"
                style={{
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6">{LABELABSENT}</Typography>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={null}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  options={clickedBtn === 'add' ? staffList : initStaffs}
                  onChange={handleChangeAbsent}
                />
                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    boxShadow: 'none',
                  }}
                  data-testid="dustbin"
                  component="ul"
                >
                  <div
                    id="inProgress_div"
                    className="tasks-body_child "
                    onDragOver={dragOver}
                    onDropCapture={dragDrop}
                  >
                    <div className="tasks-bd_title">
                      <div className="tasks-child_status">1</div>
                    </div>
                    {tasks.absent_list?.map((inprogress: any) => {
                      return (
                        <div
                          key={inprogress.id}
                          className="tasks-bd_content m-1"
                          draggable={true}
                          onDragStart={dragStart}
                          onDragEnd={dragEnd}
                          id={inprogress.id}
                        >
                          <AttendanceChip
                            style={{ background: '#CC5F5F', color: '#fff' }}
                            id={inprogress.id}
                            label={inprogress.name}
                          />
                        </div>
                      )
                    })}
                  </div>
                </Paper>
              </div>
              <div
                className="p-2 mb-3"
                style={{
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6">{LABELSPECIALABSENT}</Typography>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={null}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  options={clickedBtn === 'add' ? staffList : initStaffs}
                  onChange={handleChangeSplAbsent}
                />
                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    boxShadow: 'none',
                  }}
                  data-testid="dustbin"
                  component="ul"
                >
                  <div
                    id="done_div"
                    className="tasks-body_child"
                    onDragOver={dragOver}
                    onDropCapture={dragDrop}
                  >
                    <div className="tasks-bd_title">
                      <div className="tasks-child_status">5</div>
                    </div>
                    {tasks.special_absent?.map((done: any) => {
                      return (
                        <div
                          key={done.id}
                          className="tasks-bd_content m-1"
                          draggable={true}
                          onDragStart={dragStart}
                          onDragEnd={dragEnd}
                          id={done.id}
                        >
                          <AttendanceChip
                            style={{ background: '#FFCC91', color: '#fff' }}
                            id={done.id}
                            label={done.name}
                          />
                        </div>
                      )
                    })}
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Attendance
