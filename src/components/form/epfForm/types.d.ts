export interface EPFDT {
    er_percent?: number,
    eps_percent?: number,
    ee_percent?: number,
    effective_from?:string,
    cap_at?:number,
    id?: number,
    is_active?:any
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FormProps {
    initialValue?: EPFDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}