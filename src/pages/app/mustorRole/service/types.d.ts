export interface GETMUSTERDTO {
    group_id: number | string,
    month: number | string,
    year: number | string,
}

export interface MusterRollInitDTO{
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_getGroup: string | boolean | undefined;
    loading_getMusterRoll: boolean;
    success_getMusterRoll: boolean;
    error_getMusterRoll: boolean;
    allMusterRoll: []
}