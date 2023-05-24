export interface ROLEFNDT{
    id: number,
    role: string,
    function:string
}
export interface ISubmitResult{
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FormProps{
    initialValue?: any,
    onHandleClose: (e: any) => void,
    clickedbtn: string,
    handleFormData : (e:any)=> void
}