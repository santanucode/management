import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import User from "../component/user";
import { CREATEDTO, UPDATEDOBJ, UPDATEDTO } from "../service/types";
import {
  fetchAllRoles,
  fetchAllUsers,
  fetchCreateUser,
  fetchStatusChangeUser,
  fetchUpdateUser,
} from "../service/userSlice";
import { RoleFunDTO } from "pages/auth/signin/service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

interface StateProps {
  error_getRole: string | boolean | undefined;
  loading_getRole: boolean;
  success_getRole: boolean;

  error_getUser: string | boolean | undefined;
  loading_getUser: boolean;
  success_getUser: boolean;
  error_createUser: string | boolean | undefined;
  loading_createUser: boolean;
  success_createUser: boolean;
  error_updateUser: string | boolean | undefined;
  loading_updateUser: boolean;
  success_updateUser: boolean;
  loading_statusUser: boolean;
  success_statusUser: boolean;
  error_statusUser: string | boolean | undefined;

  usersList: [] | null;
  role_function: RoleFunDTO | undefined

}

interface DispatchProps {
  getAllUsers(): void;
  createUser(data: CREATEDTO): void;
  updateUser(data: any): void;
  updateStatusUser(data: UPDATEDTO): void;
  getAllRoles(): void;
  getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error_getRole: state.users.error_getRole,
    loading_getRole: state.users.loading_getRole,
    success_getRole: state.users.success_getRole,
    error_getUser: state.users.error_getUser,
    loading_getUser: state.users.loading_getUser,
    success_getUser: state.users.success_getUser,
    usersList: state.users.usersList,
    loading_createUser: state.users.loading_createUser,
    error_createUser: state.users.error_createUser,
    success_createUser: state.users.success_createUser,
    loading_updateUser: state.users.loading_updateUser,
    error_updateUser: state.users.error_updateUser,
    success_updateUser: state.users.success_updateUser,
    loading_statusUser: state.users.loading_statusUser,
    success_statusUser: state.users.success_statusUser,
    error_statusUser: state.users.error_statusUser,
    role_function: state.userLogin.role_function

  };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getAllRoles: () => {
      dispatch(fetchAllRoles());
    },
    getAllUsers: () => {
      dispatch(fetchAllUsers());
    },
    createUser: (data: CREATEDTO) => {
      dispatch(fetchCreateUser(data));
    },
    updateUser: (data: UPDATEDOBJ) => {
      dispatch(fetchUpdateUser(data));
    },
    updateStatusUser: (data: UPDATEDOBJ) => {
      dispatch(fetchStatusChangeUser(data));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  };
};

export interface UsersProps extends StateProps, DispatchProps {}
export const UsersComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
