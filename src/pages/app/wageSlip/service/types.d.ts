import { RoleFunDTO } from "pages/auth/signin/service/types";

export interface WageSlipInitDTO{
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_getGroup: string | boolean | undefined;
    loading_getWageReport: boolean,
    success_getWageReport: boolean,
    error_getWageReport: boolean,
    loading_getOperation: boolean,
    success_getOperation: boolean,
    error_getOperation: boolean,
    allWageReport: []
}

export interface GETWAGEPAGEDTO {
    group_id: number | string,
    month: number | string,
    year: number | string,
}