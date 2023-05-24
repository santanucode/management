export interface ROLEDT {
  day_absent?: string | number;
  day_working?: string | number;
  off_day?: string | number;
  extra_amount?: number;
  off_eligible?: string | number;
  id?: number;
  desc?: string;
  is_active?: any;
}
export interface ISubmitResult {
  value?: any
  error: boolean
  success: boolean
}
export interface FormProps {
  initialValue?: ROLEDT | any,
  onHandleClose: (e: any) => void,
  clickedBtn: string,
  handleFormData: (e: any) => void,
  errorMessage?: any,
  setErrorMessage?: any
}
