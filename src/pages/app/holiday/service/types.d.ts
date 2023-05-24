export interface CREATEDT {
    name: string,
    holiday_date: string,
}

export interface TBLDT {
    name?: string,
    holiday_date?: string,
    is_active?: boolean,
    id?: number
}

export interface UPDATEDT {
    id: number,
    value: TBLDT
}

export interface INITSTDT {
    loading_getHoliday: boolean,
    success_getHoliday: boolean,
    error_getHoliday: string | boolean | undefined;

    loading_createHoliday: boolean,
    success_createHoliday: boolean,
    error_createHoliday: string | boolean | undefined;

    loading_updateHoliday: boolean,
    success_updateHoliday: boolean,
    error_updateHoliday: string | boolean | undefined;

    loading_deleteHoliday: boolean,
    success_deleteHoliday: boolean,
    error_deleteHoliday: string | boolean | undefined;

    holidayList: [],
}
