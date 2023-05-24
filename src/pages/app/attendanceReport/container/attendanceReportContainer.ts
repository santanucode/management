import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import AttendanceReport from '../component/attendanceReport';
import { fetchAllAttendanceReport, fetchAllGroups } from '../service/attendanceReportSlice';
import { GETATTENDANCEDTO } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    error_getAttendanceReport: string | boolean | undefined;
    loading_getAttendanceReport: boolean;
    success_getAttendanceReport: boolean;
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_getGroup: string | boolean | undefined;
    attendanceReportList: any;
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getAttendanceReport(body: GETATTENDANCEDTO): void;
    getAllGroups(): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getGroup: state.attendancereport.error_getGroup,
        loading_getGroup: state.attendancereport.loading_getGroup,
        success_getGroup: state.attendancereport.success_getGroup,
        error_getAttendanceReport: state.attendancereport.error_getAttendanceReport,
        loading_getAttendanceReport: state.attendancereport.loading_getAttendanceReport,
        success_getAttendanceReport: state.attendancereport.success_getAttendanceReport,
        attendanceReportList: state.attendancereport.attendanceReportList,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAttendanceReport: (data: GETATTENDANCEDTO) => {
            dispatch(fetchAllAttendanceReport(data));
        },
        getAllGroups: () => {
            dispatch(fetchAllGroups());
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};
export interface AttendanceReportProps extends StateProps, DispatchProps { }
export const AttendanceReportComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AttendanceReport);