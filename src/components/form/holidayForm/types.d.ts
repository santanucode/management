export interface HOLIDAYDT {
    name?: string,
    id?: number,
    holiday_date?: string
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FormProps {
    initialValue?: HOLIDAYDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}