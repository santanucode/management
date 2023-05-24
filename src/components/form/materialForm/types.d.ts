export interface MATERIALDT {
    code?: string,
    name?: string,
    BCNHL_bonus?: number
    id?: number,
    is_active?: number,
    effective_from?: string
}
export interface ISubmitResult {
    value?: any;
    error?: boolean;
    success?: boolean;
}
export interface FormProps {
    initialValue?: MATERIALDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}