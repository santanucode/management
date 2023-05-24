export interface ISubmitResult {
  value?: any;
  error: boolean;
  success: boolean;
}
export interface OPERATIONDT {
  id: number,
  name: string
}
export interface SHIFTDT {
  id: number,
  name?: string,
  value?: number,
  label?: string
}
export interface STAFFDT {
  id: number
  employeeCode: string
  unionSerialNo: number
  name: string
  bank: {
    id: number
    name: string
  }
  accountNo: number
  adhaarNo: number
  EPFno: string
  ESIno: string
  UANno: string
  InsuranceNo: string
  group: {
    id: number
    name: string
  }
  is_active: any
}

export interface STAFFDT {
  staff_USN: string
}


export interface WORKLOGINITSTATEDTO {

  loading_getShift: boolean
  success_getShift: boolean
  error_getShift: string | boolean | undefined

  loading_getAllShift: boolean
  success_getAllShift: boolean
  error_getAllShift: string | boolean | undefined

  error_getStaff: string | boolean | undefined
  loading_getStaff: boolean
  success_getStaff: boolean

  loading_getOperation: boolean
  success_getOperation: boolean
  error_getOperation: string | boolean | undefined

  loading_getWorklog: boolean
  success_getWorklog: boolean
  error_getWorklog: string | boolean | undefined

  loading_createtWorklog: boolean
  success_createtWorklog: boolean
  error_createtWorklog: string | boolean | undefined

  loading_createtDraftWorklog: boolean
  success_createtDraftWorklog: boolean
  error_createtDraftWorklog: string | boolean | undefined

  loading_updatetWorklog: boolean
  success_updatetWorklog: boolean
  error_updatetWorklog: string | boolean | undefined

  loading_updatetStatusWorklog: boolean
  success_updatetStatusWorklog: boolean
  error_updatetStatusWorklog: string | boolean | undefined

  worklogList: any
  shiftList: any
  staffList: STAFFDT[]
  operationList: any
  allShiftList: any
}

export interface CREATEWORKLOGDTO {
  gang_member: []
  operation: any
  gang_number: number
  bonus: number | string
  partial_pay: string
}

export interface CREATEDTO {
  shift_id: number
  group_id: number
  date: string
  worklog: CREATEWORKLOGDTO
}

export interface SHIFTDETAILDT {
  id: number;
  name: string;
  amount: number;
  is_active: number;
  status: string;
}
export interface SHIFTSTDTO {
  loading_getShift: boolean;
  success_getShift: boolean;
  error_getShift: boolean;
  loading_createShift: boolean;
  success_createShift: boolean;
  error_createShift: boolean;
  loading_updateShift: boolean;
  success_updateShift: boolean;
  error_updateShift: boolean;
  shiftList: SHIFTDETAILDT[]
}

export interface SHIFTSTATEDT {
  shift: SHIFTSTDTO
}

export interface STAFFDTO {
  value: number | string,
  label: string
}
export interface WORKLOGDTO {
  id?: number;
  shift_id?: number;
  gang_member: never[];
  operation: never[];
  bonus: null | string;
  partial_pay: string | null;
}

export interface CURRENTWORKLOGDTO {
  id?: number;
  shift_id?: number;
  date: string;
  gang_member: never[];
  operation: never[];
  bonus: null | string;
  partial_pay: string | null;
} 

export interface SHIFTBODYDTO {
  date: string
}
export interface STAFFBODYDTO {
  date: string,
  shift_id: number
}
export interface MEMBERDTO {
  value: string,
  label: string
}
export interface OPERATIODTO {
  id: id
  label: string
  value: null | number
}

export interface INITWORKLOGDTO {
  id?: number,
  shift_id?: number,
  gang_member: STAFFDTO[],
  partial_pay: number,
  bonus: number,
  gang_number: string,
  operation: OPERATIODTO[]
}