export interface CREATEDTO {
    first_name: string,
    middle_name: string,
    last_name: string,
    password: string,
    login_id?: string,
}
export interface ROLEDTO {
    id: number,
    name: string,
    is_active: number
}
export interface ROLEDTO {
    id: number
}
export interface UPDATEROLEDTO {
    id?: number,
    first_name?: string,
    last_name?: string,
    login_id?: string,
    middle_name?: string,
    password?: string,
    is_active?: boolean,
    roles: ROLEDTO[]
}
export interface UPDATEDTO {
    id?: number,
    first_name?: string,
    last_name?: string,
    login_id?: string,
    middle_name?: string,
    password?: string,
    is_active?: boolean | number,
    
    roles?: ROLEDTO[]
}

export interface UPDATEDOBJ {
    id: number,
    value: UPDATEDTO
}

export interface UsersInitStateDTO {
    error_getRole: string | boolean | undefined;
    loading_getRole: boolean;
    success_getRole: boolean;

    error_getUser: string | boolean | undefined;
    loading_getUser: boolean;
    success_getUser: boolean;

    error_createUser: string | boolean | undefined;
    loading_createUser: boolean;
    success_createUser: boolean;

    error_updateUser: string | boolean | undefined;
    loading_updateUser: boolean;
    success_updateUser: boolean;

    loading_statusUser: boolean;
    success_statusUser: boolean;
    error_statusUser: string | boolean | undefined;

    usersList?: [] | any;
}

export interface ERRDTO {
    errorMessage: any
}
export interface ROLEDTO {
    name: string,
    id: number
}
export interface SUBMITDT {
    first_name: string,
    last_name: string,
    middle_name?: string,
    login_id: string,
    id?: number,
    is_active?: number,
    status?: string,
    password?: string,
    roles?: ROLEDTO[]
}

export interface PROPSDTO {
    getAllRoles: () => void;
    getAllUsers: () => void;
    createUser: (e: CREATEDTO) => void;
    updateUser: (e: UPDATEDTO) => void;
    updateStatusUser: (e: UPDATEDTO) => void;
    usersList?: [] | any;
    loading_getUser: boolean;
    error_createUser: string | boolean | undefined;
    loading_createUser: boolean;
    success_createUser: boolean;
    error_updateUser: string | boolean | undefined;
    loading_updateUser: boolean;
    success_updateUser: boolean;
    loading_statusUser: boolean;
    success_statusUser: boolean;
}