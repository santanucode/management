export interface SHIFTAMTDETAILS{
    id?: number,
    amount?: number,
    effective_from?: string    
}

export interface SHIFTDT {
    name?: string,
    id?: number,
    amount?: number,
    is_night?: boolean | number,
    effective_from?: string;
    shiftDetails?: SHIFTAMTDETAILS[],
    is_active?: boolean | number,
    subRows?: any;
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FormProps {
    initValAdd?:any,
    initialValue?: SHIFTDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}
export interface FormReviseProps {
    initialValue?: SHIFTDT,
    initValAdd?:SHIFTDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}
