export interface WAGEDT {
    basic_amount?: number,
    dearness_allowance_percentage?:number,
    dearness_allowance_amount?: number,
    houserent_allowance_percentage?:number,
    houserent_allowance_amount?: number,
    canteen_allowance_percentage?:number,
    canteen_allowance_amount?: number,
    effective_from?:string,
    id?: number,
    is_active?:any
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FormProps {
    initialValue?: WAGEDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}