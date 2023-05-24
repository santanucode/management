export interface OPERATIONCATEDT {
  id?: number;
  name?: string;
  effective_from?: string;
  datum?: number;
  is_active?: any;
}

export interface OperationCatInitStateDTO {
  error_getOptCat: string | boolean | undefined;
  loading_getOptCat: boolean;
  success_getOptCat: boolean;
  error_createOptCat: string | boolean | undefined;
  loading_createOptCat: boolean;
  success_createOptCat: boolean;
  error_updateOptCat: string | boolean | undefined;
  loading_updateOptCat: boolean;
  success_updateOptCat: boolean;
  error_updateOptStatusCat: string | boolean | undefined;
  loading_updateOptStatusCat: boolean;
  success_updateOptStatusCat: boolean;
  opertionCategory?: OPERATIONCATEDT[] | null;
}
export interface CREATEOPTCATDT {
  name?: string;
  effective_from?: string;
  datum?: number;
}

export interface UPDATEOPTCATDT {
  id: number | undefined;
  OperationCatagory?: OPERATIONCATEDT;
  category?: OPERATIONCATEDT;
}
