import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import Attendance from '../component/staffAttendance';
import { fetchAllAttendance, fetchAllAttendanceById, fetchAllGroups, fetchAllGroupShift, fetchAllShift, fetchAllStaff, fetchCreateAttendance, fetchDeleteAttendance, fetchUpdateAttendance } from '../service/attendanceSlice';
import { GETGROUPSHIFTDTO } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    error_getAttendance: string | boolean | undefined;
    loading_getAttendance: boolean;
    success_getAttendance: boolean;
    loading_getAttendanceById: boolean;
    success_getAttendanceById: boolean;
    error_getAttendanceById: string | boolean | undefined;
    error_createAttendance: string | boolean | undefined;
    loading_createAttendance: boolean;
    success_createAttendance: boolean;
    error_updateAttendance: string | boolean | undefined;
    loading_updateAttendance: boolean;
    success_updateAttendance: boolean;
    error_deleteAttendance: string | boolean | undefined;
    loading_deleteAttendance: boolean;
    success_deleteAttendance: boolean;
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_getGroup: string | boolean | undefined;
    loading_getShift: boolean;
    success_getShift: boolean;
    error_getShift: string | boolean | undefined;
    loading_getStaff: boolean;
    success_getStaff: boolean;
    error_getStaff: string | boolean | undefined;
    loading_getGroupShift: boolean;
    success_getGroupShift: boolean;
    error_getGroupShift: string | boolean | undefined;
    attendanceList: any;
    attendanceDetails: any;
    allGroupShifts: any;
    allStaffList: any;
  role_function: RoleFunDTO | undefined

}

interface DispatchProps {
    getAllAttendance(groupId: any, shiftId: any, date: any): void;
    getAttendanceById(id: number): void;
    createAllAttendance(data: any): void;
    updateAttendance(data: any): void;
    deleteAttendance(id: number): void;
    getAllGroups(): void;
    getAllStaff(id: number): void;
    getAllShift(): void;
    getAllGroupsShiftByDt(value: GETGROUPSHIFTDTO): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: any): StateProps => {
    return {
        error_getGroup: state.groups.error_getGroup,
        loading_getGroup: state.groups.loading_getGroup,
        success_getGroup: state.groups.success_getGroup,
        error_getShift: state.shift.loading_getShift,
        loading_getShift: state.shift.loading_getShift,
        success_getShift: state.shift.success_getShift,
        error_getAttendance: state.attendance.error_getAttendance,
        loading_getAttendance: state.attendance.loading_getAttendance,
        success_getAttendance: state.attendance.success_getAttendance,
        loading_getAttendanceById: state.attendance.loading_getAttendanceById,
        success_getAttendanceById: state.attendance.success_getAttendanceById,
        error_getAttendanceById: state.attendance.error_getAttendanceById,
        attendanceDetails: state.attendance.attendanceDetails,
        attendanceList: state.attendance.attendanceList,
        loading_createAttendance: state.attendance.loading_createAttendance,
        error_createAttendance: state.attendance.error_createAttendance,
        success_createAttendance: state.attendance.success_createAttendance,
        loading_updateAttendance: state.attendance.loading_updateAttendance,
        error_updateAttendance: state.attendance.error_updateAttendance,
        success_updateAttendance: state.attendance.success_updateAttendance,
        loading_deleteAttendance: state.attendance.loading_deleteAttendance,
        error_deleteAttendance: state.attendance.error_deleteAttendance,
        success_deleteAttendance: state.attendance.success_deleteAttendance,
        loading_getGroupShift: state.attendance.loading_getGroupShift,
        success_getGroupShift: state.attendance.success_getGroupShift,
        error_getGroupShift: state.attendance.error_getGroupShift,
        allGroupShifts: state.attendance.allGroupShifts,

        error_getStaff: state.attendance.error_getStaff,
        loading_getStaff: state.attendance.loading_getStaff,
        success_getStaff: state.attendance.success_getStaff,
        allStaffList: state.attendance.allStaffList,
        role_function: state.userLogin.role_function

    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllAttendance: (data: any) => {
            dispatch(fetchAllAttendance(data));
        },

        getAttendanceById: (id: number) => {
            dispatch(fetchAllAttendanceById(id));
        },

        createAllAttendance: (data: any) => {
            dispatch(fetchCreateAttendance(data));
        },
        updateAttendance: (data: any) => {
            dispatch(fetchUpdateAttendance(data));
        },
        deleteAttendance: (id: number) => {
            dispatch(fetchDeleteAttendance(id));
        },
        getAllGroups: () => {
            dispatch(fetchAllGroups());
        },
        getAllStaff: (id: number) => {
            dispatch(fetchAllStaff(id));
        },
        getAllShift: () => {
            dispatch(fetchAllShift());
        },
        getAllGroupsShiftByDt: (value: GETGROUPSHIFTDTO) => {
            dispatch(fetchAllGroupShift(value))
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface AttendanceProps extends StateProps, DispatchProps { }
export const AttendanceComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Attendance);