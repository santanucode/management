export interface WAGEDT {
    basicPercentage?: number,
    effectDate?:string,
    id?: number,
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
}