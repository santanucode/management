export interface ESIDT {
    esi_percent?: number,
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
    initialValue?: ESIDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}