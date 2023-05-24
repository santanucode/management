import { connect } from 'react-redux'
import { RootState, TypedDispatch } from '../../../../redux/store'
import Worklog from '../component/worklog'
import { SHIFTBODYDTO, STAFFBODYDTO } from '../service/types'
import {
  fetchWorklogShift,
  fetchWorklogStaff,
  fetchAllOperation,
  fetchCreateWorklog,
  fetchUpdateWorklog,
  fetchWorklogs,
  fetchAllShift,
  fetchCreateDraftWorklog,
  fetchUpdateStatusWorklog
} from '../service/worklogSlice'
import { RoleFunDTO } from 'pages/auth/signin/service/types'
import { getRole } from 'pages/auth/signin/service/userSlice'

interface StateProps {
  loading_getShift: boolean
  success_getShift: boolean
  error_getShift: string | boolean | undefined
  loading_getAllShift: boolean
  success_getAllShift: boolean
  error_getAllShift: string | boolean | undefined
  loading_getStaff: boolean
  success_getStaff: boolean
  error_getStaff: string | boolean | undefined
  loading_getOperation: boolean
  success_getOperation: boolean
  error_getOperation: string | boolean | undefined
  loading_getWorklog: boolean
  success_getWorklog: boolean
  error_getWorklog: string | boolean | undefined
  loading_createtWorklog: boolean
  success_createtWorklog: boolean
  error_createtWorklog: string | boolean | undefined
  loading_createtDraftWorklog: boolean
  success_createtDraftWorklog: boolean
  error_createtDraftWorklog: string | boolean | undefined
  loading_updatetWorklog: boolean
  success_updatetWorklog: boolean
  error_updatetWorklog: string | boolean | undefined
  loading_updatetStatusWorklog: boolean
  success_updatetStatusWorklog: boolean
  error_updatetStatusWorklog: string | boolean | undefined
  worklogList: any
  shiftList: any
  staffList: any
  operationList: any
  allShiftList: any
  role_function: RoleFunDTO | undefined
}
interface DispatchProps {
  getShiftByDate(body: SHIFTBODYDTO): void
  getAllStaffByShift(body: STAFFBODYDTO): void
  getAllOperation(): void
  getAllShift(): void
  getWorklogs(data: any): void
  createAllWorklog(data: any): void
  createDraftAllWorklog(data: any): void
  updateAllWorklog(data: any): void
  updateStatusWorklog(id: number): void
  getRoleFuncn(): void
  
}
const mapStateToProps = (state: RootState): StateProps => {
  return {
    loading_getShift: state.worklog.loading_getShift,
    success_getShift: state.worklog.success_getShift,
    error_getShift: state.worklog.loading_getShift,
    loading_getAllShift: state.worklog.loading_getAllShift,
    success_getAllShift: state.worklog.success_getAllShift,
    error_getAllShift: state.worklog.error_getAllShift,
    loading_getStaff: state.worklog.loading_getStaff,
    success_getStaff: state.worklog.success_getStaff,
    error_getStaff: state.worklog.error_getStaff,
    loading_getOperation: state.worklog.loading_getOperation,
    success_getOperation: state.worklog.success_getOperation,
    error_getOperation: state.worklog.error_getOperation,
    loading_getWorklog: state.worklog.loading_getWorklog,
    success_getWorklog: state.worklog.success_getWorklog,
    error_getWorklog: state.worklog.error_getWorklog,
    loading_createtWorklog: state.worklog.loading_createtWorklog,
    success_createtWorklog: state.worklog.success_createtWorklog,
    error_createtWorklog: state.worklog.error_createtWorklog,
    loading_createtDraftWorklog: state.worklog.loading_createtDraftWorklog,
    success_createtDraftWorklog: state.worklog.success_createtDraftWorklog,
    error_createtDraftWorklog: state.worklog.error_createtDraftWorklog,
    loading_updatetWorklog: state.worklog.loading_updatetWorklog,
    success_updatetWorklog: state.worklog.success_updatetWorklog,
    error_updatetWorklog: state.worklog.error_updatetWorklog,

    loading_updatetStatusWorklog: state.worklog.loading_updatetStatusWorklog,
    success_updatetStatusWorklog: state.worklog.success_updatetStatusWorklog,
    error_updatetStatusWorklog: state.worklog.error_updatetStatusWorklog,

    worklogList: state.worklog.worklogList,
    shiftList: state.worklog.shiftList,
    staffList: state.worklog.staffList,
    operationList: state.worklog.operationList,
    allShiftList: state.worklog.allShiftList,
    role_function: state.userLogin.role_function
  }
}

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getShiftByDate: (body: SHIFTBODYDTO) => {
      dispatch(fetchWorklogShift(body))
    },
    getAllShift: () => {
      dispatch(fetchAllShift())
    },
    getAllStaffByShift: (body: STAFFBODYDTO) => {
      dispatch(fetchWorklogStaff(body))
    },
    getAllOperation: () => {
      dispatch(fetchAllOperation())
    },
    createAllWorklog: (data: any) => {
      dispatch(fetchCreateWorklog(data))
    },
    createDraftAllWorklog: (data: any) => {
      dispatch(fetchCreateDraftWorklog(data))
    },
    updateAllWorklog: (data: any) => {
      dispatch(fetchUpdateWorklog(data))
    },
    updateStatusWorklog: (id: number) => {
      dispatch(fetchUpdateStatusWorklog(id))
    },
    getWorklogs: (data: any) => {
      dispatch(fetchWorklogs(data))
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  }
}
export interface WorklogProps extends StateProps, DispatchProps { }
export const WorklogComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Worklog)
