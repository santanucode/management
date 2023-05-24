export interface OPERATIONDT {
    id?:number,
    name?: string
}
export interface SLABDT {
    rangeState?: any
    id?: number
    name?: string
    operation_catagory_id?: OPERATIONDT
    percentage?: number
    effective_from?: string
    is_active?:any
    slab_range?:number
}
export interface ISubmitResult {
    value?: any;
    error: boolean;
    success: boolean;
}
export interface FORMPROPS {
    initialValue?: SLABDT,
    onHandleClose: (e: any) => void,
    clickedBtn: string,
    handleFormData: (e: any) => void,
    errorMessage?: any,
    setErrorMessage?: any,
    operationList?: any
}