export interface CREATEDT {
    basic_amount: number,
    dearness_allowance_percentage?: number,
    dearness_allowance_amount?: number,
    houserent_allowance_percentage?: number,
    houserent_allowance_amount?: number,
    canteen_allowance_percentage?: number,
    canteen_allowance_amount?: number,
    effective_from: string
}

export interface TBLDT {
    id?: number
    basic_amount: number,
    dearness_allowance_percentage?: number,
    dearness_allowance_amount?: number,
    houserent_allowance_percentage?: number,
    houserent_allowance_amount?: number,
    canteen_allowance_percentage?: number,
    canteen_allowance_amount?: number,
    effective_from?: string,
    is_active: boolean | number,
    status?: string
}

export interface UPDATEDT {
    id: number | undefined,
    value: TBLDT
}

export interface INITSTDT {
    loading_getWage: boolean,
    success_getWage: boolean,
    error_getWage: string | boolean | undefined;

    loading_createWage: boolean,
    success_createWage: boolean,
    error_createWage: string | boolean | undefined;

    loading_updateWage: boolean,
    success_updateWage: boolean,
    error_updateWage: string | boolean | undefined;

    loading_statusWage: boolean,
    success_statusWage: boolean,
    error_statusWage: string | boolean | undefined;

    wageList: [],
}

export interface MAINROWDTO {
    current_date: CurrentDate[]
    upcoming_date: UpcomingDate[]
}
  
export interface CurrentDate {
    id: number
    basic_amount: number
    dearness_allowance_percentage: number
    dearness_allowance_amount: number
    houserent_allowance_percentage: number
    houserent_allowance_amount: number
    canteen_allowance_percentage: number
    canteen_allowance_amount: number
    effective_from: string
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy
    updated_at?: string
    updated_by?: UpdatedBy
  }
  
  export interface CreatedBy {
    id: number
    first_name: string
    middle_name: any
    last_name: string
    login_id: string
  }
  
  export interface UpdatedBy {
    id: number
    first_name: string
    middle_name: any
    last_name: string
    login_id: string
  }