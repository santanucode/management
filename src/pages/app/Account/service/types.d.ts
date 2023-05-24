import { RoleFunDTO } from "pages/auth/signin/service/types";

export interface UPDATEDATADTO {
  id: number;
  user: {
    first_name: string;
    middle_name?: string;
    last_name: string;
    login_id: string;
    is_active: boolean;
    password?: string | null;
  };
}

export interface CHANGEPASSWORD {
  id: number;
  password: {
    old: string;
    new: string;
  };
}

export interface USERDETAILDTO {
  error_updatePassword: string | boolean | undefined;
  loading_updatePassword: boolean;
  success_updatePassword: boolean;

  error_getUser: string | boolean | undefined;
  loading_getUser: boolean;
  success_getUser: boolean;

  error_updateUser: string | boolean | undefined;
  loading_updateUser: boolean;
  success_updateUser: boolean;

  userDetail?: UserDataDTO | undefined ;
}

export interface StateProps {
  error_getUser: string | boolean | undefined;
  loading_getUser: boolean;
  success_getUser: boolean;

  error_updateUser: string | boolean | undefined;
  loading_updateUser: boolean;
  success_updateUser: boolean;

  loading_updatePassword: boolean;
  error_updatePassword: string | boolean | undefined;
  success_updatePassword: boolean;

  userDetail?: UserDataDTO;
  role_function: RoleFunDTO | undefined
}

export interface DispatchProps {
  getUserDetails(): void;
  updateUser(data: UPDATEDATADTO): void;
  changePassword(data: CHANGEPASSWORD): void;
  getRoleFuncn(): void
}

export interface PROPSDTO {
  getUserDetails: () => void;
}

export interface ISubmitResult {
  value?: any;
  error: boolean;
  success: boolean;
}

//Response types
// user details response type
export interface getAlluserAPIDTO {
  userDetail?: UserDataDTO;
}

export interface UserDataDTO {
  id: number | null;
  first_name: string;
  middle_name: null;
  last_name: string;
  login_id: string;
  last_password_changed_at: null;
  is_active: number;
  status: string;
  roles: any[];
  created_at: Date;
  created_by: UpdatedByDataDTO;
  updated_at: Date;
  updated_by: UpdatedByDataDTO;
}

export interface UpdatedByDataDTO {
  id: number;
  first_name: string;
  middle_name: null;
  last_name: string;
  login_id: string;
}
