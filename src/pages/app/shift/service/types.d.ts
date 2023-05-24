export interface IDDT {
  id: number;
}
interface ROLEDT {
  name: string;
  description: string;
}
export interface BODYDT {
  role: ROLEDT;
}
export interface GETROLEDT {
  id: number;
  name: string;
  description: string;
  is_active: number;
}
export interface SHIFTTBLDT {
  status?: any;
  id?: number;
  name?: string;
  hours?: string;
  amount?: number;
  is_active?: any;
  is_night?: any;
  effective_from?: string | undefined;
  shiftDetails?: ShiftDTO[];
}
export interface ShiftDTO {
  amount: number;
  created_at: string;
  created_by: number;
  effective_from: string;
  id: number;
  is_arrear: number;
  shift_id: number;
  updated_at: string;
  updated_by: number;
  name: string;
}
export interface ShiftInitStateDTO {
  error_getShift: string | boolean | undefined;
  loading_getShift: boolean;
  success_getShift: boolean;
  error_createShift: string | boolean | undefined;
  loading_createShift: boolean;
  success_createShift: boolean;
  error_updateShift: string | boolean | undefined;
  loading_updateShift: boolean;
  success_updateShift: boolean;
  shiftList: SHIFTTBLDT[] | null;
  error_updateStatusShift: string | boolean | undefined;
  loading_updateStatusShift: boolean;
  success_updateStatusShift: boolean;
  error_createReviseShift: string | boolean | undefined;
  loading_createReviseShift: boolean;
  success_createReviseShift: boolean;

  loading_updateReviseShift: boolean;
  success_updateReviseShift: string | boolean | undefined;
  error_updateReviseShift: falbooleanse;
}

export interface CREATESHIFTDT {
  name?: string;
  amount?: number;
}

export interface UPDATESHIFTDT {
  id: number;
  shift: SHIFTTBLDT;
}
