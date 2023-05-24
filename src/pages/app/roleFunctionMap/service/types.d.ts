export interface UserRoleMapInitStateDTO {
  loading_getAllRoleFunctionMap: boolean;
  success_getAllRoleFunctionMap: boolean;
  error_getAllRoleFunctionMap: string | boolean | undefined;

  loading_createRoleFunctionMap: boolean;
  success_createRoleFunctionMap: boolean;
  error_createRoleFunctionMap: string | boolean | undefined;

  loading_getRole: boolean;
  success_getRole: boolean;
  error_getRole: string | boolean | undefined;

  loading_getAllFunction: boolean;
  success_getAllFunction: boolean;
  error_getAllFunction: string | boolean | undefined;

  functionsList: any;
  rolefunctionslist: any;
  roles: ROLEDTO[];
}

export interface functionsListDTO {
  value: string;
  label: string;
  functionArr: FunlistArrDTO[];
}

export interface FunlistArrDTO {
  id: number;
  value: string;
  label: string;
}
export interface ROLEDTO {
  id: number;
  name: string;
}
export interface FETCHROLEDT {
  roles: ROLEDTO[];
}
export interface FUNCTIONDTO {
  id: number;
  name: string;
  checked?: boolean;
}
export interface TBLDTO {
  name: string;
  id: number;
  routeDetails: FUNCTIONDTO[];
}
