export interface CREATEDT {
    name: string,
    percentage: number,
    effective_from: string,
    cap_at: null,
    slab_range: number,
    empty_slab_range: boolean,
}

export interface TBLDT {
    name?: string,
    percentage?: number,
    cap_at?: number,
    effective_from?: string
    is_active?: boolean,
    id?: number,
}

export interface UPDATEDT {
    id: number,
    value: TBLDT
}

export interface INITSTDT {
    loading_getOperation: boolean,
    success_getOperation: boolean,
    error_getOperation: any,

    loading_getIncentive: boolean,
    success_getIncentive: boolean,
    error_getIncentive: string | boolean | undefined;

    loading_createIncentive: boolean,
    success_createIncentive: boolean,
    error_createIncentive: string | boolean | undefined;

    loading_updateIncentive: boolean,
    success_updateIncentive: boolean,
    error_updateIncentive: string | boolean | undefined;

    loading_statusIncentive: boolean,
    success_statusIncentive: boolean,
    error_statusIncentive: string | boolean | undefined;

    incentiveList: [],
}

export interface INCENTIVEDTO {
    id?: number,
    name: string,
    percentage: number,
    cap_at: number,
    is_active: boolean | number,
    slab_range: number,
    empty_slab_range: boolean,
    effective_from: string
}

export interface MAINROWDTO {
    current_date: CurrentDate[]
    upcoming_date: UpcomingDate[]
  }
  
  export interface CurrentDate {
    id: number
    name: string
    operation_catagory_id: OperationCatagoryId
    slab_range: number
    percentage: number
    cap_at: number
    effective_from: string
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy
    updated_at: string
    updated_by?: UpdatedBy
  }
  
  export interface OperationCatagoryId {
    id: number
    name: string
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
  
  export interface UpcomingDate {
    id: number
    name: string
    operation_catagory_id: OperationCatagoryId
    slab_range: number
    percentage: number
    cap_at: number
    effective_from: string
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy
    updated_at: string
    updated_by: any
  }
  

  