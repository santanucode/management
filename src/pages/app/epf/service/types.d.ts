export interface CREATEDT {
    er_percent: number,
    eps_percent: number,
    ee_percent: number,
    cap_at: number,
    effective_from: string
}

export interface TBLDT {
    er_percent?: number,
    eps_percent?: number,
    ee_percent?: number,
    cap_at?: number,
    effective_from?: string,
    is_active?: boolean,
    id?: number
}

export interface UPDATEDT {
    id: number,
    value: TBLDT
}

export interface INITSTDT {
    loading_getEpf: boolean,
    success_getEpf: boolean,
    error_getEpf: string | boolean | undefined;

    loading_createEpf: boolean,
    success_createEpf: boolean,
    error_createEpf: string | boolean | undefined;

    loading_updateEpf: boolean,
    success_updateEpf: boolean,
    error_updateEpf: string | boolean | undefined;

    loading_deleteEpf: boolean,
    success_deleteEpf: boolean,
    error_deleteEpf: string | boolean | undefined;

    epfList: [],
}


export interface MAINROWDTO {
    current_date: CurrentDate[]
    upcoming_date: UpcomingDate[]
  }
  
  export interface CurrentDate {
    id: number
    name: any
    er_percent: number
    eps_percent: number
    ee_percent: number
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
  
  export interface UpcomingDate {
    id: number
    name: any
    er_percent: number
    eps_percent: number
    ee_percent: number
    cap_at: number
    effective_from: string
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy2
    updated_at: string
    updated_by: any
  }
  
  export interface CreatedBy2 {
    id: number
    first_name: string
    middle_name: any
    last_name: string
    login_id: string
}
  
