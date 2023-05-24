export interface CREATEDT {
    gs_percent: number,
    cap_at: number,
    effective_from: string
}

export interface TBLDT {
    gs_percent?: number,
    cap_at?: number,
    effective_from?: string
    is_active?: boolean,
    id?: number
}

export interface UPDATEDT {
    id: number,
    value: TBLDT
}

export interface INITSTDT {
    loading_getEsi: boolean,
    success_getEsi: boolean,
    error_getEsi: string | boolean | undefined;

    loading_createEsi: boolean,
    success_createEsi: boolean,
    error_createEsi: string | boolean | undefined;

    loading_updateEsi: boolean,
    success_updateEsi: boolean,
    error_updateEsi: string | boolean | undefined;

    loading_deleteEsi: boolean,
    success_deleteEsi: boolean,
    error_deleteEsi: string | boolean | undefined;

    esiList: [],
}

export interface MAINROWDTO {
    current_date: CurrentDate[]
    upcoming_date: UpcomingDate[]
  }
  
  export interface CurrentDate {
    id: number
    name: any
    esi_percent: number
    cap_at: number
    effective_from: string
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy
    updated_at: string
    updated_by: any
  }
  export interface UpcomingDate {
    id: number
    name: any
    esi_percent: number
    cap_at: number
    effective_from: string
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy
    updated_at: string
    updated_by: any
}
export interface CreatedBy {
    id: number
    first_name: string
    middle_name: any
    last_name: string
    login_id: string
  }
  
 