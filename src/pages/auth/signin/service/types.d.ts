export interface UserDetailsDTO {
  token: string;
}

export interface LoginIntialStateDTO {
  isLogin: boolean;
  error: string | boolean | undefined;
  loading: boolean;

  loading_getAllFunction: boolean;
  success_getAllFunction: boolean;
  error_getAllFunction: string | boolean | undefined;

  userDetails: UserDetailsDTO | null;
  functionsList: [];
  role_function:any|[]
}

export interface LoginDTO {
  login_id?: string;
  password?: string;
}

export interface LoginResponseData {
  token: string;
}
export type AllDataChanged = string[]

export interface SINGINPROPSDTO {
  handleChangeRecover?: () => void;
  userLogin: (e: LoginDTO) => void;
  loading: boolean;
  isLogin: boolean;
  error: string | boolean | undefined;
  userDetails: UserDetailsDTO | null;
}

export interface CommonNameObj {
  [prop: string]: boolean;
}

export interface ResultObj {
  [commonName: string]: CommonNameObj;
}

//Role-function
export interface RoleFunDTO {
  "l5-swagger": L5Swagger
  sanctum: Sanctum
  ignition: Ignition
  getAllVersions: GetAllVersions
  Auth: Auth
  User: User
  Role: Role
  auth: Auth2
  Route: Route
  batch_Attendance_Create: BatchAttendanceCreate
  Profile: Profile
  Bank: Bank
  Group: Group
  OperationCatagory: OperationCatagory
  Operation: Operation
  Material: Material
  Shift: Shift
  Holiday: Holiday
  HolidayConfig: HolidayConfig
  Incentive: Incentive
  WageComponent: WageComponent
  WageEPF: WageEpf
  WageESI: WageEsi
  Staff: Staff
  get_all_staff: GetAllStaff
  Worklog: Worklog
  Attendance: Attendance
  Report: Report
}

export interface L5Swagger {
  default: boolean
}

export interface Sanctum {
  "csrf-cookie": boolean
}

export interface Ignition {
  healthCheck: boolean
  executeSolution: boolean
  updateConfig: boolean
}

export interface GetAllVersions {
  undefined: boolean
}

export interface Auth {
  Login: boolean
  Refresh_Token: boolean
  Logout: boolean
}

export interface User {
  Get_All_Users_Detail: boolean
  Create_New_User: boolean
  Get_User_Detail_By_Id: boolean
  UpdateUserDetail: boolean
  Change_Password: boolean
  MapUserRole: boolean
  Remove_User_Role: boolean
}

export interface Role {
  Create_New_Role: boolean
  Update_Role_Detail: boolean
  Get_Role_Detail: boolean
  Get_All_Role_Details: boolean
  Get_All_Role_Route_Mapping: boolean
}

export interface Auth2 {
  Role_Route_Create_Bulk: boolean
}

export interface Route {
  Refresh_Routes: boolean
  Get_All_Routes: boolean
}

export interface BatchAttendanceCreate {
  undefined: boolean
}

export interface Profile {
  MyProfile_Details: boolean
}

export interface Bank {
  Create_New_Bank: boolean
  Update_Bank_Detail: boolean
  Get_Bank_Detail_By_Id: boolean
  Get_All_Bank_Details: boolean
}

export interface Group {
  Create_New_Group: boolean
  Update_Group_Detail: boolean
  Get_Group_Detail_By_Id: boolean
  Get_All_Group_Details: boolean
}

export interface OperationCatagory {
  Create_New_Operation_Catagory: boolean
  Update_Operation_Catagory_Detail: boolean
  Get_Operation_Catagory_Detail_By_Id: boolean
  Get_All_Operation_Catagory: boolean
}

export interface Operation {
  Get_All_Operation: boolean
  Get_Operation_Detail_By_Id: boolean
  Create_New_Operation: boolean
  Update_Operation_Detail: boolean
}

export interface Material {
  Create_New_Material: boolean
  Update_Material_Detail: boolean
  Get_Material_Detail_By_Id: boolean
  Get_All_Material_Details: boolean
}

export interface Shift {
  Create_New_Shift: boolean
  Update_Shift_Detail: boolean
  Revise_Shift_Detail: boolean
  Get_Shift_Detail_By_Id: boolean
  Get_All_Shift_Details: boolean
}

export interface Holiday {
  Create_New_Holiday: boolean
  Update_Holiday_Detail: boolean
  Get_Holiday_Detail_By_Id: boolean
  Get_All_Holiday_Details: boolean
}

export interface HolidayConfig {
  Create_New_Holiday_Configuration: boolean
  Update_Holiday_Configuration_Detail: boolean
  Get_Holiday_Configuration_Detail_By_Id: boolean
  Get_All_Holiday_Configuration_Details: boolean
}

export interface Incentive {
  Create_New_Incentive: boolean
  Update_Incentive_Detail: boolean
  Get_Incentive_Detail_By_Id: boolean
  Get_All_Incentive_Details: boolean
}

export interface WageComponent {
  Create_New_Wage_Component: boolean
  Update_Wage_Component_Detail: boolean
  Get_Wage_Component_DetailById: boolean
  Get_All_Wage_Component_Details: boolean
}

export interface WageEpf {
  Create_New_Wage_EPF: boolean
  Update_Wage_EPF: boolean
  Get_Wage_EPF_Detail_BYId: boolean
  Get_All_Wage_EPF_Details: boolean
}

export interface WageEsi {
  Create_New_Wage_ESI: boolean
  Update_Wage_ESI_Detail: boolean
  Get_Wage_ESI_Detail_ById: boolean
  Get_All_Wage_ESI_Details: boolean
}

export interface Staff {
  Create_New_Staff: boolean
  Update_Staff_Detail: boolean
  Get_Staff_Detail_ById: boolean
  Get_Staff_Detail_By_Group_Id: boolean
}

export interface GetAllStaff {
  undefined: boolean
}

export interface Worklog {
  Create_New_Worklog: boolean
  Update_Worklog_Detail: boolean
  Get_Worklog_Detail_ById: boolean
  Get_Worklog_Shift_Detail: boolean
  Get_All_Worklog_Details: boolean
  Change_Worklog_Status: boolean
}

export interface Attendance {
  Create_New_Attendance: boolean
  Update_Attendance_Detail: boolean
  Get_Attendance_Detail_ById: boolean
  Delete_Attendance_Detail: boolean
  Get_All_Attendance_Details: boolean
  Get_All_Shift_Attendance: boolean
  Get_All_Present_Attendance: boolean
}

export interface Report {
  GetAllAttendanceReport: boolean
  GetAllBankReport: boolean
}
