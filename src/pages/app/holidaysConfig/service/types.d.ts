export interface CREATEDT {
    config_name: string,
    effective_from: string,
    config: {
        day_config: {
            off_day: boolean,
            off_eligible: boolean,
            absent_day: boolean
        },
        wage_component: {
            shift_allowance: {
                factor: number
            },
            basic_amount: {
                factor: number
            },
            da_amount: {
                factor: number
            },
            hra_amount: {
                factor: number
            },
            ca_amount: {
                factor: number
            }
        }
    }
}
export interface UPDATEDTO {
    config_name: string,
    effective_from: string,
    config: {
        day_config: {
            off_day: boolean,
            off_eligible: boolean,
            absent_day: boolean
        },
        wage_component: {
            shift_allowance: {
                factor: number
            },
            basic_amount: {
                factor: number
            },
            da_amount: {
                factor: number
            },
            hra_amount: {
                factor: number
            },
            ca_amount: {
                factor: number
            }
        }
    },
    is_active?: boolean | number
}
export interface TBLDT {
    id?: number
    config_name: string,
    effective_from: string,
    is_active?: boolean | number,
    config?: {
        day_config: {
            off_day: boolean,
            off_eligible: boolean,
            absent_day: boolean
        },
        wage_component: {
            shift_allowance: {
                factor: number
            },
            basic_amount: {
                factor: number
            },
            da_amount: {
                factor: number
            },
            hra_amount: {
                factor: number
            },
            ca_amount: {
                factor: number
            }
        }
    },
}

export interface UPDATEDT {
    id: number | undefined,
    value: UPDATEDTO
}

export interface INITSTDT {
    loading_getHolidayConfig: boolean,
    success_getHolidayConfig: boolean,
    error_getHolidayConfig: string | boolean | undefined;

    loading_createHolidayConfig: boolean,
    success_createHolidayConfig: boolean,
    error_createHolidayConfig: string | boolean | undefined;

    loading_updateHolidayConfig: boolean,
    success_updateHolidayConfig: boolean,
    error_updateHolidayConfig: string | boolean | undefined;

    loading_deleteHolidayConfig: boolean,
    success_deleteHolidayConfig: boolean,
    error_deleteHolidayConfig: string | boolean | undefined;

    holidayConfigList: [],
}



export interface MAINROWDTO {
    current_date: CurrentDate[]
    upcoming_date: UpcomingDate[]
  }
  
  export interface CurrentDate {
    id: number
    config_name: string
    effective_from: string
    config: Config
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy
    updated_at: string
    updated_by: any
  }
  
  export interface Config {
    day_config: DayConfig
    wage_component: WageComponent
  }
  
  export interface DayConfig {
    off_day: boolean
    off_eligible: boolean
    absent_day: boolean
  }
  
  export interface WageComponent {
    shift_allowance: ShiftAllowance
    basic_amount: BasicAmount
    da_amount: DaAmount
    hra_amount: HraAmount
    ca_amount: CaAmount
  }
  
  export interface ShiftAllowance {
    factor: string
  }
  
  export interface BasicAmount {
    factor: string
  }
  
  export interface DaAmount {
    factor: string
  }
  
  export interface HraAmount {
    factor: string
  }
  
  export interface CaAmount {
    factor: string
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
    config_name: string
    effective_from: string
    config: Config2
    is_active: number
    status: string
    created_at: string
    created_by: CreatedBy2
    updated_at: string
    updated_by: any
  }
  
  export interface Config2 {
    day_config: DayConfig2
    wage_component: WageComponent2
  }
  
  export interface DayConfig2 {
    off_day: boolean
    off_eligible: boolean
    absent_day: boolean
  }
  
  export interface WageComponent2 {
    shift_allowance: ShiftAllowance2
    basic_amount: BasicAmount2
    da_amount: DaAmount2
    hra_amount: HraAmount2
    ca_amount: CaAmount2
  }
  
  export interface ShiftAllowance2 {
    factor: string
  }
  
  export interface BasicAmount2 {
    factor: string
  }
  
  export interface DaAmount2 {
    factor: string
  }
  
  export interface HraAmount2 {
    factor: string
  }
  
  export interface CaAmount2 {
    factor: string
  }
  
  export interface CreatedBy2 {
    id: number
    first_name: string
    middle_name: any
    last_name: string
    login_id: string
  }
  