export interface IDDT {
  id: number;
}
interface BANKSDT {
  name: string;
  ifsc_code: string;
}
export interface BODYDT {
  bankDetails: BANKSDT;
}
export interface GETBANKDT {
  id?: number;
  name?: string;
  ifsc_code?: string;
  is_active?: number;
}

export interface BankInitStateDTO {
  error_getBank: string | boolean | undefined;
  loading_getBank: boolean;
  success_getBank: boolean;

  error_createBank: string | boolean | undefined;
  loading_createBank: boolean;
  success_createBank: boolean;

  error_updateBank: string | boolean | undefined;
  loading_updateBank: boolean;
  success_updateBank: boolean;

  loading_statusBank: boolean;
  success_statusBank: boolean;
  error_statusBank: string | boolean | undefined;

  banksList?: BankApiDTO[];
}

export interface BankDetailsDTO {
  name: string;
  ifsc_code: string;
  is_active: boolean | number;
}
export interface UpdateBankDTO {
  id?: number | string;
  value: BankDetailsDTO;
}

export interface BankStatusChangeDTO {
  id: number | string;
  bank_detail: BankDetailsDTO;
}

// responses type

export interface BankApiDTO {
  data: BankDataDTO[];
}

export interface BankDataDTO {
  id: number;
  name: string;
  ifsc_code: string;
  is_active: number;
  status: string;
  created_at: Date;
  created_by: CreatedDTO;
  updated_at: Date | null;
  updated_by: CreatedDTO | null;
}

export interface CreatedDTO {
  id: number;
  first_name: string;
  middle_name: null;
  last_name: string;
  login_id: string;
}
