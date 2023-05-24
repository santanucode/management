export interface TBLDT {
  name?: string;
  operation_catagory_id?: number;
  is_active?: number;
  id?: number | undefined;
}
export interface CREATEDT {
  name: string;
  operation_catagory_id: number;
}
export interface UPDATEDDATADTO {
  name: string;
  operation_catagory_id: number;
  is_active?: boolean;
}
export interface UPDATEDT {
  id: number | undefined;
  operation: UPDATEDDATADTO;
}

export interface INITSTDT {
  loading_getOptCat: boolean;
  success_getOptCat: boolean;
  error_getOptCat: boolean | string;

  loading_getOperation: boolean;
  success_getOperation: boolean;
  error_getOperation: boolean | string;

  loading_createOperation: boolean;
  success_createOperation: boolean;
  error_createOperation: boolean | string;

  loading_updateOperation: boolean;
  success_updateOperation: boolean;
  error_updateOperation: boolean;

  loading_statusOperation: boolean;
  success_statusOperation: boolean;
  error_statusOperation: boolean | string;

  operationList?: [] | null;
}

export interface GETDATA {
  operationCate: any;
  created_by: number;
  datum: number;
  id: number;
  is_active: number;
  name: string;
}

export interface FLTRCATDT {
  id: number;
  name: string;
  is_active: boolean | number;
}

export interface UPDATEOPDT {
  created_by: string;
  id: number;
  is_active: number;
  name: string;
  operation_catagory_id: number;
  operation_catagory: GETDATA;
}
