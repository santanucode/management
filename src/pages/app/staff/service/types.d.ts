import { string } from "yup"

export interface STAFFDT {
    id?: number,
    employeeCode: string,
    unionSerialNo: number,
    name: string,
    bank: {
        id: number,
        name?: string
    }
    accountNo: number,
    adhaarNo: number,
    EPFno: string,
    ESIno: string,
    UANno: string,
    InsuranceNo: string,
    group: {
        id: number
        name?: string
    },
    is_active?:boolean | number
}

export interface StaffInitStateDTO {
    loading_getGroup: string | boolean | undefined;
    success_getGroup: boolean;
    error_getGroup: boolean;

    error_getStaff: string | boolean | undefined;
    loading_getStaff: boolean;
    success_getStaff: boolean;

    error_createStaff: string | boolean | undefined;
    loading_createStaff: boolean;
    success_createStaff: boolean;

    error_updateStaff: string | boolean | undefined;
    loading_updateStaff: boolean;
    success_updateStaff: boolean;

    loading_statusStaff: boolean;
    success_statusStaff: boolean;
    error_statusStaff: string | boolean | undefined;

    staffList?: any;
}

export interface INITDATA {
    aadhar_number: number;
    n: string;
    bank_acc_number : number;
    code: string;
    epf_number: string;
    esi_number: string;
    id: number;
    insurance_number: string;
    is_active: number;
    name: string;
    status: string;
    union_serial_number: string;
    universal_account_number: string;
    group_id: {
        id: number,
        name: string,
        effective_from: string;
    };
    bank_id: {
        id: number,
        name: string,
        ifsc_code: string|any
    }

}

export interface PROPSDATA {
    getAllStaff: () => void
    getAllGroups: () => void;
    getAllBanks: () => void;
    loading_getStaff: boolean;
    loading_createStaff: boolean;
    success_createStaff: boolean;
    error_createStaff: boolean | string;
    loading_updateStaff: boolean;
    success_updateStaff: boolean;
    error_updateStaff: boolean | string;
    staffList: STAFFDT[],
    createStaff: (e) => void;
    updateStaff: (e) => void;
    statusChangeStaff: (e) => void;
    success_statusStaff: boolean;
    loading_statusStaff: boolean;

}


export interface UPDATEEDT {
    id:number | undefined,
    value: {
        id?: number | undefined,
        name: string,
        aadhar_number: number | string,
        code: string,
        union_serial_number: string,
        universal_account_number: string,
        insurance_number: string,
        epf_number: string,
        esi_number: string,
        bank_acc_number: number|boolean|number,
        bank_id: string,
        group_id: string,
        is_active: boolean,
    }
}



export interface CREATEDT {
    id?: number | undefined,
    name: string,
    aadhar_number: number | string,
    code: string,
    union_serial_number: string,
    universal_account_number: string,
    insurance_number: string,
    epf_number: string,
    esi_number: string,
    n : string,
    bank_id: string,
    group_id: string,
    is_active: boolean | number,
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

export interface CREATEDBYDT{
    first_name: String;
    id: number;
    last_name: number;
    login_id: string;
    middle_name: string | null;
}
export interface BANKSTDTO {
    banksList: any
    created_at: string;
    id: number;
    ifsc_code: string;
    is_active: number;
    name: string;
    status: string;
    created_by: 
        CREATEDBYDT
    
}

export interface BANKSTATEDT{
    banks:BANKSTDTO
}

export interface STATUSCHANGEDT{
    aadhar_number: number;
    bank_acc_number : number;
    code: string;
    epf_number: string;
    esi_number: string;
    id: number;
    insurance_number: string;
    is_active: number;
    name: string;
    status: string;
    union_serial_number: string;
    universal_account_number: string;
}