export interface AttendanceReportInitDTO {
    error_getAttendanceReport: string | boolean | undefined;
    loading_getAttendanceReport: boolean;
    success_getAttendanceReport: boolean;
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_getGroup: string | boolean | undefined;
    attendanceReportList?: any;
}
export interface GETATTENDANCEDTO {
    group_id: number | string,
    month: number | string,
    year: number | string,
}