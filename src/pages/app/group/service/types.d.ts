export interface GROUPDT {
    id: number,
    name: string,
    effectDate: string
}

export interface GETGROUPDT {
    id?: number;
    name: string;
    effective_from: string;
    is_active: number;
}

export interface CREATEGROUPDT {
    id?: number;
    name?: string;
    effective_from?: string;
    is_active?:boolean | number
}

export interface UPDATEGROUPDT {
    id: number | undefined;
    group: CREATEGROUPDT;
}

export interface STATUSDT {
    id?: number;
    name?: string;
    effective_from?: string;
    is_active?: boolean | number;
    status?: string;
}

export interface GroupInitStateDTO {
    error_getGroup: string | boolean | undefined;
    loading_getGroup: boolean;
    success_getGroup: boolean;

    error_createGroup: string | boolean | undefined;
    loading_createGroup: boolean;
    success_createGroup: boolean;

    error_updateGroup: string | boolean | undefined;
    loading_updateGroup: boolean;
    success_updateGroup: boolean;

    loading_statusStaff: boolean;
    success_statusStaff: boolean;
    error_statusStaff: string | boolean | undefined;

    groupList?: any;
}