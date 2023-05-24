export interface GROUPDT {
    id?: number
    name?: string
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface STAFFDT {
    id?: number
    employee_code?: string
    union_serial_number?: string
    name?: string
    emp_Bank?: string
    epf_acc_number?: number
    aadhar_number?: number
    bank_acc_number?: string
    esi_acc_number?: string
    universal_account_number?: string
    insurance_number?: string
    emp_group?: GROUPDT
}

export interface FORMPROPS {
    initialValue?: STAFFDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData?: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}