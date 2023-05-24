
export interface AttendanceInitDTO {
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

    attendanceList?: any;
    attendanceDetails?: any;
    allGroupShifts: any;
    allStaffList: any;
}
export interface GROUPDETAILDT {
    effective_from: string;
    id: number;
    is_active: number;
    name: string;
    status: string;
    effective_from?: string;
}
export interface GROUPSTDTO {
    error_createGroup: boolean;
    error_getGroup: boolean;
    error_statusStaff: boolean;
    error_updateGroup: boolean;
    groupList: GROUPDETAILDT[]
    loading_createGroup: boolean;
    loading_getGroup: boolean;
    loading_statusStaff: boolean;
    loading_updateGroup: boolean;
    success_createGroup: boolean;
    success_getGroup: boolean;
    success_statusStaff: boolean;
    success_updateGroup: boolean;

}

export interface GROUPSTATEDT {
    groups: GROUPSTDTO
}
export interface GROUPDROPDOWN {
    id?: number,
    value?: number,
    label?: string,
    is_active?: number
}

export interface SHIFTDETAILDT {
    id?: number;
    name?: string;
    amount?: number;
    is_active?: number;
    status?: string;
}
export interface SHIFTSTDTO {
    loading_getShift: boolean;
    success_getShift: boolean;
    error_getShift: boolean;
    loading_createShift: boolean;
    success_createShift: boolean;
    error_createShift: boolean;
    loading_updateShift: boolean;
    success_updateShift: boolean;
    error_updateShift: boolean;
    shiftList: SHIFTDETAILDT[]
}

export interface SHIFTSTATEDT {
    shift: SHIFTSTDTO
}

export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}

export interface GETGROUPSHIFTDTO {
    date: string
}