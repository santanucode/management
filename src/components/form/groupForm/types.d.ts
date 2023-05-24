export interface GROUPDT {
    groupName?: string,
    id?: number,
    effectDate?: string
}
export interface GROUPINITDT {
    id?: number;
    name?: string;
    effective_from?: string;
    is_active?: number;
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FormProps {
    initialValue?: GROUPINITDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}