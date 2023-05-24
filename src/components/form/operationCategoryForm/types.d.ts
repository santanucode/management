export interface OPERATIONCATEDT {
    name?: string,
    id?: number,
    effective_from?: string,
    datum?: number,
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FormProps {
    initialValue?: OPERATIONCATEDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any
}