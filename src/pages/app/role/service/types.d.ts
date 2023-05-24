export interface IDDT {
    id: number
}
interface ROLEDT {
    name: string
    description: string
}
export interface BODYDT {
    role: ROLEDT
}
export interface GETROLEDT {
    id: number,
    name: string,
    description: string,
    is_active: number
}

export interface RoleInitStateDTO {
    error_getRole: string | boolean | undefined;
    loading_getRole: boolean;
    success_getRole: boolean;

    error_createRole: string | boolean | undefined;
    loading_createRole: boolean;
    success_createRole: boolean;

    error_updateRole: string | boolean | undefined;
    loading_updateRole: boolean;
    success_updateRole: boolean;

    loading_updateStatusRole: boolean;
    success_updateStatusRole: boolean;
    error_updateStatusRole: string | boolean | undefined;

    roles: OPERATIONCATEDT | null;
}
